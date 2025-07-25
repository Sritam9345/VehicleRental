import React from 'react'
import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


function CaptainRiding(props) {

   const [ finishRidePanel, setFinishRidePanel ] = useState(false)
   const finishRidePanelRef = useRef(null)
   
   
   
   
    useGSAP(function () {
            if (finishRidePanel) {
                gsap.to(finishRidePanelRef.current, {
                    transform: 'translateY(0)'
                })
            } else {
                gsap.to(finishRidePanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        }, [ finishRidePanel ])
    

  return (
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-semibold text-gray-800"><span className='text-pretty'>Borrower:</span> {props?.ride?.user.firstName} {props?.ride?.user.lastName}</p>
              <p className="text-sm text-gray-600"><span>Destination: </span> {props?.ride?.destination}</p>
              <button className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" 
              onClick={
             ()=>setFinishRidePanel(true)
              }
              >
                Finish ride
              </button>
            </div>

             <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide
                    ride={props.ride}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>

          </div>
  )
}

export default CaptainRiding