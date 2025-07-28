import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'



const LiveTracking = (props) => {
    const [currentPosition, setCurrentPosition] = useState({ lat: 20.5937, lng: 78.9629 });
    const [location, setLocation] = useState(false);
   
  

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log(apiKey);
console.log(props.ride?.rental?.location.coordinates[0],props.ride?.rental?.location.coordinates[1]);

    return (
        <>
            {props.ride ? (
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={{width: '100%', height: '100%'}}
                        center={{
        lat: props.ride?.rental?.location.coordinates[0],
        lng: props.ride?.rental?.location.coordinates[1]
    }}
                        zoom={15}
                    >
                        <Marker position={{
        lat: props.ride?.rental?.location.coordinates[0],
        lng: props.ride?.rental?.location.coordinates[1]
    }} />
                    </GoogleMap>
                </LoadScript>
            ) : (
                <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white">
      
      <div className="text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">RentWheelz</h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-8">
          Your journey starts here. Seamlessly book your ride platform with confidence and security.
        </p>
    
      </div>
    </div>
            )}
        </>
    )
}

export default LiveTracking