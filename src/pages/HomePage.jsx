import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Identification from "../components/Identification";
import HowItWorks from "../components/HowItWorks";
import Products from "../components/Products";
import Services from "../components/Services";
import BeerCalculator from "../components/BeerCalculator";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target === undefined) return;

    const clearState = () => navigate(location.pathname, { replace: true, state: {} });

    const tryScroll = (attempt = 0) => {
      if (target === 'top') {
        const doScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        doScrollTop();
        window.requestAnimationFrame(doScrollTop);
        window.setTimeout(doScrollTop, 120);
        clearState();
        return;
      }

      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearState();
        return;
      }

      if (attempt < 10) {
        window.setTimeout(() => tryScroll(attempt + 1), 120);
      } else {
        clearState();
      }
    };

    tryScroll();
  }, [location, navigate]);

  return (
    <>
      <Header />
      <main>
        <Identification />
        <HowItWorks />
        <Products />
        <Services />
        <BeerCalculator />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
