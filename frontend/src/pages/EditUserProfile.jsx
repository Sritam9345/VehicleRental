import React, { useState } from 'react';

export default function EditProfilePage() {
  // Hardcoded rental user data
  const rentalUser = {
    firstName: 'John',
    lastName: 'Doe',
    earnings: '$5,000',
    totalRents: 24,
    ratings: 4.8,
  };

  // Form state
  const [firstName, setFirstName] = useState(rentalUser.firstName);
  const [lastName, setLastName] = useState(rentalUser.lastName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // TODO: Handle actual update logic (API call, validation, etc.)
    console.log({ firstName, lastName, oldPassword, newPassword });
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-lg w-full p-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://via.placeholder.com/80"
            alt="User avatar"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {firstName} {lastName}
            </h2>
            <p className="text-gray-500">Rental Partner</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600">Earnings</p>
            <p className="mt-1 text-xl font-medium text-gray-800">
              {rentalUser.earnings}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600">Total Rents</p>
            <p className="mt-1 text-xl font-medium text-gray-800">
              {rentalUser.totalRents}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center col-span-2">
            <p className="text-sm text-gray-600">Ratings</p>
            <div className="mt-1 flex items-center justify-center space-x-1">
              <span className="text-xl font-medium text-gray-800">
                {rentalUser.ratings}
              </span>
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.072 9.393c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.966z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
