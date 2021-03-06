
import bs_userModel from "../appModel/bs_user.model"
import { getUuid, getToken } from '../express/util'
import cache from '../util/cache'

namespace bs_userServer {

    export function getById (id: String){
        
        return new Promise((suc)=>{
            var bs_user = bs_userModel.get();
            bs_user.setFeilds('id',id);
            bs_user.get().then((res: any)=>{ 
                res.data.length != 0 ? res.data = res.data[0] : res.data = {};
                suc( res ); 
            });
        })

    }

    export function addParam ( param: any ){ 
        return new Promise((suc)=>{
            let ceshi: any = bs_userModel.get();
            let id:any = getUuid();
            ceshi.setFeilds("id",id)
            param.name && ceshi.setFeilds("name",param.name) 
;
            ceshi.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function add ( param: any ){ 
        return new Promise((suc)=>{
            let bs_user: any = bs_userModel.get();
            let id:any = getUuid();
            bs_user.setFeilds("id",id)
            // let username: String ,password: String ,name: String ,createData: String ,images: String ,info: String ,level: Number;
            param.username && bs_user.setFeilds("username",param.username) 
            param.password && bs_user.setFeilds("password",param.password) 
            param.name && bs_user.setFeilds("name",param.name) 
            param.createData && bs_user.setFeilds("createData",param.createData) 
            param.images && bs_user.setFeilds("images",param.images) 
            param.info && bs_user.setFeilds("info",param.info) 
            param.level && bs_user.setFeilds("level",param.level) 
            param.iphone && bs_user.setFeilds("iphone",param.iphone) 
;
            bs_user.add().then((res: any)=>{ res.insertId = id; suc(res) });
        })
    }

    export function update ( id: Number ,username: String ,password: String ,name: String ,createData: String ,images: String ,info: String ,level: Number  ){
        return new Promise((suc)=>{
            let bs_user = bs_userModel.get();
            bs_user.setFeilds("id",id);
            username && bs_user.setFeilds("username",username) 
            password && bs_user.setFeilds("password",password) 
            name && bs_user.setFeilds("name",name) 
            createData && bs_user.setFeilds("createData",createData) 
            images && bs_user.setFeilds("images",images) 
            info && bs_user.setFeilds("info",info) 
            level && bs_user.setFeilds("level",level) 

            bs_user.update().then((res: any)=>{ suc(res) });
        })
    }

    export function del ( id: String ){
        return new Promise((suc)=>{
            let bs_user = bs_userModel.get();
            bs_user.setFeilds("id",id);
            bs_user.del().then((res: any)=>{ suc(res) });
        })
    }

    /**
     * ????????????
     */
    export function registered (username: String, password: String, name: String, iphone: String){
        return new Promise(suc=>{
            let bs_user = bs_userModel.get();
            bs_user.setFeilds("username",username);
            bs_user.setFeilds("password",password);
            bs_user.setFeilds("name",name);
            bs_user.setFeilds("iphone",iphone);
            bs_user.add().then((res: any)=>{ suc(res) });
        })
    }

    /**
     * ????????????
     * @param username ?????????
     * @param password ??????
     * @param name     ????????????
     */
    export function login (username: String,password: String){
        return new Promise((suc,err)=>{
            // let bs_user = new bs_userModel().processFeilds();
            let bs_user = <bs_userModel> bs_userModel.get();
            bs_user.getByUsernamePassword(username, password).then((data: any)=>{
                // ????????????????????????token????????????
                if( !data[0] ){
                    return err("?????????????????????")
                }
                // ????????????????????????????????????
                cache.setUserLevel(data[0].id,data[0].level);
                suc(getToken(JSON.stringify(data[0])));
            })
        })
    }

    /**
     * ????????????
     * @param id 
     * @returns 
     */
    export function getLevel (id: String){
        return new Promise((suc,err)=>{
            getById(id).then((data: any)=>{
                suc( data.level );
            })
        })
    }

    /**
     * ??????
     */
    export function test (id:String){
        return new Promise((suc)=>{
            let bs_user = <bs_userModel> bs_userModel.get();
            bs_user.setFeilds("id",id)
            bs_user.setNoGet("id",true);
            bs_user.get().then((data: any)=>{
                // ????????????????????????token????????????
                suc(data);
            })
        })
    }

}

export default bs_userServer;
    