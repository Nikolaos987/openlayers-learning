import { Feature } from "ol";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { ImageStatic, ImageWMS, OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { extent, landGeoJSON, polygon, projection } from "./constants";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import GeoJSON from "ol/format/GeoJSON.js";

export const vectorLayer = new VectorLayer({
  source: new VectorSource({
    features: [new Feature({ geometry: polygon })],
  }),
});

export const imageLayer = new ImageLayer({
  source: new ImageStatic({
    attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
    url: "https://imgs.xkcd.com/comics/online_communities.png",
    imageExtent: extent,
    projection: projection, // tie the image source to this projection
  }),
});

export const tileLayer = new TileLayer({ source: new OSM() });

export const untiledLayer = new ImageLayer({
  source: new ImageWMS({
    url: "https://example.com/wms",
    params: { LAYERS: "exampleLayer" },
  }),
});

export const landLayer = new VectorLayer({
  source: new VectorSource({
    features: new GeoJSON().readFeatures(landGeoJSON, {
      dataProjection: "EPSG:4326", // GeoJSON is lon/lat
      featureProjection: "EPSG:3857", // map view is Web Mercator
    }),
  }),
  style: new Style({
    fill: new Fill({ color: "#e8dcc0" }), // parchment-ish land color
    stroke: new Stroke({ color: "#8a7b5c", width: 1 }),
  }),
  background: "#a8c9d9", // acts as the "sea" color for the whole map
});
