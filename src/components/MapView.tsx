import { useEffect, useRef, useState, type UIEvent } from "react";
import "ol/ol.css";
import { Map, MapBrowserEvent, Overlay, View } from "ol";

import "./MapView.css";
import { defaults as defaultInteractions } from "ol/interaction";
import { tileLayer } from "./layers";

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const overlayInstance = useRef<Overlay | null>(null);

  // const [toggle, setToggle] = useState<string>("Reveal Map");
  const [coords, setCoords] = useState<number[] | null>(null);

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
        zoom: 10,
        maxZoom: 12,
        minZoom: 8,
      }),
      overlays: [overlayInstance.current],
      // controls: [
      //   new ScaleLine(),
      //   new ZoomSlider(),
      //   new Rotate({ label: "hello" }),
      //   new FullScreen({ tipLabel: "Toggle fullscreen" }),
      // ],
    });

    mapInstance.current.on("click", (event) => {
      const coordinates = event.coordinate;
      overlayInstance.current?.setPosition(coordinates);
      setCoords(coordinates);
    });
    // Cleanup on unmount
    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, []);

  return (
    <div>
      <div ref={mapRef} className="map-container" />
      <div ref={popupRef} className="ol-popup">
        {coords && `You clicked at ${coords[0].toFixed(2)}, ${coords[1].toFixed(2)}`}
      </div>
    </div>
  );
}
