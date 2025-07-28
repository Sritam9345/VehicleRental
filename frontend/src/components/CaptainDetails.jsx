import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)
  const [address, setAddress] = useState('Fetching address...')
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    const getAddress = async () => {
      try {
     
        const lat = captain.location.coordinates[0];
        const  lng = captain.location.coordinates[1];
        console.log(lat,lng)
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              latlng: `${lat},${lng}`,
              key: apiKey,
            },
          }
        )

        const results = response.data.results
        if (results && results.length > 0) {
          setAddress(results[0].formatted_address)
        } else {
          setAddress('Address not found')
        }
      } catch (error) {
        console.error('Reverse geocoding error:', error)
        setAddress('Unable to fetch address')
      }
    }

    if (captain?.location?.coordinates) {
      getAddress()
    }
  }, [captain])

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-gray-800">₹{Math.floor(captain?.earned)}</p>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Rented Times</h3>
          <p className="text-3xl font-bold text-gray-800">{captain?.rented}</p>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Address</h3>
          <p className="text-base text-gray-700">{address}</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
