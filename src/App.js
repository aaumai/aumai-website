import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
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
import AIDentalClinicOperationsPage from './pages/AIDentalClinicOperationsPage';
import AIPatientEngagementPage from './pages/AIPatientEngagementPage';
import AIDentalSoftwareIndiaPage from './pages/AIDentalSoftwareIndiaPage';
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
import SocialMessaging from './pages/SocialMessaging';
import Compliance from './pages/Compliance';
import Analytics from './components/Analytics';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomeUS from './pages/HomeUS';
import BusinessManagerUS from './pages/BusinessManagerUS';
import './App.css';
import LuxReveal from './components/LuxReveal';

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
            <div className="App site-lux">
              <LuxReveal />
              <Analytics />
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                {/* The old US healthcare-IT engineering pages (services, projects,
                    case studies, engineering partner) were taken down (owner
                    2026-09-26: a dentist should never read Aumy as an outsourcing
                    firm). Their URLs land on the home page. Page files stay in code. */}
                <Route path="/services" element={<Navigate to="/" replace />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Legacy health-system-OS Aumy page (pages/AumyProduct.js stays
                    in code) — its story conflicts with the dental positioning,
                    so the URL lands on the dental product page instead. */}
                <Route path="/aumy" element={<Navigate to="/revenue-generator" replace />} />
                <Route path="/revenue-generator" element={<AumyRevenueGenerator />} />
                <Route path="/growth-audit" element={<GrowthAudit />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/ai-receptionist" element={<AIReceptionistPage />} />
                <Route path="/whatsapp-automation-for-clinics" element={<WhatsAppAutomationPage />} />
                {/* The two search themes the site targets (owner 2026-09-18):
                    AI-powered dental clinic operations, and the AI-powered
                    patient journey & engagement. Crawler copy: scripts/prerender.js. */}
                <Route path="/ai-dental-clinic-operations" element={<AIDentalClinicOperationsPage />} />
                <Route path="/ai-patient-engagement" element={<AIPatientEngagementPage />} />
                <Route path="/ai-dental-software-india" element={<AIDentalSoftwareIndiaPage />} />
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
                <Route path="/engineering-partner" element={<Navigate to="/" replace />} />
                <Route path="/facebook-instagram" element={<SocialMessaging />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="/projects" element={<Navigate to="/" replace />} />
                <Route path="/case-studies" element={<Navigate to="/" replace />} />
                <Route path="/case-studies/:slug" element={<Navigate to="/" replace />} />
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
