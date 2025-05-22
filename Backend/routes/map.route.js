const express = require("express")
const router = express.Router();
const {query} = require("express-validator");
const mapsController = require("../controllers/map.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.get("/get-coordinates",
   query('address').isLength({ min: 3 }).withMessage("address is required")
    ,authUser,mapsController.getCoordinates);



router.post("/get-distance-time",
    query('origin').isLength({ min: 3 }).withMessage("origin is required"),
    query('destination').isLength({ min: 3 }).withMessage("destination is required"),
    authUser,mapsController.getDistance);

router.get("/get-suggestions",
    query('input').isLength({ min: 3 }).withMessage("input is required"),
    authUser,mapsController.getAutoCompleteSuggestion);




module.exports = router;

