import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">Velyn</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#templates">Templates</a>
          <a href="#benefits">Benefits</a>
        </div>
        <button className="btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <img
            src="/images/test1.png"
            alt="Velyn Portrait"
            className="hero-img"
          />
        </div>
        <div className="hero-right">
          <div className="hero-badge">
            Now available <span className="dot"></span>
          </div>

          <div className="hero-icon-wrapper">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
          </div>

          <h1 className="hero-title">Portraits,<br />reimagined.</h1>
          <p className="hero-subtitle">
            Design elegant, professional portraits with a refined set of modern templates. Minimal. Timeless. Effortless.
          </p>

          <div className="hero-cta">
            <button className="btn-download">
              Get Started — Free
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="section-header">
          <h2 className="section-title">Designed for Perfection.</h2>
          <p className="section-subtitle">
            Every element is meticulously crafted to showcase your portraits in the best possible light.
          </p>
        </div>
        <div className="bento-grid">
          <div className="bento-card bento-large">
            <div className="bento-icon">✨</div>
            <h3 className="bento-title">Smooth Interactions.</h3>
            <p className="bento-desc">Subtle micro-animations and smooth scrolling provide a premium feel to your portfolio, ensuring your visitors stay engaged.</p>
          </div>
          <div className="bento-card">
            <div className="bento-icon">📱</div>
            <h3 className="bento-title">Fully Responsive.</h3>
            <p className="bento-desc">Stunning on any device, from massive desktop displays to mobile screens.</p>
          </div>
          <div className="bento-card">
            <div className="bento-icon">🎨</div>
            <h3 className="bento-title">Minimalist Design.</h3>
            <p className="bento-desc">Clean layouts with ample whitespace ensure your work remains the center of attention.</p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="section">
        <div className="section-header">
          <h2 className="section-title">Curated Templates.</h2>
          <p className="section-subtitle">
            Choose from our collection of high-end layouts, tailored for modern creatives.
          </p>
        </div>
        <div className="previews-grid">
          <div className="preview-card">
            <div className="preview-img-placeholder">
              <span>Gallery View</span>
            </div>
            <div className="preview-info">
              <h3 className="preview-title">The Gallery.</h3>
              <p className="bento-desc">A spacious grid-based layout perfect for extensive collections.</p>
            </div>
          </div>
          <div className="preview-card">
            <div className="preview-img-placeholder">
              <span>Editorial View</span>
            </div>
            <div className="preview-info">
              <h3 className="preview-title">The Editorial.</h3>
              <p className="bento-desc">A magazine-style presentation designed for deep storytelling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Velyn</h3>
            <p>Premium portrait templates for modern creatives. Elegance in every pixel.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Templates</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Showcase</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Velyn. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
