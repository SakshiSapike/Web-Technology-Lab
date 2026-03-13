import React from "react";
import { Link } from "react-router-dom";

const quickStats = [
  { label: "Active Clubs", value: "24" },
  { label: "Events This Semester", value: "62" },
  { label: "Student Registrations", value: "3,400+" }
];

const highlights = [
  "Centralized event approvals and communication",
  "Live capacity tracking for workshops",
  "Digital pass and attendee management"
];

function Home() {
  return (
    <section className="page page-home">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Campus Experience Platform</p>
          <h1>Organize, discover, and join college events with confidence.</h1>
          <p>
            CEMS brings clubs, departments, and students together through one professional
            interface for planning, registration, and activity engagement.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/events">
              Explore Events
            </Link>
            <Link className="btn btn-ghost" to="/register">
              Register Now
            </Link>
          </div>
        </div>

        <div className="hero-media">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
            alt="Students in collaborative event planning"
          />
        </div>
      </div>

      <div className="stats-grid">
        {quickStats.map((stat) => (
          <article className="glass-card" key={stat.label}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </article>
        ))}
      </div>

      <div className="split-panel">
        <article className="glass-card">
          <h2>Why teams choose CEMS</h2>
          <ul className="feature-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="text-link" to="/about">
            Learn about the platform
          </Link>
        </article>

        <article className="glass-card video-card">
          <h2>Event Showcase</h2>
          <div className="video-frame">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80"
              alt="College event highlights"
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default Home;
