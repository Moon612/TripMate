import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { addTrip } from "../services/tripService";
import "./AddTrip.css";
import countries from "../data/countries";

function AddTrip() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [travelers, setTravelers] = useState(1);

    const today = new Date().toISOString().split("T")[0];

    /*
     * If the user came here from Explore,
     * get the selected destination and pre-fill the form.
     */
    useEffect(() => {
        const selectedDestination = location.state?.destination;

        if (!selectedDestination) {
            return;
        }

        const destinationName =
            selectedDestination.city ||
            selectedDestination.name ||
            selectedDestination.address_line1 ||
            "";

        const destinationCountry =
            selectedDestination.country || "";

        const destinationState =
            selectedDestination.state || "";

        setDestination(destinationName);
        setCountry(destinationCountry);
        setState(destinationState);

        if (selectedDestination.lat !== undefined) {
            setLatitude(selectedDestination.lat);
        }

        if (selectedDestination.lon !== undefined) {
            setLongitude(selectedDestination.lon);
        }
    }, [location.state]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await addTrip(currentUser.uid, {
                destination,
                country,
                state,
                latitude,
                longitude,
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
                            Add your next adventure and start planning
                            your journey.
                        </p>
                    </div>

                </div>


                <form
                    className="add-trip-form"
                    onSubmit={handleSubmit}
                >

                    {/* Destination */}

                    <div className="form-section">

                        <div className="section-title">

                            <span>📍</span>

                            <div>
                                <h2>Where are you going?</h2>

                                <p>
                                    Tell us about your destination.
                                </p>
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

                            <select
                                id="country"
                                value={country}
                                onChange={(event) =>
                                    setCountry(event.target.value)
                                }
                                required
                            >

                                <option value="">
                                    Select a country
                                </option>

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


                        {/* Show the state/region only when it came
                            from the destination search. */}

                        {state && (
                            <div className="form-group">

                                <label htmlFor="state">
                                    State / Region
                                </label>

                                <input
                                    id="state"
                                    type="text"
                                    value={state}
                                    onChange={(event) =>
                                        setState(event.target.value)
                                    }
                                />

                            </div>
                        )}

                    </div>


                    {/* Dates */}

                    <div className="form-section">

                        <div className="section-title">

                            <span>📅</span>

                            <div>
                                <h2>When are you going?</h2>

                                <p>
                                    Choose your travel dates.
                                </p>
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
                                    min={today}
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
                                    min={startDate || today}
                                    value={endDate}
                                    onChange={(event) =>
                                        setEndDate(event.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* Travelers */}

                    <div className="form-section">

                        <div className="section-title">

                            <span>👥</span>

                            <div>
                                <h2>Who's coming?</h2>

                                <p>
                                    How many travelers are joining?
                                </p>
                            </div>

                        </div>


                        <div className="traveler-input">

                            <button
                                type="button"
                                onClick={() =>
                                    setTravelers(
                                        Math.max(
                                            1,
                                            travelers - 1
                                        )
                                    )
                                }
                            >
                                −
                            </button>


                            <div className="traveler-count">

                                <strong>
                                    {travelers}
                                </strong>

                                <span>
                                    {travelers === 1
                                        ? "Traveler"
                                        : "Travelers"}
                                </span>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setTravelers(
                                        travelers + 1
                                    )
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-trip-button"
                            onClick={() =>
                                navigate("/trips")
                            }
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