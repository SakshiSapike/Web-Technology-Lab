import React from "react";

const galleryItems = [
  {
    title: "Innovation Expo",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Robotics Demo Day",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab10380d0be?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Cultural Evening",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Startup Pitch Arena",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
  }
];

function Gallery() {
  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">Media Gallery</p>
        <h1>Campus Moments</h1>
        <p>Snapshots and videos from recent events, workshops, and student showcases.</p>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <article className="gallery-card" key={item.title}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>

      <article className="glass-card video-card wide">
        <h2>Annual Fest Highlights</h2>
        <div className="video-frame">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80"
            alt="Annual fest highlights"
          />
        </div>
      </article>
    </section>
  );
}

export default Gallery;
