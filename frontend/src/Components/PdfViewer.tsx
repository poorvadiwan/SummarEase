import React from "react";

interface PDFViewerProps {
  pdfSrc: string;
}

const PdfViewer: React.FC<PDFViewerProps> = ({ pdfSrc }) => {
  return (
    <div className="p-0">
      <iframe
        title="PDF Viewer"
        // src={
        //   "https://summar-ease.s3.amazonaws.com/documents/Gmail+-+Reminder+for+IDE+Bootcamp+(Phase+II)+Student+Nomination+For.pdf"
        // }
        src={pdfSrc}
        width="100%"
        height="750px"
      />
    </div>
  );
};

export default PdfViewer;
