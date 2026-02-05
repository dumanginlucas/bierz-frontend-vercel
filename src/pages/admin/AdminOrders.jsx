import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { 
  Package, Beer, LayoutDashboard, ClipboardList, Users, LogOut,
  Menu, X, Clock, CheckCircle, Truck, XCircle, Eye, Phone, Mail, MapPin
} from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminOrders = () => {
  const { user, token, isAdmin, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [authLoading, user, isAdmin, navigate]);

  useEffect(() => {
    if (token && isAdmin) {
      fetchOrders();
    }
  }, [token, isAdmin]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/admin/orders/${orderId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status atualizado com sucesso!");
      fetchOrders();
    } catch (error) {
      toast.error("Erro ao atualizar status");
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

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#FDB913]/30">
          <Link to="/" className="flex items-center space-x-2">
            <Beer className="w-8 h-8 text-[#FDB913]" />
            <span className="text-xl font-bold text-[#FDB913]">Bierz Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#FDB913]/10 hover:text-[#FDB913] transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/produtos" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#FDB913]/10 hover:text-[#FDB913] transition-colors">
            <Package className="w-5 h-5" />
            <span>Produtos</span>
          </Link>
          <Link to="/admin/pedidos" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#FDB913]/10 text-[#FDB913]">
            <ClipboardList className="w-5 h-5" />
            <span>Pedidos</span>
          </Link>
          <Link to="/admin/usuarios" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#FDB913]/10 hover:text-[#FDB913] transition-colors">
            <Users className="w-5 h-5" />
            <span>Usuários</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[#FDB913]/30">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black p-4 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="text-[#FDB913] font-bold">Pedidos</span>
        <div className="w-6" />
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Pedidos</h1>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48 bg-black/50 border-[#FDB913]/30 text-white">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-[#FDB913]/30">
              <SelectItem value="all" className="text-white">Todos</SelectItem>
              <SelectItem value="pending" className="text-white">Pendentes</SelectItem>
              <SelectItem value="confirmed" className="text-white">Confirmados</SelectItem>
              <SelectItem value="preparing" className="text-white">Preparando</SelectItem>
              <SelectItem value="delivered" className="text-white">Entregues</SelectItem>
              <SelectItem value="cancelled" className="text-white">Cancelados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredOrders.length === 0 ? (
          <Card className="bg-black/50 border-[#FDB913]/30 p-8 text-center">
            <ClipboardList className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum pedido encontrado</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <Card 
                  key={order.id} 
                  className="bg-black/50 border-[#FDB913]/30"
                  data-testid={`order-${order.id}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-semibold text-lg">
                            Pedido #{order.id.slice(0, 8)}
                          </h3>
                          <Badge className={`${statusInfo.color} text-white`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{formatDate(order.created_at)}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="text-gray-400 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {order.user_name}
                          </span>
                          <span className="text-gray-400 flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {order.user_email}
                          </span>
                          {order.user_phone && (
                            <a 
                              href={`tel:${order.user_phone}`}
                              className="text-[#FDB913] flex items-center hover:underline"
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              {order.user_phone}
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[#FDB913] font-bold text-xl">
                          {formatPrice(order.total)}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#FDB913]/30 text-[#FDB913] hover:bg-[#FDB913] hover:text-black"
                            onClick={() => {
                              setSelectedOrder(order);
                              setDetailDialogOpen(true);
                            }}
                            data-testid={`view-order-${order.id}`}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Detalhes
                          </Button>
                          {order.user_phone && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white"
                              onClick={() => window.open(`https://wa.me/55${order.user_phone.replace(/\D/g, '')}`, '_blank')}
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Update */}
                    <div className="mt-4 pt-4 border-t border-[#FDB913]/20">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-gray-400 text-sm mr-2">Atualizar status:</span>
                        {["pending", "confirmed", "preparing", "delivered", "cancelled"].map((status) => {
                          const info = getStatusInfo(status);
                          return (
                            <Button
                              key={status}
                              variant="outline"
                              size="sm"
                              className={`${order.status === status ? info.color + ' text-white' : 'border-gray-600 text-gray-400'} hover:${info.color} hover:text-white`}
                              onClick={() => updateOrderStatus(order.id, status)}
                              disabled={order.status === status}
                              data-testid={`status-${status}-${order.id}`}
                            >
                              {info.label}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="bg-gray-900 border-[#FDB913]/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#FDB913]">
              Detalhes do Pedido #{selectedOrder?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-[#FDB913] font-semibold mb-3">Dados do Cliente</h3>
                <div className="space-y-2">
                  <p className="text-white flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedOrder.user_name}
                  </p>
                  <p className="text-white flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedOrder.user_email}
                  </p>
                  {selectedOrder.user_phone && (
                    <a 
                      href={`tel:${selectedOrder.user_phone}`}
                      className="text-[#FDB913] flex items-center hover:underline"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedOrder.user_phone}
                    </a>
                  )}
                  <p className="text-white flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedOrder.delivery_address}
                  </p>
                </div>
                {selectedOrder.user_phone && (
                  <Button
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open(`https://wa.me/55${selectedOrder.user_phone.replace(/\D/g, '')}?text=Olá ${selectedOrder.user_name}! Sobre seu pedido #${selectedOrder.id.slice(0, 8)} na Bierz...`, '_blank')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contatar via WhatsApp
                  </Button>
                )}
              </div>

              {/* Order Items */}
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-[#FDB913] font-semibold mb-3">Itens do Pedido</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <div>
                        <p className="text-white">{item.product_name}</p>
                        <p className="text-gray-400 text-sm">
                          {item.size} - {item.quantity} {item.price_unit === 'litro' ? 'L' : 'un'} x {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="text-white font-semibold">{formatPrice(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#FDB913]/30 flex justify-between">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-[#FDB913] font-bold text-lg">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-[#FDB913] font-semibold mb-2">Observações</h3>
                  <p className="text-gray-300">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Status */}
              <div className="bg-black/30 rounded-lg p-4">
                <h3 className="text-[#FDB913] font-semibold mb-3">Status do Pedido</h3>
                <Badge className={`${getStatusInfo(selectedOrder.status).color} text-white`}>
                  {getStatusInfo(selectedOrder.status).label}
                </Badge>
                <p className="text-gray-400 text-sm mt-2">
                  Criado em: {formatDate(selectedOrder.created_at)}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
