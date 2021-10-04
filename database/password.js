var bcrypt = require('bcryptjs');

exports.hashPassword = function(password, callback){
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                reject(err);
                if(callback) callback(err);
            }
            bcrypt.hash(password, salt, function(err, hash){
                resolve(hash);
                if(callback) callback(err, hash);
            })
        })
    });    
}

exports.comparePassword = function(password, hash, callback){
    return new Promise((resolve, reject)=>{
        if(bcrypt.compareSync(password, hash)){
            resolve(true);
            if(callback) callback(null, true);
        }else{
            const error = "password mismatch"
            reject(error);
            if(callback) callback(error);
        }
    }) 
}