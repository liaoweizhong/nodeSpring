
import { getAppServerArray } from "./express"
import { setTokenByHeader } from './util'
const url  = require('url');

const appInterfaceArray: Array<Object> = [];

// 接口声明
export function InterfaceAnnotation ( param: any ) {
    
    var path = param.path;

    return function(AppInterface: any){
        
        let appInterface = new AppInterface()

        // 将回调的接口函数赋值
        appInterface.interfacesJson = AppInterface.interfacesJson;

        AppInterface.interfacesJson = [];

        appInterface.path = path;

        // 初始化接口
        appInterface.initInterfaces();

        appInterfaceArray.push(appInterface);

    }

}

export function Get ( url: String , param: any = {} ){
    return function( obj: any, name: String, Param: any ){
        if( !obj.constructor.interfacesJson ){
            obj.constructor.interfacesJson = [];
        };
        obj.constructor.interfacesJson.push({
            url, fn: Param.value, type: "get" , param
        });
    }
}
export function Post ( url: String , param: any = {} ){
    return function( obj: any, name: String, Param: any ){
        if( !obj.constructor.interfacesJson ){
            obj.constructor.interfacesJson = [];
        };
        obj.constructor.interfacesJson.push({
            url, fn: Param.value, type: "post", param
        });
    }
}
export function Put ( url: String, param: any = {}){
    return function( obj: any, name: String, Param: any ){
        if( !obj.constructor.interfacesJson ){
            obj.constructor.interfacesJson = [];
        };
        obj.constructor.interfacesJson.push({
            url, fn: Param.value, type: "put", param
        });
    }
}
export function Del ( url: String, param: any = {} ){
    return function( obj: any, name: String, Param: any ){
        if( !obj.constructor.interfacesJson ){
            obj.constructor.interfacesJson = [];
        };
        obj.constructor.interfacesJson.push({
            url, fn: Param.value, type: "del", param
        });
    }
}

export class Interface {

    public interfacesJson: Array<any> = [];

    public path: String = "";

    constructor (){

    }

    initInterfaces (){

        var json = this.interfacesJson

        for( var i in json ){

            this.createApp(json[i]);

        }

    }

    createApp ( json: any ){
        // 实现功能
        let app = getAppServerArray();

        if( json.type == "get" || !json.type ){
            // 创建get请求
            app.newExpress.get(this.path+json.url,(req: any,res: any)=>{
                // 获取前段传入的参数
                let requset_url:String = req.url;
                let param: any = url.parse(requset_url,true).query;
                // 获取前端请求头发送过来的sessiontoken 
                this.handlerFn(json,param,setTokenByHeader(req.headers),res);
                // try {
                //     json.fn(param,setTokenByHeader(req.headers),(retData: Object)=>{
                //         res.json(retData)
                //     });
                // }catch (e){
                //     res.json({code: 500, msg: e});
                // }
            })
        }else if( json.type == "post" ){
            // 创建post请求
            app.newExpress.post(this.path+json.url,(req: any,res: any)=>{
                // 获取前段传入的参数
                let param:any = req.body;
                // 获取前端请求头发送过来的sessiontoken 
                this.handlerFn(json,param,setTokenByHeader(req.headers),res);
            })
        }else if( json.type == "put" ){
            // 创建post请求
            app.newExpress.put(this.path+json.url,(req: any,res: any)=>{
                // 获取修改id
                var id = req.params.id;
                // 获取前段传入的参数
                let param:any = req.query;
                param.id = id;
                this.handlerFn(json,param,setTokenByHeader(req.headers),res);
            })
        }else if( json.type == "del" ){
            // 创建post请求
            app.newExpress.delete(this.path+json.url,(req: any,res: any)=>{
                // 获取修改id
                var id = req.params.id;
                // 获取前段传入的参数
                let param:any = req.query;
                param.id = id;
                // 获取前端请求头发送过来的sessiontoken 
                this.handlerFn(json,param,setTokenByHeader(req.headers),res);
            })
        }
    }

    handlerFn (json: any,param: any,user: any,res: any){
        // console.log(json);
        // console.log(user);
        var fn = json.fn;
        var config = json.param;
        try {
            // 执行操作之前的判断
            if( config.isLogin ){
                if( !user.id ) 
                return res.json({code: 404, msg: "请先登录"});
            }
            // 获取前端请求头发送过来的sessiontoken 
            fn(param,user,(retData: Object)=>{
                return res.json(retData)
            });
        }catch (e){
            return res.json({code: 500, msg: e});
        }
    }

}

