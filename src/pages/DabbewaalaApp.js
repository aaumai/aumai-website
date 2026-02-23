import React, { useEffect } from 'react';
import './DabbewaalaApp.css';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.dabbewaala.app';
const APP_STORE_URL = 'https://apps.apple.com/in/app/dabbewaala/id6756542475';

function DabbewaalaApp() {
  useEffect(() => {
    // Auto-redirect on mobile devices
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = APP_STORE_URL;
    } else if (/android/i.test(userAgent)) {
      window.location.href = PLAY_STORE_URL;
    }
  }, []);

  return (
    <div className="dw-page">
      {/* Header */}
      <header className="dw-header">
        <nav className="dw-nav">
          <a href="/dabbewaala" className="dw-logo-link">
            <img src="/dabbewaala-logo.png" alt="Dabbewaala" className="dw-nav-logo" />
          </a>
          <div className="dw-nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#download" className="dw-btn dw-btn-primary">Download App</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="dw-hero">
        <div className="dw-hero-content">
          <div className="dw-hero-text">
            <h1>Fresh <span className="dw-highlight">Homemade</span> Food Delivered to Your Doorstep</h1>
            <p>Tired of restaurant food? Get authentic, home-cooked meals from local kitchens in Pune. Fresh ingredients, made with love, delivered hot.</p>
            <div className="dw-hero-buttons">
              <a href={PLAY_STORE_URL} className="dw-btn dw-btn-primary dw-btn-large" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" className="dw-btn-icon"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                Google Play
              </a>
              <a href={APP_STORE_URL} className="dw-btn dw-btn-secondary dw-btn-large" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" className="dw-btn-icon"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/></svg>
                App Store
              </a>
            </div>
          </div>
          <div className="dw-hero-image">
            <img src="/dabbewaala-logo.png" alt="Dabbewaala App" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="dw-features">
        <h2 className="dw-section-title">Why Choose Dabbewaala?</h2>
        <div className="dw-features-grid">
          <div className="dw-feature-card">
            <div className="dw-feature-icon">
              <svg viewBox="0 0 24 24"><path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.36,10.22L13.16,10C12.38,9.23 12.38,7.97 13.16,7.19L17.5,2.82L18.43,3.74L15.19,7L16.15,7.94L19.39,4.69L20.31,5.61L17.06,8.85L18,9.81L21.26,6.56L22.18,7.5L17.81,11.84C17.03,12.62 15.77,12.62 15,11.84L14.78,11.64L13.41,13Z"/></svg>
            </div>
            <h3>Fresh & Homemade</h3>
            <p>Every meal is prepared fresh by local home chefs using quality ingredients. No preservatives, no shortcuts.</p>
          </div>
          <div className="dw-feature-card">
            <div className="dw-feature-icon">
              <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/></svg>
            </div>
            <h3>On-Time Delivery</h3>
            <p>Our dedicated delivery partners ensure your food arrives hot and on time, every time.</p>
          </div>
          <div className="dw-feature-card">
            <div className="dw-feature-icon">
              <svg viewBox="0 0 24 24"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z"/></svg>
            </div>
            <h3>Trusted Kitchens</h3>
            <p>All our partner kitchens are verified and maintain strict hygiene standards.</p>
          </div>
          <div className="dw-feature-card">
            <div className="dw-feature-icon">
              <svg viewBox="0 0 24 24"><path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/></svg>
            </div>
            <h3>Affordable Prices</h3>
            <p>Enjoy delicious homemade food at prices that won't break the bank. Quality meets value.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="dw-how-it-works">
        <h2 className="dw-section-title">How It Works</h2>
        <div className="dw-steps">
          <div className="dw-step">
            <div className="dw-step-number">1</div>
            <h3>Download the App</h3>
            <p>Get the Dabbewaala app from Play Store or App Store</p>
          </div>
          <div className="dw-step-arrow">
            <svg viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/></svg>
          </div>
          <div className="dw-step">
            <div className="dw-step-number">2</div>
            <h3>Choose Your Meal</h3>
            <p>Browse menus from local home kitchens near you</p>
          </div>
          <div className="dw-step-arrow">
            <svg viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/></svg>
          </div>
          <div className="dw-step">
            <div className="dw-step-number">3</div>
            <h3>Get It Delivered</h3>
            <p>Fresh food delivered to your doorstep</p>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="dw-download">
        <div className="dw-download-content">
          <h2>Ready to Order?</h2>
          <p>Download the Dabbewaala app now and get fresh homemade food delivered to your doorstep.</p>
          <div className="dw-download-buttons">
            <a href={PLAY_STORE_URL} className="dw-store-btn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="dw-store-btn-icon"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
              <span className="dw-store-btn-text"><small>GET IT ON</small><strong>Google Play</strong></span>
            </a>
            <a href={APP_STORE_URL} className="dw-store-btn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="dw-store-btn-icon"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/></svg>
              <span className="dw-store-btn-text"><small>Download on the</small><strong>App Store</strong></span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dw-footer">
        <div className="dw-footer-content">
          <div className="dw-footer-brand">
            <img src="/dabbewaala-logo.png" alt="Dabbewaala" className="dw-footer-logo" />
            <p>Fresh homemade food delivered to your doorstep in Pune.</p>
          </div>
          <div className="dw-footer-links">
            <h4>Legal</h4>
            <a href="/terms">Terms & Conditions</a>
            <a href="https://aaumai.github.io/dabbewaala-privacy-policy/privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <a href="/refund">Refund Policy</a>
          </div>
          <div className="dw-footer-links">
            <h4>Contact</h4>
            <a href="mailto:dabbewaala@aumai.co.in">dabbewaala@aumai.co.in</a>
            <a href="tel:+919022312554">+91 90223 12554</a>
            <p>Pune, Maharashtra, India</p>
          </div>
        </div>
        <div className="dw-footer-bottom">
          <p>&copy; 2026 Dabbewaala. A product by <a href="/">AUMAI</a></p>
        </div>
      </footer>
    </div>
  );
}

export default DabbewaalaApp;
