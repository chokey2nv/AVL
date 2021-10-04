async function resetPassword(){
    const old_password = document.getElementById("old_password").value,
        new_password = document.getElementById("new_password").value,
        new_cpassword = document.getElementById("new_cpassword").value;
        if(!old_password || String(old_password).trim() === "")
            $("#old_password").notify("Old password can not be empty");
        else if(!new_password || String(new_password).trim() === "")
            $("#new_password").notify("Old password can not be empty");
        if(!new_cpassword || String(new_cpassword).trim() === "")
            $("#new_cpassword").notify("Old password can not be empty");
        const {result : valid, message : _message } = await passwordValidation(new_cpassword);
        if(!valid) return $.notify(_message, "error");
        const apiResult = await privatePost("/api/resetPass", {old_password, new_cpassword, new_password})
        const {resetPass, message} = apiResult || {};
        if(!resetPass) return $.notify(message, "error");
        location.href = routeNames.login;
}