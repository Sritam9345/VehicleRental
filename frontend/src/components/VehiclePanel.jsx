import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
                props.setVehiclePanel(false)
                props.setPath('/car-front-line-icon-simple-600nw-2481597609.webp')
            }} className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src="/car-front-line-icon-simple-600nw-2481597609.webp" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Car <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>Base Price: ₹100 </h5>
                    <p className='font-medium text-xs text-gray-600'>Fast, High Rate-per-Hour</p>
                </div>
                
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('bike')
                props.setVehiclePanel(false)
                props.setPath('/image.png')
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src="/image.png" alt="" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Bike <span><i className="ri-user-3-fill"></i>2</span></h4>
                    <h5 className='font-medium text-sm'>Base Price: ₹20 </h5>
                    <p className='font-medium text-xs text-gray-600'>Mid mileage, Mid Rate-per-Hour</p>
                </div>
               
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('scooty')
                props.setVehiclePanel(false)
                props.setPath('/free-scooter-icon-1050-thumb.png')
            }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
                <img className='h-10' src="/free-scooter-icon-1050-thumb.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Scooty<span><i className="ri-user-3-fill"></i>2</span></h4>
                    <h5 className='font-medium text-sm'>Base Price: ₹15  </h5>
                    <p className='font-medium text-xs text-gray-600'>Best mileage, Low Rate-per-Hour</p>
                </div>
              
            </div>
        </div>
    )
}

export default VehiclePanel