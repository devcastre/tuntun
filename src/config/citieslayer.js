

export function addCities(map){

    map.addSource("cities", {
        type: "geojson",
        data: "/data/cities.json"
    });


    map.addLayer({
        id: "cities-outline",
        type: "line",
        source: "cities",
        paint: {
            "line-color": "#ff00ff",
            "line-width": 2
        }
    });

    
    map.addLayer({
        id:"cities-fill",
        type:"fill",
        source:"cities",
        paint:{
            "fill-color":"#0080ff",
            "fill-opacity":0.1
        }
    });

    
    map.on("click", "cities-fill", (e)=>{

        const properties = e.features[0].properties;

        console.log(properties);

    }); 


    map.on("mouseenter","cities-fill",()=>{
        map.getCanvas().style.cursor="pointer";
    });


    map.on("mouseleave","cities-fill",()=>{
        map.getCanvas().style.cursor="";
    }); 


}