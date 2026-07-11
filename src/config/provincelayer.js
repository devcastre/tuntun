import * as turf from "@turf/turf";

export async function addProvinces(map) {


    const res = await fetch("/data/provinces_filtered.json");
    const provincesData = await res.json();

    map.addSource("provinces", {
        type: "geojson",
        data: provincesData
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


    const labelPoints = buildProvinceLabelPoints(provincesData, "adm2_name");

    map.addSource("province-label-points", {
        type: "geojson",
        data: labelPoints
    });

    map.addLayer({
        id: "province-labels",
        type: "symbol",
        source: "province-label-points",
        layout: {
            "text-field": ["get", "adm2_name"],
            "text-font": ["Noto Sans Regular"],
            "text-size": 14,
            "text-allow-overlap": false
        }
    });

    map.on("click", "provinces-fill", (e) => {
        const properties = e.features[0].properties;
        console.log(properties);
    });

    map.on("mouseenter", "provinces-fill", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "provinces-fill", () => {
        map.getCanvas().style.cursor = "";
    });
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