import Header from "@/components/Header";
import LayerControl from "@/components/LayerControl";
import Map from "@/components/Map";


export default function Home(){

  return (

    <main className="relative h-screen w-full overflow-hidden">


      <Header />


      <div className="h-full w-full bg-blue-100 flex items-center justify-center text-4xl text-gray-500">
        <Map />
      </div>


      <LayerControl />


    </main>

  )
}