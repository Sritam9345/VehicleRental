// CaptainHome.jsx
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainHome = () => {
  // ... existing state and logic ...


    const [ ridePopupPanel, setRidePopupPanel ] = useState(false )
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)
    const navigate = useNavigate();
    const [payment,setPayment] = useState(false);

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'rental'
        })
        // const updateLocation = () => {
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(position => {

        //             socket.emit('update-location-captain', {
        //                 captainId: captain._id,
        //                 location: {
        //                     ltd: position.coords.latitude,
        //                     lng: position.coords.longitude
        //                 }
        //             })
        //         })
        //     }
        // }

        //const locationInterval = setInterval(updateLocation, 10000)
     //   updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])

    socket.on('new-ride', (data) => {
        setRide(data)
        setRidePopupPanel(true)
        console.log(data);
    })

    socket.on('ride-ended',(ride)=>{
        setRide(ride);
        setPayment(true);
        navigate("/rental-payment",{state:{ride:ride}});
    });

    console.log(ride)
    async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm`, {

            rideId: ride._id,
            rentalId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log(response);

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }


    // useEffect(() => {
    //     if (ridePopupPanel && ridePopupPanelRef.current) {
    //         gsap.fromTo(ridePopupPanelRef.current,
    //             { y: "100%", opacity: 0 },
    //             { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    //         )
    //     } else if (!ridePopupPanel) {
    //         gsap.to(ridePopupPanelRef.current,
    //             { y: "100%", opacity: 0, duration: 0.6, ease: "power3.in" }
    //         )
    //     }
    // }, [ ridePopupPanel ])
  

  // useEffect(() => {
  //   if (confirmRidePopupPanel && confirmRidePopupPanelRef.current) {
  //     gsap.fromTo(confirmRidePopupPanelRef.current,
  //       { y: "100%", opacity: 0 },
  //       { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
  //     )
  //   }
  //   else if (!confirmRidePopupPanel) {
  //           gsap.to(confirmRidePopupPanelRef.current,
  //               { y: "100%", opacity: 0, duration: 0.6, ease: "power3.in" }
  //           )
  //       console.log("rideUnconFirmed");
  //         }
  // }, [ confirmRidePopupPanel ])

     useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Captain Portal
            </h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
              Dashboard
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
              History
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <CaptainDetails />
        
        {/* Status Card */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Current Status</h2>
            <div className="flex items-center space-x-4">
              <span className={`w-3 h-3 rounded-full ${payment ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></span>
              <span className="text-sm text-gray-600">
                {payment ? 'Payment Pending' : 'Available for Rides'}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Ride Popup Panels */}
      <div ref={ridePopupPanelRef} className="fixed inset-x-0 bottom-0 transform translate-y-full bg-white/95 backdrop-blur-lg rounded-t-3xl shadow-2xl border-t border-gray-200">
        <RidePopUp 
        ride={ride}
        setRidePopupPanel={setRidePopupPanel} 
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        confirmRide={confirmRide} />
      </div>

      <div ref={confirmRidePopupPanelRef} className="fixed inset-x-0 bottom-0 transform translate-y-full bg-white/95 backdrop-blur-lg rounded-t-3xl shadow-2xl border-t border-gray-200">
        <ConfirmRidePopUp 
        ride={ride} 
        setRidePopupPanel={setRidePopupPanel}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome









