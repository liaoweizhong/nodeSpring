
import bs_updateFileModel from "../appModel/bs_updateFile.model"
import { getUuid } from '../express/util'

namespace bs_updateFileServer {

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
    