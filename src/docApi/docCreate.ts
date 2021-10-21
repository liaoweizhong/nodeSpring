import { compileFunction } from "vm";

const fs = require("fs");
var path = require('path');//解析需要遍历的文件夹

const getType = function(it: any){
    return it.Type.indexOf("int") > -1 ? "Number": "String"
}

const getIdType = function(it: any){
    return it.Type.indexOf("int") > -1 ? "Int": "varchar"
}

export function createModel(name: String , data: any, fn: Function){
    
    let filedModel:String = "";
    let it: any;
    for( var i in data ){
        it = data[i];
        if( it.Key === "PRI" ){
            filedModel+= `
    // ${it.Comment}
    public ${it.Field}:Filed = new Filed("${it.Field}", Fieldtype.${getType(it)}, true );
            `
        }else{
            filedModel+= `                
    // ${it.Comment} 
    public ${it.Field}:Filed = new Filed("${it.Field}", Fieldtype.${getType(it)} );
            `
        }
    }


    var model = `
import { Model , Filed , Fieldtype } from '../express/model'

// @ModelAnnotation({ name: "${name}" })
class ${name}Model extends Model {

    public __name:String = "${name}"
    ${filedModel}
}

export default ${name}Model;
    `
 
    // 创建新的文件
    var filePath = path.resolve('./src/appModel');
    fs.writeFile(filePath+'/'+name+'.model.ts',model,'utf8',function(error: any){
        if(error){
            console.log(error);
            fn && fn()
            return false;
        }
        fn && fn()
    })

}

export function createServer(name: String , data: any, fn: Function){
    
    let filedModel:String = "";
    let setFields:String = ""; 
    let setFieldsAddParam:String = "";
    let updateField:String = "";
    let it: any;
    let key:any ;
    for( var i in data ){
        it = data[i];
        if( it.Key === "PRI" ){
            key = it;
            continue;
        } 
        if( filedModel === "" ){
            filedModel+= `${it.Field}: ${getType(it)} `;
        }else{
            filedModel+= `,${it.Field}: ${getType(it)} `;
        }
        setFields+=`            ${it.Field} && ${name}.setFeilds("${it.Field}",${it.Field}) \n`
        updateField+= `            ${it.Field} && ${name}.setFeilds("${it.Field}",${it.Field}) \n`
        setFieldsAddParam+= `            param.${it.Field} && ${name}.setFeilds("${it.Field}",param.${it.Field}) \n`
    }
    
    var model = `
import ${name}Model from "../appModel/${name}.model"
import { getId } from '../express/util'

namespace ${name}Server {

    export function getById (id: String){
        
        return new Promise((suc)=>{
            var ${name} = ${name}Model.get();
            ${name}.setFeilds('${key.Field}',id);
            ${name}.get().then((res)=>{ suc(res); });
        })

    }

    export function addParam ( param: any ){ 
        return new Promise((suc)=>{
            let ${name}: any = ${name}Model.get();
            let id:any = getId("${getIdType(key)}");
            ${name}.setFeilds("${key.Field}",id)
${setFieldsAddParam};
            ${name}.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function add ( ${filedModel} ){ 
        return new Promise((suc)=>{
            let ${name}: any = ${name}Model.get();
            let id:any = getId("${getIdType(key)}");
            ${name}.setFeilds("${key.Field}",id)
${setFields};
            ${name}.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function update ( ${key.Field}: ${getType(key)} ,${filedModel} ){
        return new Promise((suc)=>{
            let ${name} = ${name}Model.get();
            ${name}.setFeilds("${key.Field}",${key.Field});
${updateField}
            ${name}.update().then((res)=>{ suc(res) });
        })
    }

    export function del ( id: String ){
        return new Promise((suc)=>{
            let ${name} = ${name}Model.get();
            ${name}.setFeilds("${key.Field}",${key.Field});
            ${name}.del().then((res)=>{ suc(res) });
        })
    }

}

export default ${name}Server;
    `

    // 创建新的文件
    var filePath = path.resolve('./src/appServer');
    fs.writeFile(filePath+'/'+name+'.server.ts',model,'utf8',function(error: any){
        if(error){
            console.log(error);
            fn && fn()
            return false;
        }
        fn && fn()
    })

}



export function createAction(name: String , data: any, fn: Function){
    
    let filedModel:String = "";
    let filedModelUpdate:String = "";
    let it: any;
    let key = null;
    for( var i in data ){
        it = data[i];
        filedModel != "" && (filedModel += ",");
        filedModelUpdate != "" && (filedModelUpdate += ",");
        if( it.Key === "PRI" ){
            key = it;
            filedModelUpdate += it.Type.indexOf("int") > -1 ? '0' : "''" ;
        }else{
            filedModelUpdate += it.Type.indexOf("int") > -1 ? '0' : "''" ;
            filedModel += it.Type.indexOf("int") > -1 ? '0' : "''" ; 
        }
    }


    var model = `
import { InterfaceAnnotation, Get, Post, Put, Del, Interface } from "../express/interface"
import ${name}Server from "../appServer/${name}.server" 
import { DocumentationApi, DocumentationApiInter, documentationType } from '../docApi/doc'

@InterfaceAnnotation({ path: "/${name}" })
@DocumentationApi("用户列表",documentationType.API, "2021/06/02 17:57")
class ${name} extends Interface  {

    @Get( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    get (param: any, user: any, resJson: Function){
        ${name}Server.getById(param.${key.Field}).then((data)=>{ 
            resJson(data);
        })
    }

    @Post( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    post (param: any, user: any, resJson: Function){
        // 新增用户
        ${name}Server.add(${filedModel}).then((data)=>{
            resJson(data)
        })
    }

    @Put( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    put (param: any, user: any, resJson: Function){
        // 新增用户
        ${name}Server.update(${filedModelUpdate}).then((data)=>{
            resJson(data)
        })
    }

    @Del( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    del (param: any, user: any, resJson: Function){
        // 新增用户
        ${name}Server.del(param.${key.Field}).then((data)=>{
            resJson(data)
        })
    }

}`
    // 创建新的文件
    var filePath = path.resolve('./src/appAction');
    fs.writeFile(filePath+'/'+name+'.action.ts',model,'utf8',function(error: any){
        if(error){
            console.log(error);
            fn && fn()
            return false;
        }
        fn && fn()
    }) 

}