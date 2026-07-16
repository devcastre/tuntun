export function addHospitals(map, setSelectedLocation){

    map.addSource("hospitals", {
        type: "geojson",
        data: "/data/hospitals.geojson"
    });


    map.loadImage("/icons/hospitallocator.png")
        .then((response) => {
            console.log("promise resolved:", response);

            if (!map.hasImage("hospital-icon")) {
                map.addImage("hospital-icon", response.data);
            }

            map.addLayer({
                id: "hospitals-points",
                type: "symbol",
                source: "hospitals",
                layout: {
                    "icon-image": "hospital-icon",
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

            console.log("layer added?", map.getLayer("hospitals-points"));
        })
        .catch((error) => {
            console.error("loadImage failed:", error);
    });


    map.on("click", "hospitals-points", (e)=>{

        const properties = e.features[0].properties;

        console.log(properties);

        setSelectedLocation({
            type:"hospital",
            data:properties
        });

    });


    map.on("mouseenter","hospitals-points",()=>{
        map.getCanvas().style.cursor="pointer";
    });


    map.on("mouseleave","hospitals-points",()=>{
        map.getCanvas().style.cursor="";
    });

}