
const MIN_ELEV = 0;
const MAX_ELEV = 1000;

export function addElevation(map) {

    map.addSource("dem", {
        type: "raster-dem",
        tiles: ["https://devcastre.github.io/ph-elevation-tiles/{z}/{x}/{y}.webp"],
        tileSize: 256,
        encoding: "mapbox",
        maxzoom: 12
    });

    map.addLayer({      
        id: "flood",
        type: "color-relief",
        source: "dem",
        paint: {
            "color-relief-color": [
                "interpolate",
                ["linear"],
                ["elevation"],
                MIN_ELEV, "rgba(0,0,0,0)",
                MAX_ELEV, "rgba(0,0,0,0)"
            ]
        }
    });
   

}

export function addSeaLevel(map, meters) {

    const m = Math.max(MIN_ELEV + 1, Math.min(meters, MAX_ELEV - 1));
    map.setPaintProperty("flood", "color-relief-color", [
        "interpolate",
        ["linear"],
        ["elevation"],
        MIN_ELEV, "rgba(35,110,190,0.85)",
        m, "rgba(35,110,190,0.85)",
        m + 0.5, "rgba(0,0,0,0)",
        MAX_ELEV, "rgba(0,0,0,0)"
    ]);

}