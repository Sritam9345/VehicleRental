import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


function Payment() {
       
        const location = useLocation()
        const { ride } = location.state || {};
        const { socket } = useContext(SocketContext)
        const navigate = useNavigate()

        console.log(location.state);

       

        return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
            <div className="mb-2">
                <span className="font-semibold">User:</span> {ride?.user?.firstName} {ride?.user?.lastName}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Rental:</span> hi there 
            </div>
            <div className="mb-2">
                <span className="font-semibold">Destination:</span> {ride?.destination}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Elapsed Time:</span>{" "}
                {(() => {
                    const start = new Date(ride?.startTime);
                    const end = new Date(ride?.endTime);
                    const diff = Math.abs(end - start);
                    const hours = Math.floor(diff / 1000 / 60 / 60);
                    const minutes = Math.floor((diff - hours * 3600000) / (1000 * 60));
                    return `${hours}h ${minutes}m`;
                })()}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Total Fare:</span>
                <span className="text-green-600 font-bold text-xl ml-2">Rs {Math.floor(ride?.fare)}</span>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Make Payment
            </button>
        </div>
        )
}

export default Payment