import React from 'react';
import Hero from '../../components/ui/Hero';
import Services from '../../components/sections/Services';
import Works from '../../components/sections/Works';
import Pricing from '../../components/sections/Pricing';
import FAQ from '../../components/sections/FAQ';
import Footer from '../../components/ui/Footer';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Services />
      <Works />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
