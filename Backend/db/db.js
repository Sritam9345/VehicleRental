require("dotenv").config();
const mongoose = require("mongoose")


module.exports =  async function dbConnect(){ try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("SUCCESSFULLY CONNECTED TO THE DB");
} catch (error) {
    console.log("ERROR IN CONNECTION")
}}

 

