import React, { useRef, useState } from 'react'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function CaptainRiding({ ride , setRide ,distance}) {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)

  // Animate via GSAP, but we drive the same translateY values you apply with Tailwind
  useGSAP(() => {
    gsap.to(panelRef.current, {
      y: isOpen ? '0%' : '100%',
      duration: 0.3,
      ease: 'power1.out',
      onStart: () => { if (isOpen) panelRef.current.style.visibility = 'visible' },
      onComplete: () => { if (!isOpen) panelRef.current.style.visibility = 'hidden' },
    })
  }, [isOpen])

  return (
    <div className="relative mt-8">
      {/* ——— The white card ——— */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl">
        <p className="text-xl font-semibold text-gray-800">
          <span className="text-pretty">Borrower:</span> {ride.user.firstName}{' '}
          {ride.user.lastName}
        </p>
        <p className="text-sm text-gray-600">
          <span>Destination: </span> {ride.destination}
        </p>
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={() => setIsOpen(true)}
        >
          Finish ride
        </button>
      </div>

      {/* ——— Optional overlay ——— */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ——— The sliding panel ——— */}
      <div
        ref={panelRef}
        style={{ visibility: 'hidden' }}
        className="absolute inset-x-0 bottom-0 z-50  max-w-md mx-auto rounded-t-xl bg-white p-6 shadow-xl"
      >
        <FinishRide ride={ride} setFinishRidePanel={setIsOpen} setRide={setRide} distance={distance}/>
      </div>
    </div>
  )
}

export default CaptainRiding
