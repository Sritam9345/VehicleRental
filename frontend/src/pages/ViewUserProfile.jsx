import React from 'react'
import { UserDataContext } from '../context/UserContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
const ViewProfile = () => {
  // Hardcoded user data
  const { user } = useContext(UserDataContext)
  console.log(user)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile Overview</h1>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500">First Name</h2>
            <p className="mt-1 text-lg text-gray-900">{user.firstName}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Last Name</h2>
            <p className="mt-1 text-lg text-gray-900">{user.lastName}</p>
          </div>
          <div className="col-span-2">
            <h2 className="text-sm font-medium text-gray-500">Email Address</h2>
            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Total Borrowed</h2>
            <p className="mt-1 text-lg text-gray-900">{user.borrowed}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Total Amount Transacted</h2>
            <p className="mt-1 text-lg text-gray-900">₹{Math.floor(user.expenses)}</p>
          </div>
        </div>
        <div className="mt-10 flex justify-end gap-6">
          <Link to='/edit-user-profile'>
            <button
              className="w-36 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </Link>
          <Link to='/user-history'>
            <button
              className="w-36 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
            >
              History
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewProfile
