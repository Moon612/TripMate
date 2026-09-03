import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getTrip, updateTrip, deleteTrip } from "../services/tripService";
import { formatDate } from "../utils/dateUtils";
import TripInfoCard from "../components/TripInfoCard";
import "./TripDetails.css";
import countries from "../data/countries";

function TripDetails() {
    const { tripId } = useParams();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);

    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [travelers, setTravelers] = useState(1);

    useEffect(() => {
        const loadTrip = async () => {
            try {
                const data = await getTrip(currentUser.uid, tripId);

                if (data) {
                    setTrip(data);

                    setDestination(data.destination);
                    setCountry(data.country);
                    setTravelers(data.travelers);
                }
            } catch (error) {
                console.error("Failed to load trip:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser && tripId) {
            loadTrip();
        }
    }, [currentUser, tripId]);

    if (loading) {
        return (
            <div className="trip-details-loading">
                <div className="loading-spinner"></div>

                <p>Loading trip...</p>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="trip-not-found">

                <h1>Trip Not Found</h1>

                <p>
                    The trip you're looking for doesn't exist.
                </p>

                <Link
                    to="/trips"
                    className="back-link"
                >
                    ← Back to My Trips
                </Link>

            </div>
        );
    }

    const handleSave = async () => {
        if (!destination.trim() || !country.trim()) {
            return;
        }

        try {
            await updateTrip(currentUser.uid, trip.id, {
                destination: destination.trim(),
                country: country.trim(),
                travelers: travelers
            });

            setTrip({
                ...trip,
                destination: destination.trim(),
                country: country.trim(),
                travelers: travelers
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update trip:", error);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this trip?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteTrip(currentUser.uid, trip.id);

            navigate("/trips");
        } catch (error) {
            console.error("Failed to delete trip:", error);
        }
    };

    const handleCancel = () => {
        setDestination(trip.destination);
        setCountry(trip.country);
        setTravelers(trip.travelers);

        setIsEditing(false);
    };

    return (
        <div className="trip-details">

            <Link
                to="/trips"
                className="back-link"
            >
                ← Back to My Trips
            </Link>


            <div className="trip-details-header">

                <div>
                    <span className="page-label">
                        TRIP DETAILS
                    </span>

                    <h1>
                        {trip.destination}
                    </h1>

                    <p>
                        {trip.country}
                    </p>
                </div>

            </div>


            <div className="trip-info-grid">

                <TripInfoCard
                    label="Date"
                    value={`${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`}
                />

                <TripInfoCard
                    label="Travelers"
                    value={`${trip.travelers} Travelers`}
                />

            </div>


            {isEditing ? (

                <div className="edit-form">

                    <h2>Edit Trip</h2>

                    <div className="form-group">

                        <label htmlFor="destination">
                            Destination
                        </label>

                        <input
                            id="destination"
                            type="text"
                            value={destination}
                            onChange={(event) =>
                                setDestination(event.target.value)
                            }
                            placeholder="Enter destination"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="country">
                            Country
                        </label>

                       <select
                            value={country}
                            onChange={(event) =>
                                setCountry(event.target.value)
                            }
                            required
                        >
                            <option value="">Select a country</option>

                            {countries.map((countryName) => (
                                <option
                                    key={countryName}
                                    value={countryName}
                                >
                                    {countryName}
                                </option>
                            ))}
                        </select>

                    </div>


                    <div className="form-group">

                        <label htmlFor="travelers">
                            Travelers
                        </label>

                        <input
                            id="travelers"
                            type="number"
                            min="1"
                            value={travelers}
                            onChange={(event) =>
                                setTravelers(Number(event.target.value))
                            }
                        />

                    </div>


                    <div className="edit-actions">

                        <button
                            type="button"
                            className="save-button"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            ) : (

                <div className="trip-actions">

                    <button
                        type="button"
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Trip
                    </button>

                    <button
                        type="button"
                        className="delete-button"
                        onClick={handleDelete}
                    >
                        Delete Trip
                    </button>

                </div>

            )}

        </div>
    );
}

export default TripDetails;