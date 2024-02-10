import React from "react";

interface PDFViewerProps {
  pdfSrc: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfSrc }) => {
  return (
    <div className="p-0">
      <iframe
        title="PDF Viewer"
        // src={`https://docs.google.com/viewer?url=${encodeURIComponent(
        //   pdfSrc
        // )}&embedded=true`}
        // src="/first.pdf"
        src={pdfSrc}
        width={500}
        height={750}
      ></iframe>
    </div>
  );
};

export default PDFViewer;
