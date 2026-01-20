import { useState } from 'react';
import { XMarkIcon, PrinterIcon } from '@heroicons/react/24/outline';
import BillHeader from './billPreview/BillHeader';
import BillContent from './billPreview/BillContent';
import BillContentA4 from './billPreview/BillContentA4';
import BillFooter from './billPreview/BillFooter';
import { thermalPrintStyles, a4PrintStyles } from './billPreview/printStyles';
import { screenStyles } from './billPreview/screenStyles';

const CatererBillPrintModal = ({ isOpen, onClose, bill }) => {
    const [printerType, setPrinterType] = useState('thermal'); // 'thermal' or 'a4'

    if (!isOpen || !bill) return null;

    // Transform bill data to match the expected format for BillContent
    const transformBillData = () => {
        // Transform items to include mix product structure
        const transformedItems = [];

        if (Array.isArray(bill.items)) {
            bill.items.forEach((item) => {
                const isMix = item.is_mix === true || item.is_mix === 1;
                const hasMixItems = Array.isArray(item.mix_items) && item.mix_items.length > 0;

                if (isMix && hasMixItems) {
                    // Add mix header
                    transformedItems.push({
                        product_name: item.product_name,
                        quantity: parseFloat(item.quantity || 0).toFixed(3),
                        unit: item.unit || 'unit',
                        rate: parseFloat(item.rate || 0),
                        total: parseFloat(item.total_amount || 0),
                        isMixHeader: true,
                        mixName: item.product_name
                    });

                    // Add mix components
                    item.mix_items.forEach((mixItem) => {
                        transformedItems.push({
                            product_name: mixItem.product_name,
                            quantity: parseFloat(mixItem.quantity || 0).toFixed(3),
                            unit: mixItem.unit || 'unit',
                            rate: parseFloat(mixItem.rate || 0),
                            total: parseFloat(mixItem.allocatedBudget || 0),
                            isMixItem: true,
                            mixName: item.product_name
                        });
                    });
                } else {
                    // Regular item
                    transformedItems.push({
                        product_name: item.product_name,
                        quantity: parseFloat(item.quantity || 0).toFixed(3),
                        unit: item.unit || 'unit',
                        rate: parseFloat(item.rate || 0),
                        total: parseFloat(item.total_amount || 0)
                    });
                }
            });
        }

        // Transform other charges
        const transformedCharges = [];
        if (Array.isArray(bill.other_charges)) {
            bill.other_charges.forEach((charge) => {
                transformedCharges.push({
                    name: charge.charge_name || 'Charge',
                    type: charge.charge_type || 'fixed',
                    value_type: charge.charge_type,
                    value: parseFloat(charge.charge_amount || 0)
                });
            });
        }

        // Get payment information from the latest payment
        let paymentAmount = 0;
        let paymentMethod = null;
        let paymentDate = null;

        if (Array.isArray(bill.payments) && bill.payments.length > 0) {
            // Get the latest payment
            const latestPayment = bill.payments[bill.payments.length - 1];
            paymentAmount = parseFloat(latestPayment.payment_amount || 0);
            paymentMethod = latestPayment.payment_method;
            paymentDate = latestPayment.payment_date;
        }

        return {
            billNumber: bill.bill_number,
            sellDate: bill.sell_date,
            caterer: {
                caterer_name: bill.caterer_name,
                name: bill.caterer_name,
                contact_person: bill.contact_person,
                phone_number: bill.caterer_phone,
                address: bill.caterer_address
            },
            items: transformedItems,
            otherCharges: transformedCharges,
            subtotal: parseFloat(bill.items_total || 0) - parseFloat(bill.total_gst || 0),
            totalGst: parseFloat(bill.total_gst || 0),
            itemsTotal: parseFloat(bill.items_total || 0),
            otherChargesTotal: parseFloat(bill.other_charges_total || 0),
            grandTotal: parseFloat(bill.grand_total || 0),
            paymentAmount: paymentAmount,
            paymentMethod: paymentMethod,
            paymentDate: paymentDate
        };
    };

    const billData = transformBillData();

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {/* Modal Overlay */}
            <div className="bill-modal-overlay">
                <div className="bill-modal-container">
                    {/* Modal Header */}
                    <div className="bill-modal-header">
                        <div className="bill-modal-header-left">
                            <h2 className="bill-modal-title">Print Bill - {bill.bill_number}</h2>

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
                            <button onClick={handlePrint} className="bill-print-button">
                                <PrinterIcon className="h-5 w-5" />
                                Print
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

export default CatererBillPrintModal;
