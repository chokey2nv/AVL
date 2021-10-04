async function signup(_email, _password, _cpassword, notify){
    const email = _email.value,
    password = _password.value,
    cpassword = _cpassword.value;
    const error = validate.single(email, {presence : true, email : true})
    if(error?.length > 0)
        return notify(_email.id, error[0])
    const {result, message} = passwordValidation(password);
    if(!result) return notify(_password.id, message);
    if(password !== cpassword) return notify(_cpassword.id, "Password missmatch");
    post("/api/signup", {email, password, cpassword}, {}, (error, {signup, result, message})=>{
        if(error) return $.notify(error.message, "error");
        if(!signup) return $.notify(message, "error")
        const {token, userId} = result || {};
        $.notify("Login Success!", "success");
        localStorage.setItem(getAppValues().APP_TOKEN_ALIAS, token);
        localStorage.setItem(getAppValues().APP_USER_ID, userId);
        window.location.href = routeNames.verifyNotice_+userId;
    });
}