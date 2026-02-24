import { useState, useEffect } from "react";

const products = [
  { id: 1, name: "Wireless Headphones", price: "$129.99", category: "Electronics", stock: 48, img: "🎧" },
  { id: 2, name: "Leather Wallet", price: "$49.99", category: "Accessories", stock: 120, img: "👜" },
  { id: 3, name: "Running Shoes", price: "$89.99", category: "Footwear", stock: 35, img: "👟" },
  { id: 4, name: "Coffee Maker", price: "$59.99", category: "Appliances", stock: 22, img: "☕" },
  { id: 5, name: "Mechanical Keyboard", price: "$149.99", category: "Electronics", stock: 67, img: "⌨️" },
  { id: 6, name: "Sunglasses", price: "$79.99", category: "Accessories", stock: 90, img: "🕶️" },
  { id: 7, name: "Yoga Mat", price: "$39.99", category: "Sports", stock: 55, img: "🧘" },
  { id: 8, name: "Desk Lamp", price: "$34.99", category: "Home", stock: 43, img: "💡" },
  { id: 9, name: "Smartwatch", price: "$199.99", category: "Electronics", stock: 28, img: "⌚" },
  { id: 10, name: "Backpack", price: "$69.99", category: "Accessories", stock: 76, img: "🎒" },
];

