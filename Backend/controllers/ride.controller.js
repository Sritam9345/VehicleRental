const { validationResult } = require('express-validator');
const rideService = require('../service/ride.service');
const { locateUser } = require('../service/map.service');
const { sendMessageToSocketld } = require('../socket');
const RideModel = require('../models/ride.model');
const { findById } = require('../models/user.model');
const rentalModel = require('../models/rental.model');
const { getRentalsInTheRadius } = require('../service/map.service')




module.exports.createRide = async (req, res, next) => {
    const error = validationResult(req);
   
       if(error.errors.length != 0){
           console.log(error);
          return res.status(400).json({error: error.array()})
       }
   const userId = req.userId;
   console.log(`this is userId${userId}`);
       const { destination, vechile } = req.body;
   
       try {
           const {ride} = await rideService.createRide({
                userId: userId,
                destination: destination,
                vechile: vechile
           });

           ride.otp="";

          // console.log(ride.user);

const rideWithUser = await RideModel.findOne({_id:ride._id}).populate('user');



const pickupCoordinates = rideWithUser.user.location;

console.log(pickupCoordinates,"hi");

const ltd = pickupCoordinates.coordinates[1]
const lng = pickupCoordinates.coordinates[0]

 const {rentals} = await getRentalsInTheRadius(ltd,lng,2.0);




if(rentals.length!==0)rentals.map(rentals =>{
    sendMessageToSocketld(rentals.socketID,{
        event:"new-ride",
        data: rideWithUser
    })
})

   
           return res.status(201).json({ride,
            rentals,
            rideWithUser
            });
       } catch (error) {
           return res.status(500).json({ 
            hi:"hi",
            error:error.message });
       } 

};


module.exports.getFare = async (req,res,next)=>{
    const error = validationResult(req);
   
    if(error.errors.length != 0){
        console.log(error);
       return res.status(400).json({error: error.array()})
    }

    const { pickup, destination } = req.query;


    const {scooty , car , bike} = await rideService.getFare(pickup,destination);
    
   

  return  res.json({
    scooty:scooty,
    car:car,
    bike:bike
  })

}


module.exports.confirmRide = async (req,res,next)=>{
    const error = validationResult(req);
   
    if(error.errors.length != 0){
        console.log(error);
       return res.status(400).json({error: error.array()})
    }


    const {rideId} = req.body;

    try{
        const ride = await rideService.confirmRide(rideId,req.rentalId);
       
        sendMessageToSocketld(ride.user.socketID,{
            event:'ride-confirmed',
            data:ride
        })

        console.log("ride_confirmed");

        return res.status(201).json({
            ride
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"hi nigger"
        })
    }

}

module.exports.startRide = async(req,res,next)=>{
    
    const error = validationResult(req);
   
    if(error.errors.length != 0){
      console.log(error.errors);
      return;
    }
    
    const {rideId,otp} = req.query;
    const rental = req.rental;

    try {
        
        const ride = await rideService.startRide({rideId,otp,rental })
       
        sendMessageToSocketld(ride.user.socketID,{
            event:"ride-started",
            data: ride
        });

        return res.status(200).send(ride);

    } catch (error) {
        throw new Error(error);
    }
}


module.exports.endRide = async(req,res,next)=>{
    const error = validationResult(req);
   
    if(error.errors.length != 0){
      throw new Error(error);
    }

    const {rideId} = req.query;

    try {
        
        const ride = await rideService.endRide({rideId, rental:req.rental })
       
        sendMessageToSocketld(ride.user.socketID,{
            event:"ride-ended",
            data: ride
        });

        sendMessageToSocketld(ride.rental.socketID,{
            event:"ride-ended",
            data: ride
        });

        return res.status(200).send(ride);
    } catch (error) {
        throw new Error(error);
    }
}
