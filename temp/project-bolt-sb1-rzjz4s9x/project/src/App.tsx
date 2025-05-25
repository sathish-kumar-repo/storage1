import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TutorialSection from './components/TutorialSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './styles/main.scss';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="app">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main>
        <Hero 
          authorName="John Doe"
          authorRole="Web Developer & Tutorial Creator"
        />
        <TutorialSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;