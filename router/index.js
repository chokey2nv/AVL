const { login, login_facebook, login_google } = require("../controller/login");
const { signup, signup_google, signup_facebook } = require("../controller/signup");
const { verify, isVerified, resendEmail } = require("../controller/verify");
const { getInfo, resetPass } = require("../controller/dashboard");
const { privateRoute } = require("../controller/privateRouteController");

const express = require("express"),
router = express.Router();
router.post("/api/:action", express.json(), function(req, res){
    const {params} = req,
    {action} = params || {};
    switch(action){
        case "login" : return login(req.body, result=>res.send(result));
        case "login_facebook" : return login_facebook(req.body, result=>res.send(result));
        case "login_google" : return login_google(req.body, result=>res.send(result));
        case "signup" : return signup(req.body, result=>res.send(result));
        case "verify" : return verify(req.body, result=>res.send(result));
        case "isVerified" : return isVerified(req.body, result=>res.send(result));
        case "signup_google" : return signup_google(req.body, result=>res.send(result));
        case "signup_facebook" : return signup_facebook(req.body, result=>res.send(result));
        case "resendEmail" : return resendEmail(req.body, result=>res.send(result));
        case "getInfo" : return privateRoute(getInfo, req, res);
        case "resetPass" : return privateRoute(resetPass, req, res);
    }
})


module.exports = router;