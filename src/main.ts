import config from '@arcgis/core/config';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { initWidgets } from './widgets';
import './style.css';
import {QuakeLayer} from "./quake_layer";
import SceneView from "@arcgis/core/views/SceneView";
import {baseElevationTileLayer, ExaggeratedElevationLayer} from "./elevation-layer";
import Basemap from "@arcgis/core/Basemap";

config.apiKey = import.meta.env.VITE_API_KEY as string;

// TODO: add sanfran building models from https://data.sfgov.org/Geographic-Locations-and-Boundaries/Building-Footprints/ynuv-fyni
// elevation map not showing past certain zoom, 3d render of earthquake data

const elevationLayer = new ExaggeratedElevationLayer();

const quakeLayer = QuakeLayer();


const map = new Map({
  basemap: new Basemap({
    baseLayers: [
      baseElevationTileLayer
    ]
  }),
  layers: [elevationLayer, quakeLayer],
});

const view = new SceneView({
  container: "viewDiv",
  map: map,
  alphaCompositingEnabled: true,
  qualityProfile: "high",
  viewingMode: "local",
  camera: {
    position: [-130.267021, 5.181175, 1651223.3],
    heading: 12.03,
    tilt: 65
  },
  environment: {
    background: {
      type: "color",
      color: [255, 252, 244, 0]
    },
    starsEnabled: false,
    atmosphereEnabled: false,
    lighting: {
      type: "virtual"
    }
  },
  constraints: {
    altitude: {
      min: 50000
    }
  },
  popup: {
    dockEnabled: true,
    dockOptions: {
      position: "top-right",
      breakpoint: false,
      buttonEnabled: false
    },
    collapseEnabled: false
  },
  highlightOptions: {
    color: [255, 255, 255],
    haloOpacity: 0.5
  }
});

view.when(() => initWidgets({ view, layer: featureLayer, elevationLayer: elevationLayer}));
