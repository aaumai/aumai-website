import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetail from './pages/CaseStudyDetail';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DataDeletion from './pages/DataDeletion';
import CancellationRefund from './pages/CancellationRefund';
import DabbewaalaApp from './pages/DabbewaalaApp';
import AumaiAnalytics from './pages/AumaiAnalytics';
import AumyRevenueGenerator from './pages/AumyRevenueGenerator';
import GrowthAudit from './pages/GrowthAudit';
import PricingPage from './pages/PricingPage';
import AIReceptionistPage from './pages/AIReceptionistPage';
import WhatsAppAutomationPage from './pages/WhatsAppAutomationPage';
import GrowthHub from './pages/GrowthHub';
import DemosPage from './pages/DemosPage';
import PodcastPage from './pages/PodcastPage';
import GrowthArticle from './pages/GrowthArticle';
import LeakCalculator from './pages/LeakCalculator';
import SwitchPage from './pages/SwitchPage';
import MissedCallCalculator from './pages/MissedCallCalculator';
import CalculatorPage from './pages/CalculatorPage';
import { CALCULATORS } from './data/calculators';
import PlatformPartner from './pages/PlatformPartner';
import EngineeringPartner from './pages/EngineeringPartner';
import SocialMessaging from './pages/SocialMessaging';
import Compliance from './pages/Compliance';
import Analytics from './components/Analytics';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomeUS from './pages/HomeUS';
import BusinessManagerUS from './pages/BusinessManagerUS';
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
          <Route path="/business-manager" element={<BusinessManagerUS />} />
          {/* The leak check is a standalone, linkable, indexable page in both
              markets — it is what ads and social posts point at. LeakCalculator
              reads REACT_APP_MARKET and renders USD here. */}
          <Route path="/leak-calculator" element={<LeakCalculator />} />
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
                {/* Legacy health-system-OS AUMY page (pages/AumyProduct.js stays
                    in code) — its story conflicts with the dental positioning,
                    so the URL lands on the dental product page instead. */}
                <Route path="/aumy" element={<Navigate to="/revenue-generator" replace />} />
                <Route path="/revenue-generator" element={<AumyRevenueGenerator />} />
                <Route path="/growth-audit" element={<GrowthAudit />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/ai-receptionist" element={<AIReceptionistPage />} />
                <Route path="/whatsapp-automation-for-clinics" element={<WhatsAppAutomationPage />} />
                <Route path="/growth" element={<GrowthHub />} />
                <Route path="/demos" element={<DemosPage />} />
                <Route path="/podcast" element={<PodcastPage />} />
                <Route path="/growth/:slug" element={<GrowthArticle />} />
                <Route path="/leak-calculator" element={<LeakCalculator />} />
                <Route path="/switch" element={<SwitchPage />} />
                <Route path="/missed-call-calculator" element={<MissedCallCalculator />} />
                {CALCULATORS.map((c) => (
                  <Route key={c.slug} path={`/${c.slug}`} element={<CalculatorPage config={c} />} />
                ))}
                <Route path="/platform-partner" element={<PlatformPartner />} />
                <Route path="/engineering-partner" element={<EngineeringPartner />} />
                <Route path="/facebook-instagram" element={<SocialMessaging />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                {/* Insights library removed 2026-08-15 (dental-only focus).
                    Old URLs — some indexed/bookmarked — land on the Growth Hub. */}
                <Route path="/insights" element={<Navigate to="/growth" replace />} />
                <Route path="/insights/:slug" element={<Navigate to="/growth" replace />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/refund" element={<CancellationRefund />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/data-deletion" element={<DataDeletion />} />
                <Route path="/delete-account" element={<DataDeletion />} />
              </Routes>
              <Footer />
              <WhatsAppFloat />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
