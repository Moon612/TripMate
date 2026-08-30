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
        return <p>Loading Trips...</p>;
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

            <div className="my-trips-header">

                <div>
                    <h1>My Trips</h1>
                    <p>View and manage all your trips.</p>
                </div>

                <Link
                    to="/trips/new"
                    className="add-trip-button"
                >
                    + Add Trip
                </Link>

            </div>

            <div className="trip-filters">

                <button
                    className={activeFilter === "all" ? "active" : ""}
                    onClick={() => setActiveFilter("all")}
                >
                    All ({trips.length})
                </button>

                <button
                    className={activeFilter === "ongoing" ? "active" : ""}
                    onClick={() => setActiveFilter("ongoing")}
                >
                    Ongoing ({ongoingTrips.length})
                </button>

                <button
                    className={activeFilter === "upcoming" ? "active" : ""}
                    onClick={() => setActiveFilter("upcoming")}
                >
                    Upcoming ({upcomingTrips.length})
                </button>

                <button
                    className={activeFilter === "past" ? "active" : ""}
                    onClick={() => setActiveFilter("past")}
                >
                    Past ({pastTrips.length})
                </button>

            </div>

            <section className="trip-section">

                <div className="trips-grid">

                    {displayedTrips.length > 0 ? (

                        displayedTrips.map((trip) => (
                            <TripCard
                                key={trip.id}
                                id={trip.id}
                                destination={trip.destination}
                                country={trip.country}
                                startDate={trip.startDate}
                                endDate={trip.endDate}
                                travelers={trip.travelers}
                            />
                        ))

                    ) : (

                        <p className="empty-message">
                            No trips found.
                        </p>

                    )}

                </div>

            </section>

        </div>
    );
}

export default MyTrips;