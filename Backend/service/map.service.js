const axios = require('axios');
const { header } = require('express-validator');
const rentalModel = require('../models/rental.model');

module.exports.locateUser = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching coordinates');
    }
}

module.exports.getDistance = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    try {
        const response1 = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: origin,
                key: apiKey
            }
        });

        const response2 = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: destination,
                key: apiKey
            }
        });

        const originLocation = response1.data.results[0].geometry.location;
        const destinationLocation = response2.data.results[0].geometry.location;
       
        const response = await axios.post(
            'https://routes.googleapis.com/directions/v2:computeRoutes',
            {
                origin: {
                    location: {
                        latLng: {
                            latitude: originLocation.lat,
                            longitude: originLocation.lng
                        }
                    }
                },
                destination: {
                    location: {
                        latLng: {
                            latitude: destinationLocation.lat,
                            longitude: destinationLocation.lng
                        }
                    }
                },
                travelMode: 'DRIVE' 
            },
            {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
                    'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
                }
            }
        );

        console.log(response.data.routes[0].distanceMeters);

        if (response.status === 200) {
            if(response.data === null){
                throw new Error('No route found');
            }
            const distance = response.data.routes[0];
            return {
                distance: distance
            };
        } else {
            throw new Error('Unable to fetch distance');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching distance');
    }
}

module.exports.getAutoCompleteSuggestion = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    try {
        const response = await axios.post('https://places.googleapis.com/v1/places:autocomplete', {
            input: input,
        }, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Goog-Api-Key': apiKey
            }
        });

        console.log(response.statusText);
        if (response.status === 200) {
            const suggestions = response.data.suggestions;
            return {
                suggestions: suggestions
            };
        } else {
            throw new Error('Unable to fetch autocomplete suggestions');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching autocomplete suggestions');
    }
}

module.exports.getRentalsInTheRadius = async (lat, lng, radius) => {
    

    const rentals = await rentalModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6378.1] // radius in kilometers
            }
        }
    });
console.log(rentals);
    return {
        rentals
    };
};
