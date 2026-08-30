
import TripCard from "../components/TripCard";
import StatCard from "../components/StatCard";
// import trips from "../data/trips";
import { useEffect,useState } from "react";
import { getTrips } from "../services/tripService";
import "./Dashboard.css";
import { formatDate } from "../utils/dateUtils";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // for firebase Auth
import { categorizeTrips } from "../utils/tripUtils";

function Dashboard(){

    // const { currentUser } = useContext(AuthContext);

    const { currentUser } = useContext(AuthContext);

    const [trips,setTrips] = useState([]);
    const[loading ,setLoading] = useState(true);

    useEffect(() =>{
        const loadTrips = async()=>{
            try{
                //  console.log("Current User:", currentUser);
                //  console.log("User UID:", currentUser.uid);
                const data = await getTrips(currentUser.uid);
                console.log("Trips from Firestore:", data);
                setTrips(data);
            } catch(error){
                console.error("Failed To load trips",error);
            } finally {
                setLoading(false);
            }
        }
        loadTrips();
    },[currentUser]);

    if(loading){
        return<p>Loading Trips....</p>
    }

   const {
    ongoingTrips,
    upcomingTrips,
    pastTrips
    } = categorizeTrips(trips);

    
    const totalTravelers = trips.reduce((total,trip)=>{
        return total + trip.travelers;
    },0)

    return(
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Good Morning! 👋</h1>
                    <p>Plan Your Next Adventure</p>  
                </div>
                
                <Link to="/trips/new" className="add-trip-button">
                    + Add Trip
                </Link>
             
            </div>

            <div className="stats-grid">
                <StatCard
                title ="Total Trips"
                value ={trips.length}
                />
                <StatCard
                title ="Upcoming Trips"
                value ={upcomingTrips.length}
                />

                <StatCard
                title ="Travelers"
                value ={totalTravelers}
                />
            </div>
            
            <section className="current-trip">
                <div className="section-header">
                    <h2>Your Trip Now</h2>
                </div>

                {ongoingTrips.length > 0 ? (
                    <div className="current-trips-grid">
                        {ongoingTrips.map((trip) => (
                            <Link
                                key={trip.id}
                                to={`/trips/${trip.id}`}
                                className="current-trip-card"
                            >
                                <div>
                                    <h3>{trip.destination}</h3>
                                    <p>{trip.country}</p>
                                </div>

                                <div className="current-trip-info">
                                    <p>
                                        {formatDate(trip.startDate)} -{" "}
                                        {formatDate(trip.endDate)}
                                    </p>

                                    <p>
                                        {trip.travelers} Travelers
                                    </p>

                                    <p className="trip-status">
                                        Trip in progress
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No trips in progress right now.</p>
                )}

            </section>


           <section className="upcoming-trips">
                <div className="section-header">
                    <h2>Upcoming Trips</h2>

                    <Link to="/trips">
                        View all →
                    </Link>
                </div>

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
            </section>
        </div>
    );
}

export default Dashboard;