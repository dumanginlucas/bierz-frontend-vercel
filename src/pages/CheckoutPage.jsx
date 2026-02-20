import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { CheckCircle, MapPin, FileText, Truck, Gift } from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutPage = () => {
  const { 
    items, 
    getTotal, 
    clearCart,
    hasChoppItems,
    hasFreeDelivery,
    getDeliveryFee,
    getChopeiraFee,
    getFinalTotal,
    DELIVERY_FEE,
    CHOPEIRA_FEE,
    CHOPEIRA_FREE
  } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    delivery_address: user?.address || "",
    event_date: "",
    event_time: "",
    notes: ""
  });

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.delivery_address.trim()) {
      toast.error("Por favor, informe o endereço de entrega");
      return;
    }

    if (items.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          size: item.size
        })),
        delivery_address: formData.delivery_address,
        notes: [
          formData.event_date ? `Data do evento: ${formData.event_date}` : null,
          formData.event_time ? `Horário do evento: ${formData.event_time}` : null,
          formData.notes?.trim() ? formData.notes.trim() : null,
        ]
          .filter(Boolean)
          .join("\n")
      };

      const response = await axios.post(`${API_URL}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrderId(response.data.id);
      setOrderComplete(true);
      clearCart();
      toast.success("Pedido realizado com sucesso!");
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error.response?.data?.detail || "Erro ao realizar pedido");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (orderComplete) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-32 pb-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-lg mx-auto bg-black/50 border-[#F59E0B]/30 p-8 text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">Pedido Realizado!</h1>
              <p className="text-gray-400 mb-2">Seu pedido foi recebido com sucesso.</p>
              <p className="text-[#F59E0B] font-semibold mb-6">Pedido #{orderId?.slice(0, 8)}</p>
              <p className="text-gray-400 mb-8">
                Em breve entraremos em contato para confirmar a entrega.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/pedidos")}
                  className="w-full bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold"
                  data-testid="view-orders-btn"
                >
                  Ver Meus Pedidos
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="w-full border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black"
                >
                  Voltar para Home
                </Button>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Finalizar <span className="text-[#F59E0B]">Pedido</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <Card className="bg-black/50 border-[#F59E0B]/30 p-6 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-[#F59E0B]" />
                    Local do Evento
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="delivery_address" className="text-gray-200">
                        Endereço completo
                      </Label>
                      <Input
                        id="delivery_address"
                        value={formData.delivery_address}
                        onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
                        placeholder="Rua, número, bairro, cidade"
                        className="bg-gray-900/50 border-[#F59E0B]/30 text-white placeholder-gray-500 focus:border-[#F59E0B]"
                        required
                        data-testid="delivery-address"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="event_date" className="text-gray-200">
                          Data do evento (opcional)
                        </Label>
                        <Input
                          id="event_date"
                          type="date"
                          value={formData.event_date}
                          onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                          className="bg-gray-900/50 border-[#F59E0B]/30 text-white placeholder-gray-500 focus:border-[#F59E0B]"
                          data-testid="event-date"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event_time" className="text-gray-200">
                          Horário do evento (opcional)
                        </Label>
                        <Input
                          id="event_time"
                          type="time"
                          value={formData.event_time}
                          onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                          className="bg-gray-900/50 border-[#F59E0B]/30 text-white placeholder-gray-500 focus:border-[#F59E0B]"
                          data-testid="event-time"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black/50 border-[#F59E0B]/30 p-6 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-[#F59E0B]" />
                    Observações
                  </h2>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Instruções especiais para entrega, horário preferido, etc."
                    className="bg-gray-900/50 border-[#F59E0B]/30 text-white placeholder-gray-500 focus:border-[#F59E0B] min-h-[100px]"
                    data-testid="order-notes"
                  />
                </Card>

                <Button
                  type="submit"
                  className="w-full bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold py-6 text-lg"
                  disabled={loading}
                  data-testid="confirm-order-btn"
                >
                  {loading ? "Processando..." : "Confirmar Pedido"}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-black/50 border-[#F59E0B]/30 p-6 sticky top-32">
                <h2 className="text-xl font-bold text-white mb-4">Resumo do Pedido</h2>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {item.product_name} ({item.size}) x{item.quantity}{item.price_unit === 'litro' ? 'L' : ''}
                      </span>
                      <span className="text-white">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#F59E0B]/30 pt-4 mb-4 space-y-3">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>

                  {/* Delivery Fee - only show if has chopp */}
                  {hasChoppItems() && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Taxa de Entrega
                      </span>
                      <div className="text-right">
                        {hasFreeDelivery() ? (
                          <div className="flex items-center gap-2">
                            <span className="text-red-500 line-through text-sm">{formatPrice(DELIVERY_FEE)}</span>
                            <span className="text-green-500 font-semibold">R$ 0,00</span>
                          </div>
                        ) : (
                          <span className="text-white">{formatPrice(DELIVERY_FEE)}</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Chopeira Rental - only show if has chopp */}
                  {hasChoppItems() && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Gift className="w-4 h-4" />
                        Aluguel Chopeira Elétrica
                      </span>
                      <div className="text-right">
                        {CHOPEIRA_FREE ? (
                          <div className="flex items-center gap-2">
                            <span className="text-red-500 line-through text-sm">{formatPrice(CHOPEIRA_FEE)}</span>
                            <span className="text-green-500 font-semibold">R$ 0,00</span>
                          </div>
                        ) : (
                          <span className="text-white">{formatPrice(CHOPEIRA_FEE)}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Savings banner */}
                {hasChoppItems() && (hasFreeDelivery() || CHOPEIRA_FREE) && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                    <p className="text-green-400 text-sm text-center font-medium">
                      🎉 Você está economizando {formatPrice((hasFreeDelivery() ? DELIVERY_FEE : 0) + (CHOPEIRA_FREE ? CHOPEIRA_FEE : 0))}!
                    </p>
                  </div>
                )}

                <div className="border-t border-[#F59E0B]/30 pt-4">
                  <div className="flex justify-between text-white font-bold text-xl">
                    <span>Total</span>
                    <span className="text-[#F59E0B]">{formatPrice(getFinalTotal())}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
