"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";


export default function Map() {

    const mapContainer = useRef(null);

    useEffect(() => {

        const map = new maplibregl.Map({

            container: mapContainer.current,

            style:
            "https://tiles.openfreemap.org/styles/liberty",

            center: [
                121.7740,
                12.8797
            ],

            zoom: 5

        });


        map.addControl(
            new maplibregl.NavigationControl(),
            "top-right"
        );


        return () => {
            map.remove();
        };


    }, []);


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