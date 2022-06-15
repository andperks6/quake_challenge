import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

const restUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2012-06-08%2000:00:00&endtime=2022-06-15%2023:59:59&maxlatitude=39.436&minlatitude=32.101&maxlongitude=-115.532&minlongitude=-124.541&minmagnitude=4.5&orderby=time";
export const QuakeLayer = () => {
    return new GeoJSONLayer({
        url: restUrl,
        // url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        copyright: "USGS Earthquakes",
        popupTemplate: template,
        renderer: renderer,
        title: 'Quake layer',
        orderBy: {
            field: "mag"
        }
    })
}

const template = {
    title: "Earthquake Info",
    content: "Magnitude {mag} {type} hit {place} on {time}",
    fieldInfos: [
        {
            fieldName: "time",
            format: {
                dateFormat: "short-date-short-time"
            }
        }
    ]
};

const renderer = {
    type: "simple",
    field: "mag",
    symbol: {
        // symbol type required for rendering point geometries
        type: "point-3d", // autocasts as new PointSymbol3D()
        symbolLayers: [
            {
                type: "object",
                resource: { primitive: "cone" }, // renders points as cones
                width: 50000
            }
        ]
    },
    visualVariables: [
        // {
        //     type: "color",
        //     field: "PRESSURE", // field containing data for atmospheric pressure
        //     stops: [{ value: 950, color: "red" }, { value: 1020, color: "blue" }]
        // },
        {
            type: "size",
            field: "mag",
            stops: [{ value: 2, size: 60000 }, { value: 9, size: 500000 }],
            axis: "height"
        },
        {
            type: "size",
            axis: "width-and-depth",
            useSymbolValue: true // uses the width value defined in the symbol layer (50,000)
        }
    ]
};
// const renderer = {
//     type: "simple",
//     field: "mag",
//     symbol: {
//         type: "simple-marker",
//         color: "red",
//         outline: {
//             color: "white"
//         }
//     },
//     visualVariables: [
//         {
//             type: "size",
//             field: "mag",
//             stops: [
//                 {
//                     value: 2,
//                     size: "5px"
//                 },
//                 {
//                     value: 9,
//                     size: "40px"
//                 }
//             ]
//         }
//     ]
// };