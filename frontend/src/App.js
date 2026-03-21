import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookMockupPage from "./pages/BookMockupPage";
import ReadinessPage from "./pages/ReadinessPage"; // kept only for legacy redirect
import AutoDiagnosticPage from "./pages/AutoDiagnosticPage";
import KnowledgeCenterIndex from "./pages/KnowledgeCenterIndex";
import NewEntrantAuditBrief from "./pages/knowledge-center/NewEntrantAuditBrief";
import HOSComplianceBrief from "./pages/knowledge-center/HOSComplianceBrief";
import MaintenanceRecordsBrief from "./pages/knowledge-center/MaintenanceRecordsBrief";
import InsuranceContinuityBrief from "./pages/knowledge-center/InsuranceContinuityBrief";
import DrugAlcoholBrief from "./pages/knowledge-center/DrugAlcoholBrief";
import UCRRegistrationBrief from "./pages/knowledge-center/UCRRegistrationBrief";
import AllChecklists from "./pages/knowledge-center/AllChecklists";
import InsuranceSyncPost from "./pages/knowledge-center/InsuranceSyncPost";
import FailedAuditPost from "./pages/knowledge-center/FailedAuditPost";
import ClearinghouseSetupPost from "./pages/knowledge-center/ClearinghouseSetupPost";
import BoxTruckFMCSAPost from "./pages/knowledge-center/BoxTruckFMCSAPost";
import BOC3FilingPost from "./pages/knowledge-center/BOC3FilingPost";
import NewEntrantProgramPost from "./pages/knowledge-center/NewEntrantProgramPost";
import UCRRegistrationPost from "./pages/knowledge-center/UCRRegistrationPost";
import ELDExemptionPost from "./pages/knowledge-center/ELDExemptionPost";
import LpBrf07Page from "./pages/knowledge-center/LpBrf07Page";
import LpBrf08Page from "./pages/knowledge-center/LpBrf08Page";
import LpBrf09Page from "./pages/knowledge-center/LpBrf09Page";
import LpBrf10Page from "./pages/knowledge-center/LpBrf10Page";
import LpBrf11Page from "./pages/knowledge-center/LpBrf11Page";
import Ground0Page from "./pages/Ground0Page";
import Ground0CompletePage from "./pages/Ground0CompletePage";
import AdmissionPage from "./pages/AdmissionPage";
import PortalPage from "./pages/PortalPage";
import REACHAssessmentPage from "./pages/REACHAssessmentPage";
import AutoMethodPage from "./pages/AutoMethodPage";
import AuthCallback from "./components/AuthCallback";
import CoachRegistryPage from "./pages/CoachRegistryPage";
import LaunchPathStandardPage from "./pages/LaunchPathStandardPage";
import AdmissionConfirmedPage from "./pages/AdmissionConfirmedPage";
import AdminAdmissionsPage from "./pages/AdminAdmissionsPage";
import AdminModulesPage from "./pages/AdminModulesPage";
import AdminProductFilesPage from "./pages/AdminProductFilesPage";
import ProductConfirmedPage from "./pages/ProductConfirmedPage";

import OperatingStandardPage from "./pages/OperatingStandardPage";
import StandardPage from "./pages/StandardPage";
import PartnersPage from "./pages/PartnersPage";
import ProductPreviewPage from "./pages/ProductPreviewPage";

