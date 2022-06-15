// Widgets
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import Search from '@arcgis/core/widgets/Search';
import LayerSearchSource from '@arcgis/core/widgets/Search/LayerSearchSource';
import ElevationLayer from "@arcgis/core/layers/ElevationLayer";
import SceneView from "@arcgis/core/views/SceneView";

interface Params {
  view: SceneView;
  layer: FeatureLayer;
  elevationLayer: ElevationLayer
}

export function initWidgets({ view, layer }: Params): SceneView {
  const legend = new Legend({ view });
  const layerList = new LayerList({ view });
  view.ui.add(legend, 'bottom-left');
  view.ui.add(layerList, 'top-right');
  new Search({
    container: 'searchDiv',
    sources: [
      new LayerSearchSource({
        layer,
        outFields: ['NAME', 'STATE_NAME', 'VACANT', 'HSE_UNITS'],
        searchFields: ['NAME'],
        suggestionTemplate: '{NAME} County, {STATE_NAME}',
        placeholder: 'Search by County Name',
      }),
    ],
  });
  return view;
}
