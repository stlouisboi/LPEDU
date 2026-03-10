import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import KnowledgeCenterIndex from "./pages/KnowledgeCenterIndex";
import NewEntrantAuditBrief from "./pages/knowledge-center/NewEntrantAuditBrief";
import HOSComplianceBrief from "./pages/knowledge-center/HOSComplianceBrief";
import MaintenanceRecordsBrief from "./pages/knowledge-center/MaintenanceRecordsBrief";

import InsuranceContinuityBrief from "./pages/knowledge-center/InsuranceContinuityBrief";

import DrugAlcoholBrief from "./pages/knowledge-center/DrugAlcoholBrief";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/knowledge-center" element={<KnowledgeCenterIndex />} />
        <Route path="/knowledge-center/new-entrant-safety-audit-brief" element={<NewEntrantAuditBrief />} />
        <Route path="/knowledge-center/hos-compliance-brief" element={<HOSComplianceBrief />} />
        <Route path="/knowledge-center/maintenance-records-brief" element={<MaintenanceRecordsBrief />} />
        <Route path="/knowledge-center/insurance-continuity-brief" element={<InsuranceContinuityBrief />} />
        <Route path="/knowledge-center/drug-alcohol-program-brief" element={<DrugAlcoholBrief />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
