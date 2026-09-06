import {collection,getDocs, addDoc,doc,updateDoc,getDoc,deleteDoc } from "firebase/firestore";

import db from "../firebase/firestore";

export const getActivities = async(userId,tripId) =>{
    const activitiesCollection = collection(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activities"
    );

    const snapshot = await getDocs(activitiesCollection);

    const activities = snapshot.docs.map((doc) =>({
        id: doc.id,
        ...doc.data()
    }));

    return activities;
};

// Get one Activity 

export const getActivity = async(userId,tripId,activityId)=>{
    const activityRef = doc(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activityId"
    );

    const snapshot = await getDoc(activityRef)

    if(!snapshot.exists()){
        return null;
    }

    return{
        id: snapshot.id,
        ...snapshot.data()
    };
};

//Add a new Activity 
export const addActivity = async (userId, tripId, activity) => {
    const activitiesCollection = collection(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activities"
    );

    const docRef = await addDoc(activitiesCollection,activity);

    return{
        id: docRef.id,
        ...activity
    }
};

//update an activity 

export const updateActivity = async ( userId, tripId,activityId,updateData) =>{

    const activityRef = doc(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activities",
        activityId
    );

    await updateDoc(activityRef,updateData);
};

//Delete an activity

export const deleteActivity = async(userId,tripId,activityId) =>{
    const activityRef = doc(
        db,
        "users",
        userId,
        "trips",
        tripId,
        "activities",
        activityId
    );

    await deleteDoc(activityRef);
};