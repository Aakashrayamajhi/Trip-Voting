import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [flicker, setFlicker] = useState(0);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Flickering effect interval
    const interval = setInterval(() => {
      setFlicker(Math.random() * 0.1);
    }, 300);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Extra dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-90"></div>

      {/* Moonlight effect (subtle) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            800px at 20% 20%,
            rgba(100, 120, 150, 0.05) 0%,
            transparent 70%
          )`,
        }}
      />

      {/* Main torchlight effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-100"
        style={{
          background: `radial-gradient(
            250px at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(255, 180, 100, 0.2) 0%,
            rgba(255, 140, 80, 0.1) 30%,
            transparent 80%
          )`,
          opacity: 0.9 + flicker,
        }}
      />

      {/* Light particle flicker */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            2px at ${mousePosition.x + Math.random() * 20 - 10}px ${mousePosition.y + Math.random() * 20 - 10
            }px,
            rgba(255, 220, 150, 0.8),
            transparent
          )`,
          animation: "flicker 2s infinite",
        }}
      />

      <div className="text-center relative z-10 px-4">
        <h1 className="text-6xl font-bold mb-4 text-amber-200 drop-shadow-[0_0_8px_rgba(255,180,50,0.6)]">
          404
        </h1>
        <p className="text-xl text-amber-100 mb-6 drop-shadow-[0_0_4px_rgba(255,180,50,0.4)]">
          Lost in the Dark Woods
        </p>
        <p className="text-amber-100 mb-8 drop-shadow-[0_0_2px_rgba(255,180,50,0.2)]">
          The path{" "}
          <code className="bg-black bg-opacity-60 px-2 py-1 rounded text-amber-200 border border-amber-800">
            {location.pathname}
          </code>{" "}
          leads nowhere
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-amber-800 hover:bg-amber-700 rounded-lg transition-all duration-300 relative overflow-hidden group border border-amber-900 shadow-lg"
        >
          <span className="relative z-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Follow the Torchlight Home
          </span>
          <span
            className="absolute inset-0 bg-amber-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(120px at ${mousePosition.x
                }px ${mousePosition.y}px, rgba(255,240,200,0.6), transparent)`,
            }}
          />
        </a>
      </div>

      {/* Forest silhouette at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-0"></div>
      <div
        className="absolute bottom-0 left-0 w-full h-64 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
        }}
      ></div>

      {/* Custom torch flame cursor */}
      <div
        className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: "24px",
          height: "24px",
          background: `radial-gradient(12px, rgba(255,200,100,0.8), rgba(255,100,50,0.4), transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      ></div>
    </div>
  );
};

export default NotFound;
