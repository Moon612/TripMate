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
        <div className="trip-card">

            {/* Header */}

            <div className="trip-card-header">

                <span className="trip-card-label">
                    TRIP
                </span>

                <Link
                    to={`/trips/${id}`}
                    className="trip-card-arrow"
                >
                    →
                </Link>

            </div>


            {/* Main trip information */}

            <div className="trip-card-main">

                <h2>
                    {destination}
                </h2>

                <p className="trip-card-country">
                    {country}
                </p>

            </div>


            {/* Trip details */}

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


            {/* Card actions */}

            <div className="trip-card-footer">

                <Link
                    to={`/trips/${id}`}
                    className="trip-card-view"
                >
                    View Trip →
                </Link>

                <Link
                    to={`/trips/${id}/itinerary`}
                    className="trip-card-itinerary"
                >
                    View Itinerary →
                </Link>

            </div>

        </div>
    );
}

export default TripCard;