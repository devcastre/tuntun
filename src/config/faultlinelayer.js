

export function addFaultlines(map) {

    map.addSource("faultlines", {
        type: "geojson",
        data: "/data/active_faults.geojson"
    });


    map.addLayer({
        id: "faultlines-outline",
        type: "line",
        source: "faultlines",
        paint: {
            "line-color": "#ff0000",
            "line-width": 2
        }
    });

}