import React from 'react';
import Hero from '../components/Hero';
import FeaturedTutorials from '../components/FeaturedTutorials';
import PopularTutorials from '../components/PopularTutorials';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedTutorials />
      <PopularTutorials />
    </div>
  );
};

export default HomePage;