import React from "react";
import Hero from "../../components/ui/Hero";
import About from "../../components/sections/About";
import FaQ from "../../components/sections/FaQ";
import FeaturedVideo from "../../components/sections/FeaturedVideo";
import Services from "../../components/sections/Services"; // Ensure this import exists
import WhyChooseUs from "../../components/sections/WhyChooseUs";
import OurProcess from "../../components/sections/OurProcess";
import Testimonials from "../../components/sections/Testimonials";
import FinalCTA from "../../components/sections/FinalCTA";
import ArdiaAcademy from "../../components/sections/ArdiaAcademy";
import Works from "../../components/sections/Works";

import Footer from "../../components/ui/Footer";
import ScrollDripLine from "../../components/ui/ScrollDripLine";

const Home = () => {
  return (
    <main className="bg-background min-h-screen">
      <ScrollDripLine />
      <Hero />
      <About />
      <FeaturedVideo />
      <WhyChooseUs />
      <Services />
      <OurProcess />
      <Testimonials />
      <FinalCTA />

      <ArdiaAcademy />
      <Works />

      <FaQ />
      <Footer />
    </main>
  );
};

export default Home;
