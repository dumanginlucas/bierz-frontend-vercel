import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const headerEl = document.querySelector("header");
    if (!headerEl) return;

    const setHeaderHeight = () => {
      const h = headerEl.offsetHeight;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };

    setHeaderHeight();

    const resizeObserver = new ResizeObserver(setHeaderHeight);
    resizeObserver.observe(headerEl);

    // scrollbar width fix
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--sbw", `${Math.max(0, sbw)}px`);

    return () => resizeObserver.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const headerEl = document.querySelector("header");
    const headerH = headerEl?.offsetHeight ?? 0;

    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.scrollY -
        headerH -
        12;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/90 backdrop-blur"
      style={{ paddingRight: "var(--sbw)" }}
    >
      {/* MANTENHA AQUI SEU CONTEÚDO ORIGINAL DO HEADER */}
    </header>
  );
};

export default Header;
