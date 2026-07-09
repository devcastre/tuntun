

export async function searchLocation(query) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${query},Philippines&format=json&limit=1`
  );

  return res.json();
}