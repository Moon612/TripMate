import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/MyTrips";
import AddTrip from "./pages/AddTrip";
import DashboardLayout from "./layouts/DashboardLayout";


function App() {


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
                                <TripDetails/>
                        </ProtectedLayout>

                    }
                />

                <Route
                    path="/trips/new"
                    element={
                        <ProtectedLayout>
                            <AddTrip />
                        </ProtectedLayout>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;