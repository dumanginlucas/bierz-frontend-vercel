import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Beer, LayoutDashboard, Package, ClipboardList, Users, Tags, LogOut, Menu, X, Plus, Pencil, Trash2 } from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminCategories = () => {
  const { user, token, isAdmin, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ id: "", name: "", icon: "", order: 0, is_active: true });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [authLoading, user, isAdmin, navigate]);

  useEffect(() => {
    if (token && isAdmin) fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAdmin]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/admin/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data || []);
    } catch (e) {
      console.error("Error fetching categories:", e);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ id: "", name: "", icon: "", order: 0, is_active: true });
    setDialogOpen(true);
  };

  const openEdit = (cat) => {
    setEditingId(cat.id);
    setForm({
      id: cat.id,
      name: cat.name || "",
      icon: cat.icon || "",
      order: cat.order || 0,
      is_active: cat.is_active !== false,
    });
    setDialogOpen(true);
  };

  const saveCategory = async () => {
    try {
      const payload = {
        id: form.id.trim(),
        name: form.name.trim(),
        icon: form.icon?.trim() || null,
        order: Number(form.order) || 0,
        is_active: !!form.is_active,
      };

      if (!payload.id || !payload.name) return;

      if (editingId) {
        await axios.put(`${API_URL}/api/admin/categories/${editingId}`, {
          name: payload.name,
          icon: payload.icon,
          order: payload.order,
          is_active: payload.is_active,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/api/admin/categories`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setDialogOpen(false);
      await fetchCategories();
    } catch (e) {
      console.error("Error saving category:", e);
      alert(e?.response?.data?.detail || "Erro ao salvar categoria");
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Excluir esta categoria?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCategories();
    } catch (e) {
      console.error("Error deleting category:", e);
      alert(e?.response?.data?.detail || "Erro ao excluir categoria");
    }
  };

  const sorted = useMemo(() => {
    const list = [...categories];
    list.sort((a, b) => {
      const oa = a.order && a.order > 0 ? a.order : 9999;
      const ob = b.order && b.order > 0 ? b.order : 9999;
      if (oa !== ob) return oa - ob;
      return (a.name || "").localeCompare(b.name || "");
    });
    return list;
  }, [categories]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
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
          <Link to="/admin/categorias" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B]">
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
          <Button onClick={handleLogout} variant="outline" className="w-full border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white">
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

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Categorias</h1>
          <Button onClick={openCreate} className="bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black">
            <Plus className="w-4 h-4 mr-2" />
            Nova categoria
          </Button>
        </div>

        <Card className="bg-black/50 border-[#F59E0B]/30">
          <CardHeader>
            <CardTitle className="text-white">Lista</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="text-left py-3">ID (slug)</th>
                    <th className="text-left py-3">Nome</th>
                    <th className="text-left py-3">Ícone</th>
                    <th className="text-left py-3">Ordem</th>
                    <th className="text-left py-3">Ativa</th>
                    <th className="text-right py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((c) => (
                    <tr key={c.id} className="border-b border-white/5 text-white">
                      <td className="py-3 font-mono text-xs">{c.id}</td>
                      <td className="py-3">{c.name}</td>
                      <td className="py-3">{c.icon || "—"}</td>
                      <td className="py-3">{c.order || 0}</td>
                      <td className="py-3">{c.is_active === false ? "Não" : "Sim"}</td>
                      <td className="py-3 text-right">
                        <Button variant="outline" className="border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B]/10 mr-2" onClick={() => openEdit(c)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="border-red-500/40 text-red-500 hover:bg-red-500/10" onClick={() => deleteCategory(c.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Dialog simples */}
        {dialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg bg-gray-950 border border-[#F59E0B]/30 rounded-xl p-6">
              <h2 className="text-white text-xl font-bold mb-4">{editingId ? "Editar" : "Nova"} categoria</h2>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-gray-300 text-sm">ID (slug)</label>
                  <input
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
                    value={form.id}
                    onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
                    disabled={!!editingId}
                    placeholder='ex: "chopp"'
                  />
                  {editingId && <p className="text-gray-500 text-xs mt-1">O ID não pode ser alterado.</p>}
                </div>

                <div>
                  <label className="text-gray-300 text-sm">Nome</label>
                  <input
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder='ex: "Chopp"'
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 text-sm">Ícone (texto/emoji)</label>
                    <input
                      className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
                      value={form.icon}
                      onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                      placeholder='ex: "🍺"'
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm">Ordem</label>
                    <input
                      type="number"
                      className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
                      value={form.order}
                      onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))}
                    />
                    <p className="text-gray-500 text-xs mt-1">0 = vai pro fim</p>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={!!form.is_active}
                    onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
                  />
                  Ativa
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black" onClick={saveCategory}>
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
