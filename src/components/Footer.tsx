import React from "react";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import "./Footer.css";

// Defining inline icons to avoid dependency compatibility issues
const YoutubeIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TiktokIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface FooterProps {
  onViewChange: (view: "home" | "apply") => void;
}

const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    onViewChange("home");
    setTimeout(() => {
      const targetElement = document.querySelector(hash);
      if (targetElement instanceof HTMLElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        {/* Top row */}
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <div className="footer-logo" onClick={() => onViewChange("home")} style={{ cursor: "pointer" }}>
              <span className="logo-text-bold">EQ</span>
              <span className="logo-divider">|</span>
              <span className="logo-text-light">FOUNDATION</span>
            </div>
            <p className="footer-tagline">
              Redistributing quality medical equipment to under-resourced
              healthcare facilities worldwide. Together, we make care
              accessible.
            </p>
            <div className="footer-socials">
              <a
                href="#"
                className="footer-social-link"
                aria-label="YouTube"
                onClick={(e) => {
                  e.preventDefault();
                  alert("This YouTube channel is not yet linked.");
                }}
              >
                <YoutubeIcon size={18} />
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="Instagram"
                onClick={(e) => {
                  e.preventDefault();
                  alert("This Instagram account is not yet linked.");
                }}
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="LinkedIn"
                onClick={(e) => {
                  e.preventDefault();
                  alert("This LinkedIn page is not yet linked.");
                }}
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="TikTok"
                onClick={(e) => {
                  e.preventDefault();
                  alert("This TikTok account is not yet linked.");
                }}
              >
                <TiktokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onViewChange("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </a>
              </li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, "#about")}>About Us</a></li>
              <li><a href="#community" onClick={(e) => handleLinkClick(e, "#community")}>Meet the Team</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, "#contact")}>Contact</a></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="footer-col">
            <h4 className="footer-col-title">Get Involved</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="#donate"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("This page does not exist yet.");
                  }}
                >
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="#apply"
                  onClick={(e) => {
                    e.preventDefault();
                    onViewChange("apply");
                  }}
                >
                  Join Our Team
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <Mail size={16} />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("This email is not yet linked.");
                  }}
                >
                  equipcaresocials@gmail.com
                </a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>123 Health Ave, Suite 400<br />Washington, DC 20001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom row */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} EquipCare Foundation. All rights
            reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
