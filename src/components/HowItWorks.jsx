import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Calculator,
  Beer,
  GitCompare,
  MapPin,
  ArrowRight,
} from "lucide-react";

const HowItWorks = () => {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const steps = useMemo(
    () => [
      {
        id: 1,
        badge: "Passo 1",
        title: "Calcule quantos litros\n de chopp você precisa",
        description: "Use a calculadora e descubra a quantidade ideal para o seu evento.",
        icon: Calculator,
        cta: "Calcular agora",
        action: () => {
          const el = document.getElementById("calculator");
          el?.scrollIntoView({ behavior: "smooth" });
          // opcional: foco no primeiro input depois do scroll
          setTimeout(() => {
            const input = el?.querySelector("input");
            input?.focus?.();
          }, 450);
        },
      },
      {
        id: 2,
        badge: "Passo 2",
        title: "Escolha o chopp\n da vez",
        description: "Selecione seus estilos preferidos e adicione ao carrinho em poucos cliques.",
        icon: Beer,
        cta: "Escolher chopp",
        action: () => {
          document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: 3,
        badge: "Passo 3",
        title: "Chopeira elétrica\n ou HomeBar?",
        description: "Compare as opções e escolha o equipamento ideal para o seu evento.",
        icon: GitCompare,
        cta: "Ver equipamentos",
        action: () => {
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        id: 4,
        badge: "Passo 4",
        title: "Local do Evento",
        description:
          "Entregamos, instalamos e retiramos no horário programado.",
        icon: MapPin,
        cta: "Finalizar pedido",
        action: () => navigate("/carrinho"),
      },
    ],
    [navigate]
  );

  const onEnter = (id) => setActive(id);
  const onToggle = (id) => setActive((prev) => (prev === id ? null : id));

  return (
    <section
      id="how-it-works"
      className="pt-36 pb-16 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* soft background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F59E0B] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <p className="text-gray-400 text-sm tracking-wide">
            Bierz Distribuidora
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2">
            Como funciona
          </h1>
          <p className="text-gray-300 mt-3 text-base md:text-lg">
            Em 4 passos você finaliza seu pedido e garante seu evento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            const flipped = active === s.id;

            return (
              <div
                key={s.id}
                className={`flip-card h-[320px] sm:h-[340px] lg:h-[360px] rounded-3xl ${
                  flipped ? "is-flipped" : ""
                }`}
                onMouseEnter={() => onEnter(s.id)}
                onClick={() => onToggle(s.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onToggle(s.id);
                }}
              >
                <div className="flip-inner rounded-3xl">
                  {/* FRONT */}
                  <div className="flip-face rounded-3xl">
                    <div className="h-full rounded-3xl bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-6 flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#F59E0B]" />
                        </div>
                        <span className="text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                          {s.badge}
                        </span>
                      </div>

                      <h3 className="text-white font-bold text-xl mt-6 leading-snug whitespace-pre-line text-left">
                        {s.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed text-left">
                        {s.description}
                      </p>

                      <div className="mt-auto" />
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="flip-face flip-back rounded-3xl">
                    <div className="h-full rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-6 flex flex-col">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#F59E0B]" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-gray-300">{s.badge}</p>
                          <p className="text-white font-semibold leading-tight">
                            {s.id === 4 ? "Vamos fechar?" : "Próximo passo"}
                          </p>
                        </div>
                      </div>

                      {/* placeholder para imagem futura */}
                      <div className="mt-6 flex-1 rounded-2xl bg-gradient-to-br from-black/40 to-white/[0.04] border border-white/10" />

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          s.action();
                        }}
                        className="mt-6 w-full bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold py-6"
                      >
                        {s.cta}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
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
};

export default HowItWorks;
