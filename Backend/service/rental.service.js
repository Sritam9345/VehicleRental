const rentalModel = require("../models/rental.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { blacklistTokenModel } = require("../models/blacklist.model");

module.exports.createRental = async ({ firstName, lastName, email, password, color, capacity, type, plate,location }) => {
    if (!firstName || !password || !email || !color || !capacity || !type || !location) {
        throw new Error('All fields are required');
    }

   

    try {
        const rental = await rentalModel.create({
            firstName,
            lastName,
            email,
            password,
            vechile: {
                color,
                capacity,
                type,
                plate
            },
            location
        });
        return rental;
    } catch (error) {
        throw new Error('Error creating rental in the database: ' + error.message);
    }
}

module.exports.updateRental = async ({ rentalId, firstName, lastName, oldPassword, newPassword }) => {
    try {
        const rental = await rentalModel
            .findById(rentalId)
            .select('+password');

        if (!rental) {
            throw new Error('Rental not found');
        }

        const isMatch = await rental.comparePassword(oldPassword);

        if (!isMatch) {
            throw new Error('Old password is incorrect');
        }

        let newHashedPassword = undefined;

        if (newPassword) {
            newHashedPassword = await rentalModel.hashPassword(newPassword);
        }

        const updatedRental = await rentalModel.findByIdAndUpdate(
            rentalId,
            {
                firstName: firstName || rental.firstName,
                lastName: lastName || rental.lastName,
                password: newHashedPassword || rental.password,
            },
            { new: true }
        );

        return updatedRental;
    } catch (error) {
        throw new Error('Error updating rental in the database: ' + error.message);
    }
}
