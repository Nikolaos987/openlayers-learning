import { Feature } from "ol";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { ImageStatic, ImageWMS, OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { extent, polygon, projection } from "./constants";

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
