"use client";

export default function SearchBar({ search, setSearch, onSearch}) {

  return (
    <div className="w-80">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search city or province..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 shadow bg-white"
        />

        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
}