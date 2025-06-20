import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
  const { ride, setConfirmRidePopupPanel, setRidePopupPanel } = props
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  async function submitHandler(e) {
    e.preventDefault()
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`, {
        params: { rideId: ride._id, otp: otp },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      setConfirmRidePopupPanel(false)
      setRidePopupPanel(false)
      navigate('/captain-riding', { state: { ride } })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-6 space-y-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Confirm Ride Details</h2>
        <button
          onClick={() => setConfirmRidePopupPanel(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Ride & Passenger Info */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-6">
          {/* Destination */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Destination</p>
            <p className="mt-1 text-lg font-semibold text-gray-800">{ride?.destination}</p>
          </div>
          {/* Passenger */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Borrower</p>
            <p className="mt-1 text-lg font-semibold text-gray-800">{ride?.user.firstName} {ride?.user.lastName}</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-4 animate-fade-in-up">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Ride Confirmed</h3>
            <p className="text-sm text-gray-600">Payment Method: {ride?.paymentMethod}</p>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Start Ride
        </button>
      </form>
    </div>
  )
}

export default ConfirmRidePopUp
