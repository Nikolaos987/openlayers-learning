import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, Overlay, View } from "ol";

import "./MapView.css";
import { defaults as defaultInteractions } from "ol/interaction";
import { tileLayer, untiledLayer, vectorLayer } from "./layers";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import OverviewMap from "ol/control/OverviewMap";
import MousePosition from "ol/control/MousePosition";
import Attribution from "ol/control/Attribution";
import { createStringXY } from "ol/coordinate";
import { myControl } from "./customControls";

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const overlayInstance = useRef<Overlay | null>(null);
  const source = new VectorSource();

  // Add vector layer for rendering
  const vectorLayer2 = new VectorLayer({
    source: source,
  });

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    overlayInstance.current = new Overlay({
      element: popupRef.current ?? undefined,
      positioning: "bottom-center",
      stopEvent: false,
    });

    mapInstance.current = new Map({
      target: mapRef.current,
      interactions: defaultInteractions(),
      layers: [untiledLayer, vectorLayer],
      view: new View({
        projection: "EPSG:4326",
        center: [0,0],
        zoom: 8,
        maxZoom: 17,
      }),
      overlays: [overlayInstance.current],
      controls: [
        // new ScaleLine(),
        // new ZoomSlider(),
        // new Rotate({ label: "hello" }),
        // new FullScreen({ tipLabel: "Toggle fullscreen" }),
        new OverviewMap(),
        new MousePosition({
          coordinateFormat: createStringXY(1),
          projection: "EPSG:4326",
        }),
        new Attribution(),
        myControl,
      ],
    });

    // Cleanup on unmount
    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, []);

  return <div ref={mapRef} className="map-container" />;
}
