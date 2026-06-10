"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Map from "ol/Map.js";
import Overlay from "ol/Overlay.js";
import View from "ol/View.js";
import { defaults as defaultControls } from "ol/control/defaults.js";
import TileLayer from "ol/layer/Tile.js";
import { fromLonLat } from "ol/proj.js";
import XYZ from "ol/source/XYZ.js";
import { wedding } from "@/data/wedding";

const venueCoordinate = fromLonLat([
  wedding.venue.coordinates.lng,
  wedding.venue.coordinates.lat,
]);

export default function VenueMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [hasMapError, setHasMapError] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) {
      return;
    }

    const tileSource = new XYZ({
      attributions:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      crossOrigin: "anonymous",
      maxZoom: 20,
      transition: 180,
      url: "https://{a-d}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    });
    const tileLayer = new TileLayer({
      source: tileSource,
    });
    const marker = new Overlay({
      element: markerRef.current,
      offset: [0, -10],
      positioning: "bottom-center",
      stopEvent: false,
    });

    const map = new Map({
      controls: defaultControls({
        attribution: true,
        rotate: false,
        zoom: false,
      }),
      layers: [tileLayer],
      overlays: [marker],
      target: mapRef.current,
      view: new View({
        center: venueCoordinate,
        maxZoom: 19,
        minZoom: 14,
        zoom: 17,
      }),
    });
    marker.setPosition(venueCoordinate);

    const handleTileLoadError = () => {
      setHasMapError(true);
    };
    tileSource?.on("tileloaderror", handleTileLoadError);

    return () => {
      tileSource?.un("tileloaderror", handleTileLoadError);
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="venue-map-card" aria-label={`${wedding.venue.name} 위치 지도`}>
      <div ref={mapRef} className="venue-map-canvas" />
      <div ref={markerRef} className="venue-map-marker" aria-hidden="true">
        <MapPin size={26} />
      </div>
      {hasMapError ? (
        <div className="venue-map-error" aria-live="polite">
          지도를 불러오지 못했습니다.
        </div>
      ) : null}
    </div>
  );
}
