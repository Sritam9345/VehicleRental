const mongoose = require('mongoose');


const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const RideSchema = new Schema({
  
    user: {
        type: ObjectId,
        ref: 'user',
        required: true,
    },

    rental: {
        type: ObjectId,
        ref: 'rental',
    },

    startTime: {
        type: Number,
        default: Date.now,
    },

    endTime: {
        type: Number,
        default: Date.now
    },

    destination: {
        type: String,
        required: true,
    },

    status:{
        type: String,
        enum:["pending","accepted","rented","completed","cancelled"],
        default:"pending"
    },

    otp:{
        type: String,
        select: false,
        required: true
    },

    vechile:{
        type: String,
        required: true,
        enum:["car","bike","scooty"]
    },
    
    fare:{
        type: Number,
        default:0  
    }
});

module.exports = mongoose.model('ride', RideSchema);