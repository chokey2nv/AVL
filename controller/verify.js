const Logins = require("../database/schemas/logins");
const { sendMail } = require("../utils/mailer/mailers");
const { routeNames } = require("../utils/routenames");
const { getDomain } = require("../utils/values");

require("../database/connection");
exports.verify = async function({loginId : _id}, callback){
    try{
        const result = await Logins.findOneAndUpdate({_id}, {verified : true});
        callback && callback({verify : true, message : "Success!"})
    }catch({message}){
        callback && callback({verify : false, message})
    }
}
exports.isVerified = async function({loginId : _id}, callback){
    try{
        const result = await Logins.findOne({_id});
        callback({isVerified : true, result : Boolean(result && result.verified)});
    }catch({message}){
        callback({isVerified : false, message})
    }
}
exports.resendEmail = async function({loginId}, callback){
    try{
        const result = await Logins.findOne({_id : loginId});
        if(!result) throw new Error("Invalid Profile");
        const {email, _id} = result,
        verifyLink = getDomain() + routeNames.verifying_+_id;
        await sendMail(email, {verifyLink},  "verify_email");
        callback({resendEmail : true, result : true, message : "Success!"});
    }catch({message}){
        callback({resendEmail : false, message})
    }
}