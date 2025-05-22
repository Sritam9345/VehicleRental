const express = require("express")
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const {authUser, authRental} = require("../middlewares/auth.middleware");




router.post("/create",
body("destination").isString().isLength({min: 3}).withMessage("destination is required"),
body("vechile").isString().isIn(["car","bike","scooty"]).withMessage("vechile is required")
,authUser,rideController.createRide) 

router.get("/get-fare",
    rideController.getFare
)

router.post("/confirm",authRental,rideController.confirmRide);

router.get('/start-ride',
    query('rideId').isMongoId().withMessage("invalid ID"),
    query('otp').isString().isLength({min:4 ,max:4}).withMessage("invalid Otp")
    ,authRental,rideController.startRide); 


router.get('/end-ride',
    query('rideId').isMongoId().withMessage('Invalid Id'),
    authRental,
    rideController.endRide
)



module.exports = router;

