import React from "react";
import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <article className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-content">
        <div className="event-header-row">
          <span className="event-chip">{event.type}</span>
          <span className="event-mode">{event.mode}</span>
        </div>

        <h3>{event.title}</h3>

        <div className="event-meta">
          <p>{event.date}</p>
          <p>{event.location}</p>
          <p>{event.time}</p>
        </div>

        <p className="event-desc">{event.description}</p>

        <button className="btn btn-primary" onClick={() => navigate("/register")}>
          Register for Event
        </button>
      </div>
    </article>
  );
}

export default EventCard;
