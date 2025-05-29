require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require("./db/db");
const userRoutes = require("./routes/user.route");
const rentalRoutes = require("./routes/rental.route")
const cookieParser = require("cookie-parser");
const map = require("./routes/map.route")
const ride = require("./routes/ride.route")
const serverless = require('serverless-http')


dbConnect();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/user",userRoutes);
app.use("/rental",rentalRoutes);
app.use("/map",map)
app.use("/ride",ride);



module.exports = serverless(app);