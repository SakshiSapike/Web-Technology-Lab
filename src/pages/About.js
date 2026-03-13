import React from "react";

function About() {
  return (
    <section className="page about-page">
      <div className="page-heading">
        <p className="eyebrow">About CEMS</p>
        <h1>Built for modern campus operations</h1>
        <p>
          CEMS helps students, faculty, and club coordinators run events with transparency,
          better scheduling, and high participation quality.
        </p>
      </div>

      <div className="split-panel">
        <article className="glass-card">
          <h2>What we provide</h2>
          <ul className="feature-list">
            <li>Single dashboard for events, club activities, and registrations</li>
            <li>Structured event publishing workflow with admin controls</li>
            <li>Mobile-friendly UI for quick student access on campus</li>
            <li>Media-rich pages for promotions and event storytelling</li>
          </ul>
        </article>

        <article className="glass-card">
          <h2>Mission</h2>
          <p>
            Enable every student to discover opportunities, build skills, and contribute to an
            active campus culture through reliable digital infrastructure.
          </p>
          <h2>Vision</h2>
          <p>
            Create a connected academic ecosystem where technical and cultural communities can
            scale impact together.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;
