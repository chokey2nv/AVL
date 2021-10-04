const nodemailer = require('nodemailer');
const path = require("path");
const handlebars = require("handlebars");
const { template } = require('handlebars');
const emailTemplateDir = path.join(__dirname, "templates");
module.exports = class mailers{
    static _sendMail(transport, mailOptions={}, callback){
        return new Promise((resolve, reject)=>{
            transport.sendMail(mailOptions, (err, result)=>{
                if(err){
                    console.error(err);
                    const error = "Mail-error";
                    if(callback) callback(error);
                    else reject(error);
                }else{
                    if(callback) callback(err, result);
                    else resolve("Sent!!!");
                }
            })
        })
    }
    /**
     * 
     * @param {host : String, post : String, user : String, pass : String} mailConfig 
     * @param {function : Promise} callback 
     */
    static getMailTransporter(mailConfig={}, callback){
        const {host, port, user, pass} = mailConfig;
        //ignore the port set
        const config = {
            host, port : 465, auth : {user, pass}
        };
        const transport = nodemailer.createTransport(config);
        if(callback) callback(transport);
        return transport;
    }

    static async sendMail(email, data, templateName){
        const user = "chokey2nv@yahoo.com",
            yahooMail = {
                host : "smtp.mail.yahoo.com",
                port : 465,
                user,
                pass : "rjkvklnujhthfmru"
            }
            const transporter = mailers.getMailTransporter(yahooMail),
            {template, subject} = await mailers.getMailTemplate(templateName),
            html = template({email, ...data});
        return await mailers._sendMail(transporter, {
            from : user,
            to : email, 
            subject,
            html,
        });
    }
    static getMailTemplate(templateName, callback){
        return new Promise((resolve)=>{ 
            const   layoutsDir = path.join(emailTemplateDir, templateName),
                    partialsDir = path.join(emailTemplateDir, "partials"),
                    fs = require("fs"),
                    partialsTemplates = fs.readdirSync(partialsDir),
                    emailTextTemplates = fs.readdirSync(layoutsDir);
            partialsTemplates.map(template=>{
                const name = String(path.basename(template)).substr(0, template.indexOf(path.extname(template)))
                const partialPath = path.join(partialsDir, template);
                handlebars.registerPartial(name, fs.readFileSync(partialPath).toString());
            });
            let subject;
            emailTextTemplates.map(template=>{
                const name = String(path.basename(template)).substr(0, template.indexOf(path.extname(template)))
                const partialPath = path.join(layoutsDir, template);
                const content = fs.readFileSync(partialPath).toString();
                if(name === "subject") subject = content;
                handlebars.registerPartial(name, content);
            });
            const template = handlebars.compile(
                fs.readFileSync(path.join(emailTemplateDir, "html.hbs")).toString()
            );
            if(callback) callback(null, {template, subject});
            else  resolve({template, subject});
        });
    }
}