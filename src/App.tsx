import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import MeetTheTeam from "./components/MeetTheTeam";
import JoinCTA from "./components/JoinCTA";
import Footer from "./components/Footer";
import ApplyPage from "./components/ApplyPage";
import "lenis/dist/lenis.css";
import "./App.css";

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const lenisRef = useRef<Lenis | null>(null);
  const pathRef = useRef(path);

  // Sync pathRef with path state
  useEffect(() => {
    pathRef.current = path;
    
    // Scroll to top immediately when switching views
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      
      // Delay reset to wait for DOM layout reflow and prevent browser scroll clamping
      const timer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
      }, 50);

      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [path]);

  const navigate = (newPath: string) => {
    window.history.pushState(null, "", newPath);
    setPath(newPath);
  };

  useEffect(() => {
    // Listen to browser forward/back buttons
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    });
    lenisRef.current = lenis;

    // Setup the requestAnimationFrame loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Global hash anchor click interceptor for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      // If we are currently on the apply page, do not intercept default anchor behavior
      if (pathRef.current === "/apply") {
        return;
      }

      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        if (href === "#" || href === "#home") {
          lenis.scrollTo(0);
        } else {
          const targetElement = document.querySelector(href);
          if (targetElement instanceof HTMLElement) {
            lenis.scrollTo(targetElement);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("popstate", handlePopState);
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <Navbar currentView={path === "/apply" ? "apply" : "home"} onViewChange={(view) => navigate(view === "apply" ? "/apply" : "/")} />

      {path === "/apply" ? (
        <ApplyPage onBackToHome={() => navigate("/")} />
      ) : (
        <>
          <div className="hero-page-wrapper">
            <Hero />

            {/* Eclipse arc — spans from top of page through and below hero */}
            <svg
              className="hero-arc-svg"
              viewBox="0 0 598 1310"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="ellipseGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#2BB59E" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>

              <ellipse
                cx="760.5"
                cy="609.5"
                rx="760.5"
                ry="609.5"
                fill="url(#ellipseGradient)"
              />
              <ellipse cx="676" cy="491" rx="510" ry="430" fill="#0A121A" />
            </svg>
          </div>

          <AboutUs />
          <MeetTheTeam />
          <JoinCTA onViewChange={(view) => navigate(view === "apply" ? "/apply" : "/")} />
        </>
      )}

      <Footer onViewChange={(view) => navigate(view === "apply" ? "/apply" : "/")} />
    </>
  );
}

export default App;
