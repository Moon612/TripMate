import TripCard from "../components/TripCard";
import StatCard from "../components/StatCard";
import { useEffect, useState, useContext } from "react";
import { getTrips } from "../services/tripService";
import "./Dashboard.css";
import { formatDate } from "../utils/dateUtils";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { categorizeTrips } from "../utils/tripUtils";

function Dashboard() {
    const { currentUser } = useContext(AuthContext);

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTrips = async () => {
            try {
                const data = await getTrips(currentUser.uid);
                setTrips(data);
            } catch (error) {
                console.error("Failed to load trips", error);
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
            <div className="dashboard-loading">
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

    const totalTravelers = trips.reduce((total, trip) => {
        return total + trip.travelers;
    }, 0);

    return (
        <div className="dashboard">

            <section className="dashboard-welcome">

                <div className="welcome-content">
                    <span className="welcome-label">
                        YOUR TRAVEL DASHBOARD
                    </span>

                    <h1>Good Morning! 👋</h1>

                    <p>
                        Plan your next adventure and keep all your trips
                        organized in one place.
                    </p>
                </div>

                <Link
                    to="/trips/new"
                    className="add-trip-button"
                >
                    <span>+</span>
                    Add New Trip
                </Link>

            </section>


            <section className="stats-grid">

                <div className="dashboard-stat">
                    <div className="stat-icon">✈️</div>

                    <StatCard
                        title="Total Trips"
                        value={trips.length}
                    />

                    <p className="stat-description">
                        All your adventures
                    </p>
                </div>


                <div className="dashboard-stat">
                    <div className="stat-icon">📅</div>

                    <StatCard
                        title="Upcoming Trips"
                        value={upcomingTrips.length}
                    />

                    <p className="stat-description">
                        Adventures waiting for you
                    </p>
                </div>


                <div className="dashboard-stat">
                    <div className="stat-icon">👥</div>

                    <StatCard
                        title="Travelers"
                        value={totalTravelers}
                    />

                    <p className="stat-description">
                        Total travelers across trips
                    </p>
                </div>

            </section>


            <section className="current-trip">

                <div className="section-header">

                    <div>
                        <span className="section-label">
                            RIGHT NOW
                        </span>

                        <h2>Your Trip Now</h2>
                    </div>

                </div>


                {ongoingTrips.length > 0 ? (

                    <div className="current-trips-grid">

                        {ongoingTrips.map((trip) => (

                            <Link
                                key={trip.id}
                                to={`/trips/${trip.id}`}
                                className="current-trip-card"
                            >

                                <div className="trip-card-top">

                                    <span className="trip-live">
                                        <span className="live-dot"></span>
                                        LIVE
                                    </span>

                                    <span className="trip-arrow">
                                        →
                                    </span>

                                </div>


                                <div className="current-trip-main">

                                    <span className="trip-location">
                                        CURRENT DESTINATION
                                    </span>

                                    <h3>
                                        {trip.destination}
                                    </h3>

                                    <p>
                                        {trip.country}
                                    </p>

                                </div>


                                <div className="current-trip-info">

                                    <div>
                                        <span>Date</span>

                                        <p>
                                            {formatDate(trip.startDate)} -{" "}
                                            {formatDate(trip.endDate)}
                                        </p>
                                    </div>


                                    <div>
                                        <span>Travelers</span>

                                        <p>
                                            {trip.travelers} people
                                        </p>
                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>

                ) : (

                    <div className="empty-trip-state">

                        <div className="empty-trip-icon">
                            ✈️
                        </div>

                        <div className="empty-trip-content">

                            <h3>
                                No trip in progress
                            </h3>

                            <p>
                                You don't have an active trip right now.
                                Your next adventure could be just a few
                                clicks away.
                            </p>

                        </div>

                        <Link
                            to="/trips/new"
                            className="empty-state-button"
                        >
                            Plan a Trip
                        </Link>

                    </div>

                )}

            </section>


            <section className="upcoming-trips">

                <div className="section-header">

                    <div>
                        <span className="section-label">
                            COMING UP
                        </span>

                        <h2>
                            Upcoming Trips
                        </h2>
                    </div>


                    <Link
                        to="/trips"
                        className="view-all-link"
                    >
                        View all →
                    </Link>

                </div>


                {upcomingTrips.length > 0 ? (

                    <div className="trips-grid">

                        {upcomingTrips.map((trip) => (

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

                    <div className="empty-upcoming-state">

                        <div className="empty-upcoming-icon">
                            🗺️
                        </div>

                        <div>
                            <h3>
                                No upcoming trips yet
                            </h3>

                            <p>
                                Start planning your next destination.
                            </p>
                        </div>

                        <Link
                            to="/trips/new"
                            className="empty-state-button"
                        >
                            Add Trip
                        </Link>

                    </div>

                )}

            </section>


            {pastTrips.length > 0 && (
                <section className="dashboard-summary">

                    <div>
                        <span className="section-label">
                            YOUR JOURNEY
                        </span>

                        <h2>
                            You've already explored {pastTrips.length}{" "}
                            {pastTrips.length === 1 ? "place" : "places"}.
                        </h2>

                        <p>
                            Keep exploring and add your next adventure
                            to your journey.
                        </p>
                    </div>

                    <Link
                        to="/trips"
                        className="summary-link"
                    >
                        View My Trips →
                    </Link>

                </section>
            )}

        </div>
    );
}

export default Dashboard;