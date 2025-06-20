import React from 'react'

const RidePopUp = (props) => {
  const {  ride, setRidePopupPanel, setConfirmRidePopupPanel, confirmRide } = props
console.log(props);
  return (
    <div className="p-6 space-y-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">New Ride Request</h2>
        <button 
          onClick={() => setRidePopupPanel(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* User Greeting */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-700 text-lg">Name: <span className="font-semibold">{ride?.user.firstName} {ride?.user.lastName}</span></p>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 animate-fade-in-up">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{ride?.destination}</h3>
            <p className="text-sm text-gray-600">Distance: {ride?.distance} km</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setRidePopupPanel(false)}
          className="py-3 px-6 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300"
        >
          Decline
        </button>
        <button
          onClick={() => {
            setConfirmRidePopupPanel(true)
            confirmRide()
          }}
          className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Accept Ride
        </button>
      </div>
    </div>
  )
}

export default RidePopUp
