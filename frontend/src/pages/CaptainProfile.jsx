import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CapatainContext';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center space-x-4">
          <img
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-300"
            src="/e6e4df26ba752161b9fc6a17321fa286.jpg"
            alt="User avatar"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {captain.firstName} {captain.lastName}
            </h2>
            <p className="text-sm text-gray-500">Rental Partner</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-gray-600">Earnings</p>
            <p className="mt-1 text-xl font-semibold text-gray-800">
              ₹{Math.floor(captain.earned)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-gray-600">Total Rents</p>
            <p className="mt-1 text-xl font-semibold text-gray-800">
              {captain.rented}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center shadow-sm col-span-2 flex items-center justify-center space-x-2">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h2l1 2h6l1-2h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 11h8m-8 4h6"
              />
            </svg>
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">{captain.number}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full space-x-4">
          <Link to="/edit-rental-profile" className="w-full">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
              Edit Profile
            </button>
          </Link>
          <Link to="/vehicle-info" className="w-full">
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition">
              Vehicle Info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
