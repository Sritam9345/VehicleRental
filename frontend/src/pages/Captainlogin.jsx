import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'
import UserError from '../components/UserError'

const Captainlogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [error,setError] = useState(false);
  const [errorPopupPanel,setErrorPopupPanel] = useState(false);

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()


  useEffect(()=>{
  if(error==true)setErrorPopupPanel(true);
  else setErrorPopupPanel(false);
  },[error])


  const submitHandler = async (e) => {
    e.preventDefault();
    const Enteredcaptain = {
      email: email,
      password
    }

    try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rental/login`, Enteredcaptain)

    if (response.status === 200) {
      const data = response.data
      console.log(data.rental);
      setCaptain(data.rental)
    //  console.log(captain);
      localStorage.setItem('token', data.token)
      navigate('/captain-home')

    }}catch(error){
      setError(true);
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='w-20 mb-3' src="/ChatGPT Image May 18, 2025, 10_07_19 PM.png" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
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
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>Never rented a Vechile? <Link to='/captain-signup' className='text-blue-600'>Register as a Rental</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>

      {errorPopupPanel && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   
      <UserError setErrorPopupPanel={setErrorPopupPanel} />
   
  </div>
)}
    </div>
  )
}

export default Captainlogin