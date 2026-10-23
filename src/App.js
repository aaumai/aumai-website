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
import ScorecardPage from './pages/ScorecardPage';
import ScorecardAdmin from './pages/ScorecardAdmin';
import MasterclassPage from './pages/MasterclassPage';
import MasterclassAdmin from './pages/MasterclassAdmin';
import MasterclassRegister from './pages/MasterclassRegister';
import MasterclassInfo from './pages/MasterclassInfo';
import ClinicWebsitesPage from './pages/ClinicWebsitesPage';
import ServicePage from './pages/ServicePage';
import DENTAL_SEO from './data/dentalSeo';
import DENTAL_ADS from './data/dentalAds';
import PricingPage from './pages/PricingPage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import AIReceptionistPage from './pages/AIReceptionistPage';
import WhatsAppAutomationPage from './pages/WhatsAppAutomationPage';
import AIDentalSoftwareIndiaPage from './pages/AIDentalSoftwareIndiaPage';
import GrowthHub from './pages/GrowthHub';
import DemosPage from './pages/DemosPage';
import PodcastPage from './pages/PodcastPage';
import GrowthArticle from './pages/GrowthArticle';
import RunYourClinicHub from './pages/RunYourClinicHub';
import RunYourClinicEpisode from './pages/RunYourClinicEpisode';
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
        <Route path="/scorecard-admin" element={<ScorecardAdmin />} />
        <Route path="/masterclass-admin" element={<MasterclassAdmin />} />

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
                <Route path="/4c-scorecard" element={<ScorecardPage />} />
                {/* The Full Chair Method (owner 2026-10-19): /masterclass is the public information
                    page; the members area (private, noindex) is /masterclass/sign-in and /masterclass/my. */}
                <Route path="/masterclass" element={<MasterclassInfo />} />
                <Route path="/masterclass/sign-in" element={<MasterclassPage />} />
                <Route path="/masterclass/my" element={<MasterclassPage />} />
                <Route path="/masterclass/register" element={<MasterclassRegister />} />
                {/* Clinic websites built for search (owner 2026-10-19). Words: src/data/clinicWebsites.js
                    (shared with scripts/prerender.js). /websites is the short address. */}
                <Route path="/clinic-websites" element={<ClinicWebsitesPage />} />
                <Route path="/websites" element={<Navigate to="/clinic-websites" replace />} />
                {/* Services (owner 2026-10-23): Dental SEO and Dental ads, under "Product & services".
                    Words: src/data/dentalSeo.js and src/data/dentalAds.js (shared with scripts/prerender.js). */}
                <Route path="/dental-seo" element={<ServicePage data={DENTAL_SEO} />} />
                <Route path="/dental-ads" element={<ServicePage data={DENTAL_ADS} />} />
                <Route path="/pricing" element={<PricingPage />} />
                {/* Buy one module or the whole connected system (owner 2026-10-08).
                    Words: src/data/modules.js (shared with scripts/prerender.js). */}
                <Route path="/modules" element={<ModulesPage />} />
                <Route path="/modules/:slug" element={<ModuleDetailPage />} />
                <Route path="/ai-receptionist" element={<AIReceptionistPage />} />
                <Route path="/whatsapp-automation-for-clinics" element={<WhatsAppAutomationPage />} />
                {/* The two search themes the site targets (owner 2026-09-18):
                    AI-powered dental clinic operations, and the AI-powered
                    patient journey & engagement. Crawler copy: scripts/prerender.js. */}
                <Route path="/ai-dental-clinic-operations" element={<Navigate to="/modules/automate-dental-clinic-operations" replace />} />
                <Route path="/ai-patient-engagement" element={<Navigate to="/modules/dental-patient-follow-up" replace />} />
                <Route path="/ai-dental-software-india" element={<AIDentalSoftwareIndiaPage />} />
                <Route path="/growth" element={<GrowthHub />} />
                <Route path="/demos" element={<DemosPage />} />
                <Route path="/podcast" element={<PodcastPage />} />
                <Route path="/growth/:slug" element={<GrowthArticle />} />
                {/* How to Run Your Clinic video series (owner 2026-10-13). Words: src/data/runYourClinic.js
                    (shared with scripts/prerender.js). */}
                <Route path="/run-your-clinic" element={<RunYourClinicHub />} />
                <Route path="/run-your-clinic/:slug" element={<RunYourClinicEpisode />} />
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
