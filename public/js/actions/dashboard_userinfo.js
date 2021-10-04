async function getUserInfo(){
    const loginId = localStorage.getItem(getAppValues().APP_USER_ID);
    const apiResult = await privatePost("/api/getInfo", {loginId});
    const {result, getInfo, message} = apiResult || {};
    if(!getInfo) {
        $.notify(message, "error");
        return false;
    }
    return result;
}
async function isLoggedIn(){
    const loginId = localStorage.getItem(getAppValues().APP_USER_ID),
    token = localStorage.getItem(getAppValues().APP_TOKEN_ALIAS);
    return loginId && token;
}