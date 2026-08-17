import { BrowserRouter, Routes,Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import DashboardLayout from "./layouts/DashboardLayout";
import TripDetails from "./pages/TripDetails";
import { useState } from "react";
import initialTrips from "./data/trips";


function App() {
  const[trips,setTrips] = useState(initialTrips);
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>

      <Route path="/dashboard" element={ 
        <DashboardLayout>
          <Dashboard/>
        </DashboardLayout>
      }/>

      <Route path="/explore" element={
        <DashboardLayout>
          <Explore/>
        </DashboardLayout>
      } />

      <Route path="/trips/:tripId" element={
        <DashboardLayout>
          <TripDetails trips={trips} setTrips={setTrips}/>
        </DashboardLayout>
      }
      
      />

      
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;