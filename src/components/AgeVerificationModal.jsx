import React, { useEffect, useState } from "react";

const STORAGE_KEY = "bierz_age_verified";

export default function AgeVerificationModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const ok = window.localStorage.getItem(STORAGE_KEY) === "true";
      setOpen(!ok);
    } catch {
      setOpen(true);
    }
  }, []);

  const handleYes = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const handleNo = () => {
    window.location.href = "https://www.google.com";
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-[#F59E0B]/70 bg-[#0b0b0c] shadow-2xl">
        <div className="p-8 sm:p-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-black/40">
            <img
              src="/logo.jpg"
              alt="Bierz"
              className="h-14 w-14 object-contain"
            />
          </div>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-gray-300">
            O consumo de bebidas alcoólicas é proibido para menores de 18 anos.
          </p>

          <h2 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            VOCÊ TEM 18 ANOS OU MAIS?
          </h2>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleNo}
              className="h-14 sm:h-16 w-full sm:w-64 rounded-full border-2 border-gray-600 text-white font-semibold tracking-wide hover:border-gray-400 transition"
            >
              NÃO
            </button>
            <button
              type="button"
              onClick={handleYes}
              className="h-14 sm:h-16 w-full sm:w-64 rounded-full bg-[#F59E0B] hover:bg-[#F97316] text-black font-extrabold tracking-wide transition"
            >
              SIM
            </button>
          </div>

          <p className="mt-8 text-xs sm:text-sm text-gray-500">
            Este site é destinado apenas para maiores de 18 anos.
          </p>
        </div>
      </div>
    </div>
  );
}
