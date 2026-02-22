import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const dragRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(null);
  const navigate = useNavigate();

  // eslint-disable-next-line no-console
  console.log("BIERZ FRONT v7 - Como funciona");

  const steps = useMemo(
    () => [
      {
        id: 1,
        kicker: "Comece aqui",
        title: "Calcule quantos litros você precisa",
        desc: "Use a calculadora e descubra a quantidade ideal para o seu evento.",
        cta: "Calcular agora",
        hasImage: false,
        action: () => {
          const el = document.getElementById("calculator");
          if (el) {
            const headerEl = document.querySelector("header");
            const headerH = headerEl?.offsetHeight ?? 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        },
      },
      {
        id: 2,
        kicker: "Escolha seu chopp",
        title: "Escolha o chopp da vez",
        desc: "Selecione seus estilos preferidos e adicione ao carrinho em poucos cliques.",
        cta: "Escolher chopp",
        hasImage: true,
        imageUrl: "/howitworks/step2.png",
        action: () => {
          const el = document.getElementById("products");
          if (el) {
            const headerEl = document.querySelector("header");
            const headerH = headerEl?.offsetHeight ?? 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        },
      },
      {
        id: 3,
        kicker: "Defina o equipamento",
        title: "Chopeira elétrica ou HomeBar?",
        desc: "Compare as opções e escolha o equipamento ideal para o seu evento.",
        cta: "Ver equipamentos",
        hasImage: true,
        imageUrl: "/howitworks/step3.png",
        action: () => {
          const el = document.getElementById("services");
          if (el) {
            const headerEl = document.querySelector("header");
            const headerH = headerEl?.offsetHeight ?? 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        },
      },
      {
        id: 4,
        kicker: "Preencha os dados e finalize",
        title: "Entregamos, instalamos e retiramos",
        desc: "Preencha os dados do evento e finalize seu pedido com data, horário e local definidos.",
        cta: "Finalizar pedido",
        hasImage: false,
        action: () => navigate("/cart"),
      },
    ],
    [navigate]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative pt-36 pb-10 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #0A0A0A 100%)" }}
    >
      <span className="sr-only">BIERZ_FRONT_VERSION_V7</span>

      {/* Section number oversized */}
      <span className="section-number" style={{ top: "1rem", right: "2rem" }}>
        01
      </span>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div
            className={
              "inline-flex items-center gap-2 border border-[rgba(245,158,11,0.30)] rounded-full px-4 py-1.5 mb-6 transition-all duration-700 " +
              (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")
            }
            style={{ background: "rgba(245,158,11,0.06)" }}
          >
            <span className="text-[rgba(245,158,11,1)] text-xs font-bold tracking-widest uppercase">
              Como funciona
            </span>
          </div>

          {/* Mantém os textos do arquivo original */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Distribuidora{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              BIERZ
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            <span className="text-white font-semibold">Como funciona</span>{" "}
            <span className="text-gray-400">—</span>{" "}
            Em 4 passos você finaliza seu pedido e garante seu evento.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={s.id}
              className={
                "transition-all duration-700 " +
                (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")
              }
              style={{ transitionDelay: `${0.15 + idx * 0.12}s` }}
            >
              <div
                className="relative h-[340px] cursor-pointer"
                style={{ perspective: "1000px" }}
                onMouseEnter={() => setFlipped(s.id)}
                onMouseLeave={() => setFlipped(null)}
                onPointerDown={(e) => {
                  // Mobile/tablet: flip with drag/swipe only (no tap-to-flip).
                  if (e.pointerType === "mouse") return;
                  if (e.target?.closest?.("button")) return;
                  dragRef.current = { x: e.clientX, y: e.clientY, id: s.id, pid: e.pointerId };
                  try {
                    e.currentTarget.setPointerCapture(e.pointerId);
                  } catch {}
                }}
                onPointerMove={(e) => {
                  if (!dragRef.current) return;
                  if (dragRef.current.id !== s.id) return;

                  const dx = e.clientX - dragRef.current.x;
                  const dy = e.clientY - dragRef.current.y;

                  // Only treat as a flip gesture if it's a mostly-horizontal swipe.
                  const TH = 28;
                  if (Math.abs(dx) < TH) return;
                  if (Math.abs(dx) < Math.abs(dy)) return;

                  // Swipe left -> show back. Swipe right -> show front.
                  if (dx < 0) setFlipped(s.id);
                  else setFlipped(null);

                  dragRef.current = null;
                }}
                onPointerUp={(e) => {
                  if (dragRef.current?.pid === e.pointerId) dragRef.current = null;
                }}
                onPointerCancel={(e) => {
                  if (dragRef.current?.pid === e.pointerId) dragRef.current = null;
                }}
                aria-label={`Como funciona - ${s.kicker}`}
              >
                {/* Card inner */}
                <div
                  className="absolute inset-0 transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flipped === s.id ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      pointerEvents: flipped === s.id ? "none" : "auto",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                      border: "1px solid rgba(245,158,11,0.20)",
                    }}
                  >
                    {/* Step number */}
                    <div className="absolute top-4 right-4">
                      <span className="text-[rgba(245,158,11,1)] text-4xl font-extrabold leading-none opacity-60">
                        {String(s.id).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Kicker */}
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-bold tracking-widest uppercase text-[rgba(245,158,11,1)]">
                        {s.kicker}
                      </span>
                    </div>

                    {/* Image or fallback */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {s.hasImage ? (
                        <img
                          src={s.imageUrl}
                          alt=""
                          className="w-4/5 h-auto object-contain"
                          loading="lazy"
                          style={{
                            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.7))",
                            animation: "floatY 4s ease-in-out infinite",
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3 opacity-30">
                          <div className="w-16 h-16 rounded-full border-2 border-[rgba(245,158,11,1)] flex items-center justify-center">
                            <span className="text-[rgba(245,158,11,1)] text-3xl font-extrabold">
                              {s.id}
                            </span>
                          </div>
                          <span className="text-white text-lg font-bold">{s.kicker}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 rounded-lg flex flex-col justify-between p-6"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      pointerEvents: flipped === s.id ? "auto" : "none",
                      background:
                        "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(249,115,22,0.08) 100%)",
                      border: "1px solid rgba(245,158,11,0.40)",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold tracking-widest uppercase text-[rgba(245,158,11,1)]">
                          {s.kicker}
                        </span>
                        <span className="text-[rgba(245,158,11,1)] text-3xl font-extrabold opacity-50">
                          {String(s.id).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-white text-2xl font-extrabold mb-3">{s.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        s.action();
                        setFlipped(null);
                      }}
                      className="mt-4 px-6 py-2.5 rounded-lg font-bold text-sm uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1"
                      style={{
                        letterSpacing: "0.05em",
                        background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                        color: "#050505",
                      }}
                    >
                      {s.cta} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Float animation */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