const stats = [
  { label: "Products Tracked", value: "10,000+" },
  { label: "Active Users", value: "2,500+" },
  { label: "Categories", value: "50+" },
  { label: "Uptime", value: "99.9%" },
];

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => setVisible(true), 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0a0a0a", color: "#f0ece3", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .hero-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -2px;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-link {
          color: #f0ece3;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .nav-link:hover { opacity: 1; }

        .btn-primary {
          background: #c8a96e;
          color: #0a0a0a;
          border: none;
          padding: 14px 36px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary:hover {
          background: #e0c080;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(200, 169, 110, 0.3);
        }

        .btn-outline {
          background: transparent;
          color: #f0ece3;
          border: 1px solid rgba(240, 236, 227, 0.4);
          padding: 14px 36px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-outline:hover {
          border-color: #c8a96e;
          color: #c8a96e;
        }

        .product-card {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 24px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .product-card:hover {
          border-color: rgba(200, 169, 110, 0.4);
          transform: translateY(-4px);
          background: #1a1a1a;
        }

        .stat-item {
          border-left: 2px solid #c8a96e;
          padding-left: 24px;
        }

        .marquee-track {
          display: flex;
          gap: 60px;
          animation: marquee 20s linear infinite;
          white-space: nowrap;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .divider {
          width: 60px;
          height: 1px;
          background: #c8a96e;
          margin: 24px 0;
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c8a96e;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #c8a96e; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "24px 60px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrollY > 50 ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.4s"
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.5px" }}>
          Inven<span style={{ color: "#c8a96e" }}>tory</span>
        </div>
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <a href="#products" className="nav-link">Products</a>
          <a href="#about" className="nav-link">About</a>
          <a href="/login" className="nav-link">Login</a>
          <a href="/signup" className="btn-primary">Sign Up</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px 60px 60px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(ellipse at 70% 50%, rgba(200,169,110,0.08) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", right: "-100px", top: "50%", transform: "translateY(-50%)",
          fontSize: "20rem", opacity: 0.03, pointerEvents: "none", userSelect: "none",
          fontFamily: "'Playfair Display', serif", fontWeight: 900
        }}>
          INV
        </div>

        <div className={`fade-up ${visible ? "visible" : ""}`} style={{ maxWidth: "900px" }}>
          <p className="section-label" style={{ marginBottom: "32px" }}>Inventory Management System</p>
          <h1 className="hero-text">
            Control Your<br />
            <span style={{ color: "#c8a96e" }}>Stock.</span> Grow<br />
            Your Business.
          </h1>
          <div className="divider" />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1.1rem", lineHeight: 1.7,
            color: "rgba(240,236,227,0.6)",
            maxWidth: "500px", marginBottom: "48px"
          }}>
            A refined inventory platform built for businesses that demand precision, clarity, and control over their stock.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="/signup" className="btn-primary">Get Started Free</a>
            <a href="#products" className="btn-outline">View Demo</a>
          </div>
        </div>

        {/* Stats */}
        <div className={`fade-up ${visible ? "visible" : ""}`} style={{
          display: "flex", gap: "60px", marginTop: "100px",
          transition: "all 0.8s 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          flexWrap: "wrap"
        }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#c8a96e" }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(240,236,227,0.5)", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 0", background: "#111" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) =>
            ["Stock Management", "•", "Real-time Updates", "•", "Category Control", "•", "Analytics Dashboard", "•", "Role-based Access", "•", "Cloudinary Upload", "•", "JWT Security", "•", "OTP Verification", "•"].map((t, j) => (
              <span key={`${i}-${j}`} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase",
                color: t === "•" ? "#c8a96e" : "rgba(240,236,227,0.4)"
              }}>{t}</span>
            ))
          )}
        </div>
      </div>

      {/* TOP 10 PRODUCTS */}
      <section id="products" style={{ padding: "120px 60px" }}>
        <div style={{ marginBottom: "60px" }}>
          <p className="section-label">Featured</p>
          <div className="divider" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}>
            Top 10 Products
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "16px"
        }}>
          {products.map((p, i) => (
            <div key={p.id} className="product-card" style={{ animationDelay: `${i * 0.05}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <span style={{ fontSize: "2.5rem" }}>{p.img}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem", letterSpacing: "1px", textTransform: "uppercase",
                  color: "#c8a96e", background: "rgba(200,169,110,0.1)",
                  padding: "4px 10px"
                }}>{p.category}</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", marginBottom: "8px" }}>{p.name}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", fontWeight: 500, color: "#c8a96e" }}>{p.price}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(240,236,227,0.4)" }}>Stock: {p.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{
        padding: "120px 60px",
        background: "#0d0d0d",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <p className="section-label">About</p>
            <div className="divider" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "32px" }}>
              Built for Modern Businesses
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "rgba(240,236,227,0.6)", marginBottom: "24px" }}>
              Inventory is a comprehensive stock management platform designed to give businesses complete visibility and control over their products, categories, and supply chain.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "rgba(240,236,227,0.6)", marginBottom: "40px" }}>
              Built with Spring Boot and React, it offers enterprise-grade security with JWT authentication, OTP email verification, and role-based access control — all wrapped in an elegant interface.
            </p>
            <a href="/signup" className="btn-primary">Start Managing Today</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { icon: "🔐", title: "Secure Auth", desc: "JWT + OTP email verification" },
              { icon: "📦", title: "Stock Control", desc: "Real-time inventory tracking" },
              { icon: "🖼️", title: "Image Upload", desc: "Cloudinary integration" },
              { icon: "👥", title: "Role Access", desc: "Admin & user permissions" },
            ].map((f, i) => (
              <div key={i} style={{
                background: "#141414", border: "1px solid rgba(255,255,255,0.06)",
                padding: "28px", transition: "all 0.3s"
              }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>{f.icon}</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", marginBottom: "8px" }}>{f.title}</h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(240,236,227,0.5)", lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "120px 60px", textAlign: "center",
        background: "linear-gradient(135deg, #111 0%, #0a0a0a 100%)",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        <p className="section-label" style={{ marginBottom: "24px" }}>Get Started</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px" }}>
          Ready to Take Control?
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(240,236,227,0.5)", marginBottom: "48px" }}>
          Join thousands of businesses managing their inventory with precision.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <a href="/signup" className="btn-primary">Create Free Account</a>
          <a href="/login" className="btn-outline">Login</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "40px 60px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700 }}>
          Inven<span style={{ color: "#c8a96e" }}>tory</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(240,236,227,0.3)" }}>
          © 2026 Inventory Management. All rights reserved.
        </p>
      </footer>
    </div>
  );
}