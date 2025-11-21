// src/components/AnalysisPanel.jsx
import React from "react";
import { REFERENCES } from "../config/references";

const AnalysisPanel = ({ activeRefId, onRefClick, lastHighlightStatus }) => {
  const ref3 = REFERENCES[3];

  return (
    <div>
      <p style={{ lineHeight: 1.6 }}>
        No extraordinary or one-off items affecting EBITDA were reported in
        Maersk’s Q2 2025 results. The report explicitly notes that EBITDA
        improvements stemmed from operational performance— including volume
        growth, cost control, and margin improvement across Ocean, Logistics &
        Services, and Terminals segments{" "}
        <span
          className={"ref-badge" + (activeRefId === 1 ? " active" : "")}
          onClick={() => onRefClick(1)}
        >
          {REFERENCES[1].label}
        </span>
        .
      </p>

      <p style={{ lineHeight: 1.6, marginTop: 12 }}>
        Gains or losses from asset sales, which could qualify as extraordinary
        items, are shown separately under EBIT and not included in EBITDA. The{" "}
        <strong>
          gain on sale of non-current assets was USD 25 m in Q2 2025
        </strong>
        , significantly lower than USD 208 m in Q2 2024, but these affect EBIT,
        not EBITDA{" "}
        <span
          className={"ref-badge" + (activeRefId === 3 ? " active" : "")}
          onClick={() => onRefClick(3)}
        >
          {ref3.label}
        </span>
        .
      </p>

      <h3 style={{ marginTop: 20, marginBottom: 8 }}>Findings</h3>
      <ul style={{ paddingLeft: 20, marginTop: 0 }}>
        <li>{REFERENCES[1].description}</li>
        <li>{REFERENCES[2].description}</li>
        <li>{REFERENCES[3].description}</li>
      </ul>

      {lastHighlightStatus && (
        <div className="notice">
          {lastHighlightStatus === "ok" && "Highlighted in the PDF viewer."}
          {lastHighlightStatus === "not-found" &&
            "Could not find the referenced text in the rendered PDF (check exact wording or encoding)."}
        </div>
      )}
    </div>
  );
};

export default AnalysisPanel;
