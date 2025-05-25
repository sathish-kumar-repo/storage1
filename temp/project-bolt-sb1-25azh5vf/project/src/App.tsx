import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThreeBackground from "./components/ThreeBackground";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HtmlTutorial from "./pages/HtmlTutorial";
import CssTutorial from "./pages/CssTutorial";
import JsTutorial from "./pages/JsTutorial";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className="relative min-h-screen">
        <ThreeBackground theme={theme} />
        <div className="relative z-10">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main className="container-custom pb-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/html" element={<HtmlTutorial />} />
              <Route path="/css" element={<CssTutorial />} />
              <Route path="/javascript" element={<JsTutorial />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
