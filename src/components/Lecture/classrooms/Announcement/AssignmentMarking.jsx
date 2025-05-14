import { useState } from "react";
import { Document, Page } from "react-pdf";
import CratilCV from "../../../../assets/Cratima.pdf";

export default function AssignmentMarking() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div>
      <Document
        file={CratilCV}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
      <div>
        <button disabled={pageNumber <= 1} onClick={() => setPageNumber(p => p - 1)}>Previous</button>
        <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
