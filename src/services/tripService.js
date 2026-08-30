import { collection, getDocs, addDoc,doc,updateDoc,getDoc,deleteDoc} from "firebase/firestore";
import db from "../firebase/firestore";

export const getTrips = async(userId)=>{
    const tripsCollection = collection(
        db,
        "users",
        userId,
        "trips"
    );

    const snapshot = await getDocs(tripsCollection);

    const trips = snapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data()
    }));

    return trips;
};

export const getTrip = async(userId,tripId)=>{
    const tripRef =doc(
        db,
        "users",
        userId,
        "trips",
        tripId
    );

    const snapshot = await getDoc(tripRef);

    if(!snapshot.exists()){
        return null;
    }

    return{
        id:snapshot.id,
        ...snapshot.data()
    }
}

export const addTrip = async(userId,trip)=> {
    const tripsCollection = collection(
        db,
        "users",
        userId,
        "trips"
    );

    const docRef = await addDoc(tripsCollection,trip);

    return{
        id: docRef.id,
        ...trip
    }
};

export const updateTrip = async (userId, tripId, updatedData) => {
    const tripRef = doc(
        db,
        "users",
        userId,
        "trips",
        tripId
    );

    await updateDoc(tripRef, updatedData);
};

export const deleteTrip = async (userId,tripId)=>{
    const tripRef = doc(
        db,
        "users",
        userId,
        "trips",
        tripId
    );

    await deleteDoc(tripRef);
};