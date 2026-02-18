import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
  Package, Plus, Edit, Trash2, Beer, 
  LayoutDashboard, ClipboardList, Users, Tags, LogOut,
  Menu, X, Search, Upload, Image as ImageIcon, Loader2
} from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminProducts = () => {
  const { user, token, isAdmin, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("todos");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    image: "",
    sizes: "",
    price: "",
    price_unit: "unidade",
    abv: "",
    ibu: "",
    stock: "",
    is_active: true,
    featured: false,
    order: 0
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [authLoading, user, isAdmin, navigate]);

  useEffect(() => {
    if (token && isAdmin) {
      fetchProducts();
      fetchCategories();
    }
  }, [token, isAdmin]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products?active_only=false`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      setCategories(response.data.filter(c => c.id !== "todos"));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openCreateDialog = () => {
    setSelectedProduct(null);
    // ✅ FIX: Garantir que order esteja sempre presente no reset do form
    setFormData({
      name: "",
      description: "",
      category: "",
      brand: "",
      image: "",
      sizes: "",
      price: "",
      price_unit: "unidade",
      abv: "",
      ibu: "",
      stock: "",
      is_active: true,
      featured: false,
      order: 0  // ✅ Campo order sempre inicializado
    });
    setDialogOpen(true);
  };

  const openEditDialog = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      brand: product.brand || "",
      image: product.image,
      sizes: product.sizes.join(", "),
      price: product.price.toString(),
      price_unit: product.price_unit,
      abv: product.abv ? product.abv.toString() : "",
      ibu: product.ibu ? product.ibu.toString() : "",
      stock: product.stock.toString(),
      is_active: product.is_active,
      featured: product.featured || false,
      order: product.order || 0
    });
    setDialogOpen(true);
  };

  // Image Upload Handler
  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido. Use JPG, PNG, WebP ou GIF.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 5MB.');
      return;
    }

    setUploading(true);
    
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await axios.post(`${API_URL}/api/admin/upload-image`, formDataUpload, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setFormData(prev => ({ ...prev, image: response.data.image_url }));
      toast.success('Imagem carregada com sucesso!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.detail || 'Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  // Drag and Drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, [token]);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      // ✅ FIX: Blindagem contra NaN - usar Number.isFinite para garantir número válido
      const orderValue = Number.isFinite(Number(formData.order))
        ? Number(formData.order)
        : 0;
      
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        brand: formData.brand || null,
        image: formData.image,
        sizes: formData.sizes.split(",").map(s => s.trim()).filter(s => s),
        price: parseFloat(formData.price),
        price_unit: formData.price_unit,
        abv: formData.abv ? parseFloat(formData.abv) : null,
        ibu: formData.ibu ? parseInt(formData.ibu) : null,
        stock: parseInt(formData.stock),
        is_active: formData.is_active,
        featured: formData.featured,
        order: orderValue  // ✅ Sempre será um número válido (0 ou maior)
      };

      console.log('📦 Salvando produto com order:', orderValue, 'formData.order:', formData.order, 'tipo:', typeof orderValue);

      if (selectedProduct) {
        const response = await axios.put(`${API_URL}/api/admin/products/${selectedProduct.id}`, productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Resposta do backend após update:', response.data);
        toast.success("Produto atualizado com sucesso!");
      } else {
        const response = await axios.post(`${API_URL}/api/admin/products`, productData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Resposta do backend após criar:', response.data);
        toast.success("Produto criado com sucesso!");
      }

      setDialogOpen(false);
      await fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error.response?.data?.detail || "Erro ao salvar produto");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/admin/products/${selectedProduct.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Produto excluído com sucesso!");
      setDeleteDialogOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Erro ao excluir produto");
    }
  };

  const handleStockUpdate = async (productId, newStock) => {
    try {
      await axios.put(`${API_URL}/api/admin/stock/${productId}?stock=${newStock}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Estoque atualizado!");
      fetchProducts();
    } catch (error) {
      toast.error("Erro ao atualizar estoque");
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "todos" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
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
          <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/produtos" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B]">
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
        <span className="text-[#F59E0B] font-bold">Produtos</span>
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
          <h1 className="text-3xl font-bold text-white">Produtos</h1>
          <Button
            onClick={openCreateDialog}
            className="bg-[#F59E0B] hover:bg-[#F97316] text-black font-semibold"
            data-testid="add-product-btn"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-[#F59E0B]/30 text-white"
              data-testid="search-products"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-48 bg-black/50 border-[#F59E0B]/30 text-white">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-[#F59E0B]/30">
              <SelectItem value="todos" className="text-white">Todas Categorias</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id} className="text-white">{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-black/50 border-[#F59E0B]/30" data-testid={`product-${product.id}`}>
              <div className="relative h-40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                {product.featured && (
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold">
                    ⭐ Destaque
                  </Badge>
                )}
                {!product.is_active && (
                  <Badge className="absolute top-2 right-2 bg-red-500">Inativo</Badge>
                )}
              </div>
              <CardContent className="pt-4">
                <h3 className="text-white font-semibold text-lg mb-1">{product.name}</h3>
                {product.brand && (
                  <p className="text-amber-500 text-sm font-medium">{product.brand}</p>
                )}
                <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                
                {/* ABV e IBU */}
                {(product.abv || product.ibu) && (
                  <div className="flex gap-2 mb-2">
                    {product.abv && (
                      <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-500">
                        {product.abv}% ABV
                      </Badge>
                    )}
                    {product.ibu && (
                      <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-500">
                        {product.ibu} IBU
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#F59E0B] font-bold">
                    {formatPrice(product.price)}/{product.price_unit}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${product.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>
                      Estoque: {product.stock}
                    </span>
                    <Input
                      type="number"
                      className="w-20 h-8 bg-gray-900/50 border-[#F59E0B]/30 text-white text-sm"
                      defaultValue={product.stock}
                      onBlur={(e) => {
                        const newStock = parseInt(e.target.value);
                        if (newStock !== product.stock) {
                          handleStockUpdate(product.id, newStock);
                        }
                      }}
                      data-testid={`stock-${product.id}`}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black"
                    onClick={() => openEditDialog(product)}
                    data-testid={`edit-${product.id}`}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      setSelectedProduct(product);
                      setDeleteDialogOpen(true);
                    }}
                    data-testid={`delete-${product.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Nenhum produto encontrado
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-900 border-[#F59E0B]/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#F59E0B]">
              {selectedProduct ? "Editar Produto" : "Novo Produto"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Nome</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-black/50 border-[#F59E0B]/30 text-white"
                  data-testid="product-name"
                />
              </div>
              <div>
                <Label className="text-gray-300">Categoria</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger className="bg-black/50 border-[#F59E0B]/30 text-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-[#F59E0B]/30">
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id} className="text-white">{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Descrição</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-black/50 border-[#F59E0B]/30 text-white"
                data-testid="product-description"
              />
            </div>
            
            {/* Image Upload Section */}
            <div>
              <Label className="text-gray-300 mb-2 block">Imagem do Produto</Label>
              
              {/* Drag and Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                  dragActive 
                    ? 'border-[#F59E0B] bg-[#F59E0B]/10' 
                    : 'border-[#F59E0B]/30 hover:border-[#F59E0B]/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {formData.image ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg mb-3"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-[#F59E0B]/30 text-[#F59E0B]"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Trocar imagem
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-12 h-12 text-[#F59E0B] mb-3 animate-spin" />
                        <p className="text-gray-400">Enviando imagem...</p>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-12 h-12 text-[#F59E0B]/50 mb-3" />
                        <p className="text-gray-300 font-medium mb-1">
                          Arraste uma imagem ou clique para selecionar
                        </p>
                        <p className="text-gray-500 text-sm">
                          JPG, PNG, WebP ou GIF (máx. 5MB)
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* URL Input as alternative */}
              <div className="mt-3">
                <Label className="text-gray-400 text-xs">Ou cole a URL da imagem:</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="bg-black/50 border-[#F59E0B]/30 text-white mt-1"
                  placeholder="https://..."
                  data-testid="product-image"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Tamanhos (separados por vírgula)</Label>
              <Input
                value={formData.sizes}
                onChange={(e) => setFormData({...formData, sizes: e.target.value})}
                className="bg-black/50 border-amber-500/30 text-white"
                placeholder="30L, 50L"
                data-testid="product-sizes"
              />
            </div>
            
            {/* Novos campos: Brand, ABV, IBU */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Marca</Label>
                <Input
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="bg-black/50 border-amber-500/30 text-white"
                  placeholder="Ex: Brahma, Heineken"
                  data-testid="product-brand"
                />
              </div>
              <div>
                <Label className="text-gray-300">ABV (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.abv}
                  onChange={(e) => setFormData({...formData, abv: e.target.value})}
                  className="bg-black/50 border-amber-500/30 text-white"
                  placeholder="Ex: 4.8"
                  data-testid="product-abv"
                />
              </div>
              <div>
                <Label className="text-gray-300">IBU (Amargor)</Label>
                <Input
                  type="number"
                  value={formData.ibu}
                  onChange={(e) => setFormData({...formData, ibu: e.target.value})}
                  className="bg-black/50 border-amber-500/30 text-white"
                  placeholder="Ex: 12"
                  data-testid="product-ibu"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Preço (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="bg-black/50 border-[#F59E0B]/30 text-white"
                  data-testid="product-price"
                />
              </div>
              <div>
                <Label className="text-gray-300">Unidade de Preço</Label>
                <Select 
                  value={formData.price_unit} 
                  onValueChange={(value) => setFormData({...formData, price_unit: value})}
                >
                  <SelectTrigger className="bg-black/50 border-[#F59E0B]/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-[#F59E0B]/30">
                    <SelectItem value="litro" className="text-white">Por Litro</SelectItem>
                    <SelectItem value="unidade" className="text-white">Por Unidade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Estoque</Label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="bg-black/50 border-[#F59E0B]/30 text-white"
                  data-testid="product-stock"
                />
              </div>
              <div>
                <Label className="text-gray-300">
                  Ordem de Exibição
                  <span className="text-xs text-gray-500 ml-2">(1-30, menor primeiro | 0 = sem ordem)</span>
                </Label>
                <Input
                  type="number"
                  value={formData.order ?? 0}
                  onChange={(e) => {
                    // ✅ FIX: Sempre converter para número, nunca deixar vazio/undefined
                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                    // Validar se é um número válido
                    const finalVal = Number.isNaN(val) ? 0 : val;
                    console.log('🔢 Mudando order para:', finalVal, 'tipo:', typeof finalVal);
                    setFormData({...formData, order: finalVal});
                  }}
                  onBlur={(e) => {
                    // ✅ FIX: Garantir que sempre tenha um número válido ao sair do campo
                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                    const finalVal = Number.isNaN(val) ? 0 : val;
                    setFormData({...formData, order: finalVal});
                  }}
                  className="bg-black/50 border-[#F59E0B]/30 text-white"
                  placeholder="0"
                  min="0"
                  max="999"
                  data-testid="product-order"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Produtos com ordem 1-30 aparecem primeiro. Produtos com ordem 0 aparecem no final.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="rounded border-amber-500/30"
                />
                <Label htmlFor="is_active" className="text-gray-300">Produto ativo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="rounded border-amber-500/30"
                />
                <Label htmlFor="featured" className="text-gray-300 flex items-center gap-1">
                  <span className="text-amber-500">⭐</span> Produto em Destaque
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-gray-500 text-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#F59E0B] hover:bg-[#F97316] text-black"
              data-testid="save-product-btn"
            >
              {selectedProduct ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 border-red-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500">Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">
            Tem certeza que deseja excluir o produto "{selectedProduct?.name}"?
            Esta ação não pode ser desfeita.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-gray-500 text-gray-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              data-testid="confirm-delete-btn"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
