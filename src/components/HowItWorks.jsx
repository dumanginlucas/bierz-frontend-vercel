import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { toast } from "sonner";
import {
  Calculator,
  ShoppingBag,
  Beer,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";

const HowItWorks = () => {
  const navigate = useNavigate();
  const { orderDetails, setOrderDetails } = useCart();

  const [activeCard, setActiveCard] = useState(1);

  const [addressForm, setAddressForm] = useState({
    delivery_address: orderDetails?.delivery_address || "",
    address_complement: orderDetails?.address_complement || "",
    event_date: orderDetails?.event_date || "",
    event_time: orderDetails?.event_time || "",
  });

  const steps = useMemo(
    () => [
      {
        id: 1,
        title: "Calcule quantos litros de chopp você precisa",
        icon: Calculator,
        description:
          "Use a calculadora para estimar a quantidade ideal e evitar falta (ou sobra).",
        cta: "Calcule aqui",
        action: () => scrollToSection("calculator"),
      },
      {
        id: 2,
        title: "Escolha o chopp da vez",
        icon: ShoppingBag,
        description:
          "Selecione seus estilos preferidos e adicione ao carrinho com poucos cliques.",
        cta: "Escolher chopp",
        action: () => scrollToSection("products"),
      },
      {
        id: 3,
        title: "Chopeira elétrica ou HomeBar?",
        icon: Beer,
        description:
          "Compare as opções e escolha o equipamento ideal para o seu evento.",
        cta: "Escolher o ideal pro meu evento",
        action: () => scrollToSection("services"),
      },
      {
        id: 4,
        title: "Diga o local do evento — entregamos e instalamos",
        icon: MapPin,
        description:
          "Informe o endereço completo para agilizar a entrega e instalação.",
        cta: "Salvar endereço",
        action: () => handleSaveAddress(),
      },
      {
        id: 5,
        title: "Retirada programada no final do evento",
        icon: CheckCircle2,
        description:
          "Finalize o pedido e combinamos a retirada dos equipamentos após o evento.",
        cta: "Ir para o carrinho",
        action: () => navigate("/carrinho"),
      },
    ],
    [navigate]
  );

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSaveAddress = () => {
    if (!addressForm.delivery_address.trim()) {
      toast.error("Por favor, informe o endereço completo");
      return;
    }

    setOrderDetails({
      delivery_address: addressForm.delivery_address.trim(),
      address_complement: addressForm.address_complement.trim(),
      event_date: addressForm.event_date,
      event_time: addressForm.event_time,
    });

    toast.success("Endereço salvo! ✅");
    setActiveCard(5);
  };

  const onCardActivate = (id) => setActiveCard(id);

  return (
    <section
      id="how-it-works"
      className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-black via-black to-[#0b0b0b]"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Como funciona
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-300">
            Em 5 passos você monta seu evento e finaliza seu pedido.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeCard === step.id;

            return (
              <div
                key={step.id}
                className="group [perspective:1200px]"
                onMouseEnter={() => onCardActivate(step.id)}
                onClick={() => onCardActivate(step.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onCardActivate(step.id);
                }}
              >
                <div
                  className={[
                    "relative h-[210px] sm:h-[230px] rounded-3xl transition-transform duration-500 [transform-style:preserve-3d]",
                    isActive ? "[transform:rotateY(180deg)]" : "",
                  ].join(" ")}
                >
                  {/* Front */}
                  <Card className="absolute inset-0 rounded-3xl border-white/10 bg-white/5 shadow-lg [backface-visibility:hidden]">
                    <div className="h-full p-5 flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#F59E0B]" />
                          </div>
                          <div className="text-sm text-gray-300 font-medium">
                            Passo {step.id}
                          </div>
                        </div>
                      </div>

                      <h3 className="mt-4 text-white font-bold leading-snug">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                        {step.description}
                      </p>

                      <div className="mt-auto pt-4 text-xs text-gray-400">
                        Passe o mouse / toque para virar
                      </div>
                    </div>
                  </Card>

                  {/* Back */}
                  <Card className="absolute inset-0 rounded-3xl border-white/10 bg-white/5 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="h-full p-5 flex flex-col">
                      <div className="text-sm text-gray-300 font-medium">
                        Passo {step.id}
                      </div>

                      <h3 className="mt-2 text-white font-bold leading-snug">
                        {step.title}
                      </h3>

                      {step.id === 4 ? (
                        <div className="mt-3 space-y-3">
                          <div className="space-y-1">
                            <Label className="text-gray-200">Endereço completo</Label>
                            <Input
                              value={addressForm.delivery_address}
                              onChange={(e) =>
                                setAddressForm((p) => ({
                                  ...p,
                                  delivery_address: e.target.value,
                                }))
                              }
                              placeholder="Rua, número, bairro, cidade - UF"
                              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-gray-200">
                              Complemento / referência (opcional)
                            </Label>
                            <Input
                              value={addressForm.address_complement}
                              onChange={(e) =>
                                setAddressForm((p) => ({
                                  ...p,
                                  address_complement: e.target.value,
                                }))
                              }
                              placeholder="Apto, bloco, portaria, ponto de referência..."
                              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label className="text-gray-200">Data do evento</Label>
                              <Input
                                type="date"
                                value={addressForm.event_date}
                                onChange={(e) =>
                                  setAddressForm((p) => ({
                                    ...p,
                                    event_date: e.target.value,
                                  }))
                                }
                                className="bg-black/40 border-white/10 text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-gray-200">Horário</Label>
                              <Input
                                type="time"
                                value={addressForm.event_time}
                                onChange={(e) =>
                                  setAddressForm((p) => ({
                                    ...p,
                                    event_time: e.target.value,
                                  }))
                                }
                                className="bg-black/40 border-white/10 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-3 text-sm text-gray-300">
                          {step.description}
                        </p>
                      )}

                      <div className="mt-auto pt-4">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            step.action();
                          }}
                          className="w-full rounded-2xl bg-[#F59E0B] text-black hover:bg-[#ffb632]"
                        >
                          {step.cta}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>

                        {step.id !== 4 && (
                          <div className="mt-2 text-xs text-gray-400 text-center">
                            Passe o mouse em outro card para voltar
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
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
