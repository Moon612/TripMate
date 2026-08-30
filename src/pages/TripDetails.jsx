import { Link, useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";
import "./TripDetails.css";
import TripInfoCard from "../components/TripInfoCard";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getTrip, updateTrip,deleteTrip } from "../services/tripService";

function TripDetails() {
    const { tripId } = useParams();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [travelers, setTravelers] = useState(0);

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
        return <p>Loading Trip...</p>;
    }

    if (!trip) {
        return (
            <div>
                <h1>Trip Not Found</h1>
                <p>The trip you're looking for doesn't exist.</p>
            </div>
        );
    }

    const handleSave = async () => {
        try {
            await updateTrip(currentUser.uid, trip.id, {
                destination: destination,
                country: country,
                travelers: travelers
            });

            setTrip({
                ...trip,
                destination: destination,
                country: country,
                travelers: travelers
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update trip:", error);
        }
    };

    const handleDelete = async () =>{
        const confirmed =window.confirm(
            "Are you sure you want to delete this trip?"
        );
        
        if(!confirmed){
            return;
        }

        try{
            await deleteTrip(currentUser.uid, trip.id);

            navigate("/trips");
        }
        catch(error){
            console.error("Failed to delete trip:",error);
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

            <Link to="/dashboard" className="back-link">
                ← Back to Dashboard
            </Link>

            <h1>{trip.destination}</h1>
            <p>{trip.country}</p>

            <div className="trip-info-grid">

                <TripInfoCard
                    label={"Date"}
                    value={`${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`}
                />

                <TripInfoCard
                    label={"Travelers"}
                    value={`${trip.travelers} Travelers`}
                />

            </div>

            {isEditing ? (
                <div className="edit-form">

                    <h2>Edit Trip</h2>

                    <input
                        type="text"
                        value={destination}
                        onChange={(event) =>
                            setDestination(event.target.value)
                        }
                    />

                    <input
                        type="text"
                        value={country}
                        onChange={(event) =>
                            setCountry(event.target.value)
                        }
                    />

                    <input
                        type="number"
                        value={travelers}
                        onChange={(event) =>
                            setTravelers(Number(event.target.value))
                        }
                    />

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
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Trip
                    </button>
                    <button
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