// src/components/Layout.jsx
import React from "react";
import "../styles/layout.css";

const Layout = ({ left, right }) => {
  return (
    <div className="app-root">
      <div className="app-left">
        <div className="app-header">Maersk Q2 2025 Interim Report</div>
        <div className="app-panel-body">{left}</div>
      </div>
      <div className="app-right">
        <div className="app-header">Analysis</div>
        <div className="app-panel-body">{right}</div>
      </div>
    </div>
  );
};

export default Layout;
