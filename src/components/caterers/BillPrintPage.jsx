import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrinterIcon } from '@heroicons/react/24/outline';
import BillHeader from './billPreview/BillHeader';
import BillContent from './billPreview/BillContent';
import BillContentA4 from './billPreview/BillContentA4';
import BillFooter from './billPreview/BillFooter';
import { thermalPrintStyles, a4PrintStyles } from './billPreview/printStyles';

const BillPrintPage = () => {
    const [billData, setBillData] = useState(null);
    const [printerType, setPrinterType] = useState('thermal');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Get the bill data from sessionStorage
        const urlParams = new URLSearchParams(window.location.search);
        const billId = urlParams.get('id');

        if (billId) {
            const storedData = sessionStorage.getItem(`bill_${billId}`);
            if (storedData) {
                try {
                    const { billData: data, printerType: type } = JSON.parse(storedData);

                    // Log the data for debugging
                    console.log('📄 Bill Print Page - Loaded data:', {
                        billNumber: data?.billNumber,
                        itemsCount: data?.items?.length,
                        printerType: type,
                        hasOtherCharges: data?.otherCharges?.length > 0,
                        grandTotal: data?.grandTotal
                    });

                    setBillData(data);
                    setPrinterType(type || 'thermal');
                    setLoading(false);

                } catch (error) {
                    console.error('Error parsing bill data:', error);
                    console.error('Stored data:', storedData);
                    setLoading(false);
                }
            } else {
                console.error('No bill data found in sessionStorage for ID:', billId);
                setLoading(false);
            }
        } else {
            console.error('No bill ID provided in URL');
            setLoading(false);
        }
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
                <p>Loading bill...</p>
            </div>
        );
    }

    if (!billData) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                gap: '1rem'
            }}>
                <p>No bill data found. This page may have expired.</p>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer'
                    }}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Print Button - Hidden during print */}
            <div className="print-controls">
                <button onClick={handlePrint} className="print-button">
                    <PrinterIcon className="print-icon" />
                    Print Bill
                </button>
            </div>

            {/* Bill Content */}
            <div className="bill-print-container" data-printer-type={printerType}>
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

            {/* Styles */}
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    background-color: #f3f4f6;
                }

                .print-controls {
                    position: fixed;
                    top: 1rem;
                    right: 1rem;
                    z-index: 1000;
                }

                .print-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background-color: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    transition: all 0.2s;
                }

                .print-button:hover {
                    background-color: #2563eb;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }

                .print-button:active {
                    transform: scale(0.98);
                }

                .print-icon {
                    width: 1.25rem;
                    height: 1.25rem;
                }

                .bill-print-container {
                    max-width: ${printerType === 'a4' ? '210mm' : '58mm'};
                    margin: 2rem auto;
                    background: white;
                    padding: 1rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    border-radius: 0.5rem;
                }

                @media print {
                    body {
                        background-color: white;
                    }

                    .print-controls {
                        display: none !important;
                    }

                    .bill-print-container {
                        margin: 0;
                        padding: 0;
                        box-shadow: none;
                        border-radius: 0;
                        max-width: 100%;
                    }
                }
            `}</style>

            {/* Print Styles */}
            <style>{printerType === 'a4' ? a4PrintStyles : thermalPrintStyles}</style>
        </>
    );
};

export default BillPrintPage;
