
import { InterfaceAnnotation, Get, Post, Put, Del, Interface } from "../express/interface"
import sy_folderServer from "../appServer/sy_folder.server" 
import { DocumentationApi, DocumentationApiInter, documentationType } from '../docApi/doc'

@InterfaceAnnotation({ path: "/sy_folder" })
@DocumentationApi("用户列表",documentationType.API, "2021/06/02 17:57")
class sy_folder extends Interface  {

    @Get( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    get (param: any, user: any, resJson: Function){
        sy_folderServer.getById(param.id).then((data)=>{ 
            resJson(data);
        })
    }

    @Post( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    post (param: any, user: any, resJson: Function){
        // 新增用户
        param.createuser = user.id;
        sy_folderServer.addParam(param).then((data)=>{
            resJson(data)
        })
    }

    @Put( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    put (param: any, user: any, resJson: Function){
        // 新增用户
        sy_folderServer.update('','','','','').then((data)=>{
            resJson(data)
        })
    }

    @Del( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    del (param: any, user: any, resJson: Function){
        // 新增用户
        sy_folderServer.del(param.id).then((data)=>{
            resJson(data)
        })
    }

    // 根据用户查询用户拥有的文件
    @Get( "/getByUserAndFolder", { isLogin: true } )
    getByUser (param: any, user: any, resJson: Function){
        sy_folderServer.query({createuser:user.id, parent: param.folder}).then((data)=>{ 
            resJson(data);
        })
    }

}