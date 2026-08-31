import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-content">

                <div className="sidebar-section">
                    <p className="sidebar-label">MENU</p>

                    <nav className="sidebar-nav">

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? "nav-item active" : "nav-item"
                            }
                        >
                            <span className="nav-icon">⌂</span>
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink
                            to="/explore"
                            className={({ isActive }) =>
                                isActive ? "nav-item active" : "nav-item"
                            }
                        >
                            <span className="nav-icon">⌕</span>
                            <span>Explore</span>
                        </NavLink>

                        <NavLink
                            to="/trips"
                            className={({ isActive }) =>
                                isActive ? "nav-item active" : "nav-item"
                            }
                        >
                            <span className="nav-icon">✈</span>
                            <span>My Trips</span>
                        </NavLink>

                        <NavLink
                            to="/saved"
                            className={({ isActive }) =>
                                isActive ? "nav-item active" : "nav-item"
                            }
                        >
                            <span className="nav-icon">♡</span>
                            <span>Saved Places</span>
                        </NavLink>

                    </nav>
                </div>

            </div>


            <div className="sidebar-bottom">

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <span className="nav-icon">◎</span>
                    <span>Profile</span>
                </NavLink>

            </div>

        </aside>
    );
}

export default Sidebar;