import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'


const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { ride } = location.state || {}
  const { socket } = useContext(SocketContext)

  // Calculate elapsed time
  const getElapsedTime = () => {
    const start = new Date(ride?.startTime)
    const end = new Date(ride?.endTime)
    const diff = Math.abs(end - start)
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff - hours * 3600000) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Payment Details</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* User */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">User</p>
          <p className="mt-1 text-lg font-medium text-gray-700">{ride?.user?.firstName} {ride?.user?.lastName}</p>
        </div>

        {/* Rental */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Rental</p>
          <p className="mt-1 text-lg font-medium text-gray-700">{ride?.rental?.firstName} {ride?.rental?.lastName}</p>
        </div>

        {/* Destination */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Destination</p>
          <p className="mt-1 text-lg font-medium text-gray-700">{ride?.destination}</p>
        </div>

        {/* Elapsed Time */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Elapsed Time</p>
          <p className="mt-1 text-lg font-medium text-gray-700">{getElapsedTime()}</p>
        </div>

        {/* Total Fare */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Total Fare</p>
          <p className="mt-1 text-2xl font-bold text-green-600">Rs {Math.floor(ride?.fare)}</p>
        </div>
      </div>

     
      <div className="pt-6">
        <button
          onClick={() => navigate('/home')}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Make Payment
        </button>
      </div>
    </div>
  )
}

export default Payment
