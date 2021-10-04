const Document = require("camo").Document;
module.exports = class Login extends Document {
    constructor(){
        super();
        this.email = String;
        this.password = String;
        this.verified = Boolean;
        this.userId = String;
        this.fullname = String;
        this.type = String;
        this.token = String;
    }
}