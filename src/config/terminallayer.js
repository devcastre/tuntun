export function addTerminals(map, setSelectedLocation){

    map.addSource("terminals", {
        type: "geojson",
        data: "/data/terminals.geojson"
    });


    map.loadImage("/icons/terminallocator.png")
        .then((response) => {
            console.log("promise resolved:", response);

            if (!map.hasImage("terminal-icon")) {
                map.addImage("terminal-icon", response.data);
            }

            map.addLayer({
                id: "terminals-points",
                type: "symbol",
                source: "terminals",
                layout: {
                    "icon-image": "terminal-icon",
                    "icon-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5, 0.025,    
                    10, 0.05,   
                    15, 0.075,   
                    20, 0.1    
                ],
                    "icon-allow-overlap": true
                }
            });

            console.log("layer added?", map.getLayer("terminals-points"));
        })
        .catch((error) => {
            console.error("loadImage failed:", error);
    });


    map.on("click", "terminals-points", (e)=>{

        const properties = e.features[0].properties;

        console.log(properties);

        setSelectedLocation({
            type:"terminal",
            data:properties
        });

    });


    map.on("mouseenter","terminals-points",()=>{
        map.getCanvas().style.cursor="pointer";
    });


    map.on("mouseleave","terminals-points",()=>{
        map.getCanvas().style.cursor="";
    });

}