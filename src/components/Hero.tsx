import React, { useState, useRef, useEffect } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const [isUnmuted, setIsUnmuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the audio instance with local file
    audioRef.current = new Audio("/waterfall.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isUnmuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
    setIsUnmuted(!isUnmuted);
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
