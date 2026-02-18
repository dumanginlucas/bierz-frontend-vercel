import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { 
  Package, ShoppingCart, Users, DollarSign, 
  AlertTriangle, LogOut, Menu, X, Beer,
  LayoutDashboard, ClipboardList, Settings, Tags
} from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const { user, token, isAdmin, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [authLoading, user, isAdmin, navigate]);

  useEffect(() => {
    if (token && isAdmin) {
      fetchStats();
    }
  }, [token, isAdmin]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatPrice = (price) => {
    return (price || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

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
        <div className="p-4 border-b border-[#F59E0B]/30">
          <Link to="/" className="flex items-center space-x-2">
            <Beer className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-xl font-bold text-[#F59E0B]">Bierz Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B]">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/produtos" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] transition-colors">
            <Package className="w-5 h-5" />
            <span>Produtos</span>
          </Link>
          <Link to="/admin/categorias" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] transition-colors">
            <Tags className="w-5 h-5" />
            <span>Categorias</span>
          </Link>
          <Link to="/admin/pedidos" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] transition-colors">
            <ClipboardList className="w-5 h-5" />
            <span>Pedidos</span>
          </Link>
          <Link to="/admin/usuarios" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] transition-colors">
            <Users className="w-5 h-5" />
            <span>Usuários</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[#F59E0B]/30">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center">
              <span className="text-black font-bold">{user?.name?.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.name}</p>
              <p className="text-gray-400 text-xs">{user?.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
            data-testid="admin-logout-btn"
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
        <span className="text-[#F59E0B] font-bold">Bierz Admin</span>
        <div className="w-6" />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/50 border-[#F59E0B]/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total de Pedidos</p>
                  <p className="text-3xl font-bold text-white">{stats?.total_orders || 0}</p>
                </div>
                <ShoppingCart className="w-10 h-10 text-[#F59E0B]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#F59E0B]/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pedidos Pendentes</p>
                  <p className="text-3xl font-bold text-yellow-500">{stats?.pending_orders || 0}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#F59E0B]/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total de Clientes</p>
                  <p className="text-3xl font-bold text-white">{stats?.total_users || 0}</p>
                </div>
                <Users className="w-10 h-10 text-[#F59E0B]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#F59E0B]/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Receita Total</p>
                  <p className="text-2xl font-bold text-green-500">{formatPrice(stats?.total_revenue)}</p>
                </div>
                <DollarSign className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {stats?.low_stock_products?.length > 0 && (
          <Card className="bg-black/50 border-red-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Produtos com Estoque Baixo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.low_stock_products.map((product) => (
                  <div key={product.id} className="flex justify-between items-center text-sm">
                    <span className="text-white">{product.name}</span>
                    <span className="text-red-500 font-semibold">
                      {product.stock} {product.price_unit === 'litro' ? 'L' : 'un'} restantes
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/produtos">
            <Card className="bg-black/50 border-[#F59E0B]/30 hover:border-[#F59E0B] transition-colors cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Package className="w-12 h-12 text-[#F59E0B] mx-auto mb-2" />
                <p className="text-white font-semibold">Gerenciar Produtos</p>
                <p className="text-gray-400 text-sm">{stats?.total_products || 0} produtos cadastrados</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/pedidos">
            <Card className="bg-black/50 border-[#F59E0B]/30 hover:border-[#F59E0B] transition-colors cursor-pointer">
              <CardContent className="pt-6 text-center">
                <ClipboardList className="w-12 h-12 text-[#F59E0B] mx-auto mb-2" />
                <p className="text-white font-semibold">Ver Pedidos</p>
                <p className="text-gray-400 text-sm">{stats?.pending_orders || 0} pedidos pendentes</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/usuarios">
            <Card className="bg-black/50 border-[#F59E0B]/30 hover:border-[#F59E0B] transition-colors cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 text-[#F59E0B] mx-auto mb-2" />
                <p className="text-white font-semibold">Ver Clientes</p>
                <p className="text-gray-400 text-sm">{stats?.total_users || 0} clientes cadastrados</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
