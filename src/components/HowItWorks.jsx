import React, { useEffect, useMemo, useState } from "react";
import { Calculator, Beer, Zap, MapPin, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function HowItWorks() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const steps = useMemo(
    () => [
      {
        id: 1,
        kicker: "Comece aqui",
        titleFront: "Calcule quantos litros\nde chopp você precisa",
        icon: Calculator,
        frontLayout: "invert",
        backTitle: "Calcule em segundos",
        backText:
          "Use nossa calculadora para estimar a quantidade ideal para o seu evento.",
        cta: "Calcular agora",
        action: () => {
          // se não estiver na home, navega antes
          if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: "calculator" } });
            return;
          }
          scrollToId("calculator");
          // tenta focar no primeiro input da calculadora
          setTimeout(() => {
            const firstInput = document.querySelector(
              "#calculator input, #calculator select, #calculator textarea"
            );
            if (firstInput) firstInput.focus();
          }, 350);
        },
      },
      {
        id: 2,
        kicker: "Escolha seu chopp",
        titleFront: "Escolha o chopp\nda vez",
        icon: Beer,
        backTitle: "Monte seu carrinho",
        backText:
          "Selecione seus estilos preferidos e adicione ao carrinho com poucos cliques.",
        cta: "Ver produtos",
        action: () => {
          if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: "products" } });
            return;
          }
          scrollToId("products");
        },
      },
      {
        id: 3,
        kicker: "Defina o equipamento",
        titleFront: "Chopeira elétrica\nou HomeBar?",
        icon: Zap,
        backTitle: "Escolha o ideal",
        backText:
          "Compare as opções e selecione o equipamento perfeito para o seu evento.",
        cta: "Ver opções",
        action: () => {
          if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: "about" } });
            return;
          }
          // usa a seção "about" como destino padrão (onde costuma estar a explicação)
          scrollToId("about");
        },
      },
      {
        id: 4,
        kicker: "Local do evento",
        titleFront: "Local do Evento",
        subtitleFront:
          "Entregamos, instalamos e retiramos\nno horário programado.",
        icon: MapPin,
        backTitle: "Finalize o pedido",
        backText:
          "Revise seu carrinho e conclua o pedido. Se preferir, confirme detalhes pelo WhatsApp.",
        cta: "Finalizar pedido",
        action: () => navigate("/carrinho"),
      },
    ],
    [location.pathname, navigate]
  );

  // mobile: tocar alterna o card
  const handleActivate = (id) => {
    setActive((prev) => (prev === id ? null : id));
  };

  // desktop: hover ativa
  const handleMouseEnter = (id) => {
    // evita "piscar" em touch devices com emulação
    if (window.matchMedia?.("(hover: hover)")?.matches) setActive(id);
  };

  useEffect(() => {
    // se o usuário scrollar muito, fecha o flip
    const onScroll = () => {
      if (window.scrollY > 900 && active !== null) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-black pt-32 md:pt-36 pb-16"
    >
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F59E0B]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="mx-auto max-w-5xl text-center">
          <div className="text-base sm:text-lg font-semibold tracking-wide text-white/90">
            <span className="mr-2">Distribuidora</span>
            <span className="hiw-gradient font-extrabold">BIERZ</span>
          </div>

          <p className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight sm:whitespace-nowrap">
            Como funciona <span className="text-white/70 font-semibold">—</span>{" "}
            <span className="text-white/90 font-semibold text-lg sm:text-xl md:text-2xl align-middle">
              Em 4 passos você finaliza seu pedido e garante seu evento.
            </span>
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            const flipped = active === s.id;
            return (
              <div
                key={s.id}
                className={`hiw-card ${flipped ? "hiw-flipped" : ""}`}
                onMouseEnter={() => handleMouseEnter(s.id)}
                onClick={() => handleActivate(s.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleActivate(s.id);
                }}
              >
                <div className="hiw-inner">
                  {/* FRONT */}
                  <div className="hiw-face hiw-front">
                    <div className="hiw-shell">
                      <div
                        className={`flex items-start justify-between gap-4 ${
                          s.frontLayout === "invert" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white/70">
                            {s.kicker}
                          </div>
                          <div className="mt-3 whitespace-pre-line text-xl md:text-2xl font-extrabold text-white leading-snug">
                            {s.titleFront}
                          </div>
                          {s.subtitleFront && (
                            <div className="mt-3 whitespace-pre-line text-sm md:text-base text-white/70 leading-relaxed">
                              {s.subtitleFront}
                            </div>
                          )}
                        </div>

                        <div className="hiw-iconWrap">
                          <div className="hiw-icon">
                            <Icon className="h-7 w-7" />
                          </div>
                          <div className="hiw-badge">{s.id}</div>
                        </div>
                      </div>

                      <div className="mt-8 hiw-visual" aria-hidden="true">
                        <div className="hiw-visualInner" />
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="hiw-face hiw-back">
                    <div className="hiw-shell">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white/70">
                          {s.kicker}
                        </div>
                        <div className="hiw-badge">{s.id}</div>
                      </div>

                      <div className="mt-4 text-2xl font-extrabold text-white">
                        {s.backTitle}
                      </div>
                      <div className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                        {s.backText}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          s.action();
                        }}
                        className="mt-8 w-full rounded-full bg-[#F59E0B] hover:bg-[#F97316] text-black font-extrabold py-3.5 flex items-center justify-center gap-2 transition"
                      >
                        {s.cta} <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
