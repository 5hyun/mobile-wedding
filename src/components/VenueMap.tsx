"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Feature from "ol/Feature.js";
import Map from "ol/Map.js";
import Overlay from "ol/Overlay.js";
import View from "ol/View.js";
import { defaults as defaultControls } from "ol/control/defaults.js";
import { boundingExtent } from "ol/extent.js";
import LineString from "ol/geom/LineString.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector.js";
import { fromLonLat } from "ol/proj.js";
import VectorSource from "ol/source/Vector.js";
import XYZ from "ol/source/XYZ.js";
import Stroke from "ol/style/Stroke.js";
import Style from "ol/style/Style.js";
import { wedding } from "@/data/wedding";

const venueCoordinate = fromLonLat([
  wedding.venue.coordinates.lng,
  wedding.venue.coordinates.lat,
]);
const stationCoordinate = fromLonLat([
  wedding.venue.stationCoordinates.lng,
  wedding.venue.stationCoordinates.lat,
]);
const exitCoordinate = fromLonLat([
  wedding.venue.exitCoordinates.lng,
  wedding.venue.exitCoordinates.lat,
]);
const walkingRouteCoordinates = [
  exitCoordinate,
  fromLonLat([127.07004, 37.53952]),
  fromLonLat([127.06974, 37.53893]),
  venueCoordinate,
];
const routeLabelCoordinate = fromLonLat([127.06978, 37.53913]);
const mapFocusExtent = boundingExtent([
  venueCoordinate,
  stationCoordinate,
  exitCoordinate,
  ...walkingRouteCoordinates,
]);

export default function VenueMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const venueLabelRef = useRef<HTMLDivElement>(null);
  const stationLabelRef = useRef<HTMLDivElement>(null);
  const exitLabelRef = useRef<HTMLDivElement>(null);
  const routeLabelRef = useRef<HTMLDivElement>(null);
  const [hasMapError, setHasMapError] = useState(false);

  useEffect(() => {
    if (
      !mapRef.current ||
      !markerRef.current ||
      !venueLabelRef.current ||
      !stationLabelRef.current ||
      !exitLabelRef.current ||
      !routeLabelRef.current
    ) {
      return;
    }

    const tilePixelRatio = window.devicePixelRatio >= 1.5 ? 2 : 1;
    const tileSuffix = tilePixelRatio === 2 ? "@2x" : "";
    const tileSource = new XYZ({
      attributions:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      crossOrigin: "anonymous",
      maxZoom: 20,
      tilePixelRatio,
      transition: 180,
      url: `https://{a-d}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}${tileSuffix}.png`,
    });
    const tileLayer = new TileLayer({
      source: tileSource,
    });
    const routeLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new LineString(walkingRouteCoordinates),
          }),
        ],
      }),
      style: new Style({
        stroke: new Stroke({
          color: "rgba(126, 88, 96, 0.74)",
          lineCap: "round",
          lineDash: [8, 8],
          width: 2.5,
        }),
      }),
    });
    const marker = new Overlay({
      element: markerRef.current,
      offset: [0, -10],
      positioning: "bottom-center",
      stopEvent: false,
    });
    const venueLabel = new Overlay({
      element: venueLabelRef.current,
      offset: [0, 10],
      positioning: "top-center",
      stopEvent: false,
    });
    const stationLabel = new Overlay({
      element: stationLabelRef.current,
      offset: [-34, -22],
      positioning: "bottom-center",
      stopEvent: false,
    });
    const exitLabel = new Overlay({
      element: exitLabelRef.current,
      offset: [30, -4],
      positioning: "bottom-center",
      stopEvent: false,
    });
    const routeLabel = new Overlay({
      element: routeLabelRef.current,
      offset: [-34, -22],
      positioning: "center-center",
      stopEvent: false,
    });
    const view = new View({
      center: venueCoordinate,
      maxZoom: 19,
      minZoom: 14,
      zoom: 17,
    });

    const map = new Map({
      controls: defaultControls({
        attribution: true,
        rotate: false,
        zoom: false,
      }),
      layers: [tileLayer, routeLayer],
      overlays: [stationLabel, exitLabel, routeLabel, venueLabel, marker],
      target: mapRef.current,
      view,
    });
    marker.setPosition(venueCoordinate);
    venueLabel.setPosition(venueCoordinate);
    stationLabel.setPosition(stationCoordinate);
    exitLabel.setPosition(exitCoordinate);
    routeLabel.setPosition(routeLabelCoordinate);

    const fitFrame = window.requestAnimationFrame(() => {
      view.fit(mapFocusExtent, {
        duration: 0,
        maxZoom: 17.55,
        padding: [72, 44, 84, 44],
        size: map.getSize(),
      });
    });

    const handleTileLoadError = () => {
      setHasMapError(true);
    };
    tileSource?.on("tileloaderror", handleTileLoadError);

    return () => {
      window.cancelAnimationFrame(fitFrame);
      tileSource?.un("tileloaderror", handleTileLoadError);
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="venue-map-card" aria-label={`${wedding.venue.name} 위치 지도`}>
      <div ref={mapRef} className="venue-map-canvas" />
      <div className="venue-map-guide" aria-hidden="true">
        <span>{wedding.venue.station}</span>
        <strong>{wedding.venue.exit}</strong>
        <span>{wedding.venue.name}</span>
        <em>{wedding.venue.walk}</em>
      </div>
      <div ref={markerRef} className="venue-map-marker" aria-hidden="true">
        <MapPin size={26} />
      </div>
      <div ref={venueLabelRef} className="venue-map-label venue-map-venue" aria-hidden="true">
        <strong>{wedding.venue.name}</strong>
        <span>
          {wedding.venue.hall} · {wedding.venue.floor}
        </span>
      </div>
      <div ref={stationLabelRef} className="venue-map-label venue-map-station" aria-hidden="true">
        <strong>{wedding.venue.station}</strong>
        <span>{wedding.venue.subwayLine}</span>
      </div>
      <div ref={exitLabelRef} className="venue-map-label venue-map-exit" aria-hidden="true">
        <span>5</span>
        <strong>{wedding.venue.exit}</strong>
      </div>
      <div ref={routeLabelRef} className="venue-map-label venue-map-route" aria-hidden="true">
        출구에서 {wedding.venue.walk}
      </div>
      {hasMapError ? (
        <div className="venue-map-error" aria-live="polite">
          지도를 불러오지 못했습니다.
        </div>
      ) : null}
    </div>
  );
}
