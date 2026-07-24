export function addVolcanoes(map, setSelectedLocation){

    map.addSource("volcanoes", {
        type: "geojson",
        data: "/data/volcanoes.geojson"
    });


    map.loadImage("/icons/volcanolocator.png")
        .then((response) => {
            console.log("promise resolved:", response);

            if (!map.hasImage("volcano-icon")) {
                map.addImage("volcano-icon", response.data);
            }

            map.addLayer({
                id: "volcanoes-points",
                type: "symbol",
                source: "volcanoes",
                layout: {
                    "icon-image": "volcano-icon",
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

        })
        .catch((error) => {
            console.error("loadImage failed:", error);
    });


    map.on("click", "volcanoes-points", (e)=>{

        const properties = e.features[0].properties;

        setSelectedLocation({
            type:"volcano",
            data:properties
        });

    });


    map.on("mouseenter","volcanoes-points",()=>{
        map.getCanvas().style.cursor="pointer";
    });


    map.on("mouseleave","volcanoes-points",()=>{
        map.getCanvas().style.cursor="";
    });

}