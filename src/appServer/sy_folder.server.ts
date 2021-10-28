
import sy_folderModel from "../appModel/sy_folder.model"
import { getId } from '../express/util'

namespace sy_folderServer {

    export function getById (id: String){
        
        return new Promise((suc)=>{
            var sy_folder = sy_folderModel.get();
            sy_folder.setFeilds('id',id);
            sy_folder.get().then((res)=>{ suc(res); });
        })

    }

    export function query (param: any){
        return new Promise((suc)=>{
            var sy_folder = sy_folderModel.get();
            sy_folder.query(param).then((res)=>{ suc(res); });
        })
    }

    export function addParam ( param: any ){ 
        return new Promise((suc)=>{
            let sy_folder: any = sy_folderModel.get();
            let id:any = getId("varchar");
            sy_folder.setFeilds("id",id)
            param.name && sy_folder.setFeilds("name",param.name) 
            param.parent && sy_folder.setFeilds("parent",param.parent) 
            param.createdata && sy_folder.setFeilds("createdata",param.createdata) 
            param.createuser && sy_folder.setFeilds("createuser",param.createuser) 
;
            sy_folder.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function add ( name: String ,parent: String ,createdata: String ,createuser: String  ){ 
        return new Promise((suc)=>{
            let sy_folder: any = sy_folderModel.get();
            let id:any = getId("varchar");
            sy_folder.setFeilds("id",id)
            name && sy_folder.setFeilds("name",name) 
            parent && sy_folder.setFeilds("parent",parent) 
            createdata && sy_folder.setFeilds("createdata",createdata)
            createuser && sy_folder.setFeilds("createuser",createuser) 
;
            sy_folder.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function update ( id: String ,name: String ,parent: String ,createdata: String ,createuser: String  ){
        return new Promise((suc)=>{
            let sy_folder = sy_folderModel.get();
            sy_folder.setFeilds("id",id);
            name && sy_folder.setFeilds("name",name) 
            parent && sy_folder.setFeilds("parent",parent) 
            createdata && sy_folder.setFeilds("createdata",createdata) 
            createuser && sy_folder.setFeilds("createuser",createuser) 

            sy_folder.update().then((res)=>{ suc(res) });
        })
    }

    export function del ( id: String ){
        return new Promise((suc)=>{
            let sy_folder = sy_folderModel.get();
            sy_folder.setFeilds("id",id);
            sy_folder.del().then((res)=>{ suc(res) });
        })
    }

}

export default sy_folderServer;
    