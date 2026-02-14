// Screen preview styles for bill preview modal
export const screenStyles = `
  /* Modal Overlay - using class names from BillPreviewModal.jsx */
  .bill-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(2px);
    animation: fadeIn 0.2s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .bill-modal-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .bill-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f9fafb;
  }
  
  .bill-modal-header-left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .bill-modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }
  
  .bill-printer-selector {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #4b5563;
    background-color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    border: 1px solid #e5e7eb;
  }
  
  .bill-printer-label {
    font-weight: 500;
    color: #374151;
  }
  
  .bill-printer-option {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    cursor: pointer;
  }
  
  .bill-printer-option input[type="radio"] {
    cursor: pointer;
    accent-color: #ea580c;
  }

  .bill-modal-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .bill-print-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .bill-print-button:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
    color: #111827;
  }
  
  .bill-close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.375rem;
    color: #6b7280;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .bill-close-button:hover {
    background-color: #fee2e2;
    color: #ef4444;
  }

  .bill-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    background-color: #f3f4f6;
    display: flex;
    justify-content: center;
  }

  /* Shared styles for both thermal and A4 preview wrappers */
  .bill-print-area {
    background: white;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin: 0 auto;
    transition: width 0.3s ease;
  }
  
  /* Thermal preview specific wrapper style */
  .bill-print-area[data-printer-type="thermal"] {
    width: 58mm;
    padding: 10px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 12px;
    line-height: 1.2;
    color: black;
  }

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
