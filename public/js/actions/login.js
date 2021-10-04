async function login (email, password) {
    post("/api/login", {email, password}, {}, (error, {login, result, message}) => {
        if(error) return $.notify(error.message, "error");
        if(!login) return $.notify(message, "error");
        const {token, userId} = result || {};
        localStorage.setItem(getAppValues().APP_TOKEN_ALIAS, token);
        localStorage.setItem(getAppValues().APP_USER_ID, userId);
        location.href = routeNames.dashboard;
    })
}