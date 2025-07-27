import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CaptainDataContext } from '../context/CapatainContext';

function CaptainHistory() {
  const { captain } = useContext(CaptainDataContext);

  const [history, setHistory] = useState([]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'long',    // full month name
      day: 'numeric',   // day of month
      year: 'numeric',  // full year
      hour: 'numeric',  // hours
      minute: '2-digit',// minutes, always 2‑digit
      hour12: true      // AM/PM
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
  `${import.meta.env.VITE_BASE_URL}/rental/history`,
  {
    params: { rentalId: captain._id }
  }
);

    console.log(response.data)
        setHistory(response.data);
        
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    }

    if (captain?._id) {
      fetchData();
    }
  }, [captain]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-8 text-center uppercase">
        Rental History
      </h1>

      {history && history.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {history
            .filter(item => ['accepted', 'completed'].includes(item.status))
            .map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 hover:shadow-2xl transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
                  {formatDate(item.startTime)}
                </h2>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-gray-800">User Name: </span>
                  <span className="capitalize">{`${item.user.firstName} ${item.user.lastName || ""}`}</span>
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-extrabold text-gray-800">User Number: </span>
                  <span className="capitalize font-extrabold">{item.user.number}</span>
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-gray-800">Rental Agent: </span>
                  <span className="capitalize">{`${item.rental.firstName} ${item.rental.lastName || ""}`}</span>
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-gray-800">Destination: </span>
                  <span className="capitalize">{item.destination}</span>
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-gray-800">Fare: </span>
                  <span className="text-green-600 font-bold">
                    ₹{Math.round(item.fare)}
                  </span>
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-gray-800">Vehicle Plate: </span>
                  <span className="uppercase">{item.rental.vechile.plate}</span>
                </p>
              </div>
            ))
            
            }
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20 italic">
          No accepted or completed history found.
        </div>
      )}
    </div>
  );
}

export default CaptainHistory;
