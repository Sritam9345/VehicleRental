import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CapatainContext';

const VehicleInfo = () => {
  const { captain } = useContext(CaptainDataContext);

  if (!captain) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400">
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          Please open this page from Homepage again...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-600 tracking-wide uppercase">
          Vehicle Information
        </h1>

        <div className="mb-6 p-6 bg-blue-50 border-l-8 border-blue-500 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Rental Information
          </h2>
          <p className="text-xl text-blue-600 capitalize">
            {captain.firstName} {captain.lastName}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Vehicle Details
        </h2>
        <ul className="space-y-3">
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="font-semibold text-gray-900 capitalize">
              {captain.vechile.name}
            </span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-700">Type:</span>
            <span className="font-semibold text-gray-900 capitalize">
              {captain.vechile.type}
            </span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-700">Plate Number:</span>
            <span className="font-semibold text-gray-900 uppercase">
              {captain.vechile.plate}
            </span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-700">Color:</span>
            <span className="font-semibold text-gray-900 capitalize">
              {captain.vechile.color}
            </span>
          </li>
          <li className="flex justify-between text-lg">
            <span className="font-medium text-gray-700">Capacity:</span>
            <span className="font-semibold text-gray-900 capitalize">
              {captain.vechile.capacity}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VehicleInfo;
