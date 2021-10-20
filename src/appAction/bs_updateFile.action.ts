
import { InterfaceAnnotation, Get, Post, Put, Del, Interface } from "../express/interface"
import bs_updateFileServer from "../appServer/bs_updateFile.server" 
import { DocumentationApi, DocumentationApiInter, documentationType } from '../express/docApi/doc'

@InterfaceAnnotation({ path: "/bs_updateFile" })
@DocumentationApi("用户列表",documentationType.API, "2021/06/02 17:57")
class bs_updateFile extends Interface  {

    @Get( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    get (param: any, user: any, resJson: Function){
        bs_updateFileServer.getById(param.id).then((data)=>{ 
            resJson(data);
        })
    }

    @Post( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    post (param: any, user: any, resJson: Function){
        // 新增用户
        bs_updateFileServer.add('',0,0,0).then((data)=>{
            resJson(data)
        })
    }

    @Put( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    put (param: any, user: any, resJson: Function){
        // 新增用户
        bs_updateFileServer.update(0,'',0,0,0).then((data)=>{
            resJson(data)
        })
    }

    @Del( "" )
    // @DocumentationApiInter("根据用户id获取用户数据",documentationType.API, "2021/06/02 17:57")
    del (param: any, user: any, resJson: Function){
        // 新增用户
        bs_updateFileServer.del(param.id).then((data)=>{
            resJson(data)
        })
    }

    // 上传文件
    @Post( "/updateVideo" , { isLogin: true } )
    updateVideo(param: any, user: any, retJson: Function){
        console.log("收到的user",user)
        bs_updateFileServer.updateVideo( user.id, param.name, param.id,  param.base64, param.length, param.index).then((data:any)=>{
            retJson(data)
        })
    }

    // 合并文件
    @Get( "/mergeVideo" , { isLogin: true } )
    mergeVideo(param: any, user: any, retJson: Function){
        bs_updateFileServer.mergeVideo(user.id, param.id, param.type).then((data:any)=>{
            retJson({code: 200, data})
        })
    }

}