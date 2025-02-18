const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


const User = require("../models/user");


router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});


router.post("/sign-up", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username }); // searches to make sure username not taken 
    if (userInDatabase) {
        return res.send("Username already taken.");
    };

// this if confirms password is same spelling and condition
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match"); 
      };

// hashses passwords so even if same password put it still changes (hashes) so that its diffeerent on the back end 
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
req.body.password = hashedPassword;

// validation logic 
const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}`);

});


module.exports = router;
