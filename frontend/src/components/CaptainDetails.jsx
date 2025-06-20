
import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)

    // CaptainDetails.jsx

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
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Rating</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-gray-800">{captain?.rating}</span>
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}



//     return (
//         <div>
//             <div className='flex items-center justify-between'>
//                 <div className='flex items-center justify-start gap-3'>
//                     <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
//                     <h4 className='text-lg font-medium capitalize'>{captain.firstName + " " + captain.lastName}</h4>
//                 </div>
//                 <div>
//                     <h4 className='text-xl font-semibold'>{captain.earned}</h4>
//                     <p className='text-sm text-gray-600'>Earned</p>
//                 </div>
//             </div>
//             <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
//                 <div className='text-center'>
//                     <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
//                     <h5 className='text-lg font-medium'>10.2</h5>
//                     <p className='text-sm text-gray-600'>Hours Online</p>
//                 </div>
//                 <div className='text-center'>
//                     <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
//                     <h5 className='text-lg font-medium'>10.2</h5>
//                     <p className='text-sm text-gray-600'>Hours Online</p>
//                 </div>
//                 <div className='text-center'>
//                     <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
//                     <h5 className='text-lg font-medium'>10.2</h5>
//                     <p className='text-sm text-gray-600'>Hours Online</p>
//                 </div>

//             </div>
//         </div>
//     )
// }

export default CaptainDetails