import React from 'react';
import { Link } from 'react-router-dom';
import { Cuboid as Cube3D, Mail, Instagram, Twitter, Youtube } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-6">
              <Cube3D style={{ color: 'var(--color-primary)' }} />
              <span>3D<span style={{ color: 'var(--color-primary)' }}>Mentor</span></span>
            </Link>
            <p className="opacity-80 mb-6">
              The ultimate resource for learning 3D modeling, rendering, and animation techniques.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="p-2 rounded-full transition-colors duration-200"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }}
              >
                <Twitter size={18} style={{ color: 'var(--color-text)' }} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full transition-colors duration-200"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }}
              >
                <Instagram size={18} style={{ color: 'var(--color-text)' }} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full transition-colors duration-200"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }}
              >
                <Youtube size={18} style={{ color: 'var(--color-text)' }} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full transition-colors duration-200"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }}
              >
                <Mail size={18} style={{ color: 'var(--color-text)' }} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/tutorials" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/tutorials?category=modeling" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  3D Modeling
                </Link>
              </li>
              <li>
                <Link 
                  to="/tutorials?category=texturing" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Texturing
                </Link>
              </li>
              <li>
                <Link 
                  to="/tutorials?category=animation" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Animation
                </Link>
              </li>
              <li>
                <Link 
                  to="/tutorials?category=rendering" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Rendering
                </Link>
              </li>
              <li>
                <Link 
                  to="/tutorials?category=printing" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  3D Printing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <p className="opacity-80 mb-2">Have questions or feedback?</p>
            <a 
              href="mailto:contact@3dmentor.com" 
              className="block mb-6"
              style={{ color: 'var(--color-primary)' }}
            >
              contact@3dmentor.com
            </a>
            
            <div className="space-y-3">
              <p className="text-sm opacity-80">
                © 2025 3DMentor. All rights reserved.
              </p>
              <div className="flex gap-4 text-sm">
                <Link 
                  to="/privacy" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms" 
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;