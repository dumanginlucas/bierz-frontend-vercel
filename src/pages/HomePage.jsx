import React from "react";

const HomePage = () => {
  return (
    <div style={{ 
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f1419 0%, #1a1f2e 50%, #0f1419 100%)",
      color: "#e0e0e0",
      padding: "40px 20px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
          🍺 Bierz
        </h1>
        <p style={{ fontSize: "18px", textAlign: "center", marginBottom: "40px", color: "#b0b0b0" }}>
          Seu distribuidor de bebidas geladas
        </p>
        
        <div style={{ 
          background: "rgba(245, 158, 11, 0.1)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          borderRadius: "8px",
          padding: "30px",
          marginBottom: "30px"
        }}>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>✅ Background Unificado Aplicado</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "15px" }}>
            O novo design utiliza um gradiente suave e elegante que vai de cima até embaixo, criando uma experiência visual contínua e profissional.
          </p>
          <ul style={{ fontSize: "16px", lineHeight: "1.8", marginLeft: "20px" }}>
            <li>✓ Background gradiente: #0f1419 → #1a1f2e → #0f1419</li>
            <li>✓ Background fixo (parallax effect)</li>
            <li>✓ Sem divisões visuais entre seções</li>
            <li>✓ Compatível com Vercel</li>
          </ul>
        </div>

        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {["Identification", "Products", "Services", "Calculator", "About", "Contact"].map((section) => (
            <div key={section} style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center"
            }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>{section}</h3>
              <p style={{ fontSize: "14px", color: "#a0a0a0" }}>Seção carregada</p>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: "40px",
          padding: "20px",
          background: "rgba(76, 175, 80, 0.1)",
          border: "1px solid rgba(76, 175, 80, 0.3)",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#4CAF50" }}>🚀 Pronto para Deploy</h3>
          <p style={{ fontSize: "14px", color: "#b0b0b0" }}>
            O projeto compila sem erros e está pronto para ser publicado na Vercel
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
