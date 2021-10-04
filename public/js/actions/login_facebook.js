async function facebook_login() {
    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
            //  console.log(response) //{name: 'Agu Chijioke', id: '10225319692368239'}
           const {name : fullname, id : userId} = response || {},
           email = userId;
           post("/api/login_facebook", {
                email, fullname, userId
            }, {}, (error, {login_facebook, result, message})=>{
                if(error) return $.notify(error.message, "error");
                if(!login_facebook) return $.notify(message, "error");
                const {token, userId} = result || {};
                localStorage.setItem(getAppValues().APP_TOKEN_ALIAS, token);
                localStorage.setItem(getAppValues().APP_USER_ID, userId);
                location.href = routeNames.dashboard;
            })
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    });
}