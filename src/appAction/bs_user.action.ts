
import { InterfaceAnnotation, Get, Post, Put, Del, Interface, Transaction, level } from "../express/interface"
import bs_userServer from "../appServer/bs_user.server" 
import { DocumentationApi, DocumentationApiInter, documentationType } from '../docApi/doc'
const client =  require("../util/shortMessage")
const emailTo = require('../util/emailTo.js')
const verify = require('../util/verify.js');

@InterfaceAnnotation({ path: "/bs_user" })
@DocumentationApi("用户列表",documentationType.API, "2021/06/02 17:57")
class bs_user extends Interface  {

    @Get( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    get (param: any, user: any, resJson: Function){
        bs_userServer.getById(param.id).then((data)=>{ 
            resJson(data);
        })
    }

    @Post( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    post (param: any, user: any, resJson: Function){
        // 新增用户
        bs_userServer.addParam(param).then((data)=>{
            resJson(data)
        })
    }

    @Put( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    put (param: any, user: any, resJson: Function){
        // 新增用户
        bs_userServer.update(0,'','','','','','',0).then((data)=>{
            resJson(data)
        })
    }

    @Del( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    del (param: any, user: any, resJson: Function){
        // 新增用户
        bs_userServer.del(param.id).then((data)=>{
            resJson(data)
        })
    }

    @Get( "/getByToken" ) 
    getByToken(param: any, user: any, resJson: Function){
        // 从token解析中的id获取用户信息
		bs_userServer.getById(user.id).then((data)=>{
            resJson(data)
        });
	}
	
	// 注册
    @Get( "/registered" )
	registered(param: any, user: any, resJson: Function){
		var username = param.username;
		var password = param.password;
		var name = param.name;
        var iphone = param.iphone;
		bs_userServer.registered( username, password, name, iphone ).then((data)=>{
            resJson({code: 200, data});
        });
	}
	
	// 登录
    @Get( "/login" ) 
	login( param: any, user: any, resJson: Function ){
		//获取get请求中的参数
		var username = param.username;
		var password = param.password;
        var verify_ = param.verify;
        var verifyId = param.verifyId;
        // 首先判断验证码
        if( !verify ){
            return resJson({code: 401, data: "", msg: "请输入验证码" });
        }else{
            if( !verify.exec(verifyId,verify_) ){
                return resJson({code: 401, data: "", msg: "验证码错误" });
            }
        }
		bs_userServer.login(username,password).then((data)=>{
            resJson({code: 200, data: data });
        }).catch((msg)=>{
            resJson({code: 401, msg: msg });
        })
	}

    // 获取验证码
    @Get( "/verify" )
    verify( param: any, user: any, resJson: Function ){
        // 首先获取指定code码
        var codeId = param.codeId;
        // 如果没有唯一码
        if( !codeId ) {
            return resJson({ code: 300, msg: "需要唯一码" });
        }
        // 然后获取code
        var verifys = verify.createCode(codeId)
        resJson({code: 200, data: verifys.data})
    }

    //测试 需要登录才能访问
    // @Transaction
    // @level(1)
    @Get( "/test" , { isLogin: false } )
    test( param: any, user: any, resJson: Function ){
        client.sendRegisterMessage(18321406920,"693882").then((data: any) => {
            console.log(data);
            resJson(data);
        }).catch((d: any)=>{
            console.log(d);
            resJson(d);
        });
        // emailTo("1375580763@qq.com","测试标题","测试内容",null,function(res: any){
        //     // resJson({ msg: "成功登录访问" })
        //     resJson(res);
        // })
    }

}