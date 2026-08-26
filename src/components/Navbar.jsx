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
            navigate("/")
        } catch (error) {
            console.error("Logout Failed:", error);
        }
    };

    return (
        <header className="navbar">
            <h2 className="logo">TripMate</h2>

            <div className="navbar-right">

                {currentUser && (
                    <>
                        <span>
                            Welcome:- {currentUser.email} 👋
                        </span>

                        <button>
                            Profile
                        </button>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}

            </div>
        </header>
    );
}

export default Navbar;