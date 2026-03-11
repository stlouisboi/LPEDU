import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AllChecklists from "./pages/knowledge-center/AllChecklists";
import Ground0Page from "./pages/Ground0Page";
import PortalPage from "./pages/PortalPage";

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/ground-0-briefing" element={<Ground0Page />} />
        <Route path="/portal" element={<PortalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
