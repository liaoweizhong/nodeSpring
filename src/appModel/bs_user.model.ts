
import { Model , Filed , Fieldtype } from '../express/model'
import db from '../database'

// @ModelAnnotation({ name: "bs_user" })
class bs_userModel extends Model {

    public __name:String = "bs_user"
    
    // 
    public id:Filed = new Filed("id", Fieldtype.String, true );
                            
    //  
    public username:Filed = new Filed("username", Fieldtype.String );
                            
    //  
    public password:Filed = new Filed("password", Fieldtype.String );
                            
    //  
    public name:Filed = new Filed("name", Fieldtype.String );
                            
    //  
    public createData:Filed = new Filed("createData", Fieldtype.String );
                            
    //  
    public images:Filed = new Filed("images", Fieldtype.String );
                            
    //  
    public info:Filed = new Filed("info", Fieldtype.String );
                            
    // 账号安全级别 
    public level:Filed = new Filed("level", Fieldtype.Number );

    // 账号安全级别 
    public iphone:Filed = new Filed("iphone", Fieldtype.String );
            
    // 根据用户名密码获取内容
    public getByUsernamePassword (username: String,password: String){
        return new Promise((suc)=>{
            // console.log(`select * from ${this.__name} where username=? and password=?`,[username,password])
            db.operate(db.connection(),`select * from ${this.__name} where username=? and password=?`,[username,password],function(data: any){
                suc(data);
            })
        })
    }
    
}

export default bs_userModel;
    