import SearchBar from "./SearchBar";

export default function Header({ search, setSearch, onSearch}){

return (

<header className="absolute top-5 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-4xl flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-lg">


    <h1 className="font-bold text-xl">
        Tuntun
    </h1>

    <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={onSearch}
    />



</header>

)

}