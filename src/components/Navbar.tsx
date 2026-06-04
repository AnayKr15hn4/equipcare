import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

interface NavbarProps {
  currentView: "home" | "apply";
  onViewChange: (view: "home" | "apply") => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setMenuOpen(false);
    if (currentView === "apply") {
      e.preventDefault();
      onViewChange("home");
      setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement instanceof HTMLElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    onViewChange("home");
  };

  return (
    <nav className={`navbar${menuOpen ? " navbar--open" : ""}`}>
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <span className="logo-text-bold">EQ</span>
        <span className="logo-divider">|</span>
        <span className="logo-text-light">FOUNDATION</span>
      </div>

      {/* Hamburger / close toggle */}
      <button
        className="navbar-toggle"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile (click outside to close) */}
      {menuOpen && (
        <div className="navbar-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Links + actions wrapper — becomes a slide-in drawer on mobile */}
      <div className="navbar-menu">
        <ul className="navbar-links">
          <li>
            <a href="#home" onClick={(e) => handleLinkClick(e, "#home")}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleLinkClick(e, "#about")}>
              About
            </a>
          </li>
          <li>
            <a href="#community" onClick={(e) => handleLinkClick(e, "#community")}>
              Community
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")}>
              Contact
            </a>
          </li>
        </ul>

        <div className="navbar-actions">
          <a
            href="#apply"
            className="btn btn-outline"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              onViewChange("apply");
            }}
          >
            Join Our Team
          </a>
          <button
            className="btn btn-teal"
            onClick={() => alert("This page does not exist yet.")}
          >
            Donate
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
