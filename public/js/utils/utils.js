function passwordValidation(password){
    if(!/(?=.{8,})/.test(password))
        return {result : false, message : "Password must contain at least 8 character"};
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
async function post(url, data, options, callback){
    return new Promise((resolve, reject) => {
        const {headers = {}} = options || {};
        fetch(url, {
            method : "post",
            headers : {
                "Content-Type" : "Application/json",
                ...headers
            },
            body : JSON.stringify(data)
        }).then(res=>res.json()).then(response => {
            if(callback) callback(null, response);
            else resolve(response)
        }).catch(error=>{
            if(callback) callback(error);
            reject(error);
        })
    })
}
async function privatePost(url, data, options = {}, callback){
    return new Promise((resolve, reject) => {
        const {headers = {}} = options;
        const token = localStorage.getItem(getAppValues().APP_TOKEN_ALIAS);
        const loginId = localStorage.getItem(getAppValues().APP_USER_ID);
        fetch(url, {
            method : "post",
            headers : {
                "Content-Type" : "Application/json",
                "avl_token" : token,
                "avl_login_id" : loginId,
                ...headers,
            },
            body : JSON.stringify(data)
        }).then(res=>res.json()).then(response => {
            if(callback) callback(null, response);
            else resolve(response)
        }).catch(error=>{
            if(callback) callback(error);
            reject(error);
        })
    })
}
function getAppValues(){
    return {
        APP_TOKEN_ALIAS : "avlToken",
        APP_USER_ID : "avlUserId",
    }
}