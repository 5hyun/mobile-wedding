"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Map from "ol/Map.js";
import Overlay from "ol/Overlay.js";
import View from "ol/View.js";
import { defaults as defaultControls } from "ol/control/defaults.js";
import TileLayer from "ol/layer/Tile.js";
import { fromLonLat } from "ol/proj.js";
import OSM from "ol/source/OSM.js";
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

    const tileLayer = new TileLayer({
      source: new OSM(),
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
        maxZoom: 18,
        minZoom: 14,
        zoom: 16,
      }),
    });
    marker.setPosition(venueCoordinate);

    const handleTileLoadError = () => {
      setHasMapError(true);
    };
    const tileSource = tileLayer.getSource();

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
