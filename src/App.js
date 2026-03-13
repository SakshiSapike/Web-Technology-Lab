import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";
import Register from "./pages/RegistrationForm";
import AdminPanel from "./pages/AdminPanel";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import { defaultClubData } from "./data/clubs";

function App() {
  const [adminEvents, setAdminEvents] = useState([]);
  const [adminClubs, setAdminClubs] = useState(defaultClubData);

  const addEvent = (newEvent) => {
    setAdminEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  const addClub = (newClub) => {
    setAdminClubs((prevClubs) => [newClub, ...prevClubs]);
  };

  return (
    <Router>
      <div className="app-shell">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events adminEvents={adminEvents} />} />
            <Route path="/clubs" element={<Clubs clubs={adminClubs} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/admin"
              element={<AdminPanel addEvent={addEvent} addClub={addClub} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
