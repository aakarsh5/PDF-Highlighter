// src/components/PDFViewer.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";

import pdfFile from "../assets/Maersk.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = forwardRef((props, ref) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useImperativeHandle(ref, () => ({
    highlightText: (query) => {
      if (!query) return;

      const spans = document.querySelectorAll(
        ".react-pdf__Page__textContent span"
      );

      let firstMatch = null;

      spans.forEach((span) => {
        span.style.backgroundColor = "";
      });

      spans.forEach((span) => {
        if (span.innerText && span.innerText.includes(query)) {
          span.style.backgroundColor = "yellow";
          if (!firstMatch) firstMatch = span;
        }
      });

      if (firstMatch) {
        firstMatch.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
  }));

  return (
    <div style={{ height: "100%", overflowY: "auto" }}>
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
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
