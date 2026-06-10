"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { mapLinks, wedding } from "@/data/wedding";

const NAVER_MAP_SCRIPT_ID = "naver-maps-sdk";
const naverMapsKey = process.env.NEXT_PUBLIC_NAVER_MAPS_NCP_KEY_ID?.trim() ?? "";

let naverMapsLoadPromise: Promise<NaverMapsNamespace> | null = null;

type MapStatus = "missing-key" | "loading" | "ready" | "error";

type NaverMapInstance = unknown;
type NaverMarkerInstance = unknown;

type NaverMapsNamespace = {
  InfoWindow: new (options: {
    anchorSize?: {
      height: number;
      width: number;
    };
    backgroundColor?: string;
    borderWidth?: number;
    content: string;
    pixelOffset?: unknown;
  }) => {
    open: (map: NaverMapInstance, anchor?: NaverMarkerInstance) => void;
  };
  LatLng: new (lat: number, lng: number) => unknown;
  Map: new (
    element: HTMLElement,
    options: {
      center: unknown;
      minZoom: number;
      zoom: number;
      zoomControl: boolean;
    }
  ) => NaverMapInstance;
  Marker: new (options: {
    map: NaverMapInstance;
    position: unknown;
    title: string;
  }) => NaverMarkerInstance;
  Point?: new (x: number, y: number) => unknown;
};

declare global {
  interface Window {
    naver?: {
      maps?: NaverMapsNamespace;
    };
    navermap_authFailure?: () => void;
  }
}

function loadNaverMaps(ncpKeyId: string) {
  if (window.naver?.maps) {
    return Promise.resolve(window.naver.maps);
  }

  if (naverMapsLoadPromise) {
    return naverMapsLoadPromise;
  }

  naverMapsLoadPromise = new Promise<NaverMapsNamespace>((resolve, reject) => {
    const existingScript = document.getElementById(
      NAVER_MAP_SCRIPT_ID
    ) as HTMLScriptElement | null;

    const handleError = () => {
      naverMapsLoadPromise = null;
      reject(new Error("Naver Maps script failed to load"));
    };

    const handleLoad = () => {
      if (window.naver?.maps) {
        resolve(window.naver.maps);
        return;
      }

      handleError();
    };

    window.navermap_authFailure = handleError;

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = NAVER_MAP_SCRIPT_ID;
    script.async = true;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(
      ncpKeyId
    )}`;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.appendChild(script);
  });

  return naverMapsLoadPromise;
}

function NaverMapFallback() {
  return (
    <div className="naver-map-fallback">
      <MapPin className="info-icon" size={21} aria-hidden="true" />
      <strong>{wedding.venue.name}</strong>
      <span>네이버지도에서 정확한 위치를 확인해 주세요.</span>
      <a href={mapLinks.naver} target="_blank" rel="noreferrer">
        네이버지도에서 보기
        <ExternalLink className="action-icon" size={15} aria-hidden="true" />
      </a>
    </div>
  );
}

export default function NaverVenueMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<MapStatus>(naverMapsKey ? "loading" : "missing-key");

  useEffect(() => {
    if (!naverMapsKey || !mapRef.current) {
      return;
    }

    let isMounted = true;

    loadNaverMaps(naverMapsKey)
      .then((maps) => {
        if (!isMounted || !mapRef.current) {
          return;
        }

        const center = new maps.LatLng(
          wedding.venue.coordinates.lat,
          wedding.venue.coordinates.lng
        );
        const map = new maps.Map(mapRef.current, {
          center,
          minZoom: 13,
          zoom: 16,
          zoomControl: true,
        });
        const marker = new maps.Marker({
          map,
          position: center,
          title: wedding.venue.name,
        });
        const infoWindow = new maps.InfoWindow({
          anchorSize: { height: 0, width: 0 },
          backgroundColor: "transparent",
          borderWidth: 0,
          content: `
            <div class="naver-map-info">
              <strong>${wedding.venue.name}</strong>
              <span>${wedding.venue.hall} · ${wedding.venue.floorDetail}</span>
            </div>
          `,
          pixelOffset: maps.Point ? new maps.Point(0, -8) : undefined,
        });

        infoWindow.open(map, marker);
        setStatus("ready");
      })
      .catch(() => {
        if (isMounted) {
          setStatus("error");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "missing-key") {
    return (
      <div className="naver-map-card">
        <NaverMapFallback />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="naver-map-card">
        <NaverMapFallback />
      </div>
    );
  }

  return (
    <div className="naver-map-card" aria-label={`${wedding.venue.name} 네이버 지도`}>
      <div ref={mapRef} className="naver-map-canvas" />
      {status === "loading" ? (
        <div className="naver-map-loading" aria-live="polite">
          지도를 불러오는 중입니다
        </div>
      ) : null}
    </div>
  );
}
