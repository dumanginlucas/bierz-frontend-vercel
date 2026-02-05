import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, LogOut } from "lucide-react";

const ProfilePage = () => {
  const { user, updateProfile, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || ""
  });

  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || ""
      });
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(formData);
      toast.success("Perfil atualizado com sucesso!");
      setEditing(false);
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Você saiu da sua conta");
  };

  if (authLoading) {
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
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Meu <span className="text-[#FDB913]">Perfil</span>
          </h1>

          <Card className="bg-black/50 border-[#FDB913]/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2 text-[#FDB913]" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-400 flex items-center mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Label>
                <p className="text-white">{user?.email}</p>
              </div>

              <div>
                <Label className="text-gray-400 flex items-center mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Nome
                </Label>
                {editing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-900/50 border-[#FDB913]/30 text-white"
                    data-testid="profile-name"
                  />
                ) : (
                  <p className="text-white">{user?.name}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-400 flex items-center mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Telefone
                </Label>
                {editing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-gray-900/50 border-[#FDB913]/30 text-white"
                    data-testid="profile-phone"
                  />
                ) : (
                  <p className="text-white">{user?.phone || "Não informado"}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-400 flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Endereço
                </Label>
                {editing ? (
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-gray-900/50 border-[#FDB913]/30 text-white"
                    data-testid="profile-address"
                  />
                ) : (
                  <p className="text-white">{user?.address || "Não informado"}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                {editing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-[#FDB913] hover:bg-[#F5A623] text-black font-semibold"
                      disabled={saving}
                      data-testid="save-profile-btn"
                    >
                      {saving ? "Salvando..." : "Salvar"}
                    </Button>
                    <Button
                      onClick={() => setEditing(false)}
                      variant="outline"
                      className="border-[#FDB913]/30 text-[#FDB913]"
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setEditing(true)}
                    className="bg-[#FDB913] hover:bg-[#F5A623] text-black font-semibold"
                    data-testid="edit-profile-btn"
                  >
                    Editar Perfil
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-red-500/30 mt-6">
            <CardContent className="pt-6">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
                data-testid="logout-btn"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair da Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
