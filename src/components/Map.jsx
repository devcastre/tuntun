"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { addProvinces } from "@/config/provincelayer";
import { addCities } from "@/config/citieslayer";
import { addRegions } from "@/config/regionlayer";


export default function Map({ location }) {

    const mapContainer = useRef(null);
    const mapRef = useRef(null);


   
    useEffect(() => {

        const map = new maplibregl.Map({

            container: mapContainer.current,

            style:
            "https://tiles.openfreemap.org/styles/liberty",

            center:[
                121.7740,
                12.8797
            ],

            zoom:5

        });


        map.addControl(
            new maplibregl.NavigationControl(),
            "top-right"
        );

        
        map.on("load", () => {


            // addRegions(map)

            addProvinces(map)

            // addCities(map)



            
            // map.addSource("barangays", {
            //     type: "geojson",
            //     data: "/data/barangays.json"
            // });

            // map.addLayer({
            //     id: "barangays-outline",
            //     type: "line",
            //     source: "barangays",
            //     paint: {
            //         "line-color": "#63eb25",
            //         "line-width": 0.15
            //     }
            // });               



        });


        mapRef.current = map;


        return () => {
            map.remove();
        };


    }, []);




    useEffect(() => {

        if (!location || !mapRef.current) return;


        mapRef.current.flyTo({

            center:[
                location.lon,
                location.lat
            ],

            zoom:11

        });


    }, [location]);



    return (

        <div
            ref={mapContainer}
            style={{
                width:"100%",
                height:"100vh"
            }}
        />

    );
}