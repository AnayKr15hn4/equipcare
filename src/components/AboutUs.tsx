import React from "react";
import aboutGraphic from "/logobg.png";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Top Layout (Header Content + Graphic side-by-side) */}
        <div className="about-hero-grid">
          {/* Left Column: Text */}
          <div className="about-content">
            <span className="section-label">Who We Are</span>
            <h2 className="about-title">
              Bridging the gap between{" "}
              <span className="text-teal">surplus</span> and{" "}
              <span className="text-teal">need</span>.
            </h2>
            <p className="about-description">
              EquipCare Foundation is a non-profit organization dedicated to
              redistributing quality medical equipment to under-resourced
              healthcare facilities worldwide. Since our founding, we've
              delivered over 12,000 pieces of equipment to 35+ countries,
              empowering communities with the tools they need for better health
              outcomes.
            </p>
          </div>

          {/* Right Column: Graphic */}
          <div className="about-graphic-container">
            <img
              src={aboutGraphic}
              alt="EquipCare Abstract Cross Emblem"
              className="about-graphic-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
