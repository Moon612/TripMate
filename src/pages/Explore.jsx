import { useEffect, useState,useRef } from "react";

import { useNavigate } from "react-router-dom";

import "./Explore.css";

import {

    searchDestinations,

    searchDestinationsByCategory

} from "../services/destinationService";

const categories = [

    { name: "All", icon: "🌎" },

    { name: "Beaches", icon: "🏖️" },

    { name: "Mountains", icon: "🏔️" },

    { name: "Culture", icon: "🏛️" },

    { name: "Food", icon: "🍜" },

    { name: "Cities", icon: "🌆" },

    { name: "Nature", icon: "🌿" },

    { name: "Adventure", icon: "🎒" }

];

const featuredDestinationImages = {
    mumbai: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1800&q=85",
    delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1800&q=85",
    bengaluru: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1800&q=85",
    bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1800&q=85",
    hyderabad: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1800&q=85",
    chennai: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1800&q=85",
    kolkata: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1800&q=85",
    pune: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1800&q=85",
    jaipur: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1800&q=85"
};

const getFeaturedImage = (destination) => {
    const name = String(destination?.name || "").trim().toLowerCase();
    return featuredDestinationImages[name] || destination?.images?.[0] || "";
};

const preloadImage = async (url) => {
    if (!url) return false;

    const image = new Image();
    image.src = url;

    try {
        if (typeof image.decode === "function") {
            await image.decode();
        } else {
            await new Promise((resolve, reject) => {
                image.onload = resolve;
                image.onerror = reject;
            });
        }
        return true;
    } catch {
        return image.complete && image.naturalWidth > 0;
    }
};

