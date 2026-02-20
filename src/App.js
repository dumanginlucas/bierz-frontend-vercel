import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@/App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "./components/ui/sonner";
import AgeVerificationModal from "./components/AgeVerificationModal";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  useEffect(() => {
    // Remove any leftover deploy-check badge from testing (if it exists in DOM)
    const removeDeployBadge = () => {
      const candidates = Array.from(document.querySelectorAll("body *"));

      for (const el of candidates) {
        // Never remove critical containers
        if (el === document.documentElement) continue;
        if (el === document.body) continue;
        if (el.id === "root") continue;
        if (el.classList?.contains("App")) continue;

        const txt = (el.textContent || "").trim();
        if (!txt) continue;
        if (!txt.includes("DEPLOY_CHECK")) continue;

        // Only remove the *badge element itself*, not its parents.
        // So: prefer leaf nodes (no element-children that also include DEPLOY_CHECK).
        const childHas = Array.from(el.children || []).some((c) =>
          ((c.textContent || "").trim() || "").includes("DEPLOY_CHECK")
        );
        if (childHas) continue;

        // Extra guard: don't remove large layout blocks
        const rect = el.getBoundingClientRect?.();
        const tooBig = rect && (rect.width > window.innerWidth * 0.6 || rect.height > window.innerHeight * 0.35);
        if (tooBig) continue;

        el.remove();
      }
    };

    removeDeployBadge();
    const t1 = setTimeout(removeDeployBadge, 500);
    const t2 = setTimeout(removeDeployBadge, 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/pedidos" element={<OrdersPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/produtos" element={<AdminProducts />} />
              <Route path="/admin/categorias" element={<AdminCategories />} />
              <Route path="/admin/pedidos" element={<AdminOrders />} />
              <Route path="/admin/usuarios" element={<AdminUsers />} />
            </Routes>
            <Toaster position="top-right" richColors />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
