import { useContext, useEffect, useState } from "react";
import {Link, useParasm } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {getTrip} from "../services/tripService";
import {formatDate} from "../utils/dateUtils";
import"./Itinerary.css"; 

function Itinerary(){
    const{tripId} = useParasm();
    const{currentUser} = useContext(AuthContext);

    const[trip,setTrip] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        const loadTrip = async()=>{
            try{
                const data = await getTrip(currentUser.uid, tripId);

                if(data){
                    setTrip(data);
                }
            }
            catch(error){
                console.error("Failed to load trip:",error);
            }
            finally{
                setLoading(false);
            }
        };

        if(currentUser && tripId){
            loadTrip();
        }
    },[currentUser, tripId]);

    if (loading){
        return(
            <div className="itinerary-loading">
                <div className="loading-spinner"></div>
                <p>Loading itinerary...</p>
            </div>
        );
    }

    if(!trip){
        return(
            <div className="Itinerary-not-found">
                <h1>Trip Not Found</h1>
                <p>The trip you're looking for doesn't exist.</p>

                <Link to="/trips">
                    Back to My Trips
                </Link>
            </div>
        );
    }

    return (
        <div className="itinerary-page">

            <Link
                to={`/trips/${trip.id}`}
                className="itinerary-back"
            >
                ← Back to Trip
            </Link>

            <header className="itinerary-header">

                <div>
                    <span className="itinerary-label">
                        YOUR JOURNEY
                    </span>

                    <h1>
                        {trip.destination}
                    </h1>

                    <p>
                        {trip.country}
                    </p>
                </div>

                <div className="itinerary-dates">
                    <span>
                        {formatDate(trip.startDate)}
                    </span>

                    <span>→</span>

                    <span>
                        {formatDate(trip.endDate)}
                    </span>
                </div>

            </header>


            <section className="itinerary-section">

                <div className="itinerary-section-header">

                    <div>
                        <span className="section-label">
                            PLAN YOUR DAYS
                        </span>

                        <h2>
                            Your Itinerary
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="add-activity-button"
                    >
                        <span>+</span>
                        Add Activity
                    </button>

                </div>


                <div className="itinerary-empty">

                    <div className="itinerary-empty-icon">
                        📍
                    </div>

                    <div className="itinerary-empty-content">

                        <h3>
                            Your itinerary is empty
                        </h3>

                        <p>
                            Start adding places, meals, and activities
                            to plan your trip.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="empty-add-activity-button"
                    >
                        Add Your First Activity
                    </button>

                </div>

            </section>

        </div>
    );
}

export default Itinerary;
