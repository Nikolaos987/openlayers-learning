import { Feature } from "ol";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { ImageStatic, ImageWMS, OSM, XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import { extent, landGeoJSON, polygon, projection } from "./constants";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import GeoJSON from "ol/format/GeoJSON.js";
import CircleStyle from "ol/style/Circle";
import { Text as OlText } from "ol/style";

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

const landStyle = new Style({
  fill: new Fill({ color: "#dcc8a0" }),
  stroke: new Stroke({ color: "#6b4423", width: 1 }),
});

export const landLayer110m = new VectorLayer({
  source: new VectorSource({
    url: "data/ne_110m_land.geojson",
    format: new GeoJSON(),
  }),
  style: landStyle,
  minZoom: 0,
  maxZoom: 4, // visible from zoom 0 up to (not including) 4
  background: "#7a9b8e",
});

export const landLayer50m = new VectorLayer({
  source: new VectorSource({
    url: "data/ne_50m_land.geojson",
    format: new GeoJSON(),
  }),
  style: landStyle,
  minZoom: 4,
  maxZoom: 7,
  background: "#7a9b8e",
});

export const landLayer10m = new VectorLayer({
  source: new VectorSource({
    url: "data/ne_10m_land.geojson",
    format: new GeoJSON(),
  }),
  style: landStyle,
  minZoom: 7,
  background: "#7a9b8e",
  // no maxZoom — visible all the way up to your max zoom setting
});

export const landLayer = new VectorLayer({
  source: new VectorSource({
    url: "data/ne_10m_land.geojson",
    format: new GeoJSON(),
  }),
  style: new Style({
    fill: new Fill({ color: "#dcc8a0" }), // parchment/sand land tone
    stroke: new Stroke({ color: "#6b4423", width: 1 }), // subtle coastline ink
  }),
  background: "#7a9b8e", // muted sea-blue, less saturated than modern maps
});

const waterStyle = new Style({
  fill: new Fill({ color: "#ffffff" }), // parchment/sand land tone
  stroke: new Stroke({ color: "#3d6b8a", width: 2 }), // subtle coastline ink
});

export const watersLayer110m = new VectorLayer({
  source: new VectorSource({
    url: "data/ne_110m_rivers_lake_centerlines.geojson",
    format: new GeoJSON(),
  }),
  style: waterStyle,
  minZoom: 0,
  maxZoom: 4,
});

export const watersLayer50m = new VectorLayer({
  source: new VectorSource({
    url: "data/ne_50m_rivers_lake_centerlines.geojson",
    format: new GeoJSON(),
  }),
  style: waterStyle,
  minZoom: 4,
  maxZoom: 5,
});

export const watersLayer10m = new VectorLayer({
  source: new VectorSource({
    url: "data/ne_10m_rivers_lake_centerlines.geojson",
    format: new GeoJSON(),
  }),
  style: waterStyle,
  minZoom: 5,
});

export const watersLayer = new VectorLayer({
  source: new VectorSource({
    url: "data/ne_10m_rivers_lake_centerlines.geojson",
    format: new GeoJSON(),
  }),
  style: new Style({
    fill: new Fill({ color: "#ffffff" }), // parchment/sand land tone
    stroke: new Stroke({ color: "#3d6b8a", width: 2 }), // subtle coastline ink
  }),
});

export const regionsLayer = new VectorLayer({
  source: new VectorSource({
    url: "data/ne_10m_geography_regions_points.geojson",
    format: new GeoJSON(),
  }),
  style: new Style({
    fill: new Fill({ color: "#ffffff" }), // parchment/sand land tone
    stroke: new Stroke({ color: "#48518a", width: 0.8 }), // subtle coastline ink
  }),
});

export const empireBordersLayer = new VectorLayer({
  source: new VectorSource(),
  style: (feature) =>
    new Style({
      fill: new Fill({
        color: feature.get("color") + "40", // semi-transparent fill, per-empire color + alpha
      }),
      stroke: new Stroke({
        color: feature.get("color"),
        width: 2,
        lineDash: [4, 2], // gives a slightly hand-drawn/textured border feel
      }),
    }),
});

export const citiesLayer = new VectorLayer({
  source: new VectorSource(),
  style: (feature) =>
    new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: feature.get("color") ?? "#3a3a3a" }),
        stroke: new Stroke({ color: "#fff", width: 1 }),
      }),
      text: new OlText({
        text: feature.get("name"),
        font: "12px 'IM Fell English', serif", // archaic-feeling font
        offsetY: -12,
        fill: new Fill({ color: "#2b2318" }),
        stroke: new Stroke({ color: "#f2e9d8", width: 3 }), // halo for readability on parchment
      }),
    }),
});

export const hillshadeLayer = new TileLayer({
  source: new XYZ({
    url: "https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}.png",
    attributions: "© Stadia Maps, © Stamen Design",
  }),
  opacity: 0.4, // blend it under/over your parchment fill
});
