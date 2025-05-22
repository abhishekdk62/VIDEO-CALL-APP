// App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Intro from "./components/ui/Intro";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notification from "./components/Notification";

function App() {
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen flex overflow-auto">
      <div
        className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
          slideOut ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <Intro />
      </div>

      {/* Main App slides in from right and fades in */}
      <div
        className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
          slideOut ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 backdrop-blur-3xl"></div>
            <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-white/5 backdrop-blur-3xl"></div>
            <div className="absolute -bottom-40 right-1/3 w-64 h-64 rounded-full bg-white/5 backdrop-blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <Header />
            <div className="w-full flex items-center justify-center">
              <Notification />
            </div>
            <VideoPlayer />
            <Options />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
