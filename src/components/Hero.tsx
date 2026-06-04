import React, { useState, useRef, useEffect } from "react";
import "./Hero.css";

// Inline icons for layout safety
const YoutubeIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
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

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
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

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
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

const TiktokIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
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

const Hero: React.FC = () => {
  const [isUnmuted, setIsUnmuted] = useState(true);
  const isUnmutedRef = useRef(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the audio instance with the new local file
    const audio = new Audio("/rmultimediaeu-birds-and-waterfall-250309.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Try playing immediately (might be blocked by browser autoplay policy)
    const playAudio = () => {
      audio.play().catch((err) => {
        console.log("Autoplay prevented by browser, waiting for user interaction.", err);
      });
    };

    playAudio();

    // Play as soon as user interacts with the page (if still unmuted)
    const startOnInteraction = () => {
      if (audio.paused && isUnmutedRef.current) {
        playAudio();
      }
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("scroll", startOnInteraction);
    };

    window.addEventListener("click", startOnInteraction);
    window.addEventListener("scroll", startOnInteraction);

    // Cleanup on unmount
    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("scroll", startOnInteraction);
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    const nextState = !isUnmuted;
    setIsUnmuted(nextState);
    isUnmutedRef.current = nextState;

    if (nextState) {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <section className="hero">
      <div className="hero-content container">
        <div className="hero-text-wrapper">
          <h1 className="hero-heading">
            <span className="heading-line text-white">
              <span>EQUIP</span>
              <span
                className={`inline-media ${isUnmuted ? "unmuted" : ""}`}
                onClick={toggleSound}
                role="button"
                tabIndex={0}
                aria-label={isUnmuted ? "Mute ambient waterfall sound" : "Unmute ambient waterfall sound"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleSound();
                  }
                }}
              >
                <img
                  src="/peaceful-forest-lake-surrounded-by-misty-trees-reflecting-in-calm-water-serene-nature-scene-tranquility-concept-photo.jpg"
                  alt="Misty Forest Lake"
                  className="hero-inline-image"
                />
                <span className="unmute-badge">
                  {isUnmuted ? (
                    <>
                      <span className="sound-wave-container">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                      </span>
                      Mute
                    </>
                  ) : (
                    "Unmute"
                  )}
                </span>
              </span>
              <span>CARE</span>
            </span>
            <span className="heading-line text-teal">AID RECOVERY.</span>
          </h1>

          <p className="hero-subheading">
            Together, we provide essential medical equipment to communities in
            need, ensuring healthcare accessibility for everyone.
          </p>

          <div className="hero-actions-container">
            <button
              className="btn btn-teal hero-cta"
              onClick={() => alert("This page does not exist yet.")}
            >
              Donate Now
            </button>
            <div className="hero-socials-list">
              <a
                href="#"
                className="hero-social-link"
                aria-label="YouTube"
                onClick={(e) => {
                  e.preventDefault();
                  alert("This YouTube channel is not yet linked.");
                }}
              >
                <YoutubeIcon size={20} />
              </a>
              <a
                href="#"
                className="hero-social-link"
                aria-label="Instagram"
                onClick={(e) => {
                  e.preventDefault();
                  alert("This Instagram account is not yet linked.");
                }}
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="#"
                className="hero-social-link"
                aria-label="LinkedIn"
                onClick={(e) => {
                  e.preventDefault();
                  alert("This LinkedIn page is not yet linked.");
                }}
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="#"
                className="hero-social-link"
                aria-label="TikTok"
                onClick={(e) => {
                  e.preventDefault();
                  alert("This TikTok account is not yet linked.");
                }}
              >
                <TiktokIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
