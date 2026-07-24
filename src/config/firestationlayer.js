export function addFirestations(map, setSelectedLocation){

    map.addSource("firestations", {
        type: "geojson",
        data: "/data/firestations.geojson"
    });


    map.loadImage("/icons/firestationlocator.png")
        .then((response) => {
            console.log("promise resolved:", response);

            if (!map.hasImage("firestation-icon")) {
                map.addImage("firestation-icon", response.data);
            }

            map.addLayer({
                id: "firestations-points",
                type: "symbol",
                source: "firestations",
                layout: {
                    "icon-image": "firestation-icon",
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


    map.on("click", "firestations-points", (e)=>{

        const properties = e.features[0].properties;


        setSelectedLocation({
            type:"firestation",
            data:properties
        });

    });


    map.on("mouseenter","firestations-points",()=>{
        map.getCanvas().style.cursor="pointer";
    });


    map.on("mouseleave","firestations-points",()=>{
        map.getCanvas().style.cursor="";
    });

}