import React from 'react';
import { Github, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer glass">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#" className="footer-link">Home</a>
          <a href="#" className="footer-link">Tutorials</a>
          <a href="#" className="footer-link">Examples</a>
          <a href="#" className="footer-link">Documentation</a>
          <a href="#" className="footer-link">About</a>
        </div>
        
        <div className="social-links flex justify-center gap-md" style={{ marginBottom: 'var(--space-lg)' }}>
          <a href="#" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="#" aria-label="YouTube">
            <Youtube size={20} />
          </a>
        </div>
        
        <p className="footer-copyright">
          © {new Date().getFullYear()} GlassMorphic Tutorials. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;