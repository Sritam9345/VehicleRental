import React, { useEffect, useState,useContext } from 'react';
import ErrorUpdate from '../components/ErrorUpdate';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

export default function EditProfilePage() {
  // Hardcoded rental user data
  
const token = localStorage.getItem('token');

  const [error,setError] = useState(false);
  const [errorPopupPanel,setErrorPopupPanel ] = useState(false);
  const {user} = useContext(UserDataContext);

  // Form state
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(()=>{
    if(error==true) setErrorPopupPanel(true)
      else setErrorPopupPanel(false);
  },[error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    try {

      const updateUser = {
        userId:user._id,
        firstName:firstName,
        lastName:lastName,
        oldPassword:oldPassword,
        newPassword:newPassword
      }

      await axios.patch(`${import.meta.env.VITE_BASE_URL}/user/update`,updateUser,
        {
           headers: {
                  Authorization: `Bearer ${token}`
                }
        }
      );
    alert('Profile updated successfully!');
    } catch (error) {
      console.log(error);
      setError(true);
    }
   
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Please open this page from Hompage again...</p>
      </div>
    );
  }

  return (
    <>
      {errorPopupPanel && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <ErrorUpdate setError={setError} />
        </div>
      )}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-2xl max-w-lg w-full p-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <img
              className="h-20 w-20 rounded-full object-cover"
              src="/e6e4df26ba752161b9fc6a17321fa286.jpg"
              alt="User avatar"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">Borrower</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="mt-1 text-xl font-medium text-gray-800">
                ₹{Math.floor(user.expenses)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">Total Borrowed</p>
              <p className="mt-1 text-xl font-medium text-gray-800">
                {user.borrowed}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={(e)=>handleSubmit(e)} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">       
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
    </>
  );
}
