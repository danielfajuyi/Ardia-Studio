import React from "react";
import Hero from "../../components/ui/Hero";
import About from "../../components/sections/About";
import FeaturedVideo from "../../components/sections/FeaturedVideo";
import Services from "../../components/sections/Services";
import ArdiaAcademy from "../../components/sections/ArdiaAcademy";
import Works from "../../components/sections/Works";
import Pricing from "../../components/sections/Pricing";
import FAQ from "../../components/sections/FAQ";
import Footer from "../../components/ui/Footer";

const Home = () => {
  return (
    <main className="bg-background min-h-screen">
      <Hero />
      <About />
      <FeaturedVideo />
      <Services />
      <ArdiaAcademy />
      <Works />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Home;
