import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import "./MeetTheTeam.css";

// Brand icons (LinkedIn) are not exported by this version of lucide-react,
// so we define it locally using Lucide's exact SVG path specifications.
const Linkedin: React.FC<{ size?: number }> = ({ size = 18 }) => (
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

const teamMembers = [
  {
    name: "Anay Krishna",
    role: "Co-Founder & Mentor",
    bio: "Passionate about leveraging technology to build sustainable healthcare solutions. Directs overall strategy and provides mentorship to the leadership team.",
    linkedin: "#",
    email: "mailto:anay@equipcare.org",
  },
  {
    name: "Pranav Ayagari",
    role: "Co-Founder & Head of Outreach",
    bio: "Leads global outreach campaigns and builds partnerships with clinics and donors to ensure equipment reaches under-resourced communities.",
    linkedin: "#",
    email: "mailto:pranav@equipcare.org",
  },
  {
    name: "Arav Patel",
    role: "Co-Founder & Head of Logistics",
    bio: "Coordinates shipping, logistics, and quality assurance processes, making sure every donation is safely delivered and installed.",
    linkedin: "#",
    email: "mailto:aarav@equipcare.org",
  },
  {
    name: "Abhiram Yellelli",
    role: "Co-Founder & Head of PR",
    bio: "Manages public relations, media engagement, and community storytelling, raising awareness about healthcare inequality.",
    linkedin: "#",
    email: "mailto:abhiram@equipcare.org",
  },
  {
    name: "Nischal Gajendra",
    role: "Co-Founder & Head of Finances",
    bio: "Oversees budget allocation, financial transparency, and compliance, ensuring every dollar maximizes direct patient impact.",
    linkedin: "#",
    email: "mailto:nischal@equipcare.org",
  },
];

const MeetTheTeam: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start at original index 0 (extended index 2)
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isAnimating]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    setIsAnimating(false);
    if (currentIndex === 7) {
      setCurrentIndex(2);
    } else if (currentIndex === 1) {
      setCurrentIndex(6);
    }
  };

  const handleDotClick = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index + 2);
  };

  useEffect(() => {
    const section = document.getElementById("community");
    if (!section) return;

    let cards: HTMLElement[] = [];
    const updateCache = () => {
      cards = Array.from(section.querySelectorAll(".team-card")) as HTMLElement[];
    };
    updateCache();

    const observer = new MutationObserver(updateCache);
    observer.observe(section, { childList: true, subtree: true });

    const handleGlobalMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        
        const closestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
        const closestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
        
        const dx = e.clientX - closestX;
        const dy = e.clientY - closestY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxDistance = 300;
        const opacity = distance < maxDistance ? 1 : 0;
        
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        
        card.style.setProperty("--mouse-x", `${mx}px`);
        card.style.setProperty("--mouse-y", `${my}px`);
        card.style.setProperty("--spotlight-opacity", opacity.toFixed(3));
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("resize", updateCache);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("resize", updateCache);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  // Map index from [2..6] to [0..4] for indicators
  const activeOriginalIndex =
    (currentIndex - 2 + teamMembers.length) % teamMembers.length;

  const extendedMembers = [
    teamMembers[teamMembers.length - 2],
    teamMembers[teamMembers.length - 1],
    ...teamMembers,
    teamMembers[0],
    teamMembers[1],
  ];

  return (
    <section id="community" className="team-section">
      <div className="container">
        {/* Header */}
        <div className="team-header">
          <span className="section-label">Our People</span>
          <h2 className="team-title">
            Meet the <span className="text-teal">Team</span>
          </h2>
          <p className="team-subtitle">
            Dedicated professionals united by a single mission — making
            healthcare accessible to everyone, everywhere.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="team-carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow */}
          <button
            className="carousel-arrow left"
            onClick={prevSlide}
            aria-label="Previous team member"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel Viewport */}
          <div
            className="carousel-viewport"
            style={
              {
                "--current-index": currentIndex,
              } as React.CSSProperties
            }
          >
            <div
              className={`carousel-track ${!isAnimating ? "no-transition" : ""}`}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedMembers.map((member, i) => {
                const initials = member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                const isActive = i === currentIndex;

                return (
                  <div
                    className={`carousel-slide ${isActive ? "active" : ""}`}
                    key={i}
                  >
                    <div className="team-card">
                      <div className="team-card-header">
                        <div className="team-avatar">
                          <span className="team-avatar-initials">
                            {initials}
                          </span>
                        </div>
                        <div className="team-identity">
                          <h3 className="team-name">{member.name}</h3>
                          <span className="team-role">{member.role}</span>
                        </div>
                      </div>
                      <p className="team-bio">{member.bio}</p>

                      <div className="team-socials">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert("This LinkedIn profile is not yet linked.");
                          }}
                          className="team-social-link"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin size={18} />
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert("This email is not yet linked.");
                          }}
                          className="team-social-link"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="carousel-arrow right"
            onClick={nextSlide}
            aria-label="Next team member"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="carousel-dots">
          {teamMembers.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === activeOriginalIndex ? "active" : ""}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
