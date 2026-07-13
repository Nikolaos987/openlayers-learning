import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, Overlay, View } from "ol";

import "./MapView.css";
import { defaults as defaultInteractions, DragBox } from "ol/interaction";
import { tileLayer } from "./layers";
import { shiftKeyOnly } from "ol/events/condition";

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const overlayInstance = useRef<Overlay | null>(null);

  // const [toggle, setToggle] = useState<string>("Reveal Map");

  const dragBoxInteraction = new DragBox({
    condition: shiftKeyOnly,
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
      layers: [tileLayer],
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

    mapInstance.current.addInteraction(dragBoxInteraction);

    dragBoxInteraction.on("boxend", () => {
      const extent = dragBoxInteraction.getGeometry().getExtent();
      mapInstance.current?.getView().fit(extent, { duration: 500 });
    });

    // Cleanup on unmount
    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, []);

  return <div ref={mapRef} className="map-container" />;
}
