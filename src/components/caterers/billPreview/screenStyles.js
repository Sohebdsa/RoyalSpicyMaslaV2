// Screen preview styles for bill preview modal
export const screenStyles = `
  /* A4 preview - modern professional design */
  .bill-print-area[data-printer-type="a4"] {
    width: 210mm !important;
    max-width: 210mm !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
    font-family: 'Inter', 'Segoe UI', 'Arial', 'Helvetica', sans-serif !important;
    background: white !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  }

  /* A4 Page styling - with visible borders for better preview */
  .bill-print-area[data-printer-type="a4"] .bill-page {
    padding: 15mm 20mm !important;
    margin-bottom: 15mm !important;
    background: white !important;
    border: 2px solid #d1d5db !important;
    border-radius: 4px !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
    position: relative !important;
    min-height: 260mm !important;
  }

  .bill-print-area[data-printer-type="a4"] .bill-page:last-child {
    margin-bottom: 0 !important;
  }

  /* Table styling */
  .bill-print-area[data-printer-type="a4"] table {
    border-collapse: separate !important;
    border-spacing: 0 !important;
    width: 100% !important;
  }

  .bill-print-area[data-printer-type="a4"] thead {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
  }

  .bill-print-area[data-printer-type="a4"] th {
    color: white !important;
    text-transform: uppercase !important;
  }

  .bill-print-area[data-printer-type="a4"] th:first-child {
    border-top-left-radius: 4px !important;
  }

  .bill-print-area[data-printer-type="a4"] th:last-child {
    border-top-right-radius: 4px !important;
  }

  .bill-print-area[data-printer-type="a4"] tbody tr:hover {
    background-color: #fef3f2 !important;
  }

  /* Orange accent colors */
  .bill-print-area[data-printer-type="a4"] .text-orange-600 {
    color: #ea580c !important;
  }

  .bill-print-area[data-printer-type="a4"] .bg-orange-50 {
    background-color: #fff7ed !important;
  }

  .bill-print-area[data-printer-type="a4"] .bg-orange-100 {
    background-color: #ffedd5 !important;
  }
`;
