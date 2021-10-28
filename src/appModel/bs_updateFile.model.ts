
import { Model , Filed , Fieldtype } from '../express/model'

// @ModelAnnotation({ name: "bs_updateFile" })
class bs_updateFileModel extends Model {

    public __name:String = "bs_updateFile"
    
    // 
    public id:Filed = new Filed("id", Fieldtype.Number, true );
                            
    //  
    public path:Filed = new Filed("path", Fieldtype.String );
                            
    //  
    public type:Filed = new Filed("type", Fieldtype.String );
                            
    // 使用者id 
    public useId:Filed = new Filed("useId", Fieldtype.String );
                            
    // 上传者 
    public master:Filed = new Filed("master", Fieldtype.String );

    public folder:Filed = new Filed("folder", Fieldtype.String );

    public name:Filed = new Filed("name", Fieldtype.String );
            
}

export default bs_updateFileModel;
    