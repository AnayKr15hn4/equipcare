import React from "react";
import { ArrowRight } from "lucide-react";
import "./JoinCTA.css";

interface JoinCTAProps {
  onViewChange: (view: "home" | "apply") => void;
}

const JoinCTA: React.FC<JoinCTAProps> = ({ onViewChange }) => {
  return (
    <section id="apply" className="join-section">
      <div className="container">
        <div className="join-card">
          {/* Decorative gradient blobs */}
          <div className="join-blob join-blob--teal" />
          <div className="join-blob join-blob--purple" />

          <div className="join-content">
            <span className="section-label">Careers &amp; Volunteering</span>
            <h2 className="join-title">
              Want to make a <span className="text-teal">difference</span>?
            </h2>
            <p className="join-description">
              We're always looking for passionate individuals to join our
              mission. Whether you're a medical professional, logistics expert,
              or simply someone who cares — there's a place for you at
              EquipCare. Browse open positions and apply today.
            </p>

            <div className="join-actions">
              <a
                href="#apply"
                className="btn btn-teal join-apply-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onViewChange("apply");
                }}
              >
                Join the Team
                <ArrowRight size={18} />
              </a>
            </div>

            <p className="join-note">
              No experience required for volunteer roles. We provide full
              training and support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCTA;
