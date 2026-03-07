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
    const targetId = location.state?.scrollTo;
    if (!targetId) return;

    const scrollToTarget = () => {
      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return true;
      }

      const target = document.getElementById(targetId);
      if (!target) return false;

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    };

    const attemptNow = scrollToTarget();
    if (!attemptNow) {
      const t1 = window.setTimeout(scrollToTarget, 120);
      const t2 = window.setTimeout(scrollToTarget, 320);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }

    navigate(location.pathname, { replace: true, state: {} });
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
