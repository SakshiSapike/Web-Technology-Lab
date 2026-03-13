import React, { useMemo, useState } from "react";
import EventCard from "./EventCard";

const baseEvents = [
  {
    type: "Coding",
    title: "Campus Hackathon",
    date: "April 10, 2026",
    location: "Main Auditorium",
    time: "09:00 AM - 09:00 PM",
    mode: "Offline",
    description: "Solve real campus problems in teams and pitch to faculty and industry guests.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80"
  },
  {
    type: "AI",
    title: "AI Workshop Week",
    date: "April 15, 2026",
    location: "Innovation Lab",
    time: "10:30 AM - 04:00 PM",
    mode: "Hybrid",
    description: "Hands-on sessions on model development, deployment, and responsible AI practices.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    type: "Cultural",
    title: "Spring Cultural Night",
    date: "April 20, 2026",
    location: "Open Air Theatre",
    time: "06:00 PM - 10:00 PM",
    mode: "Offline",
    description: "Music, dance, drama, and visual art performances from all departments.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80"
  }
];

function Events({ adminEvents = [] }) {
  const [filter, setFilter] = useState("All");

  const normalizedAdminEvents = useMemo(
    () =>
      adminEvents.map((event) => ({
        type: event.type || "General",
        title: event.name,
        date: event.date,
        location: event.location || "Campus Venue",
        time: event.time || "To be announced",
        mode: event.mode || "Offline",
        description: event.description || "New event announced by admin.",
        image:
          event.image ||
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80"
      })),
    [adminEvents]
  );

  const allEvents = [...normalizedAdminEvents, ...baseEvents];

  const visibleEvents =
    filter === "All" ? allEvents : allEvents.filter((event) => event.type === filter);

  const categories = ["All", ...new Set(allEvents.map((event) => event.type))];

  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Event Details</p>
        <h1>Upcoming Events</h1>
        <p>Find technical, cultural, and career-focused opportunities across the campus.</p>
      </div>

      <div className="filter-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={filter === category ? "chip active" : "chip"}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {visibleEvents.map((event) => (
          <EventCard key={`${event.title}-${event.date}`} event={event} />
        ))}
      </div>
    </section>
  );
}

export default Events;
