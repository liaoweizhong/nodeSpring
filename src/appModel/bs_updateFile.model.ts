
import { Model , Filed , Fieldtype } from '../express/model'

// @ModelAnnotation({ name: "bs_updateFile" })
class bs_updateFileModel extends Model {

    public __name:String = "bs_updateFile"
    
    // 
    public id:Filed = new Filed("id", Fieldtype.Number, true );
                            
    //  
    public path:Filed = new Filed("path", Fieldtype.String );
                            
    //  
    public type:Filed = new Filed("type", Fieldtype.Number );
                            
    // 使用者id 
    public useId:Filed = new Filed("useId", Fieldtype.Number );
                            
    // 上传者 
    public master:Filed = new Filed("master", Fieldtype.Number );
            
}

export default bs_updateFileModel;
    