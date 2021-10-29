var nodemailer = require("nodemailer");
var settingConfig = require('../../config/email.config.js');//解析参数

var smtp = settingConfig.smtp;
var mailFrom = settingConfig.mailFrom;
var mailPwd = settingConfig.mailPwd;

function emailTo(email,subject,text,html,callback) {
    console.log("mailOptions:")
    var transporter = nodemailer.createTransport({
        host: smtp,
        auth: {
            user: mailFrom,
            pass: mailPwd //授权码,通过QQ获取

        }
    });
    var mailOptions = {
        from: mailFrom, // 发送者
        to: email, // 接受者,可以同时发送多个,以逗号隔开
        subject: subject, // 标题
    };
    console.log("mailOptions:"+JSON.stringify(mailOptions))
    if(text != undefined)
    {
        mailOptions.text =text;// 文本
    }
    if(html != undefined)
    {
        mailOptions.html =html;// html
    }

    var result = {
        httpCode: 200,
        message: '发送成功!',
    }
    try {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                result.httpCode = 500;
                result.message = err;
                callback(result);
                return;
            }
            callback(result);
        });
    } catch (err) {
        result.httpCode = 500;
        result.message = err;
        callback(result);
    }

}

module.exports = emailTo