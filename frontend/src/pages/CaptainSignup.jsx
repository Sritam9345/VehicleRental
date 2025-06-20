import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react';
import Error from '../components/Error';
import gsap from 'gsap';

const CaptainSignup = () => {
  // Add at the top with the other useState declarations
  const [pickupLocation, setPickupLocation] = useState('');

  // Then, inside the form JSX (for example, right before the submit button), add:


  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [error,setErorr] = useState("");
  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('car')
  const errorPopupPanelRef = useRef(null);
  const [errorPopupPanel,setErrorPopupPanel] = useState(false);
  const location = useRef(null);

   const apiKey = import.meta.env.VITE_BASE_URL //dev
   
  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
try{
    const response1 = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${pickupLocation}&key=${apiKey}`);
    const results = response1.data.results;
    console.log(apiKey)
    console.log(response1)
    if (results.length > 0) {
      location.current = results[0].geometry.location;
    } 

    else {
      throw new Error('No results found for the provided address.');
    }
    
    const captainData = {
        firstName: firstName,
        lastName: lastName,
      email: email,
      password: password,
      vechile: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType
      },
      location:location.current
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rental/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      console.log(data);
      setCaptain(data.rental);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }
    
  
}catch(error){

  setErorr("Error locating the address..");
  setErrorPopupPanel(true);

}

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }

useGSAP(function () {
        if (errorPopupPanel) {
            gsap.to(errorPopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(errorPopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ errorPopupPanel ]);


  return (
    <div className='w-full max-w-6xl mx-auto py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="/ChatGPT Image May 18, 2025, 10_07_19 PM.png" alt="" />
        <form
          onSubmit={(e) => {
            submitHandler(e)
          }}
        >
          <h3 className='text-lg w-full font-medium mb-2'>What's our Rental's name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Rental's email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
            type="password"
            placeholder='password'
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">car</option>
              <option value="scooty">scooty</option>
              <option value="bike">bike</option>
            </select>
          </div>

          <div className="flex flex-col mb-7">
            <h3 className="text-lg font-medium mb-2">Pickup Loaction</h3>
            <input
              required
              type="text"
              placeholder="Recommended within 10m-25m radius"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            />
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >
            Create Rental Account
          </button>
        </form>
        <p className='text-center'>
          Already have a account?{' '}
          <Link to='/captain-login' className='text-blue-600'>
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>
          This site is protected by reCAPTCHA and the{' '}
          <span className='underline'>Google Privacy Policy</span> and{' '}
          <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
      {errorPopupPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={errorPopupPanelRef}>
            <Error
              error={error}
              setErrorPopupPanel={setErrorPopupPanel}
              errorPopupPanel={errorPopupPanel}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CaptainSignup