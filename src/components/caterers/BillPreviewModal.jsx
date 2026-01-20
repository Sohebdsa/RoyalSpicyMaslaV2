import { useState } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import BillHeader from './billPreview/BillHeader';
import BillContent from './billPreview/BillContent';
import BillContentA4 from './billPreview/BillContentA4';
import BillFooter from './billPreview/BillFooter';
import { thermalPrintStyles, a4PrintStyles } from './billPreview/printStyles';
import { screenStyles } from './billPreview/screenStyles';

const BillPreviewModal = ({ isOpen, onClose, billData }) => {
    const [printerType, setPrinterType] = useState('thermal'); // 'thermal' or 'a4'

    if (!isOpen || !billData) return null;

    const handleOpenInNewTab = () => {
        // Create unique ID for this bill
        const billId = Date.now();

        // Store bill data and printer type in sessionStorage
        const dataToStore = {
            billData,
            printerType
        };
        sessionStorage.setItem(`bill_${billId}`, JSON.stringify(dataToStore));

        // Open new tab with bill print page
        window.open(`/bill-print?id=${billId}`, '_blank');
    };

    return (
        <>
            {/* Modal Overlay */}
            <div className="bill-modal-overlay">
                <div className="bill-modal-container">
                    {/* Modal Header */}
                    <div className="bill-modal-header">
                        <div className="bill-modal-header-left">
                            <h2 className="bill-modal-title">Bill Preview</h2>

                            {/* Printer Type Selector */}
                            <div className="bill-printer-selector">
                                <span className="bill-printer-label">Printer:</span>
                                <label className="bill-printer-option">
                                    <input
                                        type="radio"
                                        name="printerType"
                                        value="thermal"
                                        checked={printerType === 'thermal'}
                                        onChange={(e) => setPrinterType(e.target.value)}
                                    />
                                    <span>Thermal (58mm)</span>
                                </label>
                                <label className="bill-printer-option">
                                    <input
                                        type="radio"
                                        name="printerType"
                                        value="a4"
                                        checked={printerType === 'a4'}
                                        onChange={(e) => setPrinterType(e.target.value)}
                                    />
                                    <span>A4 Paper</span>
                                </label>
                            </div>
                        </div>
                        <div className="bill-modal-actions">
                            <button onClick={handleOpenInNewTab} className="bill-print-button">
                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                Open in New Tab
                            </button>
                            <button onClick={onClose} className="bill-close-button">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Modal Body - Scrollable */}
                    <div className="bill-modal-body">
                        {/* Bill content wrapper for printing */}
                        <div className="bill-print-area" data-printer-type={printerType}>
                            {printerType === 'a4' ? (
                                <BillContentA4 billData={billData} />
                            ) : (
                                <>
                                    <BillHeader billData={billData} printerType={printerType} />
                                    <BillContent billData={billData} />
                                    <BillFooter printerType={printerType} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{screenStyles}</style>
            <style>{printerType === 'a4' ? a4PrintStyles : thermalPrintStyles}</style>
        </>
    );
};

export default BillPreviewModal;
