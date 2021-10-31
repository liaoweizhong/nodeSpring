
import { getAppServerArray } from "./express"
import { setTokenByHeader } from './util'
const url  = require('url');
const express = require('express'); //1


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

// 测试用的
// export function Transaction(obj: any, name: String, Param: any){
//     // console.log("this:----" , this);
//     console.log("obj:-----", JSON.stringify(obj));
//     console.log("name:-----", name);
//     console.log("param:-----", Param);
//     let values = Param.value;
//     Param.value = function (){
//         console.log(111111);
//         values();
//     }
// }


export function Get ( url: String , param: any = {} ){
    return function( obj: any, name: String, Param: any ){
        if( !obj.constructor.interfacesJson ){
            obj.constructor.interfacesJson = [];
        };
        obj.constructor.interfacesJson.push({
            url, fn: Param.value,name: name, type: "get" , param
        });
    }
}
export function Post ( url: String , param: any = {} ){
    return function( obj: any, name: String, Param: any ){
        if( !obj.constructor.interfacesJson ){
            obj.constructor.interfacesJson = [];
        };
        obj.constructor.interfacesJson.push({
            url, fn: Param.value,name: name, type: "post", param
        });
    }
}

export function Put ( url: String, param: any = {}){
    return function( obj: any, name: String, Param: any ){
        if( !obj.constructor.interfacesJson ){
            obj.constructor.interfacesJson = [];
        };
        obj.constructor.interfacesJson.push({
            url, fn: Param.value, name: name, type: "put", param
        });
    }
}
export function Del ( url: String, param: any = {} ){
    return function( obj: any, name: String, Param: any ){
        if( !obj.constructor.interfacesJson ){
            obj.constructor.interfacesJson = [];
        };
        obj.constructor.interfacesJson.push({
            url, fn: Param.value,name: name, type: "del", param
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
            })
        }else if( json.type == "post" ){
            // 创建post请求
            app.newExpress.post(this.path+json.url,express.json(),(req: any,res: any)=>{
                // 获取前段传入的参数
                let param:any = req.body;
                // 获取前端请求头发送过来的sessiontoken 
                this.handlerFn(json,param,setTokenByHeader(req.headers),res);
            })
        }else if( json.type == "put" ){
            // 创建post请求
            app.newExpress.put(this.path+json.url,(req: any,res: any)=>{
                // 获取修改id
                var id = req.body.id;
                // console.log("req.params.id:", req.params.id)
                // console.log("req.query:", JSON.stringify(req.query))
                // console.log("req.body:", JSON.stringify(req.body))
                // 获取前段传入的参数
                let param:any = req.body;
                param.id = id;
                this.handlerFn(json,param,setTokenByHeader(req.headers),res);
            })
        }else if( json.type == "del" ){
            // 创建post请求
            app.newExpress.delete(this.path+json.url,(req: any,res: any)=>{
                // 获取修改id
                var id = req.body.id;
                // 获取前段传入的参数
                let param:any = req.body;
                param.id = id;
                // 获取前端请求头发送过来的sessiontoken 
                this.handlerFn(json,param,setTokenByHeader(req.headers),res);
            })
        }
    }

    handlerFn (json: any,param: any,user: any,res: any){
        var fn = eval("this."+json.name) || json.fn;
        var config = json.param;
        try {
            // 执行操作之前的判断
            if( config.isLogin ){
                if( !user.id )
                return res.json({code: 404, msg: "请先登录"});
            }
            // 判断fn是否存在before事件
            for( var i in fn.before ){
                var ref = fn.before[i](param,user);
                if( ref && ref.state === 0 ){
                    return res.json(ref.msg || "没有访问权限")
                }
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

// 接口权限限制
export function level(lev: number){
    return function(object: any, name: String, Param: any){
        let oldValue = Param.value;
        Param.value = function(param:any, user: any, resolve: any){
            // 判断一下当前解析的token
            if( !user.level || user.level < lev ){
                return resolve({ code: 300, msg: "你的级别不够" })
            }
            oldValue.apply(this, arguments)
        }
    }
}

// 是否回滚  这个弃用 目前还没想好怎么设计
export function Transaction (){
    return function(object: any, name: String, Param: any){
        let oldValue = Param.value;
        Param.value = function(param:any, user: any, resolve: any){
            // 判断一下当前解析的token
            oldValue.apply(this, arguments)
        }
    }
}

