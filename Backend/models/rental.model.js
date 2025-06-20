const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const rentalSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        minlenght: [3, "first name should be of lenght 3 please"]
    },
    lastName:{
        type:String,
        minlenght: [3, "Last name should be of lenght 3 please"]
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketID:{  // updated from socketId to socketID
        type: String,
    },
    
    earned:{
        type:Number,
        default:0
    },
    
    vechile:{
        color:{
            type: String,
            required: true,
            minlenght: [3, "color should be of lenght 3 please"]

        },
        plate:{
            type: String,
            required: true,
            minlenght: [3, "plate should be of lenght"]
        },
        capacity: {
            type: Number,
            required: true,
            min:[1, "capacity should be greater than 1"]
        },
        type: {
            type: String,
            required: true,
            enum: ["car", "bike", "scooty"]
        }
        },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "active"
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

          rented:{
            type:Number,
            default:0
          }

    })

    rentalSchema.index({ location: '2dsphere' });
    
    rentalSchema.methods.generateAuthToken = function (){
        const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
        return token;
    } 

    rentalSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password,this.password);
    }
    
    rentalSchema.statics.hashPassword = async function (password) {
        return await bcrypt.hash(password,10);
    }


    const rentalModel = mongoose.model("rental", rentalSchema);


    module.exports = rentalModel;