
import { InterfaceAnnotation, Get, Post, Put, Del, Interface } from "../express/interface"
import ceshiServer from "../appServer/ceshi.server" 
import { DocumentationApi, DocumentationApiInter, documentationType } from '../docApi/doc'

@InterfaceAnnotation({ path: "/ceshi" })
@DocumentationApi("用户列表",documentationType.API, "2021/06/02 17:57")
class ceshi extends Interface  {

    @Get( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    get (param: any, user: any, resJson: Function){
        ceshiServer.getById(param.id).then((data)=>{ 
            resJson(data);
        })
    }

    @Post( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    post (param: any, user: any, resJson: Function){
        // 新增用户
        ceshiServer.addParam(param).then((data)=>{
            resJson(data)
        })
    }

    @Put( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    put (param: any, user: any, resJson: Function){
        // 新增用户
        ceshiServer.updateParam(param).then((data)=>{
            resJson(data)
        })
    }

    @Del( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    del (param: any, user: any, resJson: Function){
        // 新增用户
        ceshiServer.del(param.id).then((data)=>{
            resJson(data)
        })
    }

    // 获取列表接口 （where参数最好是重写）
    @Get( "/list" )
    list (param: any, user: any, resJson: Function){
        // 新增用户
        ceshiServer.getList(param).then((data)=>{
            resJson(data)
        })
    }
}