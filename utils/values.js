exports.getDomain = function(){
    return process.env.NODE_ENVIRONMENT === "development" ? 
        "http://localhost:3000" : "https://avl.heroku.com";
}
exports.getSecreteKey = function(){
    return "avl_secret_key"
}