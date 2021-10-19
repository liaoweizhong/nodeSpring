
import bs_userModel from "../appModel/bs_user.model"
import { getUuid, getToken } from '../express/util'

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

    export function add ( username: String ,password: String ,name: String ,createData: String ,images: String ,info: String ,level: Number  ){ 
        return new Promise((suc)=>{
            let bs_user: any = bs_userModel.get();
            let id:any = getUuid();
            bs_user.setFeilds("id",id)
            username && bs_user.setFeilds("username",username) 
            password && bs_user.setFeilds("password",password) 
            name && bs_user.setFeilds("name",name) 
            createData && bs_user.setFeilds("createData",createData) 
            images && bs_user.setFeilds("images",images) 
            info && bs_user.setFeilds("info",info) 
            level && bs_user.setFeilds("level",level) 
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
     * 注册功能
     */
    export function registered (username: String, password: String, name: String){
        return new Promise(suc=>{
            let bs_user = bs_userModel.get();
            bs_user.setFeilds("username",username);
            bs_user.setFeilds("password",password);
            bs_user.setFeilds("name",name);
            bs_user.add().then((res: any)=>{ suc(res) });
        })
    }

    /**
     * 登录功能
     * @param username 用户名
     * @param password 密码
     * @param name     用户昵称
     */
    export function login (username: String,password: String){
        return new Promise((suc,err)=>{
            // let bs_user = new bs_userModel().processFeilds();
            let bs_user = <bs_userModel> bs_userModel.get();
            bs_user.getByUsernamePassword(username, password).then((data: any)=>{
                // 将用户信息转化成token保存下来
                if( !data[0] ){
                    return err("密码账号错误！")
                }
                suc(getToken(JSON.stringify(data[0])));
            })
        })
    }

    /**
     * 测试
     */
    export function test (id:String){
        return new Promise((suc)=>{
            let bs_user = <bs_userModel> bs_userModel.get();
            bs_user.setFeilds("id",id)
            bs_user.setNoGet("id",true);
            bs_user.get().then((data: any)=>{
                // 将用户信息转化成token保存下来
                suc(data);
            })
        })
    }

}

export default bs_userServer;
    