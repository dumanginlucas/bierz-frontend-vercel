import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import axios from "axios";
import { 
  Package, Beer, LayoutDashboard, ClipboardList, Users, LogOut,
  Menu, X, Mail, Phone, MapPin, Search
} from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminUsers = () => {
  const { user, token, isAdmin, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [authLoading, user, isAdmin, navigate]);

  useEffect(() => {
    if (token && isAdmin) {
      fetchUsers();
    }
  }, [token, isAdmin]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/produtos" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] transition-colors">
            <Package className="w-5 h-5" />
            <span>Produtos</span>
          </Link>
          <Link to="/admin/pedidos" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] transition-colors">
            <ClipboardList className="w-5 h-5" />
            <span>Pedidos</span>
          </Link>
          <Link to="/admin/usuarios" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B]">
            <Users className="w-5 h-5" />
            <span>Usuários</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[#F59E0B]/30">
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
        <span className="text-[#F59E0B] font-bold">Usuários</span>
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
          <h1 className="text-3xl font-bold text-white">Usuários</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-[#F59E0B]/30 text-white"
              data-testid="search-users"
            />
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <Card className="bg-black/50 border-[#F59E0B]/30 p-8 text-center">
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum usuário encontrado</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((u) => (
              <Card 
                key={u.id} 
                className="bg-black/50 border-[#F59E0B]/30"
                data-testid={`user-${u.id}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F59E0B] rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-lg">{u.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{u.name}</h3>
                        <Badge className={u.role === 'admin' ? 'bg-purple-500' : 'bg-gray-600'}>
                          {u.role === 'admin' ? 'Admin' : 'Cliente'}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={u.is_active ? 'bg-green-500' : 'bg-red-500'}>
                      {u.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {u.email}
                    </p>
                    {u.phone && (
                      <a 
                        href={`tel:${u.phone}`}
                        className="text-[#F59E0B] flex items-center hover:underline"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {u.phone}
                      </a>
                    )}
                    {u.address && (
                      <p className="text-gray-400 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {u.address}
                      </p>
                    )}
                  </div>

                  {u.phone && u.role !== 'admin' && (
                    <Button
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.open(`https://wa.me/55${u.phone.replace(/\D/g, '')}`, '_blank')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
