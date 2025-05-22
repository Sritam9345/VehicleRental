const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt"); 
const { blacklistTokenModel } = require("../models/blacklist.model");
const rentalModel = require("../models/rental.model");

module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
     return res.status("401").json({
            message:"Unauthorized access!!"
        })
    }

   const isBlackListedToken = await blacklistTokenModel.findOne({
            token:token
   })

   if(isBlackListedToken){
    return res.status(401).json({
        message:"Unauthorized!"
    })
   }

    try{
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(verifyToken._id);
        req.userId = verifyToken._id;
        req.user = user;
        console.log(req.userId);
        return next();
    } catch(error){
        res.status("401").json({
            message:"Unauthorized access!!"
        })
    }



}


module.exports.authRental = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

console.log(token);

    if(!token){
     return res.status(401).json({
            message:"Unauthorized access1!!"
        })
    }

   const isBlackListedToken = await blacklistTokenModel.findOne({
            token:token
   })

   if(isBlackListedToken){
    return res.status(401).json({
        message:"Unauthorized access2!!"
    })
   }

    try{
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
        const rental = await rentalModel.findById(verifyToken
            ._id);
            req.rental = rental;
            req.rentalId = verifyToken._id;
           return next();
        }catch(error){
            res.status(401).json({
                message:"Unauthorized access3!!"
            })
        }
    }
