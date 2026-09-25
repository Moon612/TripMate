import { useEffect, useState } from "react";
import { getNearbyPlaces } from "../services/placeService";
import "./NearbyPlaces.css";

const categories = [
    {
        label: "Things to Do",
        value: "things-to-do"
    },
    {
        label: "Food",
        value: "catering.restaurant"
    },
    {
        label: "Cafes",
        value: "catering.cafe"
    }
];

const touristCategories = [
    "tourism.sights",
    "tourism.attraction",
    "entertainment.museum"
];

const touristOffsets = [0, 30, 60];

function NearbyPlaces({ trip, tripDays, onAddPlace }) {
    const [selectedCategory, setSelectedCategory] =
        useState("things-to-do");

    const [selectedDay, setSelectedDay] = useState("");

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (tripDays.length > 0 && !selectedDay) {
            setSelectedDay(tripDays[0].date);
        }
    }, [tripDays, selectedDay]);

    useEffect(() => {
        const loadPlaces = async () => {
            if (
                trip?.latitude === undefined ||
                trip?.longitude === undefined ||
                trip?.latitude === null ||
                trip?.longitude === null
            ) {
                setPlaces([]);
                return;
            }

            setLoading(true);
            setError("");

            try {
                let results = [];

                if (selectedCategory === "things-to-do") {
                    /*
                     * Search several pages from different tourist
                     * categories so the first 30 nearby places
                     * don't decide the whole list.
                     */
                    const requests =
                        touristCategories.flatMap(
                            (category) =>
                                touristOffsets.map(
                                    (offset) =>
                                        getNearbyPlaces(
                                            trip.latitude,
                                            trip.longitude,
                                            category,
                                            15000,
                                            offset
                                        )
                                )
                        );

                    const responses =
                        await Promise.all(requests);

                    results = responses.flat();
                } else {
                    results = await getNearbyPlaces(
                        trip.latitude,
                        trip.longitude,
                        selectedCategory,
                        15000,
                        0
                    );
                }

                /*
                 * Remove places that don't have a proper name.
                 */
                const namedPlaces = results.filter(
                    (place) =>
                        place.properties?.name &&
                        place.properties.name.trim()
                );

                /*
                 * Remove duplicate places.
                 */
                const uniquePlaces = [];
                const seenPlaces = new Set();

                namedPlaces.forEach((place) => {
                    const properties =
                        place.properties || {};

                    const placeId =
                        properties.place_id ||
                        `${properties.name}-${properties.lat}-${properties.lon}`;

                    if (!seenPlaces.has(placeId)) {
                        seenPlaces.add(placeId);
                        uniquePlaces.push(place);
                    }
                });

                let finalPlaces = uniquePlaces;

                if (
                    selectedCategory ===
                    "things-to-do"
                ) {
                    /*
                     * Rank tourist places.
                     *
                     * The score gives more importance to major
                     * tourist attractions, monuments, forts,
                     * museums and historical places.
                     */
                    finalPlaces = [
                        ...uniquePlaces
                    ].sort((a, b) => {
                        const scoreA =
                            getTouristScore(a);

                        const scoreB =
                            getTouristScore(b);

                        if (scoreA !== scoreB) {
                            return scoreB - scoreA;
                        }

                        const distanceA =
                            a.properties?.distance ||
                            Infinity;

                        const distanceB =
                            b.properties?.distance ||
                            Infinity;

                        return (
                            distanceA - distanceB
                        );
                    });
                } else {
                    /*
                     * Restaurants and cafes are sorted
                     * by distance.
                     */
                    finalPlaces = [
                        ...uniquePlaces
                    ].sort((a, b) => {
                        const distanceA =
                            a.properties?.distance ||
                            Infinity;

                        const distanceB =
                            b.properties?.distance ||
                            Infinity;

                        return (
                            distanceA - distanceB
                        );
                    });
                }

                /*
                 * Only show the 10 most useful places.
                 */
                setPlaces(
                    finalPlaces.slice(0, 10)
                );
            } catch (error) {
                console.error(
                    "Failed to load nearby places:",
                    error
                );

                setPlaces([]);

                setError(
                    "Unable to load nearby places right now."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPlaces();
    }, [trip, selectedCategory]);

    const getPlaceName = (place) => {
        return place.properties?.name || "";
    };

    const getPlaceAddress = (place) => {
        const properties =
            place.properties || {};

        return (
            properties.formatted ||
            properties.address_line1 ||
            properties.address_line2 ||
            "Location unavailable"
        );
    };

    const getPlaceDistance = (place) => {
        const distance =
            place.properties?.distance;

        if (distance === undefined) {
            return "";
        }

        if (distance >= 1000) {
            return `${(
                distance / 1000
            ).toFixed(1)} km away`;
        }

        return `${Math.round(
            distance
        )} m away`;
    };

    const handleAddPlace = (place) => {
        if (!selectedDay) {
            return;
        }

        const properties =
            place.properties || {};

        if (
            properties.lat === undefined ||
            properties.lon === undefined
        ) {
            return;
        }

        const selectedPlace = {
            title: getPlaceName(place),

            location:
                getPlaceAddress(place),

            latitude: properties.lat,

            longitude: properties.lon,

            type:
                selectedCategory ===
                "things-to-do"
                    ? "Sightseeing"
                    : "Food",

            date: selectedDay
        };

        onAddPlace(selectedPlace);
    };

    if (
        trip?.latitude === undefined ||
        trip?.longitude === undefined ||
        trip?.latitude === null ||
        trip?.longitude === null
    ) {
        return (
            <section className="nearby-places">
                <div className="nearby-message">
                    <span>📍</span>

                    <p>
                        Nearby places are
                        unavailable because this
                        trip does not have
                        destination coordinates.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="nearby-places">
            <div className="nearby-places-header">
                <div>
                    <span className="section-label">
                        DISCOVER NEARBY
                    </span>

                    <h2>Places to visit</h2>

                    <p>
                        Find places around{" "}
                        {trip.destination} and
                        add them to your
                        itinerary.
                    </p>
                </div>
            </div>

            {tripDays.length > 0 && (
                <div className="nearby-day-selector">
                    <label htmlFor="nearby-day">
                        Add to
                    </label>

                    <select
                        id="nearby-day"
                        value={selectedDay}
                        onChange={(event) =>
                            setSelectedDay(
                                event.target.value
                            )
                        }
                    >
                        {tripDays.map((day) => (
                            <option
                                key={day.date}
                                value={day.date}
                            >
                                Day{" "}
                                {day.dayNumber} —{" "}
                                {day.displayDate.toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "numeric"
                                    }
                                )}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="nearby-category-list">
                {categories.map(
                    (category) => (
                        <button
                            key={
                                category.value
                            }
                            type="button"
                            className={
                                selectedCategory ===
                                category.value
                                    ? "nearby-category active"
                                    : "nearby-category"
                            }
                            onClick={() =>
                                setSelectedCategory(
                                    category.value
                                )
                            }
                        >
                            {category.label}
                        </button>
                    )
                )}
            </div>

            {loading && (
                <div className="nearby-message">
                    <span>⌕</span>

                    <p>
                        Finding places near{" "}
                        {trip.destination}...
                    </p>
                </div>
            )}

            {!loading && error && (
                <div className="nearby-message">
                    <span>!</span>

                    <p>{error}</p>
                </div>
            )}

            {!loading &&
                !error &&
                places.length === 0 && (
                    <div className="nearby-message">
                        <span>📍</span>

                        <p>
                            No named places
                            were found nearby.
                        </p>
                    </div>
                )}

            {!loading &&
                !error &&
                places.length > 0 && (
                    <div className="nearby-place-list">
                        {places.map(
                            (
                                place,
                                index
                            ) => (
                                <div
                                    className="nearby-place-card"
                                    key={
                                        place
                                            .properties
                                            ?.place_id ||
                                        `${place.properties?.lat}-${place.properties?.lon}-${index}`
                                    }
                                >
                                    <div className="nearby-place-icon">
                                        📍
                                    </div>

                                    <div className="nearby-place-info">
                                        <h3>
                                            {getPlaceName(
                                                place
                                            )}
                                        </h3>

                                        <p>
                                            {getPlaceAddress(
                                                place
                                            )}
                                        </p>

                                        {getPlaceDistance(
                                            place
                                        ) && (
                                            <span>
                                                {getPlaceDistance(
                                                    place
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="nearby-add-button"
                                        onClick={() =>
                                            handleAddPlace(
                                                place
                                            )
                                        }
                                        disabled={
                                            !selectedDay
                                        }
                                    >
                                        + Add to
                                        Itinerary
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                )}
        </section>
    );
}

function getTouristScore(place) {
    const categories =
        place.properties?.categories ||
        [];

    let score = 0;

    categories.forEach((category) => {
        /*
         * Major general attractions.
         */
        if (
            category ===
            "tourism.attraction"
        ) {
            score += 10;
        }

        /*
         * General tourist sights.
         */
        if (
            category === "tourism.sights"
        ) {
            score += 5;
        }

        /*
         * Major monuments.
         */
        if (
            category.includes(
                "tourism.sights.memorial.monument"
            )
        ) {
            score += 8;
        }

        /*
         * Archaeological sites.
         */
        if (
            category.includes(
                "tourism.sights.archaeological_site"
            )
        ) {
            score += 8;
        }

        /*
         * Forts and castles.
         */
        if (
            category.includes(
                "tourism.sights.fort"
            )
        ) {
            score += 9;
        }

        if (
            category.includes(
                "tourism.sights.castle"
            )
        ) {
            score += 9;
        }

        /*
         * Museums.
         */
        if (
            category.includes(
                "entertainment.museum"
            )
        ) {
            score += 7;
        }

        /*
         * Temples and religious attractions.
         */
        if (
            category.includes(
                "place_of_worship.temple"
            )
        ) {
            score += 8;
        }

        /*
         * Viewpoints.
         */
        if (
            category.includes(
                "tourism.attraction.viewpoint"
            )
        ) {
            score += 7;
        }

        /*
         * Artwork and statues are useful,
         * but should not dominate the list.
         */
        if (
            category.includes(
                "tourism.attraction.artwork"
            )
        ) {
            score += 2;
        }

        /*
         * Generic buildings get a small penalty.
         */
        if (category === "building") {
            score -= 2;
        }

        /*
         * Individual graves/tombs should be
         * lower priority than major attractions.
         */
        if (
            category.includes(
                "tourism.sights.memorial.tomb"
            )
        ) {
            score -= 4;
        }
    });

    return score;
}

export default NearbyPlaces;