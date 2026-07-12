import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import "./MapView.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { FullScreen, Rotate, ScaleLine, Zoom, ZoomSlider } from "ol/control";
import { LineString, Point, Polygon } from "ol/geom";
import { defaults as defaultInteractions } from "ol/interaction";

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);

  const point = new Point([0, 0]);
  const line = new LineString([
    [0, 0],
    [1, 1],
  ]);
  const polygon = new Polygon([
    [
      [0, 0],
      [1, 1],
      [1, 0],
      [0, 0],
    ],
  ]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new Map({
      target: mapRef.current,
      interactions: defaultInteractions(),
      layers: [
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature({ geometry: polygon })],
          }),
        }),
        new TileLayer({ source: new OSM() }),
      ],
      view: new View({
        center: [11557167.27, 150529.06],
        zoom: 10,
        maxZoom: 12,
        minZoom: 8,
        extent: [-572513.341856, 5211017.966314, 916327.095083, 6636950.728974],
      }),
      controls: [
        new ScaleLine(),
        new ZoomSlider(),
        new Rotate({ label: "hello" }),
        new FullScreen({ tipLabel: "Toggle fullscreen" }),
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
