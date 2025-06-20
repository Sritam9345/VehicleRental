require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First Name must be 3 characters long']
    },
    lastName: {
        type: String,
        minlength: [3, 'Last Name must be 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email is too short to be true"]
    },
    password: {
        type: String,
        required: true,
        select: false 
    },

    socketID: {
        type: String
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
          default: 'Point'
        },
        coordinates: {
          type: [Number], 
          required: true,
          default: [85.74478162143048, 20.294234951546645]
        }
      },
      borrowed:{
        type:Number,
        default: 0
      },
      expenses:{
        type:Number,
        default: 0
      }
}); 

userSchema.index({ location: '2dsphere' });

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}  


const userModel = mongoose.model('user',userSchema);

module.exports = userModel;