const express = require("express")
const router = express.Router();
const {body} = require("express-validator");
const rentalController = require("../controllers/rental.controller");
const { authRental } = require("../middlewares/auth.middleware");



router.post("/register",[
    body('email').isEmail().withMessage("invalid email"),
    body('firstName').isLength({ min: 3 }).withMessage("first name is required"),
    body('password').isLength({ min: 6 }).withMessage("password must be at least 6 characters long")],
    body('vechile.color').isLength({ min: 3 }).withMessage("color is required"),
    body('vechile.plate').isLength({ min: 3 }).withMessage("plate is required"),
    body('vechile.capacity').isLength({ min: 1 }).withMessage("capacity is required"),
    body('vechile.type').isIn(["car", "bike", "scooty"]).withMessage("type is required"),  
    rentalController.registerRental
);


router.get("/logout",rentalController.logoutRental);

router.post("/login",[
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min: 6}).withMessage("password is too short")
],rentalController.loginRental
)


router.get("/profile",authRental,rentalController.getRentalProfile);

router.patch("/update",authRental,rentalController.updateRental);

module.exports = router;