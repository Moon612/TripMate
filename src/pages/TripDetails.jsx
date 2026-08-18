import { Link, useParams } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";
import "./TripDetails.css"
import TripInfoCard from "../components/TripInfoCard";
import { useState } from "react";

function TripDetails({trips,setTrips}){
    const{tripId} = useParams();

    const trip = trips.find((trip)=>{
        return trip.id === Number(tripId);
    });

    const [isEditing, setIsEditing] = useState(false);
    const[destination,setDestination] = useState(trip.destination);
    const[country,setCountry] = useState(trip.country);
    const[travelers,setTravelers] = useState(trip.travelers);
    if(!trip){
        return(
            <div>
                <h1>Trip NOt Found</h1>
                <p>The trip you're looking for doesn't exist</p>
            </div>
        )
    }

    const handleSave=()=>{
        const updateTrips = trips.map((currentTrip) =>{
            if(currentTrip.id=== trip.id){
                return{
                    ...currentTrip,
                    destination: destination,
                    country: country,
                    travelers: travelers
                };
            }
            return currentTrip;
        });

        setTrips(updateTrips);
        setIsEditing(false);
    };

    const handleCancel=()=>{
        setDestination(trip.destination);
        setCountry(trip.country);
        setTravelers(trip.travelers);

        setIsEditing(false);
    };

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
                    <input 
                        type="text"
                        value={destination}
                        onChange={(event)=> setDestination(event.target.value)} />
                    <input 
                        type="text" 
                        value={country}
                        onChange={(event)=> setCountry(event.target.value)}/>
                    <input 
                        type="number" 
                        value={travelers}
                        onChange={(event)=> setTravelers(Number(event.target.value))}
                    />

                    <div className="edit-actions">
                        <button
                        type="button"
                        className="save-button" onClick={handleSave}>
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