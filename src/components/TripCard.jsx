import "./TripCard.css";
import { formatDate } from "../utils/dateUtils";
import { Link } from "react-router-dom";

function TripCard({
    id,
    destination,
    country,
    startDate,
    endDate,
    travelers
}) {
    return (
        <Link
            to={`/trips/${id}`}
            className="trip-card"
        >

            <div className="trip-card-header">

                <span className="trip-card-label">
                    TRIP
                </span>

                <span className="trip-card-arrow">
                    →
                </span>

            </div>


            <div className="trip-card-main">

                <h2>
                    {destination}
                </h2>

                <p className="trip-card-country">
                    {country}
                </p>

            </div>


            <div className="trip-card-info">

                <div className="trip-info-item">

                    <span className="trip-info-label">
                        DATE
                    </span>

                    <p>
                        {formatDate(startDate)} - {formatDate(endDate)}
                    </p>

                </div>


                <div className="trip-info-item">

                    <span className="trip-info-label">
                        TRAVELERS
                    </span>

                    <p>
                        {travelers}{" "}
                        {travelers === 1 ? "person" : "people"}
                    </p>

                </div>

            </div>

        </Link>
    );
}

export default TripCard;