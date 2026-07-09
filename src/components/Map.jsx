"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";


export default function Map({ location }) {

    const mapContainer = useRef(null);
    const mapRef = useRef(null);


    // Create map once
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


        mapRef.current = map;


        return () => {
            map.remove();
        };


    }, []);



    // Move map when search result changes
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