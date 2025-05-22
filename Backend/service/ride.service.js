const rentalModel = require('../models/rental.model');
const RideModel = require('../models/ride.model');
const { getDistance } = require('./map.service');
const crypto = require('crypto');
 
 
const  getOtp = (num)=>{
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.createRide = async ({userId,destination,vechile}) => {
    console.log(`THis is USERID ${userId}`);
         if(!userId  || !destination || !vechile){
             throw new Error("userId, pickup, destination and vechile are required");
         }

          
    
            const ride = await RideModel.create({
                user: userId,
                destination: destination,
                vechile: vechile,
                otp: getOtp(4)
            });
            


            console.log(ride);
    
       return {
        ride
       }
     
    }


module.exports.confirmRide = async(rideId,rentalId)=>{
    
        if(!rideId){
            throw new Error("rideId is not defined");
        }

        console.log(`this is conform ride ${rideId}`);
    
        await RideModel.findByIdAndUpdate({_id:rideId},{
            status:"accepted",
            rental:rentalId,
        })
    
        await rentalModel.findByIdAndUpdate({_id:rentalId},{
            status:"inactive"
        })

        const ride = await RideModel.findById({_id:rideId}).populate('user').populate('rental').select('+otp');
        console.log(ride);
        return ride; 

        
    
    }

module.exports.startRide = async ({ rideId, otp, rental }) => {
        try {
            if (!rideId || !otp || !rental) {
                throw new Error("rideId, otp, and rental are required");
            }
    
            const ride = await RideModel.findById(rideId).select('+otp').populate('user').populate('rental');
    
            if (!ride) {
                throw new Error("Ride not found");
            }
    
            if (ride.otp !== otp) {
                throw new Error("Invalid OTP");
            }
    
            console.log(ride);
    
            ride.status = "accepted";
            ride.startTime = Date.now();
            await ride.save();
    
            console.log(`Ride ${rideId} started by rental ${rental}`);
    
            return ride;
        } catch (error) {
           throw new Error(error)
        }
    }

 module.exports.endRide = async({rideId , rental})=>{

        if(!rideId){
            throw new Error("ride id is required");
        }
    
        const ride = await RideModel.findOne({
            _id:rideId,
            rental:rental._id
        }).populate('user').populate('rental');
    
        if(!ride) {
            throw new Error("ride not found");
        }

        let basePrice = 0;

        if(ride.vechile == "bike") basePrice = 20;
        if(ride.vechile == "car") basePrice = 100;
        if(ride.vechile == "scooty")  basePrice = 15;

console.log(basePrice);
        
    const durationInMs = Date.now() - ride.startTime;
    const durationInHours = durationInMs / (1000 * 60 * 60);
    let multiplier;
    switch (ride.vechile.trim().toLowerCase()) {
        case "bike":
            multiplier = 60;
            break;
        case "car":
            multiplier = 500;
            break;
        case "scooty":
            multiplier = 40;
            break;
        default:
            multiplier = 0;
    }
    const fare = basePrice + durationInHours * multiplier;
    
    const rideData = await RideModel.findByIdAndUpdate(
        { _id: rideId },
        {
            status: "completed",
            endTime: Date.now(),
            fare: fare
        },
        { new: true }
    ).populate('user').populate('rental');


        await rentalModel.findByIdAndUpdate({
            _id:rental._id
        },{
            status:"active"
        });
    
        return rideData;
    
    }
    