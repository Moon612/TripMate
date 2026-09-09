import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";
import {
    addActivity,
    updateActivity
} from "../services/activityService";

import "./AddActivity.css";


function AddActivity({
    tripId,
    selectedDate,
    selectedDay,
    activityToEdit,
    onActivityAdded,
    onActivityUpdated,
    onClose
}) {

    const { currentUser } = useContext(AuthContext);


    const [title, setTitle] = useState(activityToEdit?.title || "");
    const [type, setType] = useState(activityToEdit?.type || "Sightseeing");
    const [time, setTime] = useState(activityToEdit?.time || "");
    const [location, setLocation] = useState(activityToEdit?.location || "");
    const [notes, setNotes] = useState(activityToEdit?.notes || "");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    /*
     * Converts YYYY-MM-DD into a readable date.
     */
    const formatSelectedDate = (dateString) => {

        if (!dateString) {
            return "";
        }

        const date = new Date(
            `${dateString}T00:00:00`
        );

        return date.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSaving(true);


        try {

            const activity = {

                title: title.trim(),

                type,

                /*
                 * The date comes from the selected day.
                 *
                 * The user does not enter this manually.
                 */
                date: selectedDate,

                time,

                location: location.trim(),

                notes: notes.trim()
            };


            if (activityToEdit) {
                await updateActivity(
                    currentUser.uid,
                    tripId,
                    activityToEdit.id,
                    activity
                );

                onActivityUpdated({
                    ...activityToEdit,
                    ...activity
                });
            } else {
                const newActivity = await addActivity(
                    currentUser.uid,
                    tripId,
                    activity
                );

                onActivityAdded(newActivity);
            }


        } catch (error) {

            console.error(
                "Failed to add activity:",
                error
            );

            setError(
                "Failed to add activity. Please try again."
            );

        } finally {

            setSaving(false);

        }
    };


    return (
        <div className="activity-modal-overlay">

            <div className="activity-modal">


                {/* Modal header */}

                <div className="activity-modal-header">

                    <div>

                        <span className="activity-modal-label">
                            ITINERARY
                        </span>

                        <h2>
                            {activityToEdit ? "Edit Activity" : "Add Activity"}
                        </h2>

                        <p>
                            {activityToEdit
                                ? "Update the details for this activity."
                                : "Add something to your day."}
                        </p>

                    </div>


                    <button
                        type="button"
                        className="activity-close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Selected day */}

                <div className="selected-day">

                    <div>

                        <span className="selected-day-label">
                            DAY {selectedDay}
                        </span>

                        <strong>
                            {formatSelectedDate(selectedDate)}
                        </strong>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>


                    {/* Activity name */}

                    <div className="form-group">

                        <label htmlFor="activity-title">
                            Activity
                        </label>

                        <input
                            id="activity-title"
                            type="text"
                            placeholder="e.g. Visit Museum"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Activity type */}

                    <div className="form-group">

                        <label htmlFor="activity-type">
                            Type
                        </label>

                        <select
                            id="activity-type"
                            value={type}
                            onChange={(event) =>
                                setType(event.target.value)
                            }
                        >

                            <option value="Sightseeing">
                                Sightseeing
                            </option>

                            <option value="Food">
                                Food
                            </option>

                            <option value="Hotel">
                                Hotel
                            </option>

                            <option value="Transport">
                                Transport
                            </option>

                            <option value="Shopping">
                                Shopping
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* Time */}

                    <div className="form-group">

                        <label htmlFor="activity-time">
                            Time
                        </label>

                        <input
                            id="activity-time"
                            type="time"
                            value={time}
                            onChange={(event) =>
                                setTime(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Location */}

                    <div className="form-group">

                        <label htmlFor="activity-location">
                            Location
                        </label>

                        <input
                            id="activity-location"
                            type="text"
                            placeholder="e.g. City Palace"
                            value={location}
                            onChange={(event) =>
                                setLocation(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Notes */}

                    <div className="form-group">

                        <label htmlFor="activity-notes">
                            Notes
                        </label>

                        <textarea
                            id="activity-notes"
                            placeholder="Add any notes..."
                            value={notes}
                            onChange={(event) =>
                                setNotes(event.target.value)
                            }
                        />

                    </div>


                    {/* Error */}

                    {error && (

                        <p className="activity-error">
                            {error}
                        </p>

                    )}


                    {/* Buttons */}

                    <div className="activity-modal-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-activity-button"
                            disabled={saving}
                        >

                            {saving
                                ? activityToEdit
                                    ? "Saving..."
                                    : "Adding..."
                                : activityToEdit
                                    ? "Save Changes"
                                    : "Add Activity"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


export default AddActivity;
