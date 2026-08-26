import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/MyTrips";
import { useState } from "react";
import initialTrips from "./data/trips";

function App() {

    const [trips, setTrips] = useState(initialTrips);

    return (
        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />


                {/* Protected Routes */}

                <Route
                  path="/dashboard"
                  element={
                      <ProtectedLayout>
                          <Dashboard />
                      </ProtectedLayout>
                  }
                />

                <Route
                    path="/explore"
                    element={
                         <ProtectedLayout>
                            <Explore />
                          </ProtectedLayout>
                    }
                />

                <Route
                    path="/trips"
                    element={
                        <ProtectedLayout>
                          <MyTrips />
                        </ProtectedLayout>
                    }
                />

                <Route
                    path="/trips/:tripId"
                    element={
                        <ProtectedLayout>
                            <TripDetails
                              trips={trips}
                              setTrips={setTrips}
                            />
                        </ProtectedLayout>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;