import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Truck, Gift } from "lucide-react";
import { toast } from "sonner";

const CartPage = () => {
  const { 
    items,
    equipment,
    clearEquipment,
    removeItem, 
    updateQuantity, 
    getTotal,
    hasChoppItems,
    getChoppLiters,
    hasFreeDelivery,
    getDeliveryFee,
    getChopeiraFee,
    getFinalTotal,
    DELIVERY_FEE,
    CHOPEIRA_FEE,
    CHOPEIRA_FREE
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const choppLiters = getChoppLiters();
  const litersToFreeDelivery = 30 - choppLiters;

  const handleCheckout = () => {
    // Requisito: para pedidos com chopp, o cliente precisa escolher 1 equipamento.
    if (hasChoppItems() && !equipment) {
      toast.error("Selecione um equipamento para continuar (Chopeira Elétrica ou HomeBar).", {
        description: "Role até a seção 'Equipamentos' e escolha o ideal para o seu evento."
      });
      navigate("/#equipamentos");
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Seu <span className="text-[#F59E0B]">Carrinho</span>
          </h1>

          {equipment && (
            <Card className="mb-6 bg-black/40 border border-amber-500/20 rounded-2xl p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-sm text-gray-300">Equipamento selecionado</div>
                  <div className="text-lg font-semibold text-white">{equipment.name}</div>
                </div>
                <Button
                  variant="outline"
                  className="border-amber-500/30 text-amber-200 hover:bg-amber-500/10"
                  onClick={clearEquipment}
                >
                  Remover
                </Button>
              </div>
            </Card>
          )}


          {/* Free Delivery Banner */}
          {hasChoppItems() && (
            <div className={`mb-6 rounded-xl p-4 flex items-center gap-3 ${
              hasFreeDelivery() 
                ? 'bg-gradient-to-r from-green-600/20 to-green-500/10 border border-green-500/30' 
                : 'bg-gradient-to-r from-[#F59E0B]/20 to-[#F59E0B]/10 border border-[#F59E0B]/30'
            }`}>
              <Truck className={`w-6 h-6 ${hasFreeDelivery() ? 'text-green-400' : 'text-[#F59E0B]'}`} />
              {hasFreeDelivery() ? (
                <p className="text-green-400 font-semibold">
                  Parabéns! Você ganhou entrega grátis! 🎉
                </p>
              ) : (
                <p className="text-[#F59E0B]">
                  Adicione mais <span className="font-bold">{litersToFreeDelivery} litros de Chopp</span> para ganhar entrega grátis!
                </p>
              )}
            </div>
          )}

          {items.length === 0 ? (
            <Card className="bg-black/50 border-[#F59E0B]/30 p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-xl text-gray-400 mb-4">Seu carrinho está vazio</h2>
              <Link to="/#products">
                <Button className="bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold">
                  Ver Produtos
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <Card
                    key={`${item.product_id}-${item.size}-${index}`}
                    className="bg-black/50 border-[#F59E0B]/30 p-4"
                    data-testid={`cart-item-${item.product_id}`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-full sm:w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{item.product_name}</h3>
                        <p className="text-gray-400 text-sm">Tamanho: {item.size}</p>
                        <p className="text-[#F59E0B] font-semibold">
                          {formatPrice(item.price)}/{item.price_unit}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.price_unit === 'litro' ? item.quantity <= 20 : item.quantity <= 1}
                            onClick={() => {
                              const step = item.price_unit === 'litro' ? 10 : 1;
                              const min = item.price_unit === 'litro' ? 20 : 1;
                              const newQuantity = item.quantity - step;
                              if (newQuantity >= min) {
                                updateQuantity(item.product_id, item.size, newQuantity);
                              }
                            }}
                            data-testid={`decrease-${item.product_id}`}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-white w-16 text-center">
                            {item.quantity}{item.price_unit === 'litro' ? 'L' : ''}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black"
                            onClick={() => updateQuantity(item.product_id, item.size, item.quantity + (item.price_unit === 'litro' ? 10 : 1))}
                            data-testid={`increase-${item.product_id}`}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-white font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                          onClick={() => removeItem(item.product_id, item.size)}
                          data-testid={`remove-${item.product_id}`}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card className="bg-black/50 border-[#F59E0B]/30 p-6 sticky top-32">
                  <h2 className="text-xl font-bold text-white mb-4">Resumo do Pedido</h2>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal dos Produtos</span>
                      <span>{formatPrice(getTotal())}</span>
                    </div>
                    
                    {/* Delivery Fee - only show if has chopp */}
                    {hasChoppItems() && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center gap-1">
                          <Truck className="w-4 h-4" />
                          Entrega
                        </span>
                        <div className="text-right">
                          {hasFreeDelivery() ? (
                            <div className="flex items-center gap-2">
                              <span className="text-red-500 line-through text-sm">{formatPrice(DELIVERY_FEE)}</span>
                              <span className="text-green-500 font-semibold">GRÁTIS</span>
                            </div>
                          ) : (
                            <span className="text-white">{formatPrice(DELIVERY_FEE)}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Chopeira Rental - só mostra quando existe equipamento selecionado */}
                    {hasChoppItems() && equipment && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center gap-1">
                          <Gift className="w-4 h-4" />
                          Aluguel Chopeira
                        </span>
                        <div className="text-right">
                          {CHOPEIRA_FREE ? (
                            <div className="flex items-center gap-2">
                              <span className="text-red-500 line-through text-sm">{formatPrice(CHOPEIRA_FEE)}</span>
                              <span className="text-green-500 font-semibold">GRÁTIS</span>
                            </div>
                          ) : (
                            <span className="text-white">{formatPrice(CHOPEIRA_FEE)}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#F59E0B]/30 pt-4 mb-6">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span className="text-[#F59E0B]">{formatPrice(getFinalTotal())}</span>
                    </div>
                    {hasChoppItems() && (hasFreeDelivery() || (equipment && CHOPEIRA_FREE)) && (
                      <p className="text-green-500 text-sm mt-2 text-right">
                        Você economizou {formatPrice((hasFreeDelivery() ? DELIVERY_FEE : 0) + (equipment && CHOPEIRA_FREE ? CHOPEIRA_FEE : 0))}!
                      </p>
                    )}
                  </div>
                  
                  <Button
                    className="w-full bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold"
                    onClick={handleCheckout}
                    data-testid="checkout-button"
                  >
                    {isAuthenticated ? "Finalizar Pedido" : "Fazer Login para Continuar"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Link to="/#products">
                    <Button
                      variant="outline"
                      className="w-full mt-3 border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black"
                    >
                      Continuar Comprando
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
