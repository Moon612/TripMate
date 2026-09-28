const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

const categoryDestinations = {
    Beaches: [
        "Goa, India",
        "Port Blair, India",
        "Kavaratti, India",
        "Puri, India",
        "Kovalam, India",
        "Gokarna, India",
        "Alappuzha, India",
        "Chennai, India"
    ],

    Mountains: [
        "Manali, India",
        "Shimla, India",
        "Leh, India",
        "Mussoorie, India",
        "Nainital, India",
        "Darjeeling, India",
        "Gangtok, India",
        "Gulmarg, India"
    ],

    Culture: [
        "Jaipur, India",
        "Agra, India",
        "Varanasi, India",
        "Hampi, India",
        "Khajuraho, India",
        "Mysuru, India",
        "Delhi, India",
        "Amritsar, India"
    ],

    Food: [
        "Lucknow, India",
        "Hyderabad, India",
        "Kolkata, India",
        "Mumbai, India",
        "Delhi, India",
        "Amritsar, India",
        "Indore, India",
        "Chennai, India"
    ],

    Cities: [
        "Mumbai, India",
        "Delhi, India",
        "Bengaluru, India",
        "Hyderabad, India",
        "Chennai, India",
        "Kolkata, India",
        "Pune, India",
        "Jaipur, India"
    ],

    Nature: [
        "Munnar, India",
        "Coorg, India",
        "Shillong, India",
        "Kaziranga, India",
        "Wayanad, India",
        "Ranthambore, India",
        "Ooty, India",
        "Alappuzha, India"
    ],

    Adventure: [
        "Rishikesh, India",
        "Manali, India",
        "Leh, India",
        "Auli, India",
        "Bir, India",
        "Goa, India",
        "Port Blair, India",
        "Shillong, India"
    ]
};

const categoryImages = {
    Beaches: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1473116763249-561732d1e306?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80"
    ],

    Mountains: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=900&q=80"
    ],

    Culture: [
        "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c42a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80"
    ],

    Food: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80"
    ],

    Cities: [
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=900&q=80"
    ],

    Nature: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80"
    ],

    Adventure: [
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80"
    ]
};

export async function searchDestinations(searchTerm, signal) {
    if (!searchTerm.trim()) {
        return [];
    }

    const url =
        `https://api.geoapify.com/v1/geocode/search` +
        `?text=${encodeURIComponent(searchTerm + ", India")}` +
        `&type=city` +
        `&filter=countrycode:in` +
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

export async function searchDestinationsByCategory(category, signal) {
    const destinations = categoryDestinations[category];

    if (!destinations) {
        return [];
    }

    const images =
        categoryImages[category] || categoryImages.Nature;

    const results = await Promise.all(
        destinations.map(async (destination, index) => {
            const url =
                `https://api.geoapify.com/v1/geocode/search` +
                `?text=${encodeURIComponent(destination)}` +
                `&type=city` +
                `&filter=countrycode:in` +
                `&limit=1` +
                `&format=json` +
                `&apiKey=${API_KEY}`;

            const response = await fetch(url, {
                signal
            });

            if (!response.ok) {
                throw new Error(
                    "Could not load destinations for this category"
                );
            }

            const data = await response.json();
            const place = data.results?.[0];

            if (!place) {
                return null;
            }

            const location = [
                place.state,
                place.country
            ]
                .filter(Boolean)
                .join(", ");

            return {
                ...place,
                id:
                    place.place_id ||
                    `${place.city || place.name}-${index}`,
                name:
                    place.city ||
                    place.name ||
                    destination.replace(", India", ""),
                country: location || "India",
                places:
                    place.address_line1 ||
                    place.city ||
                    "Explore this destination",
                rating: "—",
                category,
                images: [
                    images[index % images.length]
                ]
            };
        })
    );

    return results.filter(Boolean);
}