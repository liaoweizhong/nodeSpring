
import ceshiModel from "../appModel/ceshi.model"
import { getId } from '../express/util'

namespace ceshiServer {

    export function getById (id: String){
        return new Promise((suc)=>{
            var ceshi = ceshiModel.get();
            ceshi.setFeilds('id',id);
            ceshi.get().then((res)=>{ suc(res); });
        })
    }

    export function query (param: any){
        return new Promise((suc)=>{
            var sy_folder = ceshiModel.get();
            sy_folder.query(param).then((res)=>{ suc(res); });
        })
    }

    export function addParam ( param: any ){ 
        return new Promise((suc)=>{
            let ceshi: any = ceshiModel.get();
            let id:any = getId("varchar");
            ceshi.setFeilds("id",id)
            param.name && ceshi.setFeilds("name",param.name) 
;
            ceshi.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function add ( name: String  ){ 
        return new Promise((suc)=>{
            let ceshi: any = ceshiModel.get();
            let id:any = getId("varchar");
            ceshi.setFeilds("id",id)
            name && ceshi.setFeilds("name",name) 
;
            ceshi.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    // 修改
    export function update ( id: String ,name: String  ){
        return new Promise((suc)=>{
            let ceshi = ceshiModel.get();
            ceshi.setFeilds("id",id);
            name && ceshi.setFeilds("name",name) 

            ceshi.update().then((res)=>{ suc(res) });
        })
    }

    // 修改
    export function updateParam ( param: any ){
        return new Promise((suc)=>{
            let ceshi = ceshiModel.get();
            ceshi.setFeilds("id",param.id);
            param.name && ceshi.setFeilds("name",param.name) 

            ceshi.update().then((res)=>{ suc(res) });
        })
    }

    // 删除
    export function del ( id: String ){
        return new Promise((suc)=>{
            let ceshi = ceshiModel.get();
            ceshi.setFeilds("id",id);
            ceshi.del().then((res)=>{ suc(res) });
        })
    }

    // 生成列表用接口
    export function getList (param: any){
        return new Promise((suc)=>{
            let ceshi = ceshiModel.get();
            //第三个参数为查询条件 是直接为where文档 使用时请自己重写条件
            ceshi.getList(param.page,param.count,null).then((res)=>{ suc(res) });
        })
    }

}

export default ceshiServer;
    