import React, { useState } from "react";

function Clubs({ clubs }) {
  const [openClubIndex, setOpenClubIndex] = useState(null);

  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Club Activities</p>
        <h1>Student Clubs</h1>
        <p>Discover communities that match your interests and build your campus profile.</p>
      </div>

      <div className="clubs-grid">
        {clubs.map((club, index) => {
          const open = openClubIndex === index;

          return (
            <article key={club.name} className={`club-card ${club.theme}`}>
              <div className="club-icon-circle">{club.icon}</div>
              <h3>{club.name}</h3>
              <p className="club-description">{club.description}</p>
              <span className="club-members">{club.members}</span>

              <button
                type="button"
                className="btn club-view-btn"
                onClick={() => setOpenClubIndex(open ? null : index)}
              >
                {open ? "Hide Activities" : "View Activities"}
              </button>

              {open && (
                <ul className="club-events">
                  {club.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Clubs;
