import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import axios from "axios";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const OrdersPage = () => {
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { label: "Pendente", color: "bg-yellow-500", icon: Clock },
      confirmed: { label: "Confirmado", color: "bg-blue-500", icon: CheckCircle },
      preparing: { label: "Preparando", color: "bg-orange-500", icon: Package },
      delivered: { label: "Entregue", color: "bg-green-500", icon: Truck },
      cancelled: { label: "Cancelado", color: "bg-red-500", icon: XCircle }
    };
    return statusMap[status] || statusMap.pending;
  };

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">Carregando...</div>
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
            Meus <span className="text-[#FDB913]">Pedidos</span>
          </h1>

          {orders.length === 0 ? (
            <Card className="bg-black/50 border-[#FDB913]/30 p-8 text-center">
              <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-xl text-gray-400">Você ainda não fez nenhum pedido</h2>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <Card
                    key={order.id}
                    className="bg-black/50 border-[#FDB913]/30 p-6"
                    data-testid={`order-${order.id}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          Pedido #{order.id.slice(0, 8)}
                        </h3>
                        <p className="text-gray-400 text-sm">{formatDate(order.created_at)}</p>
                      </div>
                      <Badge className={`${statusInfo.color} text-white mt-2 md:mt-0`}>
                        <StatusIcon className="w-4 h-4 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </div>

                    <div className="border-t border-[#FDB913]/20 pt-4">
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-400">
                              {item.product_name} ({item.size}) x{item.quantity}
                            </span>
                            <span className="text-white">{formatPrice(item.subtotal)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-[#FDB913]/20 mt-4 pt-4 flex justify-between">
                        <span className="text-white font-semibold">Total</span>
                        <span className="text-[#FDB913] font-bold">{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-400">
                      <p><strong>Entrega:</strong> {order.delivery_address}</p>
                      {order.notes && <p><strong>Observações:</strong> {order.notes}</p>}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrdersPage;
