import { LineString, Point, Polygon } from "ol/geom";
import { Projection, toLonLat } from "ol/proj";

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