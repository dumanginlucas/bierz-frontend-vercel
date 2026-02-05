import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Products from "../components/Products";
import BeerCalculator from "../components/BeerCalculator";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <BeerCalculator />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
