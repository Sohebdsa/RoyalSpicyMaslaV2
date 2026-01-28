import React, { Fragment } from 'react';

const BillContentA4 = ({ billData }) => {
    const {
        billNumber,
        sellDate,
        caterer,
        items = [],
        otherCharges = [],
        subtotal,
        totalGst,
        itemsTotal,
        otherChargesTotal,
        grandTotal,
        paymentAmount,
        paymentMethod,
        paymentDate
    } = billData;

    // Configuration
    const ITEMS_PER_PAGE = 20; // Items per page for A4 print layout

    // Calculate remaining amount
    const remaining = grandTotal - (paymentAmount || 0);

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Format amount
    const formatAmount = (amount) => {
        if (amount === null || amount === undefined) return '0.00';
        return parseFloat(amount).toFixed(2);
    };

    // Format payment method
    const formatPaymentMethod = (method) => {
        const methodMap = {
            cash: 'Cash',
            upi: 'UPI',
            card: 'Card',
            bank_transfer: 'Bank Transfer',
            cheque: 'Cheque',
            credit: 'Credit'
        };
        return methodMap[method] || method;
    };

    // Paginate items - keep mix products together
    const paginateItems = () => {
        const pages = [];
        let currentPage = [];
        let currentCount = 0;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            // If this is a mix header, count it and all its children
            if (item.isMixHeader) {
                const mixName = item.mixName;
                const mixItems = [item];

                // Collect all mix children
                for (let j = i + 1; j < items.length; j++) {
                    if (items[j].isMixItem && items[j].mixName === mixName) {
                        mixItems.push(items[j]);
                    } else {
                        break;
                    }
                }

                // Check if mix fits in current page
                if (currentCount + mixItems.length > ITEMS_PER_PAGE && currentPage.length > 0) {
                    // Start new page
                    pages.push([...currentPage]);
                    currentPage = [];
                    currentCount = 0;
                }

                // Add all mix items to current page
                currentPage.push(...mixItems);
                currentCount += mixItems.length;
                i += mixItems.length - 1; // Skip the items we just added
            } else if (!item.isMixItem) {
                // Regular item
                if (currentCount >= ITEMS_PER_PAGE) {
                    pages.push([...currentPage]);
                    currentPage = [];
                    currentCount = 0;
                }
                currentPage.push(item);
                currentCount++;
            }
        }

        if (currentPage.length > 0) {
            pages.push(currentPage);
        }

        return pages.length > 0 ? pages : [[]];
    };

    const pages = paginateItems();
    const totalPages = pages.length;

    // Render page header
    const renderPageHeader = (pageNumber) => (
        <div className="bill-page-header">
            {/* Company Header */}
            <div className="border-b-2 border-gray-800 pb-2 mb-2">
                <div className="flex items-start justify-between gap-4">
                    {/* Logo - left */}
                    <div className="flex-shrink-0">
                        <img src="../../../public/logohigh.png" alt="Company Logo" className="h-40 w-40" />
                    </div>

                    {/* Company name and address - center */}
                    <div className="flex-1 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wide">
                            ROYAL SPICY MASALA
                        </h1>
                        <p className="text-sm font-semibold text-orange-600 tracking-wider mt-1">
                            GRAINS AND DRY FRUITS
                        </p>

                        <div className="text-center text-s text-gray-700 mt-2 space-y-0.5">
                            <p className="font-medium text-base">Prop: Barkat Ali Kallan Shaikh | Mob: 91+ 97699 90055</p>
                            <p>Shop no 1, Ashiyana SRA Society, Near DCB Bank,</p>
                            <p>Opp Subway, Andheri West, Mumbai - 400053</p>
                            <p><span className="font-semibold">Email:</span> rsmgadf@gmail.com</p>
                            <div className="flex justify-center gap-6 pt-1 font-bold text-gray-800">
                                <p>FSSAI: 21525006000639</p>
                                <p>GST: 27QAUPS5898Q1ZK</p>
                            </div>
                        </div>
                    </div>

                    {/* QR Code - right */}
                    <div className="flex-shrink-0">
                        <img src="../../../public/qr.jpeg" alt="QR Code" className="h-35 w-35" />
                    </div>
                </div>
            </div>

            {/* Bill Info - Only on first page */}
            {pageNumber === 1 && (
                <>
                    <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-gray-300">
                        <div>
                            <p className="text-base text-gray-600">Bill Number</p>
                            <p className="text-base font-bold text-gray-900">{billNumber}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-600">Date</p>
                            <p className="text-base font-bold text-gray-900">{formatDate(sellDate)}</p>
                        </div>
                    </div>

                    {/* Caterer Details */}
                    <div className="mb-3 pb-3 border-b border-gray-300">
                        <h3 className="text-s font-bold text-gray-900 mb-2">BILLED TO</h3>
                        <div className="space-y-0.5 text-xl">
                            <p className="font-semibold text-gray-900 text-">
                                {caterer?.caterer_name || caterer?.name || 'N/A'}
                            </p>
                            {caterer?.contact_person && (
                                <p className="text-gray-700 text-lg">Contact: {caterer.contact_person}</p>
                            )}
                            {caterer?.phone_number && (
                                <p className="text-gray-700 text-lg">Phone: {caterer.phone_number}</p>
                            )}
                            {caterer?.address && (
                                <p className="text-gray-700 text-lg">Address: {caterer.address}</p>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Continuation header for subsequent pages */}
            {pageNumber > 1 && (
                <div className="mb-3 pb-2 border-b border-gray-300">
                    <div className="flex justify-between items-center text-xs">
                        <div>
                            <span className="font-bold">Bill: {billNumber}</span>
                            <span className="mx-2">|</span>
                            <span>{caterer?.caterer_name || caterer?.name}</span>
                        </div>
                        <div className="text-gray-600">
                            Continued from previous page...
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    // Render items table
    const renderItemsTable = (pageItems, pageNumber) => (
        <div className="bill-items-section mb-3 min-h-[350px]">
            {pageNumber === 1 && (
                <h3 className="text-s font-bold text-gray-900 mb-2">ITEMS</h3>
            )}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 border-y-2 border-gray-800">
                        <th className="text-left py-1.5 px-2 text-s font-bold text-gray-900">
                            Product
                        </th>
                        <th className="text-right py-1.5 px-2 text-s font-bold text-gray-900">
                            Qty
                        </th>
                        <th className="text-right py-1.5 px-2 text-s font-bold text-gray-900">
                            Rate
                        </th>
                        <th className="text-right py-1.5 px-2 text-s font-bold text-gray-900">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pageItems.map((item, index) => {
                        // Skip mix items (they're shown under their parent)
                        if (item.isMixItem) return null;

                        return (
                            <Fragment key={index}>
                                {/* Main item row */}
                                <tr className={` ${item.isMixHeader ? 'bg-orange-50' : ''}`}>
                                    <td className="py-1.5 px-2 text-s text-gray-900">
                                        {item.product_name}
                                        {item.isMixHeader && (
                                            <span className="ml-2 text-s text-orange-600 font-semibold">
                                                (MIX)
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-1.5 px-2 text-s text-right text-gray-900">
                                        {item.quantity} {item.unit}
                                    </td>
                                    <td className="py-1.5 px-2 text-s text-right text-gray-900">
                                        ₹{formatAmount(item.rate)}
                                    </td>
                                    <td className="py-1.5 px-2 text-s text-right font-semibold text-gray-900">
                                        ₹{formatAmount(item.total)}
                                    </td>
                                </tr>

                                {/* Mix components - show if this is a mix header */}
                                {item.isMixHeader &&
                                    pageItems
                                        .filter(i => i.isMixItem && i.mixName === item.mixName)
                                        .map((mixItem, mixIndex) => (
                                            <tr
                                                key={`mix-${index}-${mixIndex}`}
                                                className="bg-orange-25 border-b border-gray-100"
                                            >
                                                <td className="py-1 px-2 pl-6 text-s text-gray-600" colSpan={2}>
                                                    └─ {mixItem.product_name} ({mixItem.quantity} {mixItem.unit})
                                                </td>
                                                <td className="py-1 px-2 text-s text-right text-gray-600">
                                                    ₹{formatAmount(mixItem.rate)}
                                                </td>
                                                <td className="py-1 px-2 text-xs text-right text-gray-600">
                                                    ₹{formatAmount(mixItem.total)}
                                                </td>
                                            </tr>
                                        ))}
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    // Calculate total saved amount based on market price vs selling price
    const calculateTotalSaved = () => {
        if (!items || items.length === 0) return 0;

        console.log('🔍 Calculating savings for items:', items);

        return items.reduce((total, item) => {
            // Skip mix items to avoid double counting (only count mix headers)
            if (item.isMixItem) return total;

            const marketPrice = parseFloat(item.market_price || 0);
            const sellingRate = parseFloat(item.rate || 0);
            const quantity = parseFloat(item.quantity || 0);

            console.log(`📊 Item: ${item.product_name}`, {
                market_price: item.market_price,
                marketPrice,
                sellingRate,
                quantity,
                unit: item.unit
            });

            // If no market price is set, no savings to calculate
            if (marketPrice <= 0 || sellingRate <= 0) return total;

            // Handle unit conversion for calculation
            let calcQuantity = quantity;
            if (item.unit === 'gram' || item.unit === 'g') {
                calcQuantity = quantity / 1000; // Convert to kg
            }

            // Calculate savings: (market_price - selling_price) * quantity
            const savingsPerUnit = marketPrice - sellingRate;
            if (savingsPerUnit > 0) {
                const itemSavings = savingsPerUnit * calcQuantity;
                console.log(`💰 Savings for ${item.product_name}: ₹${itemSavings.toFixed(2)}`);
                return total + itemSavings;
            }

            return total;
        }, 0);
    };

    const totalSaved = calculateTotalSaved();
    console.log('💵 Total Saved:', totalSaved);

    // Render summary (only on last page)
    const renderSummary = () => (
        <>
            {/* Other Charges */}
            {otherCharges && otherCharges.length > 0 && (
                <div className="mb-3 pb-3 border-b border-gray-300">
                    <h3 className="text-base font-bold text-gray-900 mb-2">OTHER CHARGES</h3>
                    <div className="space-y-1">
                        {otherCharges.map((charge, index) => {
                            const isDiscount = charge.type === 'discount' || charge.name?.toLowerCase().includes('discount');
                            let chargeAmount;

                            if (charge.type === 'discount') {
                                if (charge.value_type === 'percentage') {
                                    chargeAmount = (itemsTotal * parseFloat(charge.value)) / 100;
                                } else {
                                    chargeAmount = parseFloat(charge.value);
                                }
                            } else if (charge.type === 'percentage') {
                                chargeAmount = (itemsTotal * parseFloat(charge.value)) / 100;
                            } else {
                                chargeAmount = parseFloat(charge.value);
                            }

                            return (
                                <div key={index} className="flex justify-between text-base">
                                    <span className="text-gray-700">{charge.name}</span>
                                    <span className={`font-semibold ${isDiscount ? 'text-green-600' : 'text-gray-900'}`}>
                                        {isDiscount ? '-' : '+'}₹{formatAmount(chargeAmount)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Bill Summary */}
            <div className="mb-3 pb-3 border-b-2 border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 mb-2">SUMMARY</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-base">
                        <span className="text-gray-700">Subtotal</span>
                        <span className="font-semibold text-gray-900">₹{formatAmount(subtotal)}</span>
                    </div>
                    {totalGst > 0 && (
                        <div className="flex justify-between text-base">
                            <span className="text-gray-700">Total GST</span>
                            <span className="font-semibold text-gray-900">₹{formatAmount(totalGst)}</span>
                        </div>
                    )}
                    {totalSaved > 0 && (
                        <div className="flex justify-between text-base">
                            <span className="text-gray-700">You Saved</span>
                            <span className="font-semibold text-green-600">₹{formatAmount(totalSaved)}</span>
                        </div>
                    )}
                    {otherChargesTotal > 0 && (
                        <div className="flex justify-between text-base">
                            <span className="text-gray-700">Other Charges</span>
                            <span className="font-semibold text-gray-900">₹{formatAmount(otherChargesTotal)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-xl font-bold pt-2 border-t-2 border-gray-300">
                        <span className="text-gray-900">GRAND TOTAL</span>
                        <span className="text-orange-600">₹{formatAmount(grandTotal)}</span>
                    </div>
                </div>
            </div>

            {/* Payment Details */}
            <div className="mb-3">
                <h3 className="text-base font-bold text-gray-900 mb-2">PAYMENT DETAILS</h3>
                <div className="space-y-1">
                    {paymentDate && (
                        <div className="flex justify-between text-base">
                            <span className="text-gray-700">Payment Date</span>
                            <span className="font-semibold text-gray-900">{formatDate(paymentDate)}</span>
                        </div>
                    )}
                    {paymentMethod && (
                        <div className="flex justify-between text-base">
                            <span className="text-gray-700">Payment Method</span>
                            <span className="font-semibold text-gray-900">{formatPaymentMethod(paymentMethod)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-base">
                        <span className="text-gray-700">Amount Paid</span>
                        <span className="font-semibold text-gray-900">₹{formatAmount(paymentAmount || 0)}</span>
                    </div>
                    {remaining > 0.01 && (
                        <div className="flex justify-between text-base">
                            <span className="text-gray-700">Remaining</span>
                            <span className="font-semibold text-red-600">₹{formatAmount(remaining)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-300">
                        <span className="text-gray-900">Payment Status</span>
                        <span className={`${remaining <= 0.01 ? 'text-green-600' : paymentAmount > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {remaining <= 0.01 ? '✓ PAID IN FULL' : paymentAmount > 0 ? '⚠ PARTIAL PAYMENT' : '⏳ PENDING'}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );

    // Render page footer
    const renderPageFooter = (pageNumber) => (
        <div className="bill-page-footer">
            <div className="border-t-2 border-gray-800 pt-2 mt-3">
                <div className="flex justify-between items-center text-base text-gray-600">
                    <div>
                        <p className="font-semibold">Thank you for your business!</p>
                    </div>
                    <div className="text-right">
                        <p>Page {pageNumber} of {totalPages}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bill-content-a4">
            {pages.map((pageItems, pageIndex) => {
                const pageNumber = pageIndex + 1;
                const isLastPage = pageNumber === totalPages;

                return (
                    <div key={pageIndex} className="bill-page" data-page={pageNumber}>
                        {renderPageHeader(pageNumber)}
                        {renderItemsTable(pageItems, pageNumber)}
                        {isLastPage && renderSummary()}
                        {renderPageFooter(pageNumber)}
                    </div>
                );
            })}
        </div>
    );
};

export default BillContentA4;
