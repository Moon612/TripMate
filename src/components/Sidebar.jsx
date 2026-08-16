import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar(){
    return(
        <aside className="sidebar">
            <h2>TripMate</h2>

            <nav>
                <Link to ="/dashboard">Dashboard</Link>
                <Link to ="/explore">Explore</Link>
                <Link to ="/trips">My Trips</Link>
                <Link to ="/saved">Saved Places</Link>
            </nav>

            <div className="sidebar-bottom">
                <Link to="/profile">Profile</Link>
            </div>
        </aside>
    );
}

export default Sidebar;