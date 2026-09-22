import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Explore.css";
import { searchDestinations } from "../services/destinationService";

const destinations = [
    {
        name: "Japan",
        places: "Tokyo • Kyoto • Osaka",
        rating: "4.8",
        category: "Culture",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Greece",
        places: "Santorini • Athens",
        rating: "4.9",
        category: "Beaches",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "France",
        places: "Paris • Nice • Lyon",
        rating: "4.9",
        category: "Cities",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Switzerland",
        places: "Zurich • Interlaken",
        rating: "4.8",
        category: "Mountains",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=85"
    }
];

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

function Explore() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [searchResults, setSearchResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showSuggestions, setShowSuggestions] = useState(false);

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

   const filteredDestinations = destinations.filter((destination) => {
        return (
            selectedCategory === "All" ||
            destination.category === selectedCategory
        );
    });

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

        setSearchTerm("");
        setSearchResults([]);
        setSuggestions([]);
        setHasSearched(false);
        setShowSuggestions(false);
        setError("");
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
                                setSearchTerm("Paris");
                                handleSearch("Paris");
                            }}
                        >
                            Paris
                        </button>

                        <button
                            onClick={() => {
                                setSearchTerm("Tokyo");
                                handleSearch("Tokyo");
                            }}
                        >
                            Tokyo
                        </button>

                        <button
                            onClick={() => {
                                setSearchTerm("Bali");
                                handleSearch("Bali");
                            }}
                        >
                            Bali
                        </button>

                        <button
                            onClick={() => {
                                setSearchTerm("Switzerland");
                                handleSearch("Switzerland");
                            }}
                        >
                            Switzerland
                        </button>

                        <button
                            onClick={() => {
                                setSearchTerm("Dubai");
                                handleSearch("Dubai");
                            }}
                        >
                            Dubai
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
                            onClick={clearSearch}
                        >
                            Clear Search
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


                {filteredDestinations.length > 0 ? (

                    <div className="destination-grid">

                        {filteredDestinations.map(
                            (destination) => (

                                <div
                                    className="explore-destination-card"
                                    key={
                                        destination.name
                                    }
                                >

                                    <div className="destination-image">

                                        <img
                                            src={
                                                destination.image
                                            }
                                            alt={
                                                destination.name
                                            }
                                        />

                                        <button className="save-place">
                                            ♡
                                        </button>

                                    </div>


                                    <div className="explore-destination-info">

                                        <div>

                                            <h3>
                                                {
                                                    destination.name
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    destination.places
                                                }
                                            </p>

                                        </div>


                                        <div className="destination-rating">
                                            ★{" "}
                                            {
                                                destination.rating
                                            }
                                        </div>

                                    </div>

                                </div>

                            )
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

                    <img
                        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85"
                        alt="Kyoto"
                    />

                    <div className="featured-overlay"></div>

                    <div className="featured-content">

                        <p>
                            FEATURED DESTINATION
                        </p>

                        <h2>
                            Kyoto, Japan
                        </h2>

                        <span>
                            Discover traditional streets,
                            peaceful temples, beautiful gardens
                            and unforgettable experiences.
                        </span>

                        <button>
                            Explore Destination →
                        </button>

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

        </div>
    );
}

export default Explore;