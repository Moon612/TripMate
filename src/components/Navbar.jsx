import "./Navbar.css";

function Navbar(){
    return(
        <header className="navbar">
            <h2 className="logo">TripMate</h2>

            <div className="navbar-right">
                <span>Welcome👋</span>
                <button>Profile</button>
            </div>
        </header>
    );
}

export default Navbar;