
import sy_updatetaskModel from "../appModel/sy_updatetask.model"
import { getId } from '../express/util'

namespace sy_updatetaskServer {

    export function getById (id: String){
        
        return new Promise((suc)=>{
            var sy_updatetask = sy_updatetaskModel.get();
            sy_updatetask.setFeilds('id',id);
            sy_updatetask.get().then((res)=>{ suc(res); });
        })

    }

    export function addParam ( param: any ){ 
        return new Promise((suc)=>{
            let sy_updatetask: any = sy_updatetaskModel.get();
            let id:any = getId("varchar");
            sy_updatetask.setFeilds("id",id)
            param.taskuserid && sy_updatetask.setFeilds("taskuserid",param.taskuserid) 
;
            sy_updatetask.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function add ( taskuserid: String  ){ 
        return new Promise((suc)=>{
            let sy_updatetask: any = sy_updatetaskModel.get();
            let id:any = getId("varchar");
            sy_updatetask.setFeilds("id",id)
            taskuserid && sy_updatetask.setFeilds("taskuserid",taskuserid) 
;
            sy_updatetask.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function update ( id: String ,taskuserid: String  ){
        return new Promise((suc)=>{
            let sy_updatetask = sy_updatetaskModel.get();
            sy_updatetask.setFeilds("id",id);
            taskuserid && sy_updatetask.setFeilds("taskuserid",taskuserid) 

            sy_updatetask.update().then((res)=>{ suc(res) });
        })
    }

    export function del ( id: String ){
        return new Promise((suc)=>{
            let sy_updatetask = sy_updatetaskModel.get();
            sy_updatetask.setFeilds("id",id);
            sy_updatetask.del().then((res)=>{ suc(res) });
        })
    }

}

export default sy_updatetaskServer;
    