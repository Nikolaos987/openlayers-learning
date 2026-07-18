import { getArea, type Extent } from "ol/extent";
import { LineString, Point, Polygon } from "ol/geom";
import { Projection, toLonLat } from "ol/proj";
import colormap from "colormap";

export const point = new Point([0, 0]);
export const line = new LineString([
  [0, 0],
  [1, 1],
]);
export const polygon = new Polygon([
  [
    [0, 0],
    [1, 1],
    [1, 0],
    [0, 0],
  ],
]);

export const extent = [0, 0, 1024, 968];

export const projection = new Projection({
  code: "xkcd-image",
  units: "pixels",
  extent: extent,
});

// Example EPSG:3857 coordinates (in meters)
export const coordsEPSG3857 = [11557167.27, 150529.06];

// Convert EPSG:3857 to EPSG:4326
export const coordsEPSG4326 = toLonLat(coordsEPSG3857);

export const landGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Sample Landmass" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [10, 40],
            [20, 45],
            [25, 38],
            [15, 35],
            [10, 40],
          ],
        ],
      },
    },
  ],
};

export const min = 1e8; // the smallest area
export const max = 2e13; // the biggest area
export const steps = 50;
export const ramp = colormap({
  colormap: "blackbody",
  nshades: steps,
});

export function clamp(value: number, low: number, high: number) {
  return Math.max(low, Math.min(value, high));
}

export function getColor(feature) {
  const area = getArea(feature.getGeometry());
  const f = Math.pow(clamp((area - min) / (max - min), 0, 1), 1 / 2);
  const index = Math.round(f * (steps - 1));
  return ramp[index];
}
