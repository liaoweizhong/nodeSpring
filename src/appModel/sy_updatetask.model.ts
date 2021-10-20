
import { Model , Filed , Fieldtype } from '../express/model'

// @ModelAnnotation({ name: "sy_updatetask" })
class sy_updatetaskModel extends Model {

    public __name:String = "sy_updatetask"
    
    //  任务id
    public id:Filed = new Filed("id", Fieldtype.String, true );
                            
    // 任务人员id 
    public taskuserid:Filed = new Filed("taskuserid", Fieldtype.String );
            
}

export default sy_updatetaskModel;
    