import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { getTrips } from "../services/tripService";
import { categorizeTrips } from "../utils/tripUtils";
import TripCard from "../components/TripCard";
import "./MyTrips.css";

function MyTrips() {
    const { currentUser } = useContext(AuthContext);

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        const loadTrips = async () => {
            try {
                const data = await getTrips(currentUser.uid);
                setTrips(data);
            } catch (error) {
                console.error("Failed to load trips:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            loadTrips();
        }
    }, [currentUser]);

    if (loading) {
        return (
            <div className="my-trips-loading">
                <div className="loading-spinner"></div>
                <p>Loading your trips...</p>
            </div>
        );
    }

    const {
        ongoingTrips,
        upcomingTrips,
        pastTrips
    } = categorizeTrips(trips);

    let displayedTrips = trips;

    if (activeFilter === "ongoing") {
        displayedTrips = ongoingTrips;
    }

    if (activeFilter === "upcoming") {
        displayedTrips = upcomingTrips;
    }

    if (activeFilter === "past") {
        displayedTrips = pastTrips;
    }

    return (
        <div className="my-trips">

            <section className="my-trips-header">

                <div className="my-trips-title">

                    <span className="page-label">
                        YOUR JOURNEY
                    </span>

                    <h1>My Trips</h1>

                    <p>
                        Keep track of your adventures and plan what's next.
                    </p>

                </div>

                <Link
                    to="/trips/new"
                    className="my-trips-add-button"
                >
                    <span>+</span>
                    Add Trip
                </Link>

            </section>


            <section className="trip-overview">

                <div className="overview-item">
                    <span className="overview-number">
                        {trips.length}
                    </span>

                    <span className="overview-label">
                        Total Trips
                    </span>
                </div>

                <div className="overview-divider"></div>

                <div className="overview-item">
                    <span className="overview-number">
                        {upcomingTrips.length}
                    </span>

                    <span className="overview-label">
                        Upcoming
                    </span>
                </div>

                <div className="overview-divider"></div>

                <div className="overview-item">
                    <span className="overview-number">
                        {ongoingTrips.length}
                    </span>

                    <span className="overview-label">
                        Ongoing
                    </span>
                </div>

                <div className="overview-divider"></div>

                <div className="overview-item">
                    <span className="overview-number">
                        {pastTrips.length}
                    </span>

                    <span className="overview-label">
                        Completed
                    </span>
                </div>

            </section>


            <section className="trips-section">

                <div className="trips-section-header">

                    <div>
                        <span className="section-label">
                            EXPLORE YOUR JOURNEY
                        </span>

                        <h2>Your Trips</h2>
                    </div>

                    <span className="trip-count">
                        {displayedTrips.length}{" "}
                        {displayedTrips.length === 1 ? "trip" : "trips"}
                    </span>

                </div>


                <div className="trip-filters">

                    <button
                        className={
                            activeFilter === "all"
                                ? "filter-button active"
                                : "filter-button"
                        }
                        onClick={() => setActiveFilter("all")}
                    >
                        <span>All</span>
                        <span className="filter-count">
                            {trips.length}
                        </span>
                    </button>


                    <button
                        className={
                            activeFilter === "ongoing"
                                ? "filter-button active"
                                : "filter-button"
                        }
                        onClick={() => setActiveFilter("ongoing")}
                    >
                        <span>Ongoing</span>
                        <span className="filter-count">
                            {ongoingTrips.length}
                        </span>
                    </button>


                    <button
                        className={
                            activeFilter === "upcoming"
                                ? "filter-button active"
                                : "filter-button"
                        }
                        onClick={() => setActiveFilter("upcoming")}
                    >
                        <span>Upcoming</span>
                        <span className="filter-count">
                            {upcomingTrips.length}
                        </span>
                    </button>


                    <button
                        className={
                            activeFilter === "past"
                                ? "filter-button active"
                                : "filter-button"
                        }
                        onClick={() => setActiveFilter("past")}
                    >
                        <span>Past</span>
                        <span className="filter-count">
                            {pastTrips.length}
                        </span>
                    </button>

                </div>


                {displayedTrips.length > 0 ? (

                    <div className="trips-grid">

                        {displayedTrips.map((trip) => (
                            <TripCard
                                key={trip.id}
                                id={trip.id}
                                destination={trip.destination}
                                country={trip.country}
                                startDate={trip.startDate}
                                endDate={trip.endDate}
                                travelers={trip.travelers}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="empty-trips">

                        <div className="empty-trips-icon">
                            🗺️
                        </div>

                        <div className="empty-trips-content">

                            <h3>
                                {activeFilter === "all"
                                    ? "Your journey starts here"
                                    : `No ${activeFilter} trips`}
                            </h3>

                            <p>
                                {activeFilter === "all"
                                    ? "You haven't added any trips yet. Start planning your next adventure."
                                    : "There are no trips in this category right now."}
                            </p>

                        </div>

                        {activeFilter === "all" && (
                            <Link
                                to="/trips/new"
                                className="empty-trips-button"
                            >
                                Plan Your First Trip
                            </Link>
                        )}

                    </div>

                )}

            </section>

        </div>
    );
}

export default MyTrips;