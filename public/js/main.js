window.addEventListener("load", function(){
    (async () => {
        try{
            await loadScript("js/actions/verify.js");
            await loadScript("js/utils/google_auth.js");
            await loadScript("js/utils/routenames.js")
            await loadScript("js/utils/utils.js")
            googleInit();
            
            if($("#signup_container").length > 0){
                await loadScript("js/actions/signup.js");
                await loadScript("js/actions/signup_google.js");
                await loadScript("js/actions/signup_facebook.js");
                const signupBtn = document.getElementById("signup"),
                email = document.getElementById("email"),
                password = document.getElementById("password"),
                cpassword = document.getElementById("cpassword");
                signupBtn.addEventListener("click", function(){
                    (async()=>{
                        signup(email, password, cpassword, function(id, message, type){
                            $(`#${id}`).notify(message, type);
                        });
                    })();
                });
                
                if($("#signup_google").length > 0){
                    $("#signup_google").on("click", () => {
                        google_signup();
                    })
                }
                if($("#signup_facebook").length > 0){
                    $("#signup_facebook").on("click", () => {
                        facebook_signup();
                    })
                }
            }
            if($("#verifying").length > 0){
                const loginId = $("#verifying").attr("loginId");
                isVerified(loginId);
            }
            if($("#logout").length > 0){
                localStorage.removeItem(getAppValues().APP_TOKEN_ALIAS);
                localStorage.removeItem(getAppValues().APP_USER_ID);
                location.href = routeNames.login;
            }
            if($("#login_container").length > 0){
                await loadScript("js/actions/login.js");
                await loadScript("js/actions/login_facebook.js");
                await loadScript("js/actions/login_google.js");

                $("#login_btn").on("click", () => {
                    const password = document.getElementById("password").value,
                    email = document.getElementById("email").value;
                    if(!email || String(email).trim() === "")
                        return $("#email").notify("Email can not be empty");
                    else if(!password || String(password).trim() === "")
                        return $("#password").notify("Password can not be empty");
                    login(email, password);
                })
                $("#login_facebook").on("click", () => {
                    facebook_login();
                })
                $("#login_google").on("click", () => {
                    console.log("clicked")
                    google_login();
                })
            }
            if($("#verifyNotice_container").length > 0){
                await loadScript("js/actions/resend_email.js");
                $("#send_email").on("click", async () => {
                    const loginId = $("#verifyNotice_container").attr("loginId");
                    if(await resendEmail(loginId)){
                        document.getElementById("message").textContent = "Sent!"
                    }
                });
            }
            if($("#simple_dashboard").length > 0){
                await loadScript("js/actions/dashboard_userinfo.js");
                if(!(await isLoggedIn()))
                    location.href = routeNames.login;
                const userInfo = await getUserInfo();
                if(userInfo){
                    const {fullname, email, type} = userInfo;
                    document.getElementById("profile").innerHTML = `<div>
                        <div><strong>${String(type).toUpperCase()} LOGIN</strong></div>
                        <div>${fullname ? fullname + " " + email : email}</div>
                    </div>`
                }
            }
            if($("#reset_container").length > 0){
                await loadScript("js/actions/reset_password.js");
                $("#reset_btn").on("click", () => {
                    resetPassword();
                })
            }
        }catch(error){
            console.log(error);
            $.notify(error.message, "error");
        }
    })();
});
function loadScript (path, callback){
    return new Promise((resolve, reject) => {
        try{
            const head = document.head,
            script = document.createElement("script");
            script.type = "text/javascript";
            script.src = path;
            script.onreadystatechange = callback ? props => callback(null, props) : resolve;
            script.onload = callback ? props => callback(null, props) : resolve;
            head.appendChild(script);
        }catch(error){
            console.error(error);
            if(callback) callback(error);
            else reject(error);
        }
    })
}