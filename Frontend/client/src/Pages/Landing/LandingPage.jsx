import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { LoginForm } from "../../Components/Forms/LoginForm";

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

const features = [
  { icon: "🍪", title: "Cookies", desc: "Homemade cookies made with love and care" },
  { icon: "💐", title: "Flowers", desc: "Customize flower bouquets with cookies" },
  { icon: "🌷", title: "Fuzzy Wire Flowers", desc: "Handmade wire flowers" },
];

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => setVisible(true), 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setShowModal(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="landing-wrapper">

      {/* NAV */}
      <nav className={`landing-nav ${scrollY > 50 ? "scrolled" : ""}`}>
        <div className="nav-logo">Sweet<span>Bliss</span></div>
        <div className="nav-links">
          <a href="#products" className="nav-link">Products</a>
          <a href="#about" className="nav-link">About</a>
          <button className="nav-link nav-link-btn" onClick={() => setShowModal(true)}>Login</button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>Sign Up</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg-gradient" />
        <div className={`fade-up hero-content ${visible ? "visible" : ""}`}>
          <p className="section-label" style={{ marginBottom: "32px" }}>Sweet Bliss Manila</p>
          <h1 className="hero-text">
            Handcrafted treats<br />
            made with{" "}
            <span style={{ color: "var(--accent-light)" }}>Love.</span>
          </h1>
          <div className="divider" />
          <p className="hero-subtitle">
            Homemade cookies and flower bouquets crafted with care, delivered straight to your door.
          </p>
          <button className="btn-primary" onClick={() => setShowModal(true)}>Order Now</button>
        </div>
      </section>

      {/* TOP 10 PRODUCTS */}
      <section id="products" className="products-section">
        <div className="section-header">
          <p className="section-label">Featured</p>
          <div className="divider" />
          <h2 className="section-title">Top 10 Products</h2>
        </div>
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-card-header">
                <span className="product-emoji">{p.img}</span>
                <span className="product-category-badge">{p.category}</span>
              </div>
              <h3 className="product-name">{p.name}</h3>
              <div className="product-card-footer">
                <span className="product-price">{p.price}</span>
                <span className="product-stock">Stock: {p.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <div>
            <p className="section-label">About</p>
            <div className="divider" />
            <h2 className="about-title">Sweet Bliss Manila</h2>
            <p className="about-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi commodi quo fugit rerum quae earum magni id. Dolorum aliquid voluptates voluptate incidunt quisquam harum, vel, eum iusto veritatis, eveniet amet!
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h4 className="feature-title">{f.title}</h4>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-logo">Sweet<span>Bliss</span></div>
        <p className="footer-copy">© 2026 Sweet Bliss Manila. All rights reserved.</p>
      </footer>

      {/* LOGIN MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <div className="login-logo">Sweet<span>Bliss</span></div>
            <p className="login-tagline">Welcome back! Please sign in to continue.</p>
            <div className="login-divider" />
            <LoginForm onSuccess={() => {
              setShowModal(false);
              navigate("/dashboard");
            }} />
            <div className="login-footer">
              Don't have an account? <a href="/signup">Sign up</a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}