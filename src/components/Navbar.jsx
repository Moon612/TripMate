import "./Navbar.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { signOut } from "firebase/auth";
import auth from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Logout Failed:", error);
        }
    };

    return (
        <header className="navbar">

            <div className="navbar-brand">
                <div className="navbar-logo-icon">
                    ✈
                </div>

                <div>
                    <h2 className="logo">TripMate</h2>
                    <span className="navbar-tagline">
                        Your journey, organized.
                    </span>
                </div>
            </div>

            {currentUser && (
                <div className="navbar-right">

                    <div className="navbar-user">

                        <div className="user-avatar">
                            {currentUser.email?.charAt(0).toUpperCase()}
                        </div>

                        <div className="user-info">
                            <span className="user-name">
                                Traveler
                            </span>

                            <span className="user-email">
                                {currentUser.email}
                            </span>
                        </div>

                    </div>

                    <div className="navbar-divider"></div>

                    <button
                        className="profile-button"
                        onClick={() => navigate("/profile")}
                    >
                        Profile
                    </button>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>
            )}

        </header>
    );
}

export default Navbar;