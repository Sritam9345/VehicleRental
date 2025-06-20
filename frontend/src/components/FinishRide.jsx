import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = ({ ride, setFinishRidePanel }) => {
  const navigate = useNavigate()

  async function endRide() {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/end-ride`, {
        params: { rideId: ride._id },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setFinishRidePanel(false)
      navigate('/rental-payment' ,{state:{ride}});
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg space-y-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Finish this Ride</h3>
        <button onClick={() => setFinishRidePanel(false)} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <i className="ri-close-line text-2xl"></i>
        </button>
      </div>

      {/* Passenger & Distance */}
      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={ride.user.avatarUrl || 'https://via.placeholder.com/40'}
            alt={`${ride.user.firstName} avatar`}
          />
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">Borrower</p>
            <p className="text-lg font-medium text-gray-800">{ride.user.firstName} {ride.user.lastName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Distance</p>
          <p className="text-lg font-semibold text-gray-800">{`25`} km</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="space-y-4">
        <div className="flex items-start space-x-4"> 
        </div>
        <div className="flex items-start space-x-4">
          <i className="ri-map-pin-2-fill text-red-500 text-xl mt-1"></i>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Destination</p>
            <p className="text-sm text-gray-800">{ride.destination}</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
         

        </div>
      </div>

      {/* Finish Button */}
      <button
        onClick={endRide}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        Finish Ride
      </button>
    </div>
  )
}

export default FinishRide
