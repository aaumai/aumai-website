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
import DataDeletion from './pages/DataDeletion';
import CancellationRefund from './pages/CancellationRefund';
import DabbewaalaApp from './pages/DabbewaalaApp';
import AumaiAnalytics from './pages/AumaiAnalytics';
import AumyProduct from './pages/AumyProduct';
import AumyRevenueGenerator from './pages/AumyRevenueGenerator';
import GrowthAudit from './pages/GrowthAudit';
import LeakCalculator from './pages/LeakCalculator';
import PlatformPartner from './pages/PlatformPartner';
import EngineeringPartner from './pages/EngineeringPartner';
import SocialMessaging from './pages/SocialMessaging';
import Compliance from './pages/Compliance';
import Analytics from './components/Analytics';
import HomeUS from './pages/HomeUS';
import './App.css';

// US-market build (aumyai.com): react-scripts build with REACT_APP_MARKET=us.
// Serves the standalone US landing page for every route except legal pages.
// The India build (aumai.co.in) is completely unaffected.
const IS_US = process.env.REACT_APP_MARKET === 'us';

function App() {
  if (IS_US) {
    return (
      <Router>
        <Routes>
          <Route path="/privacy" element={<div className="App"><PrivacyPolicy /></div>} />
          <Route path="/terms" element={<div className="App"><TermsConditions /></div>} />
          <Route path="/data-deletion" element={<div className="App"><DataDeletion /></div>} />
          <Route path="*" element={<HomeUS />} />
        </Routes>
      </Router>
    );
  }
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
                <Route path="/growth-audit" element={<GrowthAudit />} />
                <Route path="/leak-calculator" element={<LeakCalculator />} />
                <Route path="/platform-partner" element={<PlatformPartner />} />
                <Route path="/engineering-partner" element={<EngineeringPartner />} />
                <Route path="/facebook-instagram" element={<SocialMessaging />} />
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
                <Route path="/data-deletion" element={<DataDeletion />} />
                <Route path="/delete-account" element={<DataDeletion />} />
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
