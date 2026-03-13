import React from "react";

function Contact() {
  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Contact</p>
        <h1>Get in touch with the CEMS team</h1>
        <p>Reach out for collaboration, support, club onboarding, or technical assistance.</p>
      </div>

      <div className="split-panel contact-grid">
        <article className="glass-card">
          <h2>Office</h2>
          <p>Student Activity Center</p>
          <p>College Campus </p>
          <p>Mon - Sat: 09:00 AM to 06:00 PM</p>
        </article>

        <article className="glass-card">
          <h2>Help Desk</h2>
          <p>Email: cems-support@college.edu</p>
          <p>Phone: +91 98765 43210</p>
          <p>Coordinator: Event Operations Cell</p>
        </article>
      </div>
    </section>
  );
}

export default Contact;
