import React from 'react';
import { FileCode, Layout, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TutorialCard from '../components/TutorialCard';

const Home: React.FC = () => {
  return (
    <div className="mt-8 sm:mt-16">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="glass p-8 sm:p-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Master Web Development
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              {' '}with Interactive Tutorials
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn HTML, CSS, and JavaScript through immersive, step-by-step tutorials with
            3D visualizations and interactive code examples.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/html" className="btn-primary text-center">
              Start Learning
            </Link>
            <a
              href="#tutorials"
              className="btn bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500 text-center"
            >
              Explore Tutorials
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Learn With Us?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Our unique approach combines visual learning with practical examples to help you
            understand web development concepts more effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
              <FileCode size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Interactive Examples
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Edit code directly in the browser and see results in real-time to reinforce your
              learning.
            </p>
          </div>

          <div className="glass p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900 dark:bg-opacity-20 flex items-center justify-center text-secondary-600 dark:text-secondary-400 mb-4">
              <Layout size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Visual Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              3D visualizations and animations help you understand complex concepts more
              intuitively.
            </p>
          </div>

          <div className="glass p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-accent-100 dark:bg-accent-900 dark:bg-opacity-20 flex items-center justify-center text-accent-600 dark:text-accent-400 mb-4">
              <Terminal size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Progressive Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start with basics and progressively build more complex projects as you advance your
              skills.
            </p>
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section id="tutorials" className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Tutorials
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            From the fundamentals to advanced techniques, our comprehensive tutorials will take
            you through every aspect of modern web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TutorialCard
            title="HTML Fundamentals"
            description="Learn the building blocks of the web. Master HTML tags, attributes, and semantic markup."
            icon={<FileCode size={24} />}
            to="/html"
            difficulty="Beginner"
            estimatedTime="2 hours"
          />

          <TutorialCard
            title="CSS Styling"
            description="Transform your HTML with CSS. Learn selectors, box model, flexbox, grid, and animations."
            icon={<Layout size={24} />}
            to="/css"
            difficulty="Intermediate"
            estimatedTime="3 hours"
          />

          <TutorialCard
            title="JavaScript Basics"
            description="Bring your websites to life with JavaScript. Learn syntax, DOM manipulation, and events."
            icon={<Terminal size={24} />}
            to="/javascript"
            difficulty="Intermediate"
            estimatedTime="4 hours"
          />
        </div>

        <div className="text-center mt-10">
          <Link
            to="/html"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
          >
            View All Tutorials
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mb-16">
        <div className="glass p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40 p-6 rounded-xl">
              <div className="flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "The 3D visualizations helped me understand CSS positioning in ways traditional
                  tutorials never could. The interactive examples were a game-changer!"
                </p>
                <div className="mt-auto">
                  <div className="font-medium text-gray-900 dark:text-white">Alex Johnson</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Frontend Developer
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40 p-6 rounded-xl">
              <div className="flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "I tried many JavaScript tutorials before, but this site's approach with
                  progressive learning and immediate feedback finally made it click for me."
                </p>
                <div className="mt-auto">
                  <div className="font-medium text-gray-900 dark:text-white">Sarah Miller</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">UX Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="glass p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Web Development Journey?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have successfully mastered web development with our
            interactive tutorials.
          </p>
          <Link to="/html" className="btn-primary">
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;