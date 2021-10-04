exports.getDomain = function(){
    return process.env.NODE_ENVIRONMENT === "development" ? 
        "http://localhost:8000" : "https://avlbackend.herokuapp.com/";
}
exports.getSecreteKey = function(){
    return "avl_secret_key"
}