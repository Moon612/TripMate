import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { getTrip } from "../services/tripService";
import { getActivities } from "../services/activityService";
import { formatDate } from "../utils/dateUtils";

import AddActivity from "./AddActivity";

import "./itinerary.css";


function Itinerary() {

    const { tripId } = useParams();
    const { currentUser } = useContext(AuthContext);

    const [trip, setTrip] = useState(null);
    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    // Stores the day that the user wants to add an activity to
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);

    const [showAddActivity, setShowAddActivity] = useState(false);


    useEffect(() => {

        const loadItinerary = async () => {

            try {

                const tripData = await getTrip(
                    currentUser.uid,
                    tripId
                );

                if (!tripData) {
                    setTrip(null);
                    return;
                }

                setTrip(tripData);


                const activityData = await getActivities(
                    currentUser.uid,
                    tripId
                );

                setActivities(activityData);

            } catch (error) {

                console.error(
                    "Failed to load itinerary:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };


        if (currentUser && tripId) {
            loadItinerary();
        }

    }, [currentUser, tripId]);


    /*
     * Convert Firebase dates, strings, or normal
     * JavaScript dates into a Date object.
     */
    const convertToDate = (value) => {

        if (!value) {
            return null;
        }

        if (value?.toDate) {
            return value.toDate();
        }

        if (value instanceof Date) {
            return value;
        }

        return new Date(value);
    };


    /*
     * Creates YYYY-MM-DD.
     *
     * We use this format for activity dates because
     * it makes grouping activities by day easier.
     */
    const getDateKey = (date) => {

        const year = date.getFullYear();

        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    /*
     * Creates all the days between the trip's
     * start date and end date.
     */
    const getTripDays = () => {

        if (!trip) {
            return [];
        }

        const startDate = convertToDate(trip.startDate);
        const endDate = convertToDate(trip.endDate);

        if (!startDate || !endDate) {
            return [];
        }

        const days = [];

        const currentDate = new Date(startDate);

        let dayNumber = 1;


        while (currentDate <= endDate) {

            days.push({
                dayNumber,
                date: getDateKey(currentDate),
                displayDate: new Date(currentDate)
            });

            currentDate.setDate(
                currentDate.getDate() + 1
            );

            dayNumber++;
        }


        return days;
    };


    /*
     * Opens the Add Activity modal for a
     * particular day.
     */
    const openAddActivity = (date, dayNumber) => {

        setSelectedDate(date);
        setSelectedDay(dayNumber);

        setShowAddActivity(true);
    };


    /*
     * Closes the Add Activity modal.
     */
    const closeAddActivity = () => {

        setShowAddActivity(false);

        setSelectedDate("");
        setSelectedDay(null);
    };


    /*
     * Adds the newly created activity to the
     * current list without needing to reload
     * the whole page.
     */
    const handleActivityAdded = (newActivity) => {

        setActivities((currentActivities) => [
            ...currentActivities,
            newActivity
        ]);

        closeAddActivity();
    };


    /*
     * Returns all activities belonging to
     * a particular date.
     */
    const getActivitiesForDay = (date) => {

        return activities
            .filter((activity) => activity.date === date)
            .sort((a, b) => {

                return (a.time || "").localeCompare(
                    b.time || ""
                );

            });
    };


    if (loading) {

        return (
            <div className="itinerary-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading itinerary...
                </p>

            </div>
        );
    }


    if (!trip) {

        return (
            <div className="itinerary-not-found">

                <h1>
                    Trip Not Found
                </h1>

                <p>
                    The trip you're looking for doesn't exist.
                </p>

                <Link to="/trips">
                    Back to My Trips
                </Link>

            </div>
        );
    }


    const tripDays = getTripDays();


    return (
        <div className="itinerary-page">

            {/* Back to trip details */}

            <Link
                to={`/trips/${trip.id}`}
                className="itinerary-back"
            >
                ← Back to Trip
            </Link>


            {/* Trip header */}

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

                    <span>
                        →
                    </span>

                    <span>
                        {formatDate(trip.endDate)}
                    </span>

                </div>

            </header>


            {/* Itinerary heading */}

            <div className="itinerary-section-header">

                <div>

                    <span className="section-label">
                        PLAN YOUR DAYS
                    </span>

                    <h2>
                        Your Itinerary
                    </h2>

                </div>


                {/* Top add button */}

                {tripDays.length > 0 && (

                    <button
                        type="button"
                        className="add-activity-button"
                        onClick={() =>
                            openAddActivity(
                                tripDays[0].date,
                                tripDays[0].dayNumber
                            )
                        }
                    >
                        <span>
                            +
                        </span>

                        Add Activity
                    </button>

                )}

            </div>


            {/* All trip days */}

            <section className="itinerary-section">

                <div className="itinerary-days">

                    {tripDays.map((day, index) => {

                        const dayActivities = activities.filter(
                            (activity) => activity.date === day.date
                        );

                        return (
                            <div
                                key={day.date}
                                className="itinerary-day"
                            >

                                {/* Day header */}
                                <div className="itinerary-day-header">

                                    <div>
                                        <span className="day-label">
                                            DAY {index + 1}
                                        </span>

                                        <h3>
                                            {formatDate(day.date)}
                                        </h3>
                                    </div>

                                    <span className="day-activity-count">
                                        {dayActivities.length}{" "}
                                        {dayActivities.length === 1
                                            ? "activity"
                                            : "activities"}
                                    </span>

                                </div>


                                {/* Activities for this day */}
                                {dayActivities.length > 0 ? (

                                    <>
                                        <div className="activities-list">

                                            {dayActivities.map((activity) => (

                                                <div
                                                    key={activity.id}
                                                    className="activity-item"
                                                >

                                                    <div className="activity-time">
                                                        {activity.time}
                                                    </div>

                                                    <div className="activity-content">

                                                        <h3>
                                                            {activity.title}
                                                        </h3>

                                                        <p>
                                                            📍 {activity.location}
                                                        </p>

                                                        {activity.notes && (
                                                            <span className="activity-notes">
                                                                {activity.notes}
                                                            </span>
                                                        )}

                                                    </div>

                                                </div>

                                            ))}

                                        </div>


                                        {/* Add another activity to this day */}
                                        <div className="day-add-activity-wrapper">

                                            <button
                                                type="button"
                                                className="day-add-activity-button"
                                                onClick={() => {
                                                    setSelectedDate(day.date);
                                                    setShowAddActivity(true);
                                                }}
                                            >
                                                + Add Activity
                                            </button>

                                        </div>

                                    </>

                                ) : (

                                    /* Empty day */
                                    <div className="empty-day">

                                        <div className="empty-day-content">

                                            <div className="empty-day-icon">
                                                📍
                                            </div>

                                            <div>
                                                <strong>
                                                    No activities planned
                                                </strong>

                                                <p>
                                                    Add your first activity for this day.
                                                </p>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            className="day-add-activity-button"
                                            onClick={() => {
                                                setSelectedDate(day.date);
                                                setShowAddActivity(true);
                                            }}
                                        >
                                            + Add Activity
                                        </button>

                                    </div>

                                )}

                            </div>
                        );
                    })}

                </div>

            </section>


            {/* Add Activity modal */}

            {showAddActivity && (

                <AddActivity
                    tripId={tripId}
                    selectedDate={selectedDate}
                    selectedDay={selectedDay}
                    onActivityAdded={handleActivityAdded}
                    onClose={closeAddActivity}
                />

            )}

        </div>
    );
}


export default Itinerary;