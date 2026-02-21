import React from "react";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import Products from "../components/Products";
import Services from "../components/Services";
import BeerCalculator from "../components/BeerCalculator";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HowItWorks />
        <section id="products"><Products /></section>
        <section id="services"><Services /></section>
        <section id="calculator"><BeerCalculator /></section>
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
