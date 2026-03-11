import React, { useState, useRef } from "react";

export default function Hero() {
  const videos = [
    "/hero-videos/hero-1.mp4",
    "/hero-videos/hero-2.mp4",
    "/hero-videos/hero-3.mp4",
    "/hero-videos/hero-4.mp4"
  ];

  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      <video
        key={currentVideo}
        ref={videoRef}
        src={videos[currentVideo]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.75)_100%)]" />

      <div className="relative z-10 flex flex-col items-center justify-start pt-[18vh] md:justify-center md:pt-0 h-full text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            BIERZ
          </span>
          <br />
          <span className="text-white">
            Distribuidora
          </span>
        </h1>

       <p className="max-w-[520px] text-lg text-white/90">
  Chopp das melhores marcas
  <br />
  Sorocaba e região.
</p>

        <div className="mt-8 flex gap-4 flex-wrap justify-center items-center">
          <a href="#how-it-works" className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 hover:opacity-90 text-black font-semibold px-6 py-3 rounded-lg transition inline-block">
            Como funciona
          </a>
          <a href="#products" className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 hover:opacity-90 text-black font-semibold px-6 py-3 rounded-lg transition inline-block">
            Ver Produtos
          </a>
        </div>
      </div>
    </section>
  );
}
