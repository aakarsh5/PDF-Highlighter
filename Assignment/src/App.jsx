// src/App.jsx
import React, { useRef, useState } from "react";
import Layout from "./components/Layout";
import PDFViewer from "./components/PDFViewer";
import AnalysisPanel from "./components/AnalysisPanel";
import { REFERENCES } from "./config/references";

const App = () => {
  const pdfRef = useRef(null);
  const [activeRefId, setActiveRefId] = useState(null);
  const [lastHighlightStatus, setLastHighlightStatus] = useState(null);

  const handleRefClick = (refId) => {
    setActiveRefId(refId);
    setLastHighlightStatus(null);

    const refConfig = REFERENCES[refId];

    // For now, only [3] actually highlights something in the PDF
    if (refConfig && refConfig.searchText && pdfRef.current) {
      const found = pdfRef.current.highlightByText(refConfig.searchText);
      setLastHighlightStatus(found ? "ok" : "not-found");
    } else {
      // Non-PDF-impacting references: just update UI
      setLastHighlightStatus(null);
    }
  };

  return (
    <Layout
      left={<PDFViewer ref={pdfRef} />}
      right={
        <AnalysisPanel
          activeRefId={activeRefId}
          onRefClick={handleRefClick}
          lastHighlightStatus={lastHighlightStatus}
        />
      }
    />
  );
};

export default App;
