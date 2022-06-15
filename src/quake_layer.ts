import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import VisualVariable from "@arcgis/core/renderers/visualVariables/VisualVariable";

export const quakeLayer = () => {
    return new GeoJSONLayer({
        url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        copyright: "USGS Earthquakes",
        popupTemplate: template,
        renderer: renderer,
        orderBy: ["mag"]
    })
}

// @ts-ignore
const template: PopupTemplate = {
    title: "Earthquake Info",
    content: "Magnitude {mag} {type} hit {place} on {time}",
    fieldInfos: [
        {
            fieldName: "time",
            format: {
                dateFormat: "short-date-short-time",
                digitSeparator: false
            }
        }
    ]
};

const renderer = new SimpleRenderer({
    type: "simple",
    field: "mag",
    symbol: new SimpleMarkerSymbol({
        type: "simple-marker",
        color: "orange",
        outline: {
            color: "white"
        }
    }),
    visualVariables: [
        new VisualVariable(        {
            type: "size",
            field: "mag",
            stops: [
                {
                    value: 2.5,
                    size: "4px"
                },
                {
                    value: 8,
                    size: "40px"
                }
            ]
        }),
    ]
});