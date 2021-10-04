async function google_signup(){
    const authResult = await authenticate();
    const {dt} = authResult || {},
    {Ot : email, Se : fullname, fT : userId} = dt || {};
    post("/api/signup_google", {
        email, fullname, userId
    }, {}, (error, {signup_google, result, message})=>{
        if(error) return $.notify(error.message, "error");
        if(!signup_google) return $.notify(message, "error");
        const {token, userId} = result || {};
        localStorage.setItem(getAppValues().APP_TOKEN_ALIAS, token);
        localStorage.setItem(getAppValues().APP_USER_ID, userId);
        location.href = routeNames.dashboard;
    })
}