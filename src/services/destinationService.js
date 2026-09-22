const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function searchDestinations(searchTerm, signal) {
    if (!searchTerm.trim()) {
        return [];
    }

    const url =
        `https://api.geoapify.com/v1/geocode/search` +
        `?text=${encodeURIComponent(searchTerm)}` +
        `&type=city` +
        `&limit=8` +
        `&format=json` +
        `&apiKey=${API_KEY}`;

    const response = await fetch(url, {
        signal
    });

    if (!response.ok) {
        throw new Error("Could not search destinations");
    }

    const data = await response.json();

    return data.results || [];
}