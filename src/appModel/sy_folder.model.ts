
import { Model , Filed , Fieldtype } from '../express/model'

// @ModelAnnotation({ name: "sy_folder" })
class sy_folderModel extends Model {

    public __name:String = "sy_folder"
    
    // 
    public id:Filed = new Filed("id", Fieldtype.String, true );
                            
    // 文件夹名称 
    public name:Filed = new Filed("name", Fieldtype.String );
                            
    // 父级文件夹名称 
    public parent:Filed = new Filed("parent", Fieldtype.String );
                            
    //  
    public createdata:Filed = new Filed("createdata", Fieldtype.String );
                            
    // 创建人 
    public createuser:Filed = new Filed("createuser", Fieldtype.String );
            
}

export default sy_folderModel;
    