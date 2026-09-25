const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function getNearbyPlaces(
    latitude,
    longitude,
    category = "tourism.sights",
    radius = 15000,
    offset = 0
) {
    if (latitude === undefined || longitude === undefined) {
        return [];
    }

    const url =
        `https://api.geoapify.com/v2/places` +
        `?categories=${encodeURIComponent(category)}` +
        `&filter=circle:${longitude},${latitude},${radius}` +
        `&bias=proximity:${longitude},${latitude}` +
        `&limit=30` +
        `&offset=${offset}` +
        `&lang=en` +
        `&apiKey=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not load nearby places");
    }

    const data = await response.json();

    return data.features || [];
}