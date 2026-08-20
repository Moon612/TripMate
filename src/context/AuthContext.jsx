import { createContext,useContext,useEffect,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/auth";

const AuthContext = createContext();

function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
        });

        return unsubscribe;
    },[]);

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export {AuthProvider};