const layers=[

"⛰ Elevation",
"⚡ Fault Lines",
"🌋 Volcanoes",
"🌊 Rivers",
"💧 Lakes"

]


export default function LayerControl(){


return (

<div className="absolute right-6 bottom-10 z-10 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-lg">
    {
        layers.map(layer=>(

            <button key={layer} className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition">
                {layer}
            </button>

    ))
    }

</div>

)

}