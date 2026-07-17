"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { addProvinces } from "@/config/provincelayer";
import { addRegions } from "@/config/regionlayer";
import { addHospitals } from "@/config/hospitallayer";
import { addTerminals } from "@/config/terminallayer";



export default function Map({ location, setSelectedLocation }) {

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

            zoom:7

        });


        map.addControl(
            new maplibregl.NavigationControl(),
            "top-right"
        );

        
        map.on("load", async() => {


            // await addRegions(map, setSelectedLocation)

            // await addProvinces(map, setSelectedLocation)

            addHospitals(map, setSelectedLocation)

            addTerminals(map, setSelectedLocation)

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