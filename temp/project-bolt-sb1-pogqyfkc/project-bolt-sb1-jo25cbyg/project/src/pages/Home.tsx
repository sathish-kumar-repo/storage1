import React from "react";
import {
  Code,
  Layout,
  Paintbrush,
  Palette,
  Layers,
  Sparkles,
} from "lucide-react";
import TutorialCard from "../components/TutorialCard";

const Home: React.FC = () => {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero-background">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
        </div>

        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title slide-up">Thrive with Lunexa</h1>
            <p className="hero-description slide-up">
              Giga Life is your all-in-one hub for personal growth, wellbeing,
              and life balance. Discover curated insights across wealth, health,
              habits, mindset, and relationships — all designed to help you live
              with more clarity, purpose, and confidence. Access trusted
              resources anytime, stay motivated daily, and transform your
              lifestyle, one simple step at a time. Join a growing community
              committed to living smarter, healthier, and more fulfilled lives.
            </p>

            <div className="hero-actions slide-up">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-ghost">View Examples</button>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="text-center">
            <h2>Why Glassmorphism?</h2>
            <p
              className="subtitle"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              Glassmorphism provides a modern, elegant aesthetic that enhances
              user experience through depth and visual hierarchy.
            </p>
          </div>

          <div className="features-grid grid grid-cols-3">
            <div className="feature-card glass glass-card">
              <div className="feature-icon">
                <Layout size={28} />
              </div>
              <h3 className="feature-title">Modern UI Design</h3>
              <p>
                Create sleek, contemporary interfaces with the popular
                glassmorphism effect used by leading tech companies.
              </p>
            </div>

            <div className="feature-card glass glass-card">
              <div className="feature-icon">
                <Paintbrush size={28} />
              </div>
              <h3 className="feature-title">Endless Customization</h3>
              <p>
                Personalize every aspect of your design with our powerful theme
                customization tools and settings.
              </p>
            </div>

            <div className="feature-card glass glass-card">
              <div className="feature-icon">
                <Code size={28} />
              </div>
              <h3 className="feature-title">Easy Implementation</h3>
              <p>
                Follow our step-by-step tutorials to implement glassmorphism
                effects in your projects with ease.
              </p>
            </div>

            <div className="feature-card glass glass-card">
              <div className="feature-icon">
                <Sparkles size={28} />
              </div>
              <h3 className="feature-title">Stunning Effects</h3>
              <p>
                Learn to create beautiful blur, transparency, and lighting
                effects that elevate your designs.
              </p>
            </div>

            <div className="feature-card glass glass-card">
              <div className="feature-icon">
                <Layers size={28} />
              </div>
              <h3 className="feature-title">Depth & Dimension</h3>
              <p>
                Add visual hierarchy and spatial awareness to your interfaces
                through layered design elements.
              </p>
            </div>

            <div className="feature-card glass glass-card">
              <div className="feature-icon">
                <Palette size={28} />
              </div>
              <h3 className="feature-title">Color Theory</h3>
              <p>
                Master the art of color selection for glassmorphism to create
                visually cohesive and attractive designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorials">
        <div className="container">
          <div className="tutorials-header text-center">
            <h2>Popular Tutorials</h2>
            <p
              className="subtitle"
              style={{ maxWidth: "600px", margin: "0 auto" }}
            >
              Start learning with our most popular glassmorphism design
              tutorials and examples.
            </p>
          </div>

          <div className="tutorials-grid">
            <TutorialCard
              title="Glassmorphism Basics"
              description="Learn the fundamentals of glassmorphism UI design and how to implement it in your projects."
              difficulty="beginner"
              progress={0}
              image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />

            <TutorialCard
              title="Advanced Glass Effects"
              description="Master complex glassmorphism techniques including dynamic lighting and advanced blur effects."
              difficulty="advanced"
              progress={0}
              image="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />

            <TutorialCard
              title="Theme Customization"
              description="Create custom theme systems with dynamic color palettes and glassmorphism variations."
              difficulty="intermediate"
              progress={30}
              image="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
