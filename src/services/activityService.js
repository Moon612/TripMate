import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    getDoc,
    deleteDoc
} from "firebase/firestore";

import db from "../firebase/firestore";


// Get all activities for a trip

export const getActivities = async (
    userId,
    tripId
) => {

    const activitiesCollection = collection(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activities"
    );


    const snapshot = await getDocs(
        activitiesCollection
    );


    const activities = snapshot.docs.map(
        (activityDoc) => ({
            id: activityDoc.id,
            ...activityDoc.data()
        })
    );


    return activities;
};


// Get one activity

export const getActivity = async (
    userId,
    tripId,
    activityId
) => {

    const activityRef = doc(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activities",
        activityId
    );


    const snapshot = await getDoc(
        activityRef
    );


    if (!snapshot.exists()) {
        return null;
    }


    return {
        id: snapshot.id,
        ...snapshot.data()
    };
};


// Add a new activity

export const addActivity = async (
    userId,
    tripId,
    activity
) => {

    const activitiesCollection = collection(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activities"
    );


    const docRef = await addDoc(
        activitiesCollection,
        activity
    );


    return {
        id: docRef.id,
        ...activity
    };
};


// Update an activity

export const updateActivity = async (
    userId,
    tripId,
    activityId,
    updateData
) => {

    const activityRef = doc(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activities",
        activityId
    );


    await updateDoc(
        activityRef,
        updateData
    );
};


// Delete an activity

export const deleteActivity = async (
    userId,
    tripId,
    activityId
) => {

    const activityRef = doc(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activities",
        activityId
    );


    await deleteDoc(
        activityRef
    );
};