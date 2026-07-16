import { supabase } from "@/lib/supabase";
import * as turf from "@turf/turf";

export async function addProvinces(map, setSelectedLocation) {

    const {data, error} = await supabase
        .rpc('get_provinces_geojson');
    
    if (error) {
        console.error("Failed to fetch provinces:", error);
        return;
    }

    map.addSource("provinces", {
        type: "geojson",
        data: data
    });

    map.addLayer({
        id: "provinces-outline",
        type: "line",
        source: "provinces",
        paint: {
            "line-color": "#0000ff",
            "line-width": 2
        }
    });

    map.addLayer({
        id: "provinces-fill",
        type: "fill",
        source: "provinces",
        paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.1
        }
    });


    const labelPoints = buildProvinceLabelPoints(data, "name");

    map.addSource("province-label-points", {
        type: "geojson",
        data: labelPoints
    });

    map.addLayer({
        id: "province-labels",
        type: "symbol",
        source: "province-label-points",
        layout: {
            "text-field": ["get", "name"],
            "text-font": ["Noto Sans Bold"],
            "text-size": 14,
            "text-allow-overlap": false
        },
        paint: {
            'text-color': "#ff0000"
        }
    });

    map.on("click", "provinces-fill", (e) => {

        const properties = e.features[0].properties;

        console.log("province clicked", properties);


        setSelectedLocation({
            type:"province",
            data:properties
        });

    });

    map.on("mouseenter", "provinces-fill", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "provinces-fill", () => {
        map.getCanvas().style.cursor = "";
    });
    console.log("setSelectedLocation:", setSelectedLocation);
}


function buildProvinceLabelPoints(fc, nameProp) {
    const byName = new Map();

    for (const feature of fc.features) {
        const name = feature.properties?.[nameProp];
        if (!name) continue;

        const area = turf.area(feature);

        const existing = byName.get(name);
        if (!existing || area > existing.area) {
            byName.set(name, { feature, area });
        }
    }

    const labelFeatures = [];
    for (const [name, { feature }] of byName) {
        const point = turf.pointOnFeature(feature);
        point.properties = { ...feature.properties, [nameProp]: name };
        labelFeatures.push(point);
    }

    return {
        type: "FeatureCollection",
        features: labelFeatures
    };
}