
import bs_updateFileModel from "../appModel/bs_updateFile.model"
import bs_user from "../appServer/bs_user.server"
import { getUuid } from '../express/util'


import db from '../database'
const updatefile = require('../util/updateFile.js')

namespace bs_updateFileServer {

    // 上传文件
    export function updateVideo (user_id: String ,name: String,id: String, base64: String, length: Number, index: Number){
        return new Promise((suc)=>{
            // 判断用户等级
            var connect = db.connection();
            db.operate(connect,
                "select level from bs_user where id = ?",[user_id],function(result: any){
                // 判断级别
                if( result[0].level >= 4 ) {
                    console.log("收到的base64","base64")
                    // 获取收到的
                    updatefile.addFile({
                        name, id, base64, length, index
                    }).then((data: any)=>{
                        suc({is: true , id: data.id});
                    })
                }else{
                    suc({code: 302, msg: "用户没有权限"});
                }
            });
        })
    }

    // 合成文件
    export function mergeVideo (user_id: String, id: String, type: String ){
        return new Promise((suc)=>{
            updatefile.merge(id).then((data: any)=>{
                var connect = db.connection();
                // 添加到数据库记录
                db.operate(connect,
                    "INSERT INTO bs_updateFile (path, type, master) "+
                    "VALUES (?, ?, ?)",[data.path, type, user_id],function(result: any){
                    // 返回数据
                    suc({data: data , id: result.insertId})
                });
            });
        })
    }

    export function getById (id: String){
        
        return new Promise((suc)=>{
            var bs_updateFile = bs_updateFileModel.get();
            bs_updateFile.setFeilds('id',id);
            bs_updateFile.get().then((res)=>{ suc(res); });
        })

    }

    export function addParam ( param: any ){ 
        return new Promise((suc)=>{
            let bs_updateFile: any = bs_updateFileModel.get();
            let id:any = getUuid();
            bs_updateFile.setFeilds("id",id)
            param.path && bs_updateFile.setFeilds("path",param.path) 
            param.type && bs_updateFile.setFeilds("type",param.type) 
            param.useId && bs_updateFile.setFeilds("useId",param.useId) 
            param.master && bs_updateFile.setFeilds("master",param.master) 
;
            bs_updateFile.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function add ( path: String ,type: Number ,useId: Number ,master: Number  ){ 
        return new Promise((suc)=>{
            let bs_updateFile: any = bs_updateFileModel.get();
            let id:any = getUuid();
            bs_updateFile.setFeilds("id",id)
            path && bs_updateFile.setFeilds("path",path) 
            type && bs_updateFile.setFeilds("type",type) 
            useId && bs_updateFile.setFeilds("useId",useId) 
            master && bs_updateFile.setFeilds("master",master) 
;
            bs_updateFile.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function update ( id: Number ,path: String ,type: Number ,useId: Number ,master: Number  ){
        return new Promise((suc)=>{
            let bs_updateFile = bs_updateFileModel.get();
            bs_updateFile.setFeilds("id",id);
            path && bs_updateFile.setFeilds("path",path) 
            type && bs_updateFile.setFeilds("type",type) 
            useId && bs_updateFile.setFeilds("useId",useId) 
            master && bs_updateFile.setFeilds("master",master) 

            bs_updateFile.update().then((res)=>{ suc(res) });
        })
    }

    export function del ( id: String ){
        return new Promise((suc)=>{
            let bs_updateFile = bs_updateFileModel.get();
            bs_updateFile.setFeilds("id",id);
            bs_updateFile.del().then((res)=>{ suc(res) });
        })
    }

}

export default bs_updateFileServer;
    