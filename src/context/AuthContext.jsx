import { createContext,useContext,useEffect,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/auth";

const AuthContext = createContext();

function AuthContext({children}){
    const [currentUser, setCurrentUser] = useState(null);

}