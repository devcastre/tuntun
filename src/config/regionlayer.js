import { supabase } from "@/lib/supabase";


export async function addRegions(map, setSelectedLocation){

    const {data, error} = await supabase
        .rpc('get_regions_geojson')

    if (error) {
        console.error("Failed to fetch regions:", error);
        return;
    }    

    map.addSource("regions", {
        type: "geojson",
        data: data
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

        console.log(properties)
        setSelectedLocation({
            type:"region",
            data:properties
        });

    }); 


    map.on("mouseenter","regions-fill",()=>{
        map.getCanvas().style.cursor="pointer";
    });


    map.on("mouseleave","regions-fill",()=>{
        map.getCanvas().style.cursor="";
    }); 


}