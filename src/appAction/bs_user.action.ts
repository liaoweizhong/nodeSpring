
import { InterfaceAnnotation, Get, Post, Put, Del, Interface } from "../express/interface"
import bs_userServer from "../appServer/bs_user.server" 
import { DocumentationApi, DocumentationApiInter, documentationType } from '../express/docApi/doc'

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
        bs_userServer.add('','','','','','',0).then((data)=>{
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
		bs_userServer.registered( username, password, name ).then((data)=>{
            resJson({code: 200, data});
        });
	}
	
	// 登录
    @Get( "/login" ) 
	login( param: any, user: any, resJson: Function ){
		//获取get请求中的参数
		var username = param.username;
		var password = param.password;
		bs_userServer.login(username,password).then((data)=>{
            resJson({code: 200, data });
        }).catch((msg)=>{
            resJson({code: 401, msg });
        })
	}

    //测试 需要登录才能访问
    @Get( "/test" , { isLogin: true } )
    test( param: any, user: any, resJson: Function ){
        resJson({ msg: "成功登录访问" })
    }

}