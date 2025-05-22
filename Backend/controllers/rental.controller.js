const rentalModel = require("../models/rental.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { blacklistTokenModel } = require("../models/blacklist.model");
const { validationResult } = require("express-validator");
const { createRental } = require("../service/rental.service");

module.exports.registerRental = async (req, res, next) => {
    const error = validationResult(req);

    if (error.errors.length != 0) {
        console.log(error);
        return res.status(400).json({ error: error.array() });
    }
    const { firstName, lastName, email, password, vechile,location } = req.body;

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
        email: email,
        password: hashedPassword,
        color: vechile.color,
        capacity: vechile.capacity,
        type: vechile.type,
        plate: vechile.plate,
        location:location
    });

    const token = rental.generateAuthToken();

    res.status(201).json({ token, rental });


}
    catch(e){
        console.log(e);
    }

};

module.exports.loginRental = async (req, res, next) => {
    const error = validationResult(req);

    if (error.errors.length != 0) {
        console.log(error);
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

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
};

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

    const { firstName, lastName, oldPassword, newPassword } = req.body;

    const rental = await updateRental({
        rentalId: req.rental._id,
        firstName: firstName,
        lastName: lastName,
        oldPassword: oldPassword,
        newPassword: newPassword
    });

    res.status(200).json({ rental });
};
