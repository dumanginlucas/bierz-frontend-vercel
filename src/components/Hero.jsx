import React from "react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <img
        src="/banner.jpg"
        alt="Bierz Banner"
        className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            Bierz
          </span>
          <br />
          <span className="text-white">
            Distribuidora
          </span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl text-lg">
          As melhores marcas de chopp e cerveja para seu evento.
          Qualidade, variedade e atendimento diferenciado.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:opacity-90 text-black font-semibold px-6 py-3 rounded-lg transition">
            Como funciona
          </button>
          <button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:opacity-90 text-black font-semibold px-6 py-3 rounded-lg transition">
            Ver Produtos
          </button>
        </div>
      </div>
    </section>
  );
}