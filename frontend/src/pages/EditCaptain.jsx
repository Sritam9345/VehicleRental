import React, { useEffect, useState, useContext, useRef } from 'react';
import ErrorUpdate from '../components/ErrorUpdate';
import { CaptainDataContext } from '../context/CapatainContext';
import axios from 'axios';


export default function EditCaptain() {
  // Hardcoded rental user data
  const token = localStorage.getItem('token');
  const { captain } = useContext(CaptainDataContext);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const [error, setError] = useState(false);
  const [errorPopupPanel, setErrorPopupPanel] = useState(false);
  const [newLocation, setNewLocation] = useState(''); 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const coordinates = useRef('');

  useEffect(() => {
    if (error === true) setErrorPopupPanel(true);
    else setErrorPopupPanel(false);
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault();
     coordinates.current = captain.location;
    console.log(captain.location);
    if (newPassword && newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if(newLocation){
     try {

      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newLocation}&key=${apiKey}`);
      const {data} = response;
      
      if(data){
coordinates.current = [data.results[0].geometry.location.lat,data.results[0].geometry.location.lng];
console.log(coordinates);
}

    } catch (error) {
      console.log(error);
      alert("the Location address is invalid!!");
     }
    
    }

    try {

      const updateRental = {
        rentalId: captain._id,
        oldPassword: oldPassword,
        newPassword: newPassword,
        location: {
        coordinates: coordinates.current 
      }
      };

      await axios.patch(`${import.meta.env.VITE_BASE_URL}/rental/update`, updateRental, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
    alert('Profile updated successfully!');
    } catch (error) {
        console.log(error)
      setError(true);
    }
   
  };


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
                {captain.firstName} {captain.lastName}
              </h2>
              <p className="text-gray-500">Rental Partner</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">Total Earned</p>
              <p className="mt-1 text-xl font-medium text-gray-800">
                ₹{Math.floor(captain?.earned)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">Total Rented</p>
              <p className="mt-1 text-xl font-medium text-gray-800">
                {captain.rented}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={(e) => handleSubmit(e)} className="mt-6 space-y-4">
            {/* Removed firstName and lastName input block */}
            {/* New Location input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Location
              </label>
              <input
                type="text"
                value={newLocation}
                onChange={e => setNewLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                required
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
