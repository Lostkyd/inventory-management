import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Context/Interceptor/GlobalInterceptor";
import "./LandingPage.css";
import { LoginForm } from "../../Components/Forms/LoginForm";
import SignupForm from "../../Components/Forms/SignupForm";

const features = [
  { icon: "🍪", title: "Cookies", desc: "Homemade cookies made with love and care" },
  { icon: "💐", title: "Flowers", desc: "Customize flower bouquets with cookies" },
  { icon: "🌷", title: "Fuzzy Wire Flowers", desc: "Handmade wire flowers" },
];

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const navigate = useNavigate();

  const handleCloseSignup = () => {
    if (step === 1) {
      setShowSignupModal(false);
      setStep(1);
    }
  };

  const handleSwitchToSignup = () => {
    setShowModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowModal(true);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => setVisible(true), 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products/public");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch public products:", error);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="landing-wrapper">
      <nav className={`landing-nav ${scrollY > 50 ? "scrolled" : ""}`}>
        <div className="nav-logo">Sweet<span>Bliss</span></div>
        <div className="nav-links">
          <a href="#products" className="nav-link">Products</a>
          <a href="#about" className="nav-link">About</a>
          <button className="nav-link nav-link-btn" onClick={() => setShowModal(true)}>Login</button>
          <button className="btn-primary" onClick={() => setShowSignupModal(true)}>Sign Up</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-bg-gradient" />
        <div className={`fade-up hero-content ${visible ? "visible" : ""}`}>
          <p className="section-label" style={{ marginBottom: "32px" }}>Sweet Bliss Manila</p>
          <h1 className="hero-text">
            Handcrafted treats
            <br />
            made with <span style={{ color: "var(--accent-light)" }}>Love.</span>
          </h1>
          <div className="divider" />
          <p className="hero-subtitle">
            Homemade cookies and flower bouquets crafted with care, delivered straight to your door.
          </p>
          <button className="btn-primary" onClick={() => setShowModal(true)}>Order Now</button>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="section-header">
          <p className="section-label">Featured</p>
          <div className="divider" />
          <h2 className="section-title">Available Products</h2>
        </div>

        {productsLoading ? (
          <p className="products-empty">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="products-empty">No available products at the moment.</p>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <div key={p.productId} className="product-card">
                <div className="product-image-wrap">
                  {p.imgUrl ? (
                    <img
                      src={p.imgUrl}
                      alt={p.productName}
                      className="product-image"
                    />
                  ) : (
                    <div className="product-image-placeholder">No Image</div>
                  )}
                </div>

                <div className="product-card-body">
                  <div className="product-card-header">
                    <span className="product-category-badge">{p.categoryName}</span>
                  </div>

                  <h3 className="product-name">{p.productName}</h3>
                  <p className="product-description">{p.productDescription}</p>

                  <div className="product-card-footer">
                    <span className="product-price">
                      ₱{Number(p.productPrice).toLocaleString()}
                    </span>
                    <span className="product-stock">
                      {p.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

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

      <footer className="landing-footer">
        <div className="footer-logo">Sweet<span>Bliss</span></div>
        <p className="footer-copy">© 2026 Sweet Bliss Manila. All rights reserved.</p>
      </footer>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <div className="login-logo">Sweet<span>Bliss</span></div>
            <p className="login-tagline">Welcome back! Please sign in to continue.</p>
            <div className="login-divider" />
            <LoginForm
              onSuccess={() => {
                setShowModal(false);
                navigate("/dashboard");
              }}
            />
            <div className="login-footer">
              Don't have an account?{" "}
              <button className="link-btn" onClick={handleSwitchToSignup}>Sign up</button>
            </div>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="modal-overlay" onClick={handleCloseSignup}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            {step === 1 && (
              <button className="modal-close" onClick={handleCloseSignup}>✕</button>
            )}
            <div className="login-logo">Sweet<span>Bliss</span></div>
            <p className="login-tagline">Create your account to get started.</p>
            <div className="login-divider" />
            <SignupForm
              step={step}
              setStep={setStep}
              onSuccess={() => {
                setShowSignupModal(false);
                setStep(1);
              }}
            />
            <div className="login-footer">
              Already have an account?{" "}
              <button className="link-btn" onClick={handleSwitchToLogin}>Sign in</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}