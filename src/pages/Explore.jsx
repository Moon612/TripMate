import "./Explore.css";

function Explore() {
    return (
        <div className="explore-page">

            {/* Explore Hero */}
            <section className="explore-hero">

                <div className="explore-hero-content">

                    <p className="explore-label">
                        DISCOVER • EXPLORE • TRAVEL
                    </p>

                    <h1>
                        Discover your next
                        <span> adventure.</span>
                    </h1>

                    <p className="explore-hero-text">
                        Find inspiring destinations, beautiful places and
                        experiences for your next journey.
                    </p>

                    <div className="explore-search">
                        <span className="search-icon">⌕</span>

                        <input
                            type="text"
                            placeholder="Search destinations, cities or places..."
                        />

                        <button>
                            Search
                        </button>
                    </div>

                    <div className="popular-searches">
                        <span>Popular:</span>
                        <button>Paris</button>
                        <button>Tokyo</button>
                        <button>Bali</button>
                        <button>Switzerland</button>
                        <button>Dubai</button>
                    </div>

                </div>

            </section>


            {/* Categories */}
            <section className="explore-section categories-section">

                <div className="explore-section-heading">
                    <div>
                        <p>EXPLORE BY INTEREST</p>
                        <h2>What are you looking for?</h2>
                    </div>
                </div>

                <div className="category-list">

                    <button className="category-card active">
                        <span>🌎</span>
                        <strong>All</strong>
                    </button>

                    <button className="category-card">
                        <span>🏖️</span>
                        <strong>Beaches</strong>
                    </button>

                    <button className="category-card">
                        <span>🏔️</span>
                        <strong>Mountains</strong>
                    </button>

                    <button className="category-card">
                        <span>🏛️</span>
                        <strong>Culture</strong>
                    </button>

                    <button className="category-card">
                        <span>🍜</span>
                        <strong>Food</strong>
                    </button>

                    <button className="category-card">
                        <span>🌆</span>
                        <strong>Cities</strong>
                    </button>

                    <button className="category-card">
                        <span>🌿</span>
                        <strong>Nature</strong>
                    </button>

                    <button className="category-card">
                        <span>🎒</span>
                        <strong>Adventure</strong>
                    </button>

                </div>

            </section>


            {/* Popular Destinations */}
            <section className="explore-section">

                <div className="explore-section-heading">

                    <div>
                        <p>POPULAR DESTINATIONS</p>
                        <h2>Places worth exploring</h2>
                        <span>
                            Get inspired by destinations travelers love.
                        </span>
                    </div>

                    <button className="view-all-button">
                        View All →
                    </button>

                </div>


                <div className="destination-grid">

                    <div className="explore-destination-card">

                        <div className="destination-image">
                            <img
                                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85"
                                alt="Japan"
                            />

                            <button className="save-place">
                                ♡
                            </button>
                        </div>

                        <div className="explore-destination-info">
                            <div>
                                <h3>Japan</h3>
                                <p>Tokyo • Kyoto • Osaka</p>
                            </div>

                            <div className="destination-rating">
                                ★ 4.8
                            </div>
                        </div>

                    </div>


                    <div className="explore-destination-card">

                        <div className="destination-image">
                            <img
                                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85"
                                alt="Greece"
                            />

                            <button className="save-place">
                                ♡
                            </button>
                        </div>

                        <div className="explore-destination-info">
                            <div>
                                <h3>Greece</h3>
                                <p>Santorini • Athens</p>
                            </div>

                            <div className="destination-rating">
                                ★ 4.9
                            </div>
                        </div>

                    </div>


                    <div className="explore-destination-card">

                        <div className="destination-image">
                            <img
                                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85"
                                alt="Paris"
                            />

                            <button className="save-place">
                                ♡
                            </button>
                        </div>

                        <div className="explore-destination-info">
                            <div>
                                <h3>France</h3>
                                <p>Paris • Nice • Lyon</p>
                            </div>

                            <div className="destination-rating">
                                ★ 4.9
                            </div>
                        </div>

                    </div>


                    <div className="explore-destination-card">

                        <div className="destination-image">
                            <img
                                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=85"
                                alt="Switzerland"
                            />

                            <button className="save-place">
                                ♡
                            </button>
                        </div>

                        <div className="explore-destination-info">
                            <div>
                                <h3>Switzerland</h3>
                                <p>Zurich • Interlaken</p>
                            </div>

                            <div className="destination-rating">
                                ★ 4.8
                            </div>
                        </div>

                    </div>

                </div>

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

                        <p>FEATURED DESTINATION</p>

                        <h2>Kyoto, Japan</h2>

                        <span>
                            Discover traditional streets, peaceful temples,
                            beautiful gardens and unforgettable experiences.
                        </span>

                        <button>
                            Explore Destination →
                        </button>

                    </div>

                </div>

            </section>


            {/* Travel Inspiration */}
            <section className="explore-section inspiration-section">

                <div className="explore-section-heading">

                    <div>
                        <p>GET INSPIRED</p>
                        <h2>Ideas for your next journey</h2>
                        <span>
                            Find inspiration before you start planning.
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
                            <span>TRAVEL IDEAS</span>
                            <h3>Weekend Getaways</h3>
                            <p>
                                Short trips that are perfect for escaping
                                your everyday routine.
                            </p>
                        </div>

                    </div>


                    <div className="inspiration-card">

                        <img
                            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=85"
                            alt="Couple travel"
                        />

                        <div>
                            <span>TRAVEL IDEAS</span>
                            <h3>Trips for Two</h3>
                            <p>
                                Discover beautiful destinations for your
                                next trip together.
                            </p>
                        </div>

                    </div>


                    <div className="inspiration-card">

                        <img
                            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"
                            alt="Adventure travel"
                        />

                        <div>
                            <span>TRAVEL IDEAS</span>
                            <h3>Adventure Escapes</h3>
                            <p>
                                Mountains, nature and experiences for
                                adventurous travelers.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Explore;