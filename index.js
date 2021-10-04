const { verify } = require('./controller/verify');
const router = require('./router');
const { routeNames } = require('./utils/routenames');

const express = require('express'),
exphbs  = require('express-handlebars'),

app = express(),
port = process.env.PORT || 3000;

app.engine('hbs', exphbs({
    extname : "hbs",
}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
app.get(routeNames.home, function (req, res) {
    res.render("home")
});
app.get(routeNames.dashboard, function (req, res) {
    res.render('dashboard', {logout : true});
});
app.get(routeNames.login, (req, res) => {
    res.render("login")
})
app.get(routeNames.logout, (req, res) => {
    res.render("logout")
})
app.get(routeNames.signup, (req, res) => {
    res.render("signup")
})
app.get(routeNames.reset, (req, res) => {
    res.render("reset")
})
app.get(routeNames.verifyNotice, (req, res) => {
    const {query} = req,
    { id : loginId } = query || {};
    res.render("verifyNotice", {logout : true, loginId})
})
app.get(routeNames.verifying, (req, res) => {
    const {query} = req,
    { id : loginId } = query || {};
    verify({loginId}, ({verify, message})=>{
        //
        res.render("verifying", { loginId });
    });
})
app.get(routeNames.verifyNotice, (req, res) => {
    res.render("verifyNotice")
})
app.use(router)
app.listen(port, () => {
    console.log("http://localhost:" + port)
});