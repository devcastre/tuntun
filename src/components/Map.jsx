"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { addProvinces } from "@/config/provincelayer";
import { addRegions } from "@/config/regionlayer";
import { addHospitals } from "@/config/hospitallayer";
import { addTerminals } from "@/config/terminallayer";
import { addFaultlines } from "@/config/faultlinelayer";
import { addElevation, addSeaLevel } from "@/config/elevation";
import { addFirestations } from "@/config/firestationlayer";
import { addMalls } from "@/config/malllayer";
import { addVolcanoes } from "@/config/volcanolayer";



export default function Map({ searchedLocation, setSelectedLocation, seaLevel }) {

    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const mapLoaded = useRef(false);


   
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

            mapLoaded.current = true;

            // await addRegions(map, setSelectedLocation)

            // await addProvinces(map, setSelectedLocation)

            // addHospitals(map, setSelectedLocation)

            // addTerminals(map, setSelectedLocation)

            // addFaultlines(map)

            // addElevation(map)

            // addSeaLevel(map, seaLevel);

            // addFirestations(map, setSelectedLocation)

            // addMalls(map, setSelectedLocation)

            addVolcanoes(map, setSelectedLocation)

        });


        mapRef.current = map;


        return () => {
            map.remove();
        };


    }, []);



    useEffect(() => {

        if (!searchedLocation || !mapRef.current) return;


        mapRef.current.flyTo({

            center:[
                searchedLocation.lon,
                searchedLocation.lat
            ],
            zoom:11
        });

    }, [searchedLocation]);


    useEffect(() => {

        if (!mapRef.current) return;

        if (!mapLoaded.current) return;

        addSeaLevel(
            mapRef.current,
            seaLevel
        );

    }, [seaLevel]);




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