import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetail from './pages/CaseStudyDetail';
import InsightsPage from './pages/InsightsPage';
import InsightDetail from './pages/InsightDetail';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CancellationRefund from './pages/CancellationRefund';
import DabbewaalaApp from './pages/DabbewaalaApp';
import AumaiAnalytics from './pages/AumaiAnalytics';
import AumyProduct from './pages/AumyProduct';
import AumyRevenueGenerator from './pages/AumyRevenueGenerator';
import PlatformPartner from './pages/PlatformPartner';
import Compliance from './pages/Compliance';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Standalone pages without header/footer */}
        <Route path="/dabbewaala" element={<DabbewaalaApp />} />
        <Route path="/aumaianalytics" element={<AumaiAnalytics />} />

        {/* Main site with header/footer */}
        <Route
          path="*"
          element={
            <div className="App">
              <Analytics />
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/aumy" element={<AumyProduct />} />
                <Route path="/revenue-generator" element={<AumyRevenueGenerator />} />
                <Route path="/platform-partner" element={<PlatformPartner />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/insights/:slug" element={<InsightDetail />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/refund" element={<CancellationRefund />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Routes>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
