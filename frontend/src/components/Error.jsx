import React from 'react'

const Error = (props) => {
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-4">Error Occurred</h3>
                    <p className="text-red-500 mb-2">{props.error}</p>
                <button
                    onClick={() => props.setErrorPopupPanel(false)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                >
                    OK
                </button>
            </div>
        </div>
    )
}

export default Error;