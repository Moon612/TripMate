import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { addTrip } from "../services/tripService";
import "./AddTrip.css";

function AddTrip() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [travelers, setTravelers] = useState(1);
    const today = new Date().toISOString().split("T")[0];


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await addTrip(currentUser.uid, {
                destination,
                country,
                startDate,
                endDate,
                travelers
            });

            navigate("/trips");
        } catch (error) {
            console.error("Failed to create trip:", error);
        }
    };


    return (
        <div className="add-trip-page">

            <div className="add-trip-container">

                <button
                    className="add-trip-back"
                    onClick={() => navigate("/trips")}
                >
                    ← Back to My Trips
                </button>

                <div className="add-trip-header">
                    <div className="add-trip-icon">
                        ✈️
                    </div>

                    <div>
                        <h1>Create a New Trip</h1>
                        <p>
                            Add your next adventure and start planning your journey.
                        </p>
                    </div>
                </div>

                <form
                    className="add-trip-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-section">

                        <div className="section-title">
                            <span>📍</span>
                            <div>
                                <h2>Where are you going?</h2>
                                <p>Tell us about your destination.</p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="destination">
                                Destination
                            </label>

                            <input
                                id="destination"
                                type="text"
                                placeholder="e.g. Goa"
                                value={destination}
                                onChange={(event) =>
                                    setDestination(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">
                                Country
                            </label>

                            <input
                                id="country"
                                type="text"
                                placeholder="e.g. India"
                                value={country}
                                onChange={(event) =>
                                    setCountry(event.target.value)
                                }
                                required
                            />
                        </div>

                    </div>


                    <div className="form-section">

                        <div className="section-title">
                            <span>📅</span>

                            <div>
                                <h2>When are you going?</h2>
                                <p>Choose your travel dates.</p>
                            </div>
                        </div>

                        <div className="date-grid">

                            <div className="form-group">
                                <label htmlFor="startDate">
                                    Start Date
                                </label>

                                <input
                                    id="startDate"
                                    type="date"
                                    min={today || startDate}
                                    value={startDate}
                                    onChange={(event) =>
                                        setStartDate(event.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate">
                                    End Date
                                </label>

                                <input
                                    id="endDate"
                                    type="date"
                                    value={endDate}
                                    min={startDate}
                                    onChange={(event) =>
                                        setEndDate(event.target.value)
                                    }
                                    required
                                />
                            </div>

                        </div>

                    </div>


                    <div className="form-section">

                        <div className="section-title">
                            <span>👥</span>

                            <div>
                                <h2>Who's coming?</h2>
                                <p>How many travelers are joining?</p>
                            </div>
                        </div>

                        <div className="traveler-input">

                            <button
                                type="button"
                                onClick={() =>
                                    setTravelers(Math.max(1, travelers - 1))
                                }
                            >
                                −
                            </button>

                            <div className="traveler-count">
                                <strong>{travelers}</strong>
                                <span>
                                    {travelers === 1
                                        ? "Traveler"
                                        : "Travelers"}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setTravelers(travelers + 1)
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-trip-button"
                            onClick={() => navigate("/trips")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-trip-button"
                        >
                            Create Trip
                            <span>→</span>
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddTrip;