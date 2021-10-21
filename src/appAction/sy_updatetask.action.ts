
import { InterfaceAnnotation, Get, Post, Put, Del, Interface } from "../express/interface"
import sy_updatetaskServer from "../appServer/sy_updatetask.server" 
import { DocumentationApi, DocumentationApiInter, documentationType } from '../docApi/doc'

@InterfaceAnnotation({ path: "/sy_updatetask" })
@DocumentationApi("用户列表",documentationType.API, "2021/06/02 17:57")
class sy_updatetask extends Interface  {

    @Get( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    get (param: any, user: any, resJson: Function){
        sy_updatetaskServer.getById(param.id).then((data)=>{ 
            resJson(data);
        })
    }

    @Post( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    post (param: any, user: any, resJson: Function){
        // 新增用户
        sy_updatetaskServer.add('').then((data)=>{
            resJson(data)
        })
    }

    @Put( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    put (param: any, user: any, resJson: Function){
        // 新增用户
        sy_updatetaskServer.update('','').then((data)=>{
            resJson(data)
        })
    }

    @Del( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    del (param: any, user: any, resJson: Function){
        // 新增用户
        sy_updatetaskServer.del(param.id).then((data)=>{
            resJson(data)
        })
    }

}