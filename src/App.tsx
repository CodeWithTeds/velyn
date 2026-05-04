import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollLeft > 20);
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    const container = containerRef.current;
    if (section && container) {
      const targetX = section.offsetLeft;
      const startX = container.scrollLeft;
      const distance = targetX - startX;
      const duration = 1500; // Luxurious 1.5s scroll
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeInOutQuint for an even smoother, Apple-like feel
        const ease = progress < 0.5 
          ? 16 * Math.pow(progress, 5) 
          : 1 - Math.pow(-2 * progress + 2, 5) / 2;
          
        container.scrollLeft = startX + distance * ease;
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  };

  return (
    <div className="app-container" ref={containerRef}>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <img src="/images/logo.png" alt="Velyn" className="nav-logo-img" />
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('features')} className="nav-btn">Features</button>
          <button onClick={() => scrollToSection('templates')} className="nav-btn">Templates</button>
          <button onClick={() => scrollToSection('footer')} className="nav-btn">Contact</button>
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

          <div className="hero-logo-wrapper">
            <img src="/images/logo.png" alt="Velyn Logo" className="hero-logo-img" />
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
      <footer id="footer" className="footer">
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
