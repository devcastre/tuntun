

export default function SeaLevelController({value, setValue}){

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-lg">
      <input
        type="range"
        min="0"
        max="1000"
        value={value}
        onChange={(e) =>
          setValue(Number(e.target.value))
        }
      />      
    </div>
  );    
}