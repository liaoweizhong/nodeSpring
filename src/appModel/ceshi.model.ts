
import { Model , Filed , Fieldtype } from '../express/model'

// @ModelAnnotation({ name: "ceshi" })
class ceshiModel extends Model {

    public __name:String = "ceshi"
    
    //  
    public id:Filed = new Filed("id", Fieldtype.String, true );
                            
    //  
    public name:Filed = new Filed("name", Fieldtype.String );
            
}

export default ceshiModel;
    