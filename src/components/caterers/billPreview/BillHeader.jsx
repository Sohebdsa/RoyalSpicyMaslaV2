import React from "react";

const BillHeader = ({ billData, printerType }) => {
  return (
    <div className="bill-header border-b-2 border-gray-800 pb-4 mb-2">
      {/* Logo and Title Row */}
      <div className="flex items-start justify-between mb-3">
        {/* Left: Logo and Title */}
        <div className="flex flex-col items-center flex-1">
          <h1 className="text-2xl font-bold text-gray-900 text-center uppercase tracking-wide">
            ROYAL SPICY MASALA
          </h1>
          <p className="text-base font-semibold text-orange-600  mt-1">
            GRAINS AND DRY FRUITS
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="text-center space-y-1 leading-normal text-sm text-gray-700 w-full">
        <div className="flex flex-wrap justify-center gap-x-4 font-medium">
          <p>Prop: Barkat Ali Kallan Shaikh</p>
          <span className="text-gray-400"></span>
          <p>Mob: 91+ 97699 90055</p>
        </div>

        <p className="max-w-xl mx-auto">
          Shop no 1, Ashiyana SRA Society, Near DCB Bank, Opp Subway, Andheri
          West, Mumbai - 400053
        </p>

        <div className="flex flex-wrap justify-center gap-x-4 pt-1">
          <p>
            <span className="font-semibold">Email:</span> rsmgadf@gmail.com
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 pt-2 font-bold text-gray-800">
          <p>FSSAI: 21525006000639</p>
          <p>GST: 27QAUPS5898Q1ZK</p>
        </div>
      </div>
    </div>
  );
};

export default BillHeader;
