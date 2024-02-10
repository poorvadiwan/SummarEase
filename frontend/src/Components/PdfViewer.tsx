import React, { useEffect } from "react";

interface PDFViewerProps {
  pdfSrc: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfSrc }) => {
  useEffect(() => {
    console.log(pdfSrc);
  });
  return (
    <div className="p-0">
      <iframe
        src={"/first.pdf"}
        width="400px"
        height="750px"
        loading="lazy"
        title="PDF Viewer"
        sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation no-allow-downloads"
      />
    </div>
  );
};

export default PDFViewer;
