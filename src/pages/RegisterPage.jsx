import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Beer, Mail, Lock, User, Phone, MapPin } from "lucide-react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const user = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
        formData.address
      );
      toast.success(`Conta criada com sucesso! Bem-vindo, ${user.name}!`);
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.detail || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-[#FDB913] hover:text-[#F5A623] mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o site
        </Link>

        <Card className="bg-black/50 border-[#FDB913]/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#FDB913] p-3 rounded-full">
                <Beer className="w-8 h-8 text-black" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Criar sua conta</CardTitle>
            <CardDescription className="text-gray-400">
              Cadastre-se para fazer pedidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-[#FDB913]/30 text-white placeholder-gray-500 focus:border-[#FDB913]"
                    required
                    data-testid="register-name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-[#FDB913]/30 text-white placeholder-gray-500 focus:border-[#FDB913]"
                    required
                    data-testid="register-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-200">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(15) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-[#FDB913]/30 text-white placeholder-gray-500 focus:border-[#FDB913]"
                    data-testid="register-phone"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-200">Endereço</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Rua, número, bairro"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-[#FDB913]/30 text-white placeholder-gray-500 focus:border-[#FDB913]"
                    data-testid="register-address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-[#FDB913]/30 text-white placeholder-gray-500 focus:border-[#FDB913]"
                    required
                    data-testid="register-password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-200">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 bg-gray-900/50 border-[#FDB913]/30 text-white placeholder-gray-500 focus:border-[#FDB913]"
                    required
                    data-testid="register-confirm-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FDB913] hover:bg-[#F5A623] text-black font-semibold"
                disabled={loading}
                data-testid="register-submit"
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-[#FDB913] hover:text-[#F5A623]">
                  Fazer login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
