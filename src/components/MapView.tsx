import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, Overlay, View } from "ol";

import "./MapView.css";
import { defaults as defaultInteractions, Draw } from "ol/interaction";
import { tileLayer, vectorLayer } from "./layers";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

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

  const draw = new Draw({
    source: source,
    type: "Polygon",
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
      layers: [tileLayer, vectorLayer2],
      view: new View({
        center: [11557167.27, 150529.06],
        zoom: 8,
        maxZoom: 17,
        minZoom: 5,
      }),
      overlays: [overlayInstance.current],
      // controls: [
      //   new ScaleLine(),
      //   new ZoomSlider(),
      //   new Rotate({ label: "hello" }),
      //   new FullScreen({ tipLabel: "Toggle fullscreen" }),
      // ],
    });

    mapInstance.current.addInteraction(draw);

    // Cleanup on unmount
    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, []);

  return <div ref={mapRef} className="map-container" />;
}
