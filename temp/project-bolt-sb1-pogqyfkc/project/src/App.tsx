import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import ThemeSelector from './components/ThemeSelector';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TutorialsPage from './pages/TutorialsPage';
import TutorialDetailPage from './pages/TutorialDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import CommunityPage from './pages/CommunityPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tutorials" element={<TutorialsPage />} />
              <Route path="/tutorial/:id" element={<TutorialDetailPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/community" element={<CommunityPage />} />
            </Routes>
          </main>
          <Footer />
          <ThemeSelector />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;