import React from 'react';
import { Code, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-auto py-8">
      <div className="container-custom">
        <div className="glass px-6 py-8 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Code size={24} className="text-primary-600 dark:text-primary-400" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">WebDevMastery</span>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your journey to mastering web development starts here. Interactive tutorials with
                beautiful visualizations.
              </p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tutorials</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/html"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    HTML Basics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/css"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    CSS Styling
                  </Link>
                </li>
                <li>
                  <Link
                    to="/javascript"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    JavaScript Fundamentals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    MDN Web Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://css-tricks.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    CSS Tricks
                  </a>
                </li>
                <li>
                  <a
                    href="https://javascript.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    JavaScript.info
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Subscribe to get the latest tutorials and updates.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full btn-primary text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} WebDevMastery. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;