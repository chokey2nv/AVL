const validate = require("validate.js");
const { hashPassword } = require("../database/password");
const Login = require("../database/schemas/logins");
const { sendMail } = require("../utils/mailer/mailers");
const { routeNames } = require("../utils/routenames");
const { getDomain, getSecreteKey } = require("../utils/values");
const { passwordValidation } = require("../utils/utils");
const jwt = require("jsonwebtoken");

require("../database/connection");
exports.signup = async function (body, callback){
    let {email, password, cpassword} = body || {};
    try{
        const error = validate.single(email, {presence : true, email : true})
        if(error?.length > 0)
            throw new Error(error[0]);
        const existingLogin = await Login.findOne({email});
        if(existingLogin) throw new Error("Email already exists!");
        const {result, message} = passwordValidation(password);
        if(!result) throw new Error(message);
        if(password !== cpassword) throw new Error("Password missmatch");
        password = await hashPassword(password);
        const token = jwt.sign({email, password}, getSecreteKey());
        const { _id } = await Login.create({email, password, type : "normal", token}).save(),
        verifyLink = getDomain() + routeNames.verifying_+_id,
        mailResult = await sendMail(email, {verifyLink},  "verify_email");
        callback({signup : true, message : "success!", result : {token, userId : _id}});
    }catch(error){
        console.error(error);
        const {message} = error;
        callback({signup : false, message})
    }
}
exports.signup_google = async function (body, callback){
    let {email, fullname, userId} = body || {};
    try{
        const error = validate.single(email, {presence : true, email : true})
        if(error?.length > 0)
            throw new Error(error[0]);
        const existingLogin = await Login.findOne({email});
        let token;
        let _userId;
        if(existingLogin){
            _userId = existingLogin._id;
            token = existingLogin.token;
        }else {
            const password = await hashPassword(userId);
            token = jwt.sign({email, password : hashPassword(userId), fullname, userId}, getSecreteKey());
            const { _id } = await Login.create({
                email, password, userId, verified : true, 
                fullname, type : "google", token
            }).save();
            _userId = _id;
        }
        callback({signup_google : true, message : "success!", result : {token, userId : _userId}});
    }catch(error){
        console.error(error);
        const {message} = error;
        callback({signup_google : false, message})
    }
}
exports.signup_facebook = async function (body, callback){
    let {email, fullname, userId} = body || {};
    try{
        // const error = validate.single(email, {presence : true, email : true})
        // if(error?.length > 0)
        //     throw new Error(error[0]);
        let _userId, token;
        const password = await hashPassword(userId);
        const existingLogin = await Login.findOne({email});
        if(existingLogin){
            _userId = existingLogin._id;
            token = existingLogin.token;
        }else {
            token = jwt.sign({email, password, fullname, userId}, getSecreteKey());
            const { _id } = await Login.create({
                email, password, userId, verified : true, 
                fullname, type : "facebook", token
            }).save();
            _userId = _id;
        }
        callback({signup_facebook : true, message : "success!", result : {token, userId : _userId}});
    }catch(error){
        console.error(error);
        const {message} = error;
        callback({signup_facebook : false, message})
    }
}