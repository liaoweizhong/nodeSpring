// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");
const config = require("../../config/message.config")

const SmsClient = tencentcloud.sms.v20210111.Client;

const clientConfig = {
  credential: {
    secretId: config.SecretId,
    secretKey: config.SecretKey,
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "sms.tencentcloudapi.com",
    },
  },
};

const client = new SmsClient(clientConfig);
// const params = {
//     "PhoneNumberSet": [
//         "18321406920"
//     ],
//     "SmsSdkAppId": config.SmsSdkAppId,
//     "TemplateId": config.TemplateId,
//     "TemplateParamSet": [
//         "265877",
//         "1"
//     ]
// };
// client.SendSms(params).then(
//   (data) => {
//     console.log(data);
//   },
//   (err) => {
//     console.error("error", err);
//   }
// );

// 发送注册短信
const sendRegisterMessage = function(iphone,code){
    params = {
        "PhoneNumberSet": [
            iphone+""
        ],
        "SignName": config.SignName,
        "SmsSdkAppId": config.SmsSdkAppId,
        "TemplateId": config.TemplateId,
        "TemplateParamSet": [
            code,
            "1"
        ]
    };
    return new Promise((suc, err)=>{
        client.SendSms(params).then((data) => {
            suc(data);
        },(er) => {
            err(er);
        });
    })
}

module.exports = { sendRegisterMessage };