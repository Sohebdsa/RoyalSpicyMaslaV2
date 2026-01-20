import React from 'react';

const BillFooter = ({ printerType }) => {
    return (
        <div className="bill-footer text-center pt-4 border-t-2 border-gray-800 mt-4">
            <p className="text-lg font-semibold text-gray-900">
                Thank you for your business!
            </p>
            <p className="text-sm text-gray-600 mt-2">
                For any queries, please contact us
            </p>
        </div>
    );
};

export default BillFooter;
