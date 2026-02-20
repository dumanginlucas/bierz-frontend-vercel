import React, { useEffect, useState } from "react";

const STORAGE_KEY = "bierz_age_verified";

const AgeVerificationModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const ok = localStorage.getItem(STORAGE_KEY) === "true";
      setOpen(!ok);
    } catch {
      setOpen(true);
    }
  }, []);

  const handleYes = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setOpen(false);
  };

  const handleNo = () => {
    window.location.href = "https://www.google.com";
  };

  if (!open) return null;

  return (
    <div className="age-modal__overlay" role="dialog" aria-modal="true" aria-label="Verificação de idade">
      <div className="age-modal__card">
        <div className="age-modal__logoWrap">
          <img
            className="age-modal__logo"
            src="/logo.jpg"
            alt="BIERZ"
          />
        </div>

        <p className="age-modal__sub">
          O consumo de bebidas alcoólicas é proibido para menores de 18 anos.
        </p>

        <h2 className="age-modal__title">VOCÊ TEM 18 ANOS OU MAIS?</h2>

        <div className="age-modal__buttons">
          <button className="age-modal__btn age-modal__btn--ghost" onClick={handleNo}>
            NÃO
          </button>
          <button className="age-modal__btn age-modal__btn--primary" onClick={handleYes}>
            SIM
          </button>
        </div>

        <p className="age-modal__foot">
          Este site é destinado apenas para maiores de 18 anos.
        </p>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
