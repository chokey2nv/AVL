const Login = require("../database/schemas/logins");
require("../database/connection");
exports.privateRoute = async function(action, req, res){
    try{
        const { headers } = req,
        {avl_token, avl_login_id : __loginId} = headers || {};
        const isLogin = await Login.findOne({token : avl_token});
        if(isLogin)
            return action({...req.body, __loginId}, result => res.send(result));
        throw new Error("Please login!");
    }catch(error){
        console.error(error);
        action && action({message : error.message});
    }
}