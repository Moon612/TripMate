
import TripCard from "../components/TripCard";
import StatCard from "../components/StatCard";
import trips from "../data/trips";
import "./Dashboard.css";
import { formatDate } from "../utils/dateUtils";
import { Link } from "react-router-dom";

function Dashboard(){

    const upcomingTrips = trips.filter((trip)=>{
        const startDate= new Date(trip.startDate);
        const today = new Date();

        return startDate>= today;
    });

    const sortedUpcomingTrips =[...upcomingTrips].sort((a,b)=>{
        return new Date(a.startDate) - new Date(b.startDate)
    });
    const nextTrip = sortedUpcomingTrips[0];

    const remainingTrips = trips.filter((trip)=>{ 
        return trip.id!== nextTrip?.id;
    }).sort((a,b)=>{
        return new Date(a.startDate) - new Date(b.startDate)
    });

    const totalTravelers = trips.reduce((total,trip)=>{
        return total + trip.travelers;
    },0)

    return(
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Good Morning!👋</h1>
                <p>Plan Your Next Adventure</p>
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
            
            <section className="upcoming-trip">
                <div className="section-header">
                    <h2>Upcoming Trip</h2>
                </div>

                {nextTrip?(
                    <Link to={`/trips/${nextTrip.id}`} className="upcoming-trip-card">
                        <div>
                            <h3>{nextTrip.destination}</h3>
                            <p>{nextTrip.country}</p>
                        </div>

                        <div className="upcoming-trip-info">

                            <p>
                                {formatDate(nextTrip.startDate)} - {" "}
                                {formatDate (nextTrip.endDate)}
                            </p>
                            <p>{nextTrip.travelers} Travlers</p>
                        </div>
                    </Link>
                ) : (
                    <p>No upcoming trips.</p>
                )

                }



            </section>


            <h2>My Trips</h2>

            <div className="trips-grid">
                {remainingTrips.map((trip)=>(
                    <TripCard
                    key ={trip.id}
                    id={trip.id}
                    destination ={trip.destination}
                    country ={trip.country}
                    startDate ={trip.startDate}
                    endDate ={trip.endDate}
                    travelers ={trip.travelers}
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;