// /standards routes
import ComplianceLibraryPage from "./pages/ComplianceLibraryPage";
import StandardsPage from "./pages/StandardsPage";
import NewEntrantPacketPage from "./pages/products/NewEntrantPacketPage";
import DrugAlcoholPacketPage from "./pages/products/DrugAlcoholPacketPage";
import HOSPacketPage from "./pages/products/HOSPacketPage";
import MaintenancePacketPage from "./pages/products/MaintenancePacketPage";
import InsurancePacketPage from "./pages/products/InsurancePacketPage";
import BundlePage from "./pages/products/BundlePage";
import SixteenSinsPage from "./pages/standards/SixteenSinsPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import ConditionalRatingPage from "./pages/ConditionalRatingPage";
import ComplianceGapQuizPage from "./pages/ComplianceGapQuizPage";
import CPMPublicPage from "./pages/CPMPublicPage";
import ToolsIndexPage from "./pages/ToolsIndexPage";
import TCOCalculatorPage from "./pages/TCOCalculatorPage";
import LoadAnalyzerPage from "./pages/LoadAnalyzerPage";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      data-testid="back-to-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 44,
        height: 44,
        background: "#0b1628",
        border: "1px solid rgba(212,144,10,0.35)",
        borderRadius: 4,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9000,
        transition: "border-color 0.2s, background 0.2s",
        boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(212,144,10,0.75)";
        e.currentTarget.style.background = "#0b1628";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(212,144,10,0.35)";
        e.currentTarget.style.background = "#0b1628";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 11V3M7 3L3 7M7 3L11 7" stroke="#d4900a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function AppRouter() {
  const location = useLocation();
  // Detect session_id in URL fragment SYNCHRONOUSLY during render (before useEffect)
  // This prevents race conditions where AuthProvider would check /me before the session is established
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/reach-diagnostic" element={<REACHAssessmentPage />} />
      <Route path="/auto-diagnostic" element={<Navigate to="/reach-diagnostic" replace />} />
      <Route path="/launchpath-standard" element={<LaunchPathStandardPage />} />
      <Route path="/admission/confirmed" element={<AdmissionConfirmedPage />} />
      <Route path="/admin/admissions" element={<AdminAdmissionsPage />} />
      <Route path="/admin/modules" element={<AdminModulesPage />} />
      <Route path="/admin/products" element={<AdminProductFilesPage />} />
      <Route path="/products/confirmed" element={<ProductConfirmedPage />} />
      <Route path="/knowledge-center" element={<KnowledgeCenterIndex />} />
      <Route path="/knowledge-center/all-checklists" element={<AllChecklists />} />
      <Route path="/knowledge-center/new-entrant-safety-audit-brief" element={<NewEntrantAuditBrief />} />
      <Route path="/knowledge-center/hos-compliance-brief" element={<HOSComplianceBrief />} />
      <Route path="/knowledge-center/maintenance-records-brief" element={<MaintenanceRecordsBrief />} />
      <Route path="/knowledge-center/insurance-continuity-brief" element={<InsuranceContinuityBrief />} />
      <Route path="/knowledge-center/drug-alcohol-program-brief" element={<DrugAlcoholBrief />} />
      <Route path="/knowledge-center/authority-registrations-brief" element={<UCRRegistrationBrief />} />
      <Route path="/knowledge-center/new-carrier-insurance-authority-sync" element={<InsuranceSyncPost />} />
      <Route path="/knowledge-center/what-happens-failed-fmcsa-new-entrant-audit" element={<FailedAuditPost />} />
      <Route path="/knowledge-center/failed-fmcsa-new-entrant-audit" element={<FailedAuditPost />} />
      <Route path="/knowledge-center/fmcsa-clearinghouse-setup-guide" element={<ClearinghouseSetupPost />} />
      <Route path="/knowledge-center/box-truck-fmcsa-requirements" element={<BoxTruckFMCSAPost />} />
      <Route path="/knowledge-center/boc-3-filing-explained" element={<BOC3FilingPost />} />
      <Route path="/knowledge-center/fmcsa-new-entrant-program-guide" element={<NewEntrantProgramPost />} />
      <Route path="/knowledge-center/ucr-registration-new-carrier" element={<UCRRegistrationPost />} />
      <Route path="/knowledge-center/eld-exemption-box-truck" element={<ELDExemptionPost />} />
      {/* 90-Day Clock deep-dive briefs (LP-BRF-07 through LP-BRF-11) */}
      <Route path="/knowledge-center/lp-brf-07" element={<LpBrf07Page />} />
      <Route path="/knowledge-center/lp-brf-08" element={<LpBrf08Page />} />
      <Route path="/knowledge-center/lp-brf-09" element={<LpBrf09Page />} />
      <Route path="/knowledge-center/lp-brf-10" element={<LpBrf10Page />} />
      <Route path="/knowledge-center/lp-brf-11" element={<LpBrf11Page />} />
      <Route path="/mockups" element={<BookMockupPage />} />
      <Route path="/ground-0-briefing" element={<Ground0Page />} />
      <Route path="/ground-0-complete" element={<Ground0CompletePage />} />
      <Route path="/admission" element={<AdmissionPage />} />
      <Route path="/portal" element={<PortalPage />} />
      <Route path="/coach-registry" element={<CoachRegistryPage />} />
      <Route path="/readiness" element={<Navigate to="/reach-diagnostic" replace />} />
      <Route path="/reach-assessment" element={<Navigate to="/reach-diagnostic" replace />} />
      <Route path="/auto-method" element={<AutoMethodPage />} />
      <Route path="/operating-standard" element={<OperatingStandardPage />} />
      <Route path="/standard" element={<StandardPage />} />
      <Route path="/partners" element={<PartnersPage />} />

      <Route path="/compliance-library" element={<ComplianceLibraryPage />} />

      {/* /standards routes */}
      <Route path="/standards" element={<StandardsPage />} />
      <Route path="/standards/new-entrant-packet" element={<NewEntrantPacketPage />} />
      <Route path="/standards/drug-alcohol-packet" element={<DrugAlcoholPacketPage />} />
      <Route path="/standards/hos-packet" element={<HOSPacketPage />} />
      <Route path="/standards/maintenance-packet" element={<MaintenancePacketPage />} />
      <Route path="/standards/insurance-packet" element={<InsurancePacketPage />} />
      <Route path="/standards/new-carrier-document-system" element={<BundlePage />} />
      <Route path="/standards/16-deadly-sins" element={<SixteenSinsPage />} />
      <Route path="/16-deadly-sins" element={<SixteenSinsPage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/conditional-rating" element={<ConditionalRatingPage />} />
      <Route path="/compliance-gap-quiz" element={<ComplianceGapQuizPage />} />

      {/* Product preview/export tool */}
      <Route path="/product-preview" element={<ProductPreviewPage />} />
      <Route path="/tools" element={<ToolsIndexPage />} />
      <Route path="/tools/cpm-calculator" element={<CPMPublicPage />} />
      <Route path="/tools/tco-calculator" element={<TCOCalculatorPage />} />
      <Route path="/tools/load-analyzer" element={<LoadAnalyzerPage />} />

      {/* 301 redirects: /products → /standards */}
      <Route path="/products" element={<Navigate to="/standards" replace />} />
      <Route path="/products/new-entrant-packet" element={<Navigate to="/standards/new-entrant-packet" replace />} />
      <Route path="/products/drug-alcohol-packet" element={<Navigate to="/standards/drug-alcohol-packet" replace />} />
      <Route path="/products/hos-packet" element={<Navigate to="/standards/hos-packet" replace />} />
      <Route path="/products/maintenance-packet" element={<Navigate to="/standards/maintenance-packet" replace />} />
      <Route path="/products/insurance-packet" element={<Navigate to="/standards/insurance-packet" replace />} />
      <Route path="/products/new-carrier-document-system" element={<Navigate to="/standards/new-carrier-document-system" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
