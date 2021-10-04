exports.passwordValidation = function(password){
    if(!/(?=.{8,})/.test(password))
        return {result : false, message : "Password must contain at least 1 symbol"};
    if(!/(?=.*[a-z])/.test(password))
        return {result : false, message : "Password must contain at least 1 lowercase"};
    if(!/(?=.*[A-Z])/.test(password))
        return {result : false, message : "Password must contain at least 1 uppercase"};
    if(!/(?=.*[0-9])/.test(password))
        return {result : false, message : "Password must contain at least 1 numeral"};
    if(!/(?=.*[!@#$%^&*])/.test(password))
        return {result : false, message : "Password must contain at least 1 symbol"};
    return {result : true};
}