let apisArray: Array<Object> = [];
import db from '../../database'
import { createModel, createServer, createAction } from './docCreate'
const databaseConfig =  require('../../../database.config');


/**
 * 构建docApi测试页面
 * @param app 
 */
export function createDoc (app: any){

    app.get("/doc",function(req: any,res: any){
        var options = {
            root: __dirname,    
            headers: {
              "Content-Type": "text/html"
            }
        }
        res.sendFile('doc.html',options, function(error: any){
            if(error){
                // console.log('Sent failed:', 'index.html' + error);
            }else{
                // console.log('Sent sucess:', 'index.html');
            }
        });
    });

    app.get("/index",function(req: any,res: any){
        var options = {
            root: __dirname,    
            headers: {
              "Content-Type": "text/html"
            }
        }
        res.sendFile('index.html',options, function(error: any){
            if(error){
                // console.log('Sent failed:', 'index.html' + error);
            }else{
                // console.log('Sent sucess:', 'index.html');
            }
        });
    });

    app.get("/doc/getTable",function(req: any,res: any){
         // 生成获取sql
        var connect = db.connection();
        var query = req.query;
        var sql = `-- 查询数据库表名
        select table_name,table_comment from information_schema.tables where table_schema='${databaseConfig.database}'`;
        try {
            db.operate(connect,sql,[],function(result: any){
                res.json({code: 200, data: result})
            },(err: any)=>{
                res.json({code: 500, data: err}) 
            });
        }catch (e){
            res.json({code: 500, data: e}) ;
        }
    })

    app.post("/doc/create",function(req: any,res: any){
        // 生成获取sql
        var connect = db.connection();
        var query = req.body;
        var name = query.name;
        var model = query.model;
        var server = query.server;
        var action = query.action;
        var sucIndex = 0;
        // res.json({});
        if( model === true || server === true || action === true ){
            var sql = `-- 查询表的信息 和 字段的信息
            show full columns from ${databaseConfig.database}.${name};`;
            console.log(action);
            db.operate(connect,sql,[],function(result: any){
                if( model ){
                    createModel( name , result, function(){
                        sucIndex++;
                        if( sucIndex === 3 ){
                            res.json({ code: 200 })        
                        }        
                    });
                }else{
                    sucIndex++;
                }
                if( server === true ){
                    createServer( name , result, function(){
                        sucIndex++; 
                        if( sucIndex === 3 ){
                            res.json({ code: 200 })        
                        }        
                    })
                }else{
                    sucIndex++;
                }
                console.log(action);
                if( action === true ){
                    createAction( name , result , function(){
                        sucIndex++;
                        if( sucIndex === 3 ){
                            res.json({ code: 200 })        
                        }        
                    } )
                }else{
                    sucIndex++;
                }
                if( sucIndex === 3 ){
                    res.json({ code: 200 })
                }
            });
        }else{
            res.json({ code: 200 })
        }
    })

    console.log("---------------------------")
    console.log("成功开启服务器：")
    console.log("输入/doc，进入数据库管理界面");
    console.log("---------------------------")

}

/** 文档注解的类型参数
 **/
export enum documentationType {  
    API= "api"
}

/**
 * 文档标记注释
 * @param type 
 * @param dataTime 
 * @returns 
 */
export function DocumentationApi(message: String ,type: documentationType, dataTime: String) {
    return function(classObject: any){
        // 获取这个接口对象的创建接口
        apisArray.concat(classObject.interfacesJson)
    }
}

export function DocumentationApiInter(message: String ,type: documentationType, dataTime: String) {
    return function(prototype: any ,name: String, params: Object){

    }
}

// export function DocumentationApiInter ( url: String ){
//     return function( obj: any, name: String, Param: any ){
//         if( !obj.constructor.interfacesJson ){
//             obj.constructor.interfacesJson = [];
//         };
//         obj.constructor.interfacesJson.push({
//             url, fn: Param.value, type: "get"
//         });
//     }
// }