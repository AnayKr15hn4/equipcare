import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  Heart,
  Link,
  Share2,
} from "lucide-react";
import "./Footer.css";

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
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <Globe size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <Heart size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">
                <Link size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="YouTube">
                <Share2 size={18} />
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
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">Fundraise</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <Mail size={16} />
                <a href="mailto:info@equipcare.org">info@equipcare.org</a>
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
