async function isVerified (loginId) {
    post("/api/isVerified", {loginId}, {}, (error, {isVerified, result, message}) => {
        if(error) return $.notify(error.message, "error");
        if(isVerified){
            window.location.href = result ? routeNames.dashboard : routeNames.verifyNotice_+loginId;
        } else $.notify(message, "error");
    })
}