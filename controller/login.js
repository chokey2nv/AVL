const { comparePassword } = require("../database/password");
const Login = require("../database/schemas/logins");
const { signup_facebook } = require("./signup");
require("../database/connection");
exports.login = async function ( body,  callback ) {
    try{
        const {email, password} = body || {};
        const userLogin = await Login.findOne({email});
        if(!userLogin) throw new Error("User profile doesn't exist");
        const {_id : userId, token, password : _password} = userLogin;
        await comparePassword(password, _password);
        callback({login : true, result : {token, userId}, message : "Success!"});
    }catch(error){
        console.error(error);
        callback({login : false, message : error.message});
    }
}
exports.login_facebook = async function (body, callback){
    let {email, fullname, userId} = body || {};
    try{
        const existingLogin = await Login.findOne({email});
        if(!existingLogin){
            return signup_facebook({email, fullname, userId}, ({signup_facebook, result, message})=>{
                if(!signup_facebook) throw new Error(message);
                callback({login_facebook : true, result, message});
            });
        }
        const {token, _id} = existingLogin;
        callback({login_facebook : true, message : "success!", result : {token, userId : _id}});
    }catch(error){
        console.error(error);
        const {message} = error;
        callback({login_facebook : false, message})
    }
}
exports.login_google = async function (body, callback){
    let {email, fullname, userId} = body || {};
    try{
        const existingLogin = await Login.findOne({email});
        if(!existingLogin){
            return signup_google({email, fullname, userId}, ({signup_google, result, message})=>{
                if(!signup_google) throw new Error(message);
                callback({login_google : true, result, message});
            });
        }
        const {token, _id} = existingLogin;        
        callback({login_google : true, message : "success!", result : {token, userId : _id}});
    }catch(error){
        console.error(error);
        const {message} = error;
        callback({login_google : false, message})
    }
}