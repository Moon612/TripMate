import "./Navbar.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Navbar(){

    const {currentUser} = useContext(AuthContext);
    return(
        <header className="navbar">
            <h2 className="logo">TripMate</h2>

            <div className="navbar-right">
                <span>Welcome:- {currentUser?.email}👋 </span>
                <button>Profile</button>
            </div>
        </header>
    );
}

export default Navbar;