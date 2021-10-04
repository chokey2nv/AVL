const { comparePassword } = require("../database/password");
const Login = require("../database/schemas/logins");
const { passwordValidation } = require("../utils/utils");

require("../database/connection");
exports.getInfo = async function({loginId : _id}, callback){
    try{
        const result = await Login.findOne({_id}, {verified : true});
        callback && callback({getInfo : true, result, message : "Success!"})
    }catch({message}){
        callback && callback({getInfo : false, message})
    }
}
exports.resetPass = async function(body, callback){
    try{
        const {__loginId : _id, old_password, new_password, new_cpassword} = body;
        const loginInfo = await Login.findOne({_id});
        if(!loginInfo) throw new Error("Profile doesn't exist!");
        const {password} = loginInfo;
        await comparePassword(old_password, password);
        const {result, message} = passwordValidation(new_cpassword)
        if(!result) throw new Error(message);
        if(new_cpassword !== new_password) throw new Error("Passwords not matched");
        Login.findOneAndUpdate({_id}, {password : new_password});
        callback && callback({resetPass : true, result, message : "Success!"})
    }catch({message}){
        callback && callback({resetPass : false, message})
    }
}