import { LineString, Point, Polygon } from "ol/geom";
import { Projection } from "ol/proj";

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
