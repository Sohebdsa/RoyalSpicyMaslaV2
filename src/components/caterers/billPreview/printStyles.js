// Print styles for thermal printer (58mm)
export const thermalPrintStyles = `
@media print {
  @page {
    size: 58mm auto;
    margin: 0;
  }

  body {
    all: unset;
    font-family: "Courier New", monospace;
    font-size: 10pt;
    color: #000;
    margin: 0;
    padding: 0;
  }

  .bill-modal-overlay,
  .bill-modal-container,
  .bill-modal-header,
  .bill-modal-actions,
  .bill-print-button,
  .bill-close-button,
  .bill-printer-selector {
    display: none !important;
  }

  .bill-modal-body {
    all: unset;
    display: block;
  }

  .bill-print-area {
    all: unset;
    display: block;
    width: 58mm !important;
    padding: 2mm !important;
    margin: 0 !important;
    font-family: 'Courier New', monospace !important;
    font-size: 10pt !important;
    line-height: 1.3 !important;
  }

  /* Hide Rate column for thermal */
  .bill-print-area th:nth-child(3),
  .bill-print-area td:nth-child(3) {
    display: none !important;
  }

  .bill-print-area h1 {
    font-size: 13pt !important;
    margin: 2mm 0 !important;
    padding: 0 !important;
    line-height: 1.2 !important;
  }

  .bill-print-area h3 {
    font-size: 10pt !important;
    margin: 3mm 0 2mm 0 !important;
    padding: 0 0 1mm 0 !important;
    border-bottom: 1px dashed #000 !important;
  }

  .bill-print-area p {
    font-size: 8pt !important;
    margin: 0.5mm 0 !important;
    padding: 0 !important;
    line-height: 1.3 !important;
  }

  .bill-print-area table {
    font-size: 8pt !important;
    margin: 2mm 0 !important;
    width: 100% !important;
  }

  .bill-print-area td,
  .bill-print-area th {
    font-size: 8pt !important;
    padding: 1mm 0.5mm !important;
    line-height: 1.3 !important;
  }

  .bill-print-area img {
    max-width: 22mm !important;
    max-height: 10mm !important;
  }

  .bill-print-area .border-b,
  .bill-print-area .border-b-2 {
    border-bottom: 1px dashed #000 !important;
    margin-bottom: 2mm !important;
    padding-bottom: 1mm !important;
  }
}
`;

// Print styles for A4 paper
export const a4PrintStyles = `
@media print {
  @page {
    size: A4;
    margin: 0;
  }

  body {
    all: unset;
    font-family: "Arial", "Helvetica", sans-serif;
    font-size: 10pt;
    color: #000;
    margin: 0 !important;
    padding: 0 !important;
  }
}
`;
