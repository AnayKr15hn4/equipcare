import React from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content container">
        <div className="hero-text-wrapper">
          <h1 className="hero-heading">
            <span className="heading-line text-white">
              <span>EQUIP</span>
              <span className="inline-media">
                <span className="unmute-badge">Unmute</span>
              </span>
              <span>CARE</span>
            </span>
            <span className="heading-line text-teal">AID RECOVERY.</span>
          </h1>

          <p className="hero-subheading">
            Together, we provide essential medical equipment to communities in
            need, ensuring healthcare accessibility for everyone.
          </p>

          <button
            className="btn btn-teal hero-cta"
            onClick={() => alert("This page does not exist yet.")}
          >
            Donate Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
