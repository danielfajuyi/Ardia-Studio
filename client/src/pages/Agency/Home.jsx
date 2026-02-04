import React from "react";
import Hero from "../../components/ui/Hero";
import About from "../../components/sections/About";
import FaQ from "../../components/sections/FaQ";
import FeaturedVideo from "../../components/sections/FeaturedVideo";
import Services from "../../components/sections/Services";
import ArdiaAcademy from "../../components/sections/ArdiaAcademy";
import Works from "../../components/sections/Works";
import Pricing from "../../components/sections/Pricing";
import Footer from "../../components/ui/Footer";
import ScrollDripLine from "../../components/ui/ScrollDripLine";

const Home = () => {
  return (
    <main className="bg-background min-h-screen">
      <ScrollDripLine />
      <Hero />
      <About />
      <FeaturedVideo />
      <Services />
      <ArdiaAcademy />
      <Works />
      <Pricing />
      <FaQ />
      <Footer />
    </main>
  );
};

export default Home;
