import React from "react";
import HeroBanner from "../components/HeroBaner";
import Features from "../components/Features";
import LandingPageCardsSection from "../components/LandingPageCardsSection";
import TestimonialCarousel from "../components/TestimonialCarousel";
import OurStory from "../components/OurStory";
const Home = () => {
  return (
    <div className="bg-bg  ">
      <HeroBanner />
      <LandingPageCardsSection />
      <Features />
      <OurStory />
      <TestimonialCarousel />
    </div>
  );
};

export default Home;
