import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowLeft, CheckCircle, Send, Loader2 } from "lucide-react";
import "./ApplyPage.css";

// Confetti Particle Generator Component
const Confetti: React.FC = () => {
  const colors = ["#2BB59E", "#7C3AED", "#FFD700", "#FF4500", "#1E90FF", "#00FF7F"];
  return (
    <div className="confetti-container">
      {Array.from({ length: 120 }).map((_, i) => {
        const size = Math.random() * 8 + 6;
        const style = {
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotate(${Math.random() * 360}deg)`,
        };
        return <div key={i} className="confetti-particle" style={style} />;
      })}
    </div>
  );
};

interface ApplyPageProps {
  onBackToHome: () => void;
}

const ApplyPage: React.FC<ApplyPageProps> = ({ onBackToHome }) => {
  const [state, handleSubmit] = useForm("mqeoklje");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    socialMedia: "",
    position: "",
    experience: "",
  });

  useEffect(() => {
    if (state.succeeded) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (!state.succeeded) return;

    let x1 = 0;
    let y1 = 0;
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const dist_to_draw = 50;
    const delay = 1000;
    const fsize = ["1.1rem", "1.4rem", ".8rem", "1.7rem"];
    const colors = [
      "#E23636",
      "#F9F3EE",
      "#E1F8DC",
      "#B8AFE6",
      "#AEE1CD",
      "#5EB0E5",
    ];

    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const selRand = <T,>(o: T[]): T => o[rand(0, o.length - 1)];
    const distanceTo = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const shouldDraw = (x: number, y: number) =>
      distanceTo(x1, y1, x, y) >= dist_to_draw;

    const addStr = (x: number, y: number) => {
      const str = document.createElement("div");
      str.innerHTML = "&#10022;";
      str.className = "star";
      str.style.top = `${y + window.scrollY + rand(-20, 20)}px`;
      str.style.left = `${x + window.scrollX}px`;
      str.style.color = selRand(colors);
      str.style.fontSize = selRand(fsize);
      document.body.appendChild(str);

      const fs = 10 + 5 * parseFloat(getComputedStyle(str).fontSize);
      str.animate(
        [
          {
            transform: "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)",
            opacity: 1,
          },
          {
            transform: `translate3d(0, ${(y + fs) > vh ? vh - y : fs}px, 0) rotateX(${rand(
              1,
              500
            )}deg) rotateY(${rand(1, 500)}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: delay,
          fill: "forwards",
        }
      );

      setTimeout(() => {
        str.remove();
      }, delay);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (shouldDraw(clientX, clientY)) {
        addStr(clientX, clientY);
        x1 = clientX;
        y1 = clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // Clean up any remaining stars in the DOM
      const stars = document.querySelectorAll(".star");
      stars.forEach((star) => star.remove());
    };
  }, [state.succeeded]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getWordCount = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  };

  const wordCount = getWordCount(formData.experience);
  const fillPercent = Math.min(100, (wordCount / 300) * 100);

  // If wordCount > 300, transition color to red. At 450 words, fully red.
  const redRatio = Math.min(1, Math.max(0, (wordCount - 300) / 150));
  const r = Math.round(43 + 196 * redRatio);
  const g = Math.round(181 - 113 * redRatio);
  const b = Math.round(158 - 90 * redRatio);
  const alpha = 0.45 + 0.20 * redRatio;
  const radialBg = `radial-gradient(50% 50% at 50% 100%, rgba(${r}, ${g}, ${b}, ${alpha}) 0%, rgba(${r}, ${g}, ${b}, 0) 100%)`;

  return (
    <div className="apply-page-container container">
      {/* 1. Teal background glow layer */}
      <div
        className="apply-bg-glow teal-glow"
        style={{
          height: state.succeeded ? "100%" : `${30 + fillPercent * 0.7}%`,
          opacity: state.succeeded ? 0 : 0.15 + (fillPercent / 100) * 0.5,
          background: radialBg,
        }}
      />

      {/* 2. Purple background glow layer */}
      <div
        className="apply-bg-glow purple-glow"
        style={{
          height: "100%",
          opacity: state.succeeded ? 0.85 : 0,
        }}
      />

      {/* 3. Confetti on success */}
      {state.succeeded && <Confetti />}

      {state.succeeded ? (
        <div className="apply-success-container-inline">
          <div className="apply-success-card">
            <CheckCircle className="success-icon" size={64} />
            <h2 className="success-title">Submitted!</h2>
            <p className="success-message">
              We will try to get back to you ASAP.
            </p>
            <button className="btn btn-teal success-btn" onClick={onBackToHome}>
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className="apply-back-btn" onClick={onBackToHome}>
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <div className="apply-header">
            <span className="section-label">Join Our Mission</span>
            <h1 className="apply-title">
              Apply to the <span className="text-teal">Team</span>
            </h1>
            <p className="apply-subtitle">
              Help us redistribute medical equipment to communities that need it
              most. Fill out the form below to apply.
            </p>
          </div>

          <div className="apply-card">
            <form onSubmit={handleSubmit} className="apply-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <ValidationError
                    prefix="First Name"
                    field="firstName"
                    errors={state.errors}
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <ValidationError
                    prefix="Last Name"
                    field="lastName"
                    errors={state.errors}
                    className="error-message"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="socialMedia">Social Media Profile (e.g. LinkedIn)</label>
                <input
                  type="url"
                  id="socialMedia"
                  name="socialMedia"
                  required
                  placeholder="https://linkedin.com/in/username"
                  value={formData.socialMedia}
                  onChange={handleChange}
                />
                <ValidationError
                  prefix="Social Media"
                  field="socialMedia"
                  errors={state.errors}
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="position">Position of Interest</label>
                <div className="select-wrapper">
                  <select
                    id="position"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select a position...</option>
                    <option value="outreach">Outreach</option>
                    <option value="marketing">Marketing</option>
                    <option value="social-media">Social Media</option>
                  </select>
                </div>
                <ValidationError
                  prefix="Position"
                  field="position"
                  errors={state.errors}
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">
                  Tell us about your experience and why you want to join
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  required
                  placeholder="Describe your background, what motivates you, and how you hope to contribute to EquipCare..."
                  rows={6}
                  value={formData.experience}
                  onChange={handleChange}
                />
                <div className="textarea-footer">
                  <span className={`word-count ${wordCount >= 450 ? "limit" : wordCount > 300 ? "warning" : ""}`}>
                    {wordCount} / 300 words {wordCount >= 450 ? "(maximum reached)" : wordCount > 300 ? "(please wrap it up!)" : ""}
                  </span>
                </div>
                <ValidationError
                  prefix="Experience"
                  field="experience"
                  errors={state.errors}
                  className="error-message"
                />
              </div>

              <button
                type="submit"
                className="btn btn-teal apply-submit-btn"
                disabled={state.submitting}
              >
                {state.submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} style={{ marginRight: '8px' }} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} style={{ marginRight: '8px' }} />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplyPage;
