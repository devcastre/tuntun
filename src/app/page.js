'use client'

import Header from "@/components/Header";
import InfoPanel from "@/components/InfoPanel";
import LayerControl from "@/components/LayerControl";
import Map from "@/components/Map";
import { searchLocation } from "@/services/searchCoordinates";
import { useState } from "react";


export default function Home(){

    const [search, setSearch] = useState("");
    const [location,setLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);


    const handleSearch = async()=>{

      const result = await searchLocation(search);

      if(!result.length) return;


      const {lat,lon}=result[0];


      setLocation({
        lat:Number(lat),
        lon:Number(lon)
      });

    };


  return (

    <main className="relative h-screen w-full overflow-hidden">


      <Header
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />




      <div className="h-full w-full bg-blue-100 flex items-center justify-center text-4xl text-gray-500">
        <Map 
          location={location}
          setSelectedLocation={setSelectedLocation}
        />
        <InfoPanel 
            location={selectedLocation}
        />
      </div>


      <LayerControl />


    </main>

  )
}