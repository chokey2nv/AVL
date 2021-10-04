async function resendEmail(loginId){
    const postResult = await post("/api/resendEmail", {
        loginId
    });
    const {resendEmail, message} = postResult || {}
    $.notify(message, resendEmail ? "success" : "error");    
    return resendEmail;
}