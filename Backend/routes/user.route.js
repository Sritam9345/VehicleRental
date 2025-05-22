const express = require("express")
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.middleware");



router.post("/register",[
    body('email').isEmail().withMessage("invalid email"),
    body('firstName').isLength({ min: 3 }).withMessage("first name is required"),
    body('password').isLength({ min: 6 }).withMessage("password must be at least 6 characters long")],
    userController.registerUser
);

router.post("/login",[
body('email').isEmail().withMessage("invalid email"),
body('password').isLength({min: 6}).withMessage("password is too short")
],userController.loginUser
)

router.get("/profile",authUser,userController.getUserProfile);
router.get("/logout",authUser,userController.logoutUser);
router.patch("/update",authUser,userController.updateUser);

module.exports = router;