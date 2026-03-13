import React, { useState } from "react";

const defaultEvent = {
  name: "",
  type: "",
  date: "",
  location: "",
  time: "",
  mode: "Offline",
  description: "",
  image: ""
};

const defaultClub = {
  icon: "",
  name: "",
  theme: "blue",
  members: "",
  description: "",
  activities: ""
};

function AdminPanel({ addEvent, addClub }) {
  const [eventData, setEventData] = useState(defaultEvent);
  const [clubData, setClubData] = useState(defaultClub);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClubChange = (e) => {
    const { name, value } = e.target;
    setClubData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    addEvent(eventData);
    alert("Event added successfully.");
    setEventData(defaultEvent);
  };

  const handleClubSubmit = (e) => {
    e.preventDefault();

    addClub({
      ...clubData,
      activities: clubData.activities
        .split(",")
        .map((activity) => activity.trim())
        .filter(Boolean)
    });
    alert("Club added successfully.");
    setClubData(defaultClub);
  };

  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Admin Console</p>
        <h1>Manage Events and Clubs</h1>
        <p>Publish approved event details and onboard clubs that should appear on the public pages.</p>
      </div>

      <div className="split-panel">
        <form className="form-panel admin-form" onSubmit={handleEventSubmit}>
          <div className="page-heading">
            <h2>Add New Event</h2>
            <p>Create an event entry that appears immediately on the Events page.</p>
          </div>

          <div className="form-grid">
            <label>
              Event Name
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleEventChange}
                required
              />
            </label>

            <label>
              Event Type
              <select name="type" value={eventData.type} onChange={handleEventChange} required>
                <option value="">Select type</option>
                <option value="Coding">Coding</option>
                <option value="AI">AI</option>
                <option value="Cultural">Cultural</option>
                <option value="Management">Management</option>
              </select>
            </label>

            <label>
              Event Date
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleEventChange}
                required
              />
            </label>

            <label>
              Location
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleEventChange}
                required
              />
            </label>

            <label>
              Time Slot
              <input
                type="text"
                name="time"
                value={eventData.time}
                onChange={handleEventChange}
                placeholder="09:00 AM - 12:00 PM"
                required
              />
            </label>

            <label>
              Mode
              <select name="mode" value={eventData.mode} onChange={handleEventChange}>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Online">Online</option>
              </select>
            </label>

            <label className="full-width">
              Banner Image URL
              <input
                type="url"
                name="image"
                value={eventData.image}
                onChange={handleEventChange}
                placeholder="https://images..."
              />
            </label>

            <label className="full-width">
              Description
              <textarea
                name="description"
                rows="4"
                value={eventData.description}
                onChange={handleEventChange}
                required
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary form-submit">
            Add Event
          </button>
        </form>

        <form className="form-panel admin-form" onSubmit={handleClubSubmit}>
          <div className="page-heading">
            <h2>Add New Club</h2>
            <p>Create a club card with activities that students can browse on the Clubs page.</p>
          </div>

          <div className="form-grid">
            <label>
              Club Name
              <input
                type="text"
                name="name"
                value={clubData.name}
                onChange={handleClubChange}
                required
              />
            </label>

            <label>
              Icon
              <input
                type="text"
                name="icon"
                value={clubData.icon}
                onChange={handleClubChange}
                placeholder="AI"
                maxLength="6"
                required
              />
            </label>

            <label>
              Theme
              <select name="theme" value={clubData.theme} onChange={handleClubChange}>
                <option value="blue">Blue</option>
                <option value="violet">Violet</option>
                <option value="cyan">Cyan</option>
                <option value="rose">Rose</option>
              </select>
            </label>

            <label>
              Members Label
              <input
                type="text"
                name="members"
                value={clubData.members}
                onChange={handleClubChange}
                placeholder="120+ Members"
                required
              />
            </label>

            <label className="full-width">
              Description
              <textarea
                name="description"
                rows="4"
                value={clubData.description}
                onChange={handleClubChange}
                required
              />
            </label>

            <label className="full-width">
              Activities
              <textarea
                name="activities"
                rows="4"
                value={clubData.activities}
                onChange={handleClubChange}
                placeholder="Workshop, Competition Prep, Community Meetup"
                required
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary form-submit">
            Add Club
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminPanel;
