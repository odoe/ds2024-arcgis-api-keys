import "./style.css";

import "@arcgis/core/assets/esri/themes/light/main.css";

import config from "@arcgis/core/config";

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import RouteLayer from "@arcgis/core/layers/RouteLayer";
import Directions from "@arcgis/core/widgets/Directions";

config.apiKey = import.meta.env.VITE_ARCGIS_BASEMAP_API_KEY as string;

const layer = new FeatureLayer({
  portalItem: {
    id: "bb0704577864449395803568217d7e9a",
    apiKey: import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string,
  },
  // url: "https://services1.arcgis.com/QKasy5M2L9TAQ7gs/arcgis/rest/services/Join_Features_to_Fire_Stations/FeatureServer/0",
  // apiKey: import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string,
});

const routeLayer = new RouteLayer();

const map = new ArcGISMap({
  basemap: "arcgis/outdoor",
  layers: [layer, routeLayer],
});

const view = new MapView({
  map,
  container: "viewDiv",
  center: [-111.891, 40.7608],
  zoom: 10,
});

const directions = new Directions({
  view,
  layer: routeLayer,
  apiKey: import.meta.env.VITE_ARCGIS_ROUTE_API_KEY as string,
});

view.ui.add(directions, "top-right");

view.when(() => {
  console.log("View ready");
});
