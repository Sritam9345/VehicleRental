const rentalModel = require("../models/rental.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { blacklistTokenModel } = require("../models/blacklist.model");
const { validationResult } = require("express-validator");
const { createRental, history } = require("../service/rental.service");
const {updateRental} = require("../service/rental.service")

module.exports.registerRental = async (req, res, next) => {
    const error = validationResult(req);

    if (error.errors.length != 0) {
        console.log(error);
        return res.status(400).json({ error: error.array() });
    }
    const { firstName, lastName, email, password, vechile,location,number } = req.body;

    const isRentalAlreadyRegistered = await rentalModel.findOne({ email: email });

    if (isRentalAlreadyRegistered) {
        return res.status(400).json({ error: "Rental is already registered" });
    }

    const hashedPassword = await rentalModel.hashPassword(password);

    console.log(vechile);
try{
    const rental = await createRental({
        firstName: firstName,
        lastName: lastName,
        number:number,
        email: email,
        password: hashedPassword,
        color: vechile.color,
        capacity: vechile.capacity,
        type: vechile.type,
        plate: vechile.plate,
        location:location,
        name:vechile.name
    });

    const token = rental.generateAuthToken();

    res.status(201).json({ token, rental });


}
    catch(error){
        throw (error);
    }

};

module.exports.loginRental = async (req, res, next) => {
    const error = validationResult(req);

    if (error.errors.length != 0) {
        console.log(error);
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
try{
    const rental = await rentalModel.findOne({
        email: email
    }).select('+password');
    

    if (!rental) {
        return res.status(401).json({
            message: "Haha wrong credentials fool"
        });
    }

    const isMatch = await rental.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Haha wrong credentials fool"
        });
    }

    const token = rental.generateAuthToken();

    res.status(200).json({ token, rental });
}catch(error){
    throw(error);
}

}

module.exports.logoutRental = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token });

    return res.status(200).json({
        message: "Logged Out! Successfully!!"
    });
};

module.exports.getRentalProfile = async (req, res) => {
    return res.json({
        rental: req.rental
    });
};

module.exports.updateRental = async (req, res, next) => {
    const error = validationResult(req);


    if (error.errors.length != 0) {
        console.log(error);
        return res.status(400).json({ error: error.array() });
    }

    const {rentalId ,firstName, lastName, oldPassword, newPassword,location } = req.body;

   console.log(location);
try{
    const rental = await updateRental({
        rentalId: rentalId,
        firstName: firstName,
        lastName: lastName,
        oldPassword: oldPassword,
        newPassword: newPassword,
        newLocation:location
    });

    res.status(200).json({ rental });}
    catch(error){
       return res.status(500).send(error.message);
    }
};


module.exports.getHistory = async(req,res,next)=> {
    
    console.log("req.body is",req.body);
    const rentalId = req.query.rentalId;
try{
    const response = await history(rentalId);

    res.send(response);}
    catch(error){
        return res.status(500).send(error.message);
    }
}
