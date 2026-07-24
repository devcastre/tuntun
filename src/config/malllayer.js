export function addMalls(map, setSelectedLocation){

    map.addSource("malls", {
        type: "geojson",
        data: "/data/malls.geojson"
    });


    map.loadImage("/icons/malllocator.png")
        .then((response) => {
            console.log("promise resolved:", response);

            if (!map.hasImage("mall-icon")) {
                map.addImage("mall-icon", response.data);
            }

            map.addLayer({
                id: "malls-points",
                type: "symbol",
                source: "malls",
                layout: {
                    "icon-image": "mall-icon",
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


    map.on("click", "malls-points", (e)=>{

        const properties = e.features[0].properties;

        setSelectedLocation({
            type:"mall",
            data:properties
        });

    });


    map.on("mouseenter","malls-points",()=>{
        map.getCanvas().style.cursor="pointer";
    });


    map.on("mouseleave","malls-points",()=>{
        map.getCanvas().style.cursor="";
    });

}