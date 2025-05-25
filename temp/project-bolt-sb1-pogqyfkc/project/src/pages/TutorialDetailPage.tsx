import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, LayoutList, ChevronRight, Bookmark, Share2 } from 'lucide-react';
import { tutorials } from '../data/tutorials';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TutorialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tutorial = tutorials.find(t => t.id === id);
  const { isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const headerRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const contentRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 200 });
  const sidebarRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, delay: 400 });
  
  useEffect(() => {
    // Reset step when tutorial changes
    setCurrentStep(1);
    
    // Check if tutorial is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(id));
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (isBookmarked) {
      const newBookmarks = bookmarks.filter((bookmarkId: string) => bookmarkId !== id);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    } else {
      bookmarks.push(id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tutorial?.title,
          text: tutorial?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tutorial not found</h2>
          <p className="mb-6 opacity-80">The tutorial you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/tutorials" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white'
            }}
          >
            <ArrowLeft size={18} />
            Back to Tutorials
          </Link>
        </div>
      </div>
    );
  }
  
  const levelClass = `level-${tutorial.level}`;
  
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back Link */}
        <Link 
          to="/tutorials" 
          className="inline-flex items-center gap-1 mb-6 opacity-80 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          <span>Back to Tutorials</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tutorial Header */}
            <div ref={headerRef} className="slide-up mb-8">
              <span className={`level-badge ${levelClass} inline-block mb-3`}>
                {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{tutorial.title}</h1>
              
              <div className="flex flex-wrap gap-6 items-center mt-6 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{tutorial.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <LayoutList size={16} />
                  <span>{tutorial.steps} steps</span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                {tutorial.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Tutorial Content */}
            <div ref={contentRef} className="slide-up">
              <GlassCard
                variant={isDarkMode ? 'dark' : 'default'}
                className="overflow-hidden"
              >
                {/* Featured Image */}
                <div 
                  className="h-[300px] md:h-[400px] bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${tutorial.image})` }}
                ></div>
                
                {/* Tutorial Description */}
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">About this tutorial</h2>
                  <p className="mb-6 leading-relaxed">{tutorial.description}</p>
                  <p className="mb-6 leading-relaxed">
                    In this comprehensive tutorial, you will learn the fundamental principles of {tutorial.title.toLowerCase()}. 
                    Whether you're a beginner just starting out or looking to refine your skills, this step-by-step guide 
                    will take you through the entire process, from initial concepts to finishing touches.
                  </p>
                  
                  {/* Current Step */}
                  <div className="mt-10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Step {currentStep}</h3>
                      <div className="text-sm">
                        <span className="font-medium">{currentStep}</span>
                        <span className="opacity-60"> / {tutorial.steps}</span>
                      </div>
                    </div>
                    
                    <GlassCard
                      variant={isDarkMode ? 'dark' : 'light'}
                      className="p-6"
                    >
                      <h4 className="text-lg font-semibold mb-4">
                        {currentStep === 1 ? 'Getting Started' : 
                         currentStep === tutorial.steps ? 'Finishing Touches' : 
                         `Step ${currentStep}: Key Technique`}
                      </h4>
                      <p className="mb-6 leading-relaxed">
                        {currentStep === 1 
                          ? `Before diving into ${tutorial.title.toLowerCase()}, we need to set up our workspace and understand the basic tools we'll be using. This foundation will ensure you can follow along easily with the rest of the tutorial.`
                          : currentStep === tutorial.steps
                          ? "In this final step, we'll add the finishing touches to perfect our work. These details make all the difference in creating professional quality results."
                          : "This step focuses on implementing a core technique that's essential for this process. Pay close attention to the details as they'll significantly impact your final result."
                        }
                      </p>
                      
                      {/* Example image placeholder */}
                      <div 
                        className="w-full h-[200px] bg-cover bg-center rounded-lg mb-6"
                        style={{ 
                          backgroundImage: `url(https://images.pexels.com/photos/7054509/pexels-photo-7054509.jpeg)`,
                          opacity: 0.8
                        }}
                      ></div>
                      
                      <div className="flex justify-between mt-8">
                        <button
                          onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                          disabled={currentStep === 1}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                          }`}
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          Previous Step
                        </button>
                        
                        <button
                          onClick={() => setCurrentStep(prev => Math.min(prev + 1, tutorial.steps))}
                          disabled={currentStep === tutorial.steps}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            currentStep === tutorial.steps ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                          }`}
                          style={{
                            backgroundColor: currentStep === tutorial.steps ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'var(--color-primary)',
                            color: currentStep === tutorial.steps ? 'var(--color-text)' : 'white',
                          }}
                        >
                          {currentStep === tutorial.steps ? 'Tutorial Complete' : 'Next Step'}
                        </button>
                      </div>
                    </GlassCard>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="mt-8 mb-4">
                    <div className="flex justify-between mb-2 text-xs">
                      <span>Progress</span>
                      <span>{Math.round((currentStep / tutorial.steps) * 100)}%</span>
                    </div>
                    <div 
                      className="w-full h-1 rounded-full"
                      style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                    >
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(currentStep / tutorial.steps) * 100}%`,
                          backgroundColor: 'var(--color-primary)' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
          
          {/* Sidebar */}
          <div ref={sidebarRef} className="slide-in-right">
            <div className="sticky top-28">
              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleBookmark}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: isBookmarked ? 'var(--color-primary)' : (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                    color: isBookmarked ? 'white' : 'var(--color-text)',
                  }}
                >
                  <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Share2 size={18} />
                  Share
                </button>
              </div>
              
              {/* Steps Overview */}
              <GlassCard
                variant={isDarkMode ? 'dark' : 'default'}
                className="p-6"
              >
                <h3 className="text-xl font-bold mb-4">Tutorial Steps</h3>
                
                <ul className="space-y-3">
                  {Array.from({ length: tutorial.steps }, (_, i) => i + 1).map(step => (
                    <li key={step}>
                      <button
                        onClick={() => setCurrentStep(step)}
                        className="w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all duration-200"
                        style={{
                          backgroundColor: currentStep === step 
                            ? 'var(--color-primary)' 
                            : step < currentStep 
                              ? (isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(59, 130, 246, 0.1)')
                              : (isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'),
                          color: currentStep === step ? 'white' : 'var(--color-text)',
                        }}
                      >
                        <span 
                          className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: currentStep === step 
                              ? 'white' 
                              : step < currentStep 
                                ? 'var(--color-primary)'
                                : (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
                            color: currentStep === step 
                              ? 'var(--color-primary)' 
                              : step < currentStep 
                                ? 'white'
                                : 'var(--color-text)',
                          }}
                        >
                          {step}
                        </span>
                        <span className="font-medium">
                          {step === 1 ? 'Getting Started' : 
                           step === tutorial.steps ? 'Finishing Touches' : 
                           `Step ${step}`}
                        </span>
                        {currentStep === step && (
                          <ChevronRight size={16} className="ml-auto" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </GlassCard>
              
              {/* Related Tutorials */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">You Might Also Like</h3>
                
                <div className="space-y-4">
                  {tutorials
                    .filter(t => t.id !== id && t.tags.some(tag => tutorial.tags.includes(tag)))
                    .slice(0, 3)
                    .map(relatedTutorial => (
                      <Link key={relatedTutorial.id} to={`/tutorial/${relatedTutorial.id}`}>
                        <GlassCard
                          variant={isDarkMode ? 'dark' : 'default'}
                          hoverable
                          className="p-4 flex gap-4"
                        >
                          <div 
                            className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url(${relatedTutorial.image})` }}
                          ></div>
                          <div>
                            <span className={`level-badge ${`level-${relatedTutorial.level}`} inline-block mb-1 text-xs`}>
                              {relatedTutorial.level.charAt(0).toUpperCase() + relatedTutorial.level.slice(1)}
                            </span>
                            <h4 className="font-medium line-clamp-2">{relatedTutorial.title}</h4>
                            <div className="flex items-center gap-1 mt-1 text-xs opacity-70">
                              <Clock size={12} />
                              <span>{relatedTutorial.duration} min</span>
                            </div>
                          </div>
                        </GlassCard>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetailPage;