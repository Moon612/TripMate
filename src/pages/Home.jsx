import { Link } from "react-router-dom";

function Home(){
    return(
        <div>
            <h1>Welcome to TripMate</h1>
            <p>Plan your next adventure</p>

            <Link to="/login">
                Login
            </Link>
            
            <Link to="/signup">
                Signup
            </Link>
        </div>
    );
}

export default Home;