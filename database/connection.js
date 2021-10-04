const connect = require("camo").connect,
    path = require("path"),
    uri = "nedb://"+path.join(__dirname, "db");
var database;
connect(uri)
    .then(db=>database = db)
    .catch(error=>console.error(error));
