import React, { Fragment } from "react";

const BillContent = ({ billData }) => {
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
    paymentDate,
  } = billData;

  // Calculate remaining amount
  const remaining = grandTotal - (paymentAmount || 0);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format amount
  const formatAmount = (amount) => {
    if (amount === null || amount === undefined) return "0.00";
    return parseFloat(amount).toFixed(2);
  };

  // Format payment method
  const formatPaymentMethod = (method) => {
    const methodMap = {
      cash: "Cash",
      upi: "UPI",
      card: "Card",
      bank_transfer: "Bank Transfer",
      cheque: "Cheque",
      credit: "Credit",
    };
    return methodMap[method] || method;
  };

  // Calculate total saved amount based on market price vs selling price
  const calculateTotalSaved = () => {
    if (!items || items.length === 0) return 0;

    return items.reduce((total, item) => {
      // Skip mix items to avoid double counting (only count mix headers)
      if (item.isMixItem) return total;

      const marketPrice = parseFloat(item.market_price || 0);
      const sellingRate = parseFloat(item.rate || 0);
      const quantity = parseFloat(item.quantity || 0);

      // If no market price is set, no savings to calculate
      if (marketPrice <= 0 || sellingRate <= 0) return total;

      // Handle unit conversion for calculation
      let calcQuantity = quantity;
      if (item.unit === "gram" || item.unit === "g") {
        calcQuantity = quantity / 1000; // Convert to kg
      }

      // Calculate savings: (market_price - selling_price) * quantity
      const savingsPerUnit = marketPrice - sellingRate;
      if (savingsPerUnit > 0) {
        return total + savingsPerUnit * calcQuantity;
      }

      return total;
    }, 0);
  };

  const totalSaved = calculateTotalSaved();
  console.log("💵 Total Saved (Thermal):", totalSaved);

  return (
    <div className="bill-content">
      {/* Bill Info */}
      <div className="grid grid-cols-2 gap-3 mb-6 pb-4 border-b border-gray-300">
        <div>
          <p className="text-sm text-gray-600">Bill Number</p>
          <p className="text-lg font-bold text-gray-900">{billNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Date</p>
          <p className="text-lg font-bold text-gray-900">
            {formatDate(sellDate)}
          </p>
        </div>
      </div>

      {/* Caterer Details */}
      <div className="mb-6 pb-4 border-b border-gray-300">
        <h3 className="text-lg font-bold text-gray-900 mb-3">BILLED TO</h3>
        <div className="space-y-1">
          <p className="text-base text-lg font-semibold text-gray-900">
            {caterer?.caterer_name || caterer?.name || "N/A"}
          </p>
          {caterer?.contact_person && (
            <p className="text-sm text-gray-700">
              Contact: {caterer.contact_person}
            </p>
          )}
          {caterer?.phone_number && (
            <p className="text-sm text-gray-700">
              Phone: {caterer.phone_number}
            </p>
          )}
          {caterer?.address && (
            <p className="text-sm text-gray-700">Address: {caterer.address}</p>
          )}
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">ITEMS</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-y-2 border-gray-800">
              <th className="text-left py-1 px-1 text-sm font-bold text-gray-900">
                Product
              </th>
              <th className="text-right py-1 px-1 text-sm font-bold text-gray-900">
                Qty
              </th>
              <th className="text-right py-1 px-1 text-sm font-bold text-gray-900">
                Rate
              </th>
              <th className="text-right py-1 px-1 text-sm font-bold text-gray-900">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              // Skip mix items (they're shown under their parent)
              if (item.isMixItem) return null;

              return (
                <Fragment key={index}>
                  {/* Main item row */}
                  <tr
                    className={`border-b border-gray-200 ${
                      item.isMixHeader ? "bg-orange-50" : ""
                    }`}
                  >
                    <td className="py-2 px-3 text-xs text-gray-900">
                      {item.product_name}
                      {item.isMixHeader && (
                        <span className="ml-2 text-xs text-orange-600 font-semibold">
                          (MIX)
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-xs text-right text-gray-900">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-2 px-3 text-xs text-right text-gray-900">
                      ₹{formatAmount(item.rate)}
                    </td>
                    <td className="py-2 px-3 text-xs text-right font-semibold text-gray-900">
                      ₹{formatAmount(item.total)}
                    </td>
                  </tr>

                  {/* Mix components - show if this is a mix header */}
                  {item.isMixHeader &&
                    items
                      .filter((i) => i.isMixItem && i.mixName === item.mixName)
                      .map((mixItem, mixIndex) => (
                        <tr
                          key={`mix-${index}-${mixIndex}`}
                          className="bg-orange-25 border-b border-gray-100"
                        >
                          <td
                            className="py-1 px-3 pl-8 text-xs text-gray-600"
                            colSpan={2}
                          >
                            └─ {mixItem.product_name} ({mixItem.quantity}{" "}
                            {mixItem.unit})
                          </td>
                          <td className="py-1 px-3 text-xs text-right text-gray-600">
                            ₹{formatAmount(mixItem.rate)}
                          </td>
                          <td className="py-1 px-3 text-xs text-right text-gray-600">
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

      {/* Other Charges */}
      {otherCharges && otherCharges.length > 0 && (
        <div className="mb-6 pb-4 border-b border-gray-300">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            OTHER CHARGES
          </h3>
          <div className="space-y-2">
            {otherCharges.map((charge, index) => {
              const isDiscount =
                charge.type === "discount" ||
                charge.name?.toLowerCase().includes("discount");

              // Calculate the actual charge amount
              let chargeAmount;
              if (charge.type === "discount") {
                if (charge.value_type === "percentage") {
                  chargeAmount = (itemsTotal * parseFloat(charge.value)) / 100;
                } else {
                  chargeAmount = parseFloat(charge.value);
                }
              } else if (charge.type === "percentage") {
                chargeAmount = (itemsTotal * parseFloat(charge.value)) / 100;
              } else {
                chargeAmount = parseFloat(charge.value);
              }

              return (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{charge.name}</span>
                  <span
                    className={`font-semibold ${
                      isDiscount ? "text-green-600" : "text-gray-900"
                    }`}
                  >
                    {isDiscount ? "-" : "+"}₹{formatAmount(chargeAmount)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bill Summary */}
      <div className="mb-6 pb-4 border-b-2 border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 mb-3">SUMMARY</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Subtotal</span>
            <span className="font-semibold text-gray-900">
              ₹{formatAmount(subtotal)}
            </span>
          </div>
          {totalGst > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Total GST</span>
              <span className="font-semibold text-gray-900">
                ₹{formatAmount(totalGst)}
              </span>
            </div>
          )}
          {totalSaved > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">You Saved</span>
              <span className="font-semibold text-green-600">
                ₹{formatAmount(totalSaved)}
              </span>
            </div>
          )}
          {otherChargesTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Other Charges</span>
              <span className="font-semibold text-gray-900">
                ₹{formatAmount(otherChargesTotal)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-gray-300">
            <span className="text-gray-900">GRAND TOTAL</span>
            <span className="text-orange-600">₹{formatAmount(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          PAYMENT DETAILS
        </h3>
        <div className="flex gap-6">
          <div className="flex-1 space-y-2">
            {paymentDate && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Payment Date</span>
                <span className="font-semibold text-gray-900">
                  {formatDate(paymentDate)}
                </span>
              </div>
            )}
            {paymentMethod && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Payment Method</span>
                <span className="font-semibold text-gray-900">
                  {formatPaymentMethod(paymentMethod)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Amount Paid</span>
              <span className="font-semibold text-gray-900">
                ₹{formatAmount(paymentAmount || 0)}
              </span>
            </div>
            {remaining > 0.01 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Remaining</span>
                <span className="font-semibold text-red-600">
                  ₹{formatAmount(remaining)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-300">
              <span className="text-gray-900">Payment Status</span>
              <span
                className={`${
                  remaining <= 0.01
                    ? "text-green-600"
                    : paymentAmount > 0
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {remaining <= 0.01
                  ? "✓ PAID IN FULL"
                  : paymentAmount > 0
                    ? "⚠ PARTIAL PAYMENT"
                    : "⏳ PENDING"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillContent;
