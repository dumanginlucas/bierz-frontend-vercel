import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('bierz_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [equipment, setEquipment] = useState(() => {
    const saved = localStorage.getItem('bierz_equipment');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('bierz_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('bierz_equipment', JSON.stringify(equipment));
  }, [equipment]);

  const addItem = (product, quantity, size) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product_id === product.id && item.size === size
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        toast.success(`Quantidade atualizada: ${product.name}`);
        return updated;
      }

      toast.success(`Adicionado ao carrinho: ${product.name}`);
      return [...prev, {
        product_id: product.id,
        product_name: product.name,
        product_image: product.image,
        price: product.price,
        price_unit: product.price_unit,
        category: product.category,
        quantity,
        size
      }];
    });
  };

  const removeItem = (productId, size) => {
    setItems(prev => prev.filter(
      item => !(item.product_id === productId && item.size === size)
    ));
    toast.info('Item removido do carrinho');
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }

    setItems(prev => prev.map(item =>
      item.product_id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    setEquipment(null);
    localStorage.removeItem('bierz_cart');
    localStorage.removeItem('bierz_equipment');
  };

  const chooseEquipment = (equip) => {
    setEquipment(equip);
    toast.success(`Equipamento selecionado: ${equip?.name || ''}`.trim());
  };

  const clearEquipment = () => {
    setEquipment(null);
    toast.success('Equipamento removido');
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.length; // Retorna número de itens, não quantidade total
  };

  const getTotalQuantity = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Check if cart has chopp items
  const hasChoppItems = () => {
    return items.some(item => item.price_unit === 'litro');
  };

  // Get total liters of chopp in cart
  const getChoppLiters = () => {
    return items
      .filter(item => item.price_unit === 'litro')
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  // Check if free delivery applies (30+ liters of chopp)
  const hasFreeDelivery = () => {
    return getChoppLiters() >= 30;
  };

  // Delivery fee
  const DELIVERY_FEE = 50;
  
  // Chopeira rental fee (currently free for all chopp purchases)
  const CHOPEIRA_FEE = 100;
  const CHOPEIRA_FREE = true; // Promo: chopeira grátis

  const getDeliveryFee = () => {
    if (!hasChoppItems()) return 0;
    return hasFreeDelivery() ? 0 : DELIVERY_FEE;
  };

  const getChopeiraFee = () => {
    if (!hasChoppItems()) return 0;
    return CHOPEIRA_FREE ? 0 : CHOPEIRA_FEE;
  };

  const getFinalTotal = () => {
    return getTotal() + getDeliveryFee() + getChopeiraFee();
  };

  const value = {
    items,
    equipment,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    chooseEquipment,
    clearEquipment,
    getTotal,
    getItemCount,
    getTotalQuantity,
    hasChoppItems,
    getChoppLiters,
    hasFreeDelivery,
    getDeliveryFee,
    getChopeiraFee,
    getFinalTotal,
    DELIVERY_FEE,
    CHOPEIRA_FEE,
    CHOPEIRA_FREE
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
