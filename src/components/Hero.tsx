import React, { useState, useRef, useEffect } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const [isUnmuted, setIsUnmuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef(false);

  useEffect(() => {
    // Create the audio instance with the new local file
    const audio = new Audio("/rmultimediaeu-birds-and-waterfall-250309.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const handlePlay = () => {
      setIsUnmuted(true);
    };

    const handlePause = () => {
      setIsUnmuted(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Try playing immediately (might be blocked by browser autoplay policy)
    audio.play().catch((err) => {
      console.log("Autoplay prevented by browser, waiting for user interaction.", err);
    });

    // Play as soon as user interacts with the page (if still unmuted)
    const startOnInteraction = () => {
      if (audio.paused && !userPausedRef.current) {
        audio.play().catch((err) => {
          console.log("Play failed on interaction:", err);
        });
      }
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
    };

    window.addEventListener("click", startOnInteraction);
    window.addEventListener("keydown", startOnInteraction);

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("click", startOnInteraction);
      window.removeEventListener("keydown", startOnInteraction);
      audioRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      userPausedRef.current = false;
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    } else {
      userPausedRef.current = true;
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
