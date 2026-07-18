import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { defaults as defaultInteractions } from "ol/interaction";
import {
  hillshadeLayer,
  landLayer,
  landLayer10m,
  landLayer110m,
  landLayer50m,
  watersLayer,
  watersLayer10m,
  watersLayer110m,
  watersLayer50m,
} from "./layers";

import "./MapView.css";

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new Map({
      target: mapRef.current,
      interactions: defaultInteractions(),
      layers: [
        landLayer110m,
        landLayer50m,
        landLayer10m,
        watersLayer110m,
        watersLayer50m,
        watersLayer10m,
        hillshadeLayer,
      ], // just your styled vector layer, no tiles
      view: new View({
        center: [0, 0], // roughly Mediterranean area in EPSG:3857
        zoom: 3,
        minZoom: 3,
        maxZoom: 10,
      }),
    });

    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, []);

  return <div ref={mapRef} className="map-container" />;
}
