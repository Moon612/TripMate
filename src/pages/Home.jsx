import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">

            {/* Navbar */}
            <nav className="home-navbar">
                <div className="container d-flex align-items-center justify-content-between">

                    <Link to="/" className="home-logo">
                        <span className="logo-icon">✈</span>
                        <span>TripMate</span>
                    </Link>

                    <div className="home-nav-links">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#destinations">Destinations</a>
                    </div>

                    <div className="home-nav-buttons">
                        <Link to="/login" className="home-login">
                            Login
                        </Link>

                        <Link to="/signup" className="home-signup">
                            Sign Up
                        </Link>
                    </div>

                </div>
            </nav>


            {/* Hero Section */}
            <section className="home-hero">

                <div className="hero-background"></div>

                <div className="container position-relative">
                    <div className="row align-items-center">

                        <div className="col-lg-6 hero-content">

                            <p className="hero-label">
                                EXPLORE. PLAN. EXPERIENCE.
                            </p>

                            <h1>
                                Plan your next
                                <span> Adventure.</span>
                            </h1>

                            <p className="hero-text">
                                Organize your trips, build your itinerary,
                                discover amazing places and keep everything
                                you need for your journey in one place.
                            </p>

                            <div className="hero-buttons">
                                <Link to="/signup" className="hero-primary-button">
                                    Start Planning
                                    <span>→</span>
                                </Link>

                                <a href="#features" className="hero-secondary-button">
                                    <span className="play-icon">▶</span>
                                    See How It Works
                                </a>
                            </div>

                        </div>


                        {/* Hero Carousel */}
                        <div className="col-lg-6">

                            <div
                                id="homeCarousel"
                                className="carousel slide home-image-carousel"
                                data-bs-ride="carousel"
                                data-bs-interval="5000"
                            >

                                <div className="carousel-indicators">
                                    <button
                                        type="button"
                                        data-bs-target="#homeCarousel"
                                        data-bs-slide-to="0"
                                        className="active"
                                        aria-label="Slide 1"
                                    ></button>

                                    <button
                                        type="button"
                                        data-bs-target="#homeCarousel"
                                        data-bs-slide-to="1"
                                        aria-label="Slide 2"
                                    ></button>

                                    <button
                                        type="button"
                                        data-bs-target="#homeCarousel"
                                        data-bs-slide-to="2"
                                        aria-label="Slide 3"
                                    ></button>
                                </div>


                                <div className="carousel-inner">

                                    <div className="carousel-item active">
                                        <img
                                            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85"
                                            alt="Mountain travel destination"
                                        />

                                        <div className="hero-image-overlay">
                                            <span>TRAVEL</span>
                                            <h3>Discover new places</h3>
                                            <p>Every journey starts with a plan.</p>
                                        </div>
                                    </div>


                                    <div className="carousel-item">
                                        <img
                                            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85"
                                            alt="Beautiful travel destination"
                                        />

                                        <div className="hero-image-overlay">
                                            <span>EXPLORE</span>
                                            <h3>Make memories</h3>
                                            <p>Keep every part of your trip organized.</p>
                                        </div>
                                    </div>


                                    <div className="carousel-item">
                                        <img
                                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
                                            alt="Tropical beach"
                                        />

                                        <div className="hero-image-overlay">
                                            <span>ADVENTURE</span>
                                            <h3>Plan your escape</h3>
                                            <p>Less planning stress. More travel.</p>
                                        </div>
                                    </div>

                                </div>


                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#homeCarousel"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon"></span>
                                </button>

                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#homeCarousel"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon"></span>
                                </button>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="floating-plane">✈</div>

            </section>


            {/* Features */}
            <section className="features-section" id="features">

                <div className="container">

                    <div className="section-heading">
                        <p>WHY TRIPMATE</p>

                        <h2>
                            Everything for your journey
                        </h2>

                        <span>
                            From planning to exploring, TripMate helps you
                            make the most of every trip.
                        </span>
                    </div>


                    <div className="row g-4">

                        <div className="col-md-6 col-lg-3">
                            <div className="feature-card">
                                <div className="feature-icon">🗺️</div>

                                <h3>Plan Trips</h3>

                                <p>
                                    Create and manage your trips with
                                    all the important details.
                                </p>
                            </div>
                        </div>


                        <div className="col-md-6 col-lg-3">
                            <div className="feature-card">
                                <div className="feature-icon">📅</div>

                                <h3>Build Itineraries</h3>

                                <p>
                                    Organize your days and add activities
                                    with ease.
                                </p>
                            </div>
                        </div>


                        <div className="col-md-6 col-lg-3">
                            <div className="feature-card">
                                <div className="feature-icon">📍</div>

                                <h3>Interactive Maps</h3>

                                <p>
                                    See your activities on the map and
                                    never lose your way.
                                </p>
                            </div>
                        </div>


                        <div className="col-md-6 col-lg-3">
                            <div className="feature-card">
                                <div className="feature-icon">♡</div>

                                <h3>Saved Places</h3>

                                <p>
                                    Keep a list of places you love and
                                    plan future adventures.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>


            {/* How It Works */}
            <section className="how-section" id="how-it-works">

                <div className="container">

                    <div className="section-heading">
                        <p>HOW IT WORKS</p>

                        <h2>
                            Plan your trip in 3 simple steps
                        </h2>

                        <span>
                            Get from dream to adventure in minutes.
                        </span>
                    </div>


                    <div className="steps-container">

                        <div className="step-item">

                            <div className="step-number">
                                01
                            </div>

                            <div className="step-icon">
                                📝
                            </div>

                            <h3>Create a Trip</h3>

                            <p>
                                Add your destination, dates and
                                travel details.
                            </p>

                        </div>


                        <div className="step-arrow">
                            →
                        </div>


                        <div className="step-item">

                            <div className="step-number">
                                02
                            </div>

                            <div className="step-icon">
                                📅
                            </div>

                            <h3>Plan Your Days</h3>

                            <p>
                                Add activities, notes and important
                                information.
                            </p>

                        </div>


                        <div className="step-arrow">
                            →
                        </div>


                        <div className="step-item">

                            <div className="step-number">
                                03
                            </div>

                            <div className="step-icon">
                                ✈️
                            </div>

                            <h3>Enjoy Your Journey</h3>

                            <p>
                                Keep everything organized and make
                                unforgettable memories.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* Destinations */}
            <section className="destinations-section" id="destinations">

                <div className="container">

                    <div className="destination-heading">

                        <div>
                            <p>GET INSPIRED</p>

                            <h2>
                                Discover amazing destinations
                            </h2>

                            <span>
                                Find your next destination and start
                                planning your adventure.
                            </span>
                        </div>

                        <Link to="/explore" className="explore-button">
                            Explore More →
                        </Link>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-6 col-lg-3">
                            <div className="destination-card">

                                <img
                                    src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80"
                                    alt="Japan"
                                />

                                <div className="destination-info">
                                    <h3>Japan</h3>
                                    <p>Tradition meets modernity</p>
                                    <span>→</span>
                                </div>

                            </div>
                        </div>


                        <div className="col-md-6 col-lg-3">
                            <div className="destination-card">

                                <img
                                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=80"
                                    alt="Italy"
                                />

                                <div className="destination-info">
                                    <h3>Italy</h3>
                                    <p>Art, culture and great food</p>
                                    <span>→</span>
                                </div>

                            </div>
                        </div>


                        <div className="col-md-6 col-lg-3">
                            <div className="destination-card">

                                <img
                                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=80"
                                    alt="Switzerland"
                                />

                                <div className="destination-info">
                                    <h3>Switzerland</h3>
                                    <p>Breathtaking landscapes</p>
                                    <span>→</span>
                                </div>

                            </div>
                        </div>


                        <div className="col-md-6 col-lg-3">
                            <div className="destination-card">

                                <img
                                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80"
                                    alt="Bali"
                                />

                                <div className="destination-info">
                                    <h3>Bali</h3>
                                    <p>Tropical paradise</p>
                                    <span>→</span>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </section>


            {/* Testimonial */}
            <section className="testimonial-section">

                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-lg-5">

                            <div className="memory-images">

                                <img
                                    className="memory-image-one"
                                    src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80"
                                    alt="Traveler"
                                />

                                <img
                                    className="memory-image-two"
                                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=500&q=80"
                                    alt="Travel memories"
                                />

                            </div>

                        </div>


                        <div className="col-lg-7">

                            <div className="testimonial-content">

                                <p>TRAVELERS LOVE TRIPMATE</p>

                                <blockquote>
                                    "TripMate made our vacation so much
                                    easier to plan. Everything was finally
                                    in one place!"
                                </blockquote>

                                <div className="traveler-info">
                                    <div className="traveler-avatar">
                                        S
                                    </div>

                                    <div>
                                        <strong>Sarah K.</strong>
                                        <span>Traveler</span>
                                    </div>

                                    <div className="stars">
                                        ★★★★★
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="home-cta">

                <div className="cta-overlay"></div>

                <div className="container position-relative">

                    <div className="cta-content">

                        <p>READY FOR YOUR NEXT JOURNEY?</p>

                        <h2>
                            Plan less.
                            <br />
                            Travel more.
                        </h2>

                        <Link to="/signup" className="cta-button">
                            Create Your Trip →
                        </Link>

                    </div>

                    <div className="cta-traveler">
                        ✈
                    </div>

                </div>

            </section>


            {/* Footer */}
            <footer className="home-footer">

                <div className="container">

                    <div className="footer-main">

                        <div>
                            <Link to="/" className="home-logo">
                                <span className="logo-icon">✈</span>
                                <span>TripMate</span>
                            </Link>

                            <p>
                                Your journey, organized.
                            </p>
                        </div>


                        <div className="footer-links">

                            <a href="#features">Features</a>
                            <a href="#how-it-works">How It Works</a>
                            <a href="#destinations">Destinations</a>

                        </div>

                    </div>


                    <div className="footer-bottom">

                        <span>
                            © 2026 TripMate. All rights reserved.
                        </span>

                        <span>
                            Made for travelers, by traveler. ✈
                        </span>

                    </div>

                </div>

            </footer>

        </div>
    );
}

export default Home;