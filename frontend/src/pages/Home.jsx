import React, { useEffect, useRef, useState, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import { useNavigate, Link } from 'react-router-dom'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import LiveTracking from '../components/LiveTracking'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id })
  }, [user])

  socket.on('ride-confirmed', (data) => {
   console.log("ride-confirmed")
    setRide(data)
    setVehicleFound(false)
    setWaitingForDriver(true)
  })

  socket.on('ride-started', () => setWaitingForDriver(false))
  socket.on('ride-ended', (rideData) => navigate('/payment', { state: { ride: rideData } }))

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
        { params: { input: e.target.value }, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setDestinationSuggestions(response.data.response.suggestions)
    } catch (err) {
      console.error(err)
    }
  }

  const submitHandler = (e) => e.preventDefault()

      useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])

 


  // GSAP hooks for other panels omitted for brevity...

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/create`,
        { destination, vechile: vehicleType },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      console.log(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)
  }

  return (
    <div className="h-screen relative overflow-hidden">

      {/* Inline Profile Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowSidebar(false)}
          />
          <div className="relative ml-auto h-full w-64 bg-white shadow-lg p-6 overflow-y-auto">
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            <h2 className="text-xl font-semibold mb-6">Profile Menu</h2>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/view-user-profile"
                  className="block text-blue-600 hover:underline"
                  onClick={() => setShowSidebar(false)}
                >
                  View Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/edit"
                  className="block text-blue-600 hover:underline"
                  onClick={() => setShowSidebar(false)}
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/history"
                  className="block text-blue-600 hover:underline"
                  onClick={() => setShowSidebar(false)}
                >
                  History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Header */}
      {!panelOpen && (
        <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 py-4 bg-white bg-opacity-80 backdrop-blur-md">
          <img
            className="w-20 mb-3"
            src="/ChatGPT Image May 18, 2025, 10_07_19 PM.png"
            alt="RentWheelz Logo"
          />
          <button
            onClick={() => setShowSidebar(true)}
            className="bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-500 transition"
          >
            <i className="ri-menu-line mr-2"></i>Profile
          </button>
        </header>
      )}

      {/* Main Content */}
      <div className="h-screen w-screen">
        <LiveTracking ride={ride} />
      </div>

      {/* Bottom Panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form className="relative py-3" onSubmit={submitHandler}>
            <input
              onClick={() => { setPanelOpen(true); setActiveField('destination') }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full transition hover:bg-gray-800"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

     <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                 <VehiclePanel
                    selectVehicle={setVehicleType}
                    setConfirmRidePanel={setConfirmRidePanel} 
                    setVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide
                    createRide={createRide}
                    destination={destination}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel} 
                    setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver
                    createRide={createRide}
                    destination={destination}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0 bg-white px-3 py-6 pt-12'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
        </div>
  )
}

export default Home
