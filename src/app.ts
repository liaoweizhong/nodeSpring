
import { expressAnnotation , expressServer } from "./express/express"
import { createDoc } from "./express/docApi/doc"

@expressAnnotation
class server extends expressServer {

    // 服务端口
    public port: String = "2222"

    public listenBefore (app: any){
        
        // 创建api文档页面
        // 记得在开发者环境中注释掉
        createDoc( app )

    }

}

// 加载server层
require('./appServer'); 

// 加载action层
require('./appAction'); 