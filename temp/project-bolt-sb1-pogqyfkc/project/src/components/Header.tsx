import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Cuboid as Cube3D, Sun, Moon } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import GlassCard from './GlassCard';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { currentTheme, toggleDarkMode, isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const navLinkClasses = "font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full";
  const activeClasses = "after:w-full";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <GlassCard
        variant={isDarkMode ? 'dark' : (isScrolled ? 'default' : 'light')}
        className="mx-4 md:mx-8 px-4 py-3"
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-xl md:text-2xl group"
          >
            <Cube3D className="transition-transform duration-300 group-hover:rotate-12" style={{ color: 'var(--color-primary)' }} />
            <span>3D<span style={{ color: 'var(--color-primary)' }}>Mentor</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({isActive}) => `${navLinkClasses} ${isActive ? activeClasses : ''}`}
              style={{ 
                color: 'var(--color-text)',
                '--tw-after-bg': 'var(--color-primary)'
              } as React.CSSProperties}
            >
              Home
            </NavLink>
            <NavLink 
              to="/tutorials" 
              className={({isActive}) => `${navLinkClasses} ${isActive ? activeClasses : ''}`}
              style={{ 
                color: 'var(--color-text)',
                '--tw-after-bg': 'var(--color-primary)'
              } as React.CSSProperties}
            >
              Tutorials
            </NavLink>
            <NavLink 
              to="/resources" 
              className={({isActive}) => `${navLinkClasses} ${isActive ? activeClasses : ''}`}
              style={{ 
                color: 'var(--color-text)',
                '--tw-after-bg': 'var(--color-primary)'
              } as React.CSSProperties}
            >
              Resources
            </NavLink>
            <NavLink 
              to="/community" 
              className={({isActive}) => `${navLinkClasses} ${isActive ? activeClasses : ''}`}
              style={{ 
                color: 'var(--color-text)',
                '--tw-after-bg': 'var(--color-primary)'
              } as React.CSSProperties}
            >
              Community
            </NavLink>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Button */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={20} style={{ color: 'var(--color-text)' }} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <Sun size={20} style={{ color: 'var(--color-text)' }} />
              ) : (
                <Moon size={20} style={{ color: 'var(--color-text)' }} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} style={{ color: 'var(--color-text)' }} />
              ) : (
                <Menu size={24} style={{ color: 'var(--color-text)' }} />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        <div
          className={`mt-4 transition-all duration-300 overflow-hidden ${
            isSearchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorials..."
              className="w-full px-4 py-2 rounded-lg bg-white/30 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ color: 'var(--color-text)' }}
            />
            <X
              size={18}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
              onClick={toggleSearch}
              style={{ color: 'var(--color-text)' }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div
          className={`h-full w-3/4 max-w-xs py-6 px-6 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(249, 250, 251, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                <Cube3D style={{ color: 'var(--color-primary)' }} />
                <span>3D<span style={{ color: 'var(--color-primary)' }}>Mentor</span></span>
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={24} style={{ color: 'var(--color-text)' }} />
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-6">
                <li>
                  <NavLink
                    to="/"
                    className={({isActive}) => `block text-lg font-medium ${isActive ? 'text-primary' : ''}`}
                    style={{ color: isActive => isActive ? 'var(--color-primary)' : 'var(--color-text)' }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tutorials"
                    className={({isActive}) => `block text-lg font-medium ${isActive ? 'text-primary' : ''}`}
                    style={{ color: isActive => isActive ? 'var(--color-primary)' : 'var(--color-text)' }}
                  >
                    Tutorials
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/resources"
                    className={({isActive}) => `block text-lg font-medium ${isActive ? 'text-primary' : ''}`}
                    style={{ color: isActive => isActive ? 'var(--color-primary)' : 'var(--color-text)' }}
                  >
                    Resources
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community"
                    className={({isActive}) => `block text-lg font-medium ${isActive ? 'text-primary' : ''}`}
                    style={{ color: isActive => isActive ? 'var(--color-primary)' : 'var(--color-text)' }}
                  >
                    Community
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                {isDarkMode ? (
                  <>
                    <Sun size={18} style={{ color: 'var(--color-text)' }} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={18} style={{ color: 'var(--color-text)' }} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;