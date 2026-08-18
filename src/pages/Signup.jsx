import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/auth";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Auth.css";


function Signup(){

    const navigate = useNavigate();

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");

     

    const handleSignup = async(event)=>{
        event.preventDefault();
        setError("");

        try{
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            navigate("/dashboard");
        }
        catch(error) {
            setError(error.message);
        }
    };

     return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>TripMate</h1>

        <h2>Create your account</h2>

        <p className="auth-subtitle">
          Start planning your next adventure.
        </p>

        <form onSubmit={handleSignup}>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;