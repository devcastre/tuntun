

export function addRegions(map){

    map.addSource("regions", {
        type: "geojson",
        data: "/data/regions.json"
    });


    map.addLayer({
        id: "regions-outline",
        type: "line",
        source: "regions",
        paint: {
            "line-color": "#ff0000",
            "line-width": 2
        }
    });

    
    map.addLayer({
        id:"regions-fill",
        type:"fill",
        source:"regions",
        paint:{
            "fill-color":"#0080ff",
            "fill-opacity":0.1
        }
    });

    
    map.on("click", "regions-fill", (e)=>{

        const properties = e.features[0].properties;

        console.log(properties);

    }); 


    map.on("mouseenter","regions-fill",()=>{
        map.getCanvas().style.cursor="pointer";
    });


    map.on("mouseleave","regions-fill",()=>{
        map.getCanvas().style.cursor="";
    }); 


}