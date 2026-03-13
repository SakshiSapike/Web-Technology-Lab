import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/clubs", label: "Clubs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/register", label: "Register" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Admin" }
];

function Navbar() {
  return (
    <header className="site-header">
      <div className="brand-wrap">
        <span className="brand-badge">CEMS</span>
        <p>College Event Management</p>
      </div>

      <nav className="site-nav" aria-label="Primary Navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
