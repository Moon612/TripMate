import "./TripCard.css";
import { formatDate } from "../utils/dateUtils";
import { Link } from "react-router-dom";

function TripCard(props){
    return(
        <Link to={`/trips/${props.id}`} className="trip-card">
            <h2>{props.destination}</h2>
            <h2>{props.country}</h2>
            <p>
                {formatDate(props.startDate)} - {formatDate(props.endDate)}
            </p>
            <h2>{props.travelers} travelers</h2>
        </Link>
    );
}

export default TripCard;