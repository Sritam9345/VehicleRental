import React, { useState, useEffect, useRef } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = (props) => {
   // const [ currentPosition, setCurrentPosition ] = useState(center);
    const currentPosition = useRef({
    lat: -3.745,
    lng: -38.523
});
  
const [location,setLocation] = useState(false);
   
    useEffect(()=>{
      if(props.ride){
        currentPosition.current = {
        lat:props.ride?.rental.location.coordinates[1] ,
        lng: props.ride?.rental.location.coordinates[0]
       }
        setLocation(true);
        console.log(props.ride);}

    },[props.ride]);
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log(apiKey);
console.log(location);

    return (
        <>
            {location ? (
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currentPosition.current}
                        zoom={15}
                    >
                        <Marker position={currentPosition.current} />
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