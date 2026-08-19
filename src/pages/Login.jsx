
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/auth";
import { Link,useNavigate } from "react-router-dom";
import "./Auth.css";

function Login(){
    const navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");

const handleLogin = async(event)=>{
    event.preventDefault();

    setError("")
    try{
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        navigate("/dashboard");
    }
    catch(error){
        setError(error.message);
    }
};

    return (
  <div className="auth-page">
    <div className="auth-card">

      <h1>TripMate</h1>

      <h2>Welcome back</h2>

      <p className="auth-subtitle">
        Login to your TripMate account.
      </p>

      <form onSubmit={handleLogin}>

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
            placeholder="Enter your password"
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
          Login
        </button>

      </form>

      <p className="auth-footer">
        Don't have an account?{" "}
        <Link to="/signup">
          Sign Up
        </Link>
      </p>

    </div>
  </div>
);
}

export default Login;