function Explore() {

    const destinationGridRef = useRef(null);

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [categoryDestinations, setCategoryDestinations] = useState([]);

    const [categoryLoading, setCategoryLoading] = useState(false);

    const [categoryError, setCategoryError] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    const [suggestions, setSuggestions] = useState([]);

    const [hasSearched, setHasSearched] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [showSuggestions, setShowSuggestions] = useState(false);

    const[selectedDestination, setSelectedDestination] = useState(null);

    const[currentImageIndex, setCurrentImageIndex] =useState(0);

    const [showAllDestinations, setShowAllDestinations] = useState(false);
    const [popularDestinations, setPopularDestinations] = useState([]);
    const [popularLoading, setPopularLoading] = useState(true);
    const [popularError, setPopularError] = useState("");
    const [dailyFeaturedDestinations, setDailyFeaturedDestinations] = useState([]);
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [previousFeaturedDestination, setPreviousFeaturedDestination] = useState(null);
    const featuredIndexRef = useRef(0);

    useEffect(() => {
        const controller = new AbortController();

        const loadPopularDestinations = async () => {
            try {
                setPopularLoading(true);
                setPopularError("");

                // Load the popular city cards from the existing destination service.
                const results = await searchDestinationsByCategory(
                    "Cities",
                    controller.signal
                );

                const uniqueDestinations = [];
                const seenNames = new Set();

                results.forEach((destination) => {
                    const key = (destination.name || "")
                        .trim()
                        .toLowerCase();

                    if (key && !seenNames.has(key)) {
                        seenNames.add(key);
                        uniqueDestinations.push(destination);
                    }
                });

                setPopularDestinations(uniqueDestinations.slice(0, 12));
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to load popular destinations:", error);
                    setPopularError("Unable to load popular destinations right now.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setPopularLoading(false);
                }
            }
        };

        loadPopularDestinations();

        return () => controller.abort();
    }, []);

    // Pick a consistent group of up to six featured destinations for the current day.
    useEffect(() => {
        if (!popularDestinations.length) {
            setDailyFeaturedDestinations([]);
            setFeaturedIndex(0);
            featuredIndexRef.current = 0;
            setPreviousFeaturedDestination(null);
            return;
        }

        const today = new Date();
        const dayNumber = Math.floor(
            Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) /
                86400000
        );
        const count = Math.min(6, popularDestinations.length);
        const startIndex = dayNumber % popularDestinations.length;
        const dailySelection = Array.from({ length: count }, (_, index) =>
            popularDestinations[(startIndex + index) % popularDestinations.length]
        );
        let cancelled = false;

        // Decode the first featured image before showing its name or image.
        const firstImageUrl = getFeaturedImage(dailySelection[0]);
        preloadImage(firstImageUrl).finally(() => {
            if (cancelled) return;
            setDailyFeaturedDestinations(dailySelection);
            setFeaturedIndex(0);
            featuredIndexRef.current = 0;
            setPreviousFeaturedDestination(null);
        });

        // Preload and decode the remaining images before their rotation turn.
        dailySelection.slice(1).forEach((destination) => {
            void preloadImage(getFeaturedImage(destination));
        });

        return () => {
            cancelled = true;
        };
    }, [popularDestinations]);

    // Preload each next image, then crossfade only after it is ready.
    useEffect(() => {
        if (dailyFeaturedDestinations.length < 2) {
            return;
        }

        let cancelled = false;
        let transitionTimeout;
        let transitionPending = false;

        const interval = setInterval(async () => {
            if (transitionPending) return;
            transitionPending = true;

            const currentIndex = featuredIndexRef.current;
            const nextIndex = (currentIndex + 1) % dailyFeaturedDestinations.length;
            const nextDestination = dailyFeaturedDestinations[nextIndex];
            const nextImageUrl = getFeaturedImage(nextDestination);

            // Wait for the next image to be decoded before changing image or text.
            await preloadImage(nextImageUrl);
            if (cancelled) return;

            setPreviousFeaturedDestination(
                dailyFeaturedDestinations[currentIndex] || null
            );
            featuredIndexRef.current = nextIndex;
            setFeaturedIndex(nextIndex);
            transitionTimeout = setTimeout(() => {
                setPreviousFeaturedDestination(null);
                transitionPending = false;
            }, 850);
        }, 6000);

        return () => {
            cancelled = true;
            clearInterval(interval);
            clearTimeout(transitionTimeout);
        };
    }, [dailyFeaturedDestinations]);

    /*
     * This runs while the user is typing.

     * We wait 500ms before making the API request so that

     * we don't send a request for every single key press.

     */

    useEffect(() => {

        const value = searchTerm.trim();

        if (value.length < 2 || hasSearched) {

            setSuggestions([]);

            setShowSuggestions(false);

            return;

        }

        const controller = new AbortController();

        const timer = setTimeout(async () => {

            try {

                setLoading(true);

                const results = await searchDestinations(

                    value,

                    controller.signal

                );

                setSuggestions(results);

                setShowSuggestions(true);

            } catch (error) {

                if (error.name !== "AbortError") {

                    console.error(

                        "Autocomplete search failed:",

                        error

                    );

                    setSuggestions([]);

                }

            } finally {

                setLoading(false);

            }

        }, 500);

        return () => {

            clearTimeout(timer);

            controller.abort();

        };

    }, [searchTerm, hasSearched]);

    useEffect(() => {

        if (selectedCategory === "All") {

            setCategoryDestinations([]);

            setCategoryError("");

            return;

        }

        const controller = new AbortController();

        const loadCategoryDestinations = async () => {

            try {

                setCategoryLoading(true);

                setCategoryError("");

                const results = await searchDestinationsByCategory(

                    selectedCategory,

                    controller.signal

                );

                setCategoryDestinations(results);

            } catch (error) {

                if (error.name !== "AbortError") {

                    console.error(

                        "Category destination search failed:",

                        error

                    );

                    setCategoryDestinations([]);

                    setCategoryError(

                        "Unable to load destinations for this category."

                    );

                }

            } finally {

                if (!controller.signal.aborted) {

                    setCategoryLoading(false);

                }

            }

        };

        loadCategoryDestinations();

        return () => {

            controller.abort();

        };

    }, [selectedCategory]);

    const filteredDestinations =

        selectedCategory === "All"

            ? popularDestinations

            : categoryDestinations;

    const featuredDestination = dailyFeaturedDestinations[featuredIndex] || null;

    const handleSearch = async (value = searchTerm) => {

        const searchValue = value.trim();

        if (!searchValue) {

            return;

        }

        try {

            setLoading(true);

            setError("");

            setShowSuggestions(false);

            setSuggestions([]);

            setHasSearched(true);

            const results = await searchDestinations(searchValue);

            setSearchResults(results);

        } catch (error) {

            console.error("Destination search failed:", error);

            setSearchResults([]);

            setError(

                "Unable to search destinations right now."

            );

        } finally {

            setLoading(false);

        }

    };

    const handleSuggestionClick = (destination) => {

        const destinationName =

            destination.city ||

            destination.name ||

            destination.address_line1 ||

            searchTerm;

        setSearchTerm(destinationName);

        setSearchResults([destination]);

        setHasSearched(true);

        setShowSuggestions(false);

        setSuggestions([]);

        setError("");

    };

    const handleCategoryClick = (category) => {

        setSelectedCategory(category);

        setCategoryError("");

        setCategoryDestinations([]);

        setSearchTerm("");

        setSearchResults([]);

        setSuggestions([]);

        setHasSearched(false);

        setShowSuggestions(false);

        setError("");

        setShowAllDestinations(false);

    };

    const clearSearch = () => {

        setSearchTerm("");

        setSearchResults([]);

        setSuggestions([]);

        setHasSearched(false);

        setShowSuggestions(false);

        setError("");

        setSelectedCategory("All");

    };

    const getDestinationName = (destination) => {

        return (

            destination.city ||

            destination.name ||

            destination.address_line1 ||

            "Unknown destination"

        );

    };

    const getDestinationLocation = (destination) => {

        const parts = [];

        if (destination.state) {

            parts.push(destination.state);

        }

        if (destination.country) {

            parts.push(destination.country);

        }

        return parts.join(", ");

    };

    const handleAddToTrip = (destination) => {

        navigate("/trips/new", {

            state: {

                destination: destination

            }

        });

    };

    const handleDestinationClick = (destination) => {

        setSelectedDestination(destination);

        setCurrentImageIndex(0);

    };

    const closeDestinationPreview = () => {

        setSelectedDestination(null);

    }

    useEffect(() => {

        if (!selectedDestination) {

            return;

        }

        const images = selectedDestination.images || [];

        if (images.length <= 1) {

            return;

        }

        const timer = setInterval(() => {

            setCurrentImageIndex((currentIndex) => {

                return (currentIndex + 1) % images.length;

            });

        }, 3000);

        return () => {

            clearInterval(timer);

        };

    }, [selectedDestination]);

    const scrollDestinations = (direction) => {

        const container = destinationGridRef.current;

        if (!container) return;

        container.scrollBy({

            left: direction * container.clientWidth,

            behavior: "smooth"

        });

    };

return (

        <div className="explore-page">

            {/* Hero / Search */}

            <section className="explore-hero">

                <div className="explore-hero-content">

                    <p className="explore-label">

                        DISCOVER • EXPLORE • TRAVEL

                    </p>

                    <h1>

                        Discover your next<span> adventure.</span>

                    </h1>

                    <p className="explore-hero-text">

                        Find inspiring destinations, beautiful places

                        and experiences for your next journey.

                    </p>

                    <div className="explore-search-wrapper">

                        <div className="explore-search">

                            <span className="search-icon">

                                ⌕

                            </span>

                            <input

                                type="text"

                                placeholder="Search destinations, cities or places..."

                                value={searchTerm}

                                onChange={(event) => {

                                    setSearchTerm(

                                        event.target.value

                                    );

                                    setHasSearched(false);

                                    setSearchResults([]);

                                    setError("");

                                }}

                                onFocus={() => {

                                    if (

                                        suggestions.length > 0

                                    ) {

                                        setShowSuggestions(true);

                                    }

                                }}

                                onKeyDown={(event) => {

                                    if (

                                        event.key === "Enter"

                                    ) {

                                        handleSearch();

                                    }

                                    if (

                                        event.key === "Escape"

                                    ) {

                                        setShowSuggestions(false);

                                    }

                                }}

                            />

                            <button

                                onClick={() => handleSearch()}

                                disabled={

                                    loading &&

                                    searchTerm.length >= 2

                                }

                            >

                                {loading && hasSearched

                                    ? "Searching..."

                                    : "Search"}

                            </button>

                        </div>

                        {/* Autocomplete suggestions */}

                        {showSuggestions &&

                            suggestions.length > 0 && (

                                <div className="autocomplete-dropdown">

                                    {suggestions.map(

                                        (destination) => (

                                            <button

                                                key={

                                                    destination.place_id ||

                                                    `${destination.lat}-${destination.lon}`

                                                }

                                                className="autocomplete-item"

                                                onClick={() =>

                                                    handleSuggestionClick(

                                                        destination

                                                    )

                                                }

                                            >

                                                <span className="autocomplete-icon">

                                                    📍

                                                </span>

                                                <span className="autocomplete-text">

                                                    <strong>

                                                        {getDestinationName(

                                                            destination

                                                        )}

                                                    </strong>

                                                    <small>

                                                        {getDestinationLocation(

                                                            destination

                                                        )}

                                                    </small>

                                                </span>

                                            </button>

                                        )

                                    )}

                                </div>

                            )}

                    </div>

                    {/* Popular searches */}

                    <div className="popular-searches">

                        <span>Popular:</span>

                        <button

                            onClick={() => {

                                setSearchTerm("Jaipur");

                                handleSearch("Jaipur");

                            }}

                        >

                            Jaipur

                        </button>

                        <button

                            onClick={() => {

                                setSearchTerm("Manali");

                                handleSearch("Manali");

                            }}

                        >

                            Manali

                        </button>

                        <button

                            onClick={() => {

                                setSearchTerm("Mumbai");

                                handleSearch("Mumbai");

                            }}

                        >

                            Mumbai

                        </button>

                        <button

                            onClick={() => {

                                setSearchTerm("Varanasi");

                                handleSearch("Varanasi");

                            }}

                        >

                            Varanasi

                        </button>

                        <button

                            onClick={() => {

                                setSearchTerm("Bengaluru");

                                handleSearch("Bengaluru");

                            }}

                        >

                            Bengaluru

                        </button>

                    </div>

                </div>

            </section>

            {/* Search Results */}

            {hasSearched && (

                <section className="explore-section search-results-section">

                    <div className="explore-section-heading">

                        <div>

                            <p>SEARCH RESULTS</p>

                            <h2>

                                Results for "{searchTerm}"

                            </h2>

                            {!loading && !error && (

                                <span>

                                    {searchResults.length} destination

                                    {searchResults.length !== 1

                                        ? "s"

                                        : ""}{" "}

                                    found

                                </span>

                            )}

                        </div>

                        <button

                            className="view-all-button"

                            onClick={() => setShowAllDestinations(!showAllDestinations)}

                        >

                            {showAllDestinations ? "Show Less ←" : "View All →"}

                        </button>

                    </div>

                    {loading && (

                        <div className="no-results">

                            <div className="no-results-icon">

                                ⌕

                            </div>

                            <h3>

                                Searching destinations...

                            </h3>

                            <p>

                                Looking for places that match

                                your search.

                            </p>

                        </div>

                    )}

                    {!loading && error && (

                        <div className="no-results">

                            <div className="no-results-icon">

                                !

                            </div>

                            <h3>

                                Something went wrong

                            </h3>

                            <p>

                                {error}

                            </p>

                            <button

                                onClick={() =>

                                    handleSearch()

                                }

                            >

                                Try Again

                            </button>

                        </div>

                    )}

                    {!loading &&

                        !error &&

                        searchResults.length > 0 && (

                            <div className="api-destination-list">

                                {searchResults.map(

                                    (destination) => (

                                        <div

                                            className="api-destination-card"

                                            key={

                                                destination.place_id ||

                                                `${destination.lat}-${destination.lon}`

                                            }

                                        >

                                            <div className="api-destination-info">

                                                <h3>

                                                    {getDestinationName(

                                                        destination

                                                    )}

                                                </h3>

                                                <p>

                                                    {getDestinationLocation(

                                                        destination

                                                    )}

                                                </p>

                                            </div>

                                            <button

                                                className="add-trip-button"

                                                onClick={() =>

                                                    handleAddToTrip(

                                                        destination

                                                    )

                                                }

                                            >

                                                + Add to Next Trip

                                            </button>

                                        </div>

                                    )

                                )}

                            </div>

                        )}

                    {!loading &&

                        !error &&

                        searchResults.length === 0 && (

                            <div className="no-results">

                                <div className="no-results-icon">

                                    ⌕

                                </div>

                                <h3>

                                    No destinations found

                                </h3>

                                <p>

                                    Try searching for another

                                    city or destination.

                                </p>

                                <button

                                    onClick={clearSearch}

                                >

                                    Clear Search

                                </button>

                            </div>

                        )}

                </section>

            )}

            {/* Categories */}

            <section className="explore-section categories-section">

                <div className="explore-section-heading">

                    <div>

                        <p>

                            EXPLORE BY INTEREST

                        </p>

                        <h2>

                            What are you looking for?

                        </h2>

                    </div>

                </div>

                <div className="category-list">

                    {categories.map((category) => (

                        <button

                            key={category.name}

                            className={

                                selectedCategory ===

                                category.name

                                    ? "category-card active"

                                    : "category-card"

                            }

                            onClick={() =>

                                handleCategoryClick(

                                    category.name

                                )

                            }

                        >

                            <span>

                                {category.icon}

                            </span>

                            <strong>

                                {category.name}

                            </strong>

                        </button>

                    ))}

                </div>

            </section>

            {/* Popular Destinations */}

            <section className="explore-section">

                <div className="explore-section-heading">

                    <div>

                        <p>

                            POPULAR DESTINATIONS

                        </p>

                        <h2>

                            {selectedCategory === "All"

                                ? "Places worth exploring"

                                : `${selectedCategory} destinations`}

                        </h2>

                        <span>

                            {filteredDestinations.length}{" "}

                            destination

                            {filteredDestinations.length !==

                            1

                                ? "s"

                                : ""}{" "}

                            found

                        </span>

                    </div>

                    <button

                        className="view-all-button"

                        onClick={() => {

                            setSelectedCategory("All");

                            setSearchTerm("");

                        }}

                    >

                        View All →

                    </button>

                </div>

                {(selectedCategory === "All" ? popularLoading : categoryLoading) ? (

                    <div className="no-results">

                        <div className="no-results-icon">⌕</div>

                        <h3>Loading destinations...</h3>

                        <p>Finding places that match your interest.</p>

                    </div>

                ) : (selectedCategory === "All" ? popularError : categoryError) ? (

                    <div className="no-results">

                        <div className="no-results-icon">!</div>

                        <h3>Something went wrong</h3>

                        <p>{selectedCategory === "All" ? popularError : categoryError}</p>

                        <button

                            onClick={() => setSelectedCategory("All")}

                        >

                            View Popular Destinations

                        </button>

                    </div>

                ) : filteredDestinations.length > 0 ? (

                        <div className="destination-carousel">

                            {!showAllDestinations && (

                                <button

                                    type="button"

                                    className="destination-scroll-button left"

                                    onClick={() => scrollDestinations(-1)}

                                    aria-label="Previous destinations"

                                >

                                    ‹

                                </button>

                            )}

                            <div

                                className={

                                    showAllDestinations

                                        ? "destination-grid show-all"

                                        : "destination-grid"

                                }

                                ref={destinationGridRef}

                            >

                                {filteredDestinations.map((destination) => (

                                    <div

                                        className="explore-destination-card"

                                        key={destination.id || destination.name}

                                        onClick={() => handleDestinationClick(destination)}

                                        role="button"

                                        tabIndex={0}

                                        onKeyDown={(event) => {

                                            if (event.key === "Enter" || event.key === " ") {

                                                event.preventDefault();

                                                handleDestinationClick(destination);

                                            }

                                        }}

                                    >

                                        <div className="destination-image">

                                            <img

                                                src={destination.images[0]}

                                                alt={destination.name}

                                            />

                                            <button

                                                className="save-place"

                                                onClick={(event) => {

                                                    event.stopPropagation();

                                                }}

                                                aria-label={`Save ${destination.name}`}

                                            >

                                                ♡

                                            </button>

                                        </div>

                                        <div className="explore-destination-info">

                                            <div>

                                                <h3>{destination.name}</h3>

                                                <p>{destination.places}</p>

                                            </div>

                                            <div className="destination-rating">

                                                ★ {destination.rating}

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                            {!showAllDestinations && (

                                <button

                                    type="button"

                                    className="destination-scroll-button right"

                                    onClick={() => scrollDestinations(1)}

                                    aria-label="Next destinations"

                                >

                                    ›

                                </button>

                            )}

                        </div>

                ) : (

                    <div className="no-results">

                        <div className="no-results-icon">

                            ⌕

                        </div>

                        <h3>

                            No destinations found

                        </h3>

                        <p>

                            There are no popular destinations

                            in this category yet.

                        </p>

                        <button

                            onClick={() =>

                                setSelectedCategory(

                                    "All"

                                )

                            }

                        >

                            View All

                        </button>

                    </div>

                )}

            </section>

            {/* Featured Destination */}
            <section className="explore-section">
                <div className="featured-destination">
                    {previousFeaturedDestination && (
                        <img
                            className="featured-background-image featured-background-image-outgoing"
                            src={getFeaturedImage(previousFeaturedDestination)}
                            alt=""
                            aria-hidden="true"
                        />
                    )}
                    {featuredDestination && (
                        <img
                            key={featuredDestination.id || featuredDestination.name}
                            className="featured-background-image featured-background-image-incoming"
                            src={getFeaturedImage(featuredDestination)}
                            alt={featuredDestination.name}
                        />
                    )}
                    <div className="featured-overlay"></div>
                    {previousFeaturedDestination && (
                        <div className="featured-content featured-content-outgoing" aria-hidden="true">
                            <p>FEATURED DESTINATION</p>
                            <h2>{`${previousFeaturedDestination.name}, India`}</h2>
                            <span>{`Discover ${previousFeaturedDestination.name}, explore local highlights, and find inspiration for your next Indian getaway.`}</span>
                            <button type="button" tabIndex={-1} disabled aria-hidden="true">
                                Explore Destination →
                            </button>
                        </div>
                    )}
                    <div
                        key={featuredDestination?.id || featuredDestination?.name || "featured-placeholder"}
                        className="featured-content featured-content-enter"
                    >
                        <p>FEATURED DESTINATION</p>
                        <h2>
                            {featuredDestination
                                ? `${featuredDestination.name}, India`
                                : popularLoading
                                    ? "Finding your next destination..."
                                    : "Explore India"}
                        </h2>
                        <span>
                            {featuredDestination
                                ? `Discover ${featuredDestination.name}, explore local highlights, and find inspiration for your next Indian getaway.`
                                : popularLoading
                                    ? "Loading destinations for your next journey."
                                    : "Discover inspiring places and experiences across India."}
                        </span>
                        {featuredDestination && (
                            <button
                                type="button"
                                onClick={() => handleDestinationClick(featuredDestination)}
                            >
                                Explore Destination →
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Inspiration */}

            <section className="explore-section inspiration-section">

                <div className="explore-section-heading">

                    <div>

                        <p>

                            GET INSPIRED

                        </p>

                        <h2>

                            Ideas for your next journey

                        </h2>

                        <span>

                            Find inspiration before you start

                            planning.

                        </span>

                    </div>

                </div>

                <div className="inspiration-grid">

                    <div className="inspiration-card">

                        <img

                            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85"

                            alt="Weekend getaway"

                        />

                        <div>

                            <span>

                                TRAVEL IDEAS

                            </span>

                            <h3>

                                Weekend Getaways

                            </h3>

                            <p>

                                Short trips that are perfect for

                                escaping your everyday routine.

                            </p>

                        </div>

                    </div>

                    <div className="inspiration-card">

                        <img

                            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=85"

                            alt="Couple travel"

                        />

                        <div>

                            <span>

                                TRAVEL IDEAS

                            </span>

                            <h3>

                                Trips for Two

                            </h3>

                            <p>

                                Discover beautiful destinations

                                for your next trip together.

                            </p>

                        </div>

                    </div>

                    <div className="inspiration-card">

                        <img

                            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"

                            alt="Adventure travel"

                        />

                        <div>

                            <span>

                                TRAVEL IDEAS

                            </span>

                            <h3>

                                Adventure Escapes

                            </h3>

                            <p>

                                Mountains, nature and experiences

                                for adventurous travelers.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {selectedDestination && (

                        <div

                            className="destination-preview-overlay"

                            onClick={closeDestinationPreview}

                        >

                    <div

                        className="destination-preview"

                        onClick={(event) =>

                            event.stopPropagation()

                        }

                    >

                        <button

                            className="destination-preview-close"

                            onClick={closeDestinationPreview}

                            aria-label="Close preview"

                        >

                            ×

                        </button>

                        <div className="destination-preview-image">

                            <div className="destination-preview-slideshow">

                                {selectedDestination.images.map(

                                    (image, index) => (

                                        <img

                                            key={image}

                                            className={

                                                index === currentImageIndex

                                                    ? "destination-slide active"

                                                    : "destination-slide"

                                            }

                                            src={image}

                                            alt={

                                                selectedDestination.name

                                            }

                                        />

                                    )

                                )}

                            </div>

                            <div className="destination-image-dots">

                                {selectedDestination.images.map(

                                    (image, index) => (

                                        <button

                                            key={image}

                                            type="button"

                                            className={

                                                index === currentImageIndex

                                                    ? "destination-image-dot active"

                                                    : "destination-image-dot"

                                            }

                                            onClick={() =>

                                                setCurrentImageIndex(index)

                                            }

                                            aria-label={`Show image ${

                                                index + 1

                                            }`}

                                        />

                                    )

                                )}

                            </div>

                        </div>

                        <div className="destination-preview-content">

                            <p className="destination-preview-label">

                                {selectedDestination.category}

                            </p>

                            <h2>

                                {selectedDestination.name}

                            </h2>

                            <p className="destination-preview-location">

                                {selectedDestination.country ||

                                    "Explore this destination"}

                            </p>

                            <div className="destination-preview-rating">

                                ★{" "}

                                {selectedDestination.rating}

                            </div>

                            <p className="destination-preview-text">

                                Discover places and experiences

                                around{" "}

                                {selectedDestination.name}.

                                Explore the destination and add

                                it to your next trip.

                            </p>

                            <div className="destination-preview-places">

                                <span>Popular areas</span>

                                <p>

                                    {

                                        selectedDestination.places

                                    }

                                </p>

                            </div>

                            <button

                                className="destination-preview-button"

                                onClick={() =>

                                    handleAddToTrip(

                                        selectedDestination

                                    )

                                }

                            >

                                Add to Trip →

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Explore;
