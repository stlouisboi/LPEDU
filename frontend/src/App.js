import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ReadinessPage from "./pages/ReadinessPage";
import AutoDiagnosticPage from "./pages/AutoDiagnosticPage";
import KnowledgeCenterIndex from "./pages/KnowledgeCenterIndex";
import NewEntrantAuditBrief from "./pages/knowledge-center/NewEntrantAuditBrief";
import HOSComplianceBrief from "./pages/knowledge-center/HOSComplianceBrief";
import MaintenanceRecordsBrief from "./pages/knowledge-center/MaintenanceRecordsBrief";
import InsuranceContinuityBrief from "./pages/knowledge-center/InsuranceContinuityBrief";
import DrugAlcoholBrief from "./pages/knowledge-center/DrugAlcoholBrief";
import UCRRegistrationBrief from "./pages/knowledge-center/UCRRegistrationBrief";
import AllChecklists from "./pages/knowledge-center/AllChecklists";
import Ground0Page from "./pages/Ground0Page";
import Ground0CompletePage from "./pages/Ground0CompletePage";
import AdmissionPage from "./pages/AdmissionPage";
import PortalPage from "./pages/PortalPage";
import REACHAssessmentPage from "./pages/REACHAssessmentPage";
import AutoMethodPage from "./pages/AutoMethodPage";
import AuthCallback from "./components/AuthCallback";
import CoachRegistryPage from "./pages/CoachRegistryPage";

import OperatingStandardPage from "./pages/OperatingStandardPage";
import PartnersPage from "./pages/PartnersPage";
import ProductsPage from "./pages/ProductsPage";
import NewEntrantPacketPage from "./pages/products/NewEntrantPacketPage";
import DrugAlcoholPacketPage from "./pages/products/DrugAlcoholPacketPage";
import HOSPacketPage from "./pages/products/HOSPacketPage";
import MaintenancePacketPage from "./pages/products/MaintenancePacketPage";
import InsurancePacketPage from "./pages/products/InsurancePacketPage";
import BundlePage from "./pages/products/BundlePage";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
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
      <Route path="/readiness" element={<ReadinessPage />} />
      <Route path="/auto-diagnostic" element={<AutoDiagnosticPage />} />
      <Route path="/knowledge-center" element={<KnowledgeCenterIndex />} />
      <Route path="/knowledge-center/all-checklists" element={<AllChecklists />} />
      <Route path="/knowledge-center/new-entrant-safety-audit-brief" element={<NewEntrantAuditBrief />} />
      <Route path="/knowledge-center/hos-compliance-brief" element={<HOSComplianceBrief />} />
      <Route path="/knowledge-center/maintenance-records-brief" element={<MaintenanceRecordsBrief />} />
      <Route path="/knowledge-center/insurance-continuity-brief" element={<InsuranceContinuityBrief />} />
      <Route path="/knowledge-center/drug-alcohol-program-brief" element={<DrugAlcoholBrief />} />
      <Route path="/knowledge-center/authority-registrations-brief" element={<UCRRegistrationBrief />} />
      <Route path="/ground-0-briefing" element={<Ground0Page />} />
      <Route path="/ground-0-complete" element={<Ground0CompletePage />} />
      <Route path="/admission" element={<AdmissionPage />} />
      <Route path="/portal" element={<PortalPage />} />
      <Route path="/coach-registry" element={<CoachRegistryPage />} />
      <Route path="/reach-assessment" element={<REACHAssessmentPage />} />
      <Route path="/reach-diagnostic" element={<REACHAssessmentPage />} />
      <Route path="/auto-method" element={<AutoMethodPage />} />
      <Route path="/operating-standard" element={<OperatingStandardPage />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/new-entrant-packet" element={<NewEntrantPacketPage />} />
      <Route path="/products/drug-alcohol-packet" element={<DrugAlcoholPacketPage />} />
      <Route path="/products/hos-packet" element={<HOSPacketPage />} />
      <Route path="/products/maintenance-packet" element={<MaintenancePacketPage />} />
      <Route path="/products/insurance-packet" element={<InsurancePacketPage />} />
      <Route path="/products/new-carrier-document-system" element={<BundlePage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
