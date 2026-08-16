import { Link, useParams } from "react-router-dom";
import trips from "../data/trips";
import { formatDate } from "../utils/dateUtils";
import "./TripDetails.css"
import TripInfoCard from "../components/TripInfoCard";
import { useState } from "react";

function TripDetails(){
    const{tripId} = useParams();

    const trip = trips.find((trip)=>{
        return trip.id === Number(tripId);
    });

    const [isEditing, setIsEditing] = useState(false);
    if(!trip){
        return(
            <div>
                <h1>Trip NOt Found</h1>
                <p>The trip you're looking for doesn't exist</p>
            </div>
        )
    }
    return(
        <div className="trip-details">
            <Link to="/dashboard" className="back-link">
             ← Back to Dashboard
            </Link>
            <h1>{trip.destination}</h1>
            <p> {trip.country}</p>

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
            {isEditing?(
                <div className="edit-form">
                    <h2>Edit Trip</h2>
                    <input type="text" defaultValue={trip.destination}/>
                    <input type="text" defaultValue={trip.country}/>
                    <input type="text" defaultValue={trip.travelers}/>

                    <button>
                        Save Changes
                    </button>
                </div>
            ) : (
            <button className="edit-button"
                onClick={()=>{
                setIsEditing(true)}}
            >
                
            Edit Button
            </button>
            )}
            
        </div>
    );
}
export default TripDetails;