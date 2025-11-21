// src/components/PDFViewer.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfFile from "../assets/Maersk Q2 2025 Interim Report (1).pdf";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = forwardRef((props, ref) => {
  const [numPages, setNumPages] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (err) => {
    console.error("PDF load error:", err);
    setLoadError("Failed to load PDF. Please try again.");
  };

  // Expose an API to parent component
  useImperativeHandle(ref, () => ({
    /**
     * Highlights all text spans containing given search text.
     * Returns true if at least one match is found.
     */
    highlightByText: (query) => {
      if (!query) return false;

      const spans = document.querySelectorAll(
        ".react-pdf__Page__textContent span"
      );

      let firstMatch = null;
      let matchCount = 0;

      // Clear previous highlights
      spans.forEach((span) => {
        span.style.backgroundColor = "";
      });

      spans.forEach((span) => {
        if (span.innerText && span.innerText.includes(query)) {
          span.style.backgroundColor = "yellow";
          matchCount += 1;
          if (!firstMatch) firstMatch = span;
        }
      });

      if (firstMatch) {
        firstMatch.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return matchCount > 0;
    },
  }));

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      {loadError && (
        <div style={{ color: "red", marginBottom: 8 }}>{loadError}</div>
      )}

      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<div>Loading PDF…</div>}
      >
        {Array.from(new Array(numPages || 0), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={true}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
});

export default PDFViewer;
