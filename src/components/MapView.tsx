import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";

import "./MapView.css";
import { defaults as defaultInteractions } from "ol/interaction";
import { tileLayer } from "./layers";

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);

  const [toggle, setToggle] = useState<string>("Reveal Map");

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new Map({
      target: mapRef.current,
      interactions: defaultInteractions(),
      layers: [],
      view: new View({
        center: [11557167.27, 150529.06],
        zoom: 10,
        maxZoom: 12,
        minZoom: 8,
      }),
      // controls: [
      //   new ScaleLine(),
      //   new ZoomSlider(),
      //   new Rotate({ label: "hello" }),
      //   new FullScreen({ tipLabel: "Toggle fullscreen" }),
      // ],
    });
    // Cleanup on unmount
    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, []);

  return (
    <>
      <div ref={mapRef} className="map-container" />
      <button
        type="button"
        onClick={() => {
          if (toggle === "Reveal Map") {
            mapInstance.current?.addLayer(tileLayer);
            setToggle("Hide Map");
          } else {
            mapInstance.current?.removeLayer(tileLayer);
            // tileLayer.setVisible(false);
            setToggle("Reveal Map");
          }
        }}
      >
        {toggle}
      </button>
    </>
  );
}
