"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";


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

            map.addSource("regions", {
                type: "geojson",
                data: "/data/regions.json"
            });

            map.addLayer({
                id: "regions-fill",
                type: "fill",
                source: "regions",
                paint: {
                    "fill-color": "#2563eb",
                    "fill-opacity": 0.1
                }
            });

            map.addLayer({
                id: "regions-outline",
                type: "line",
                source: "regions",
                paint: {
                    "line-color": "#2563eb",
                    "line-width": 2
                }
            });

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