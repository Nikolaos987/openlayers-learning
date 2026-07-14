import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { defaults as defaultInteractions } from "ol/interaction";
import { landLayer } from "./layers";

import "./MapView.css";

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new Map({
      target: mapRef.current,
      interactions: defaultInteractions(),
      layers: [landLayer], // just your styled vector layer, no tiles
      view: new View({
        center: [1800000, 4800000], // roughly Mediterranean area in EPSG:3857
        zoom: 4,
      }),
    });

    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, []);

  return <div ref={mapRef} className="map-container" />;
}
