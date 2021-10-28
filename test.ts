const express = require('express'); //1
// 引入body-parser模块
const bodyParser = require('body-parser');

function Get ( url: String , param: any = {} ){
    return function( obj: any, name: String, Param: any ){
        // if( !obj.constructor.interfacesJson ){
        //     obj.constructor.interfacesJson = [];
        // };
        // obj.constructor.interfacesJson.push({
        //     url, fn: Param.value, type: "get" , param
        // });
        obj.testX = "123456"
        console.log("name:",name);
        console.log("Param:",Param);
        var oldValue = Param.value;
        Param.value = function(){
            console.log("asdasd");
            oldValue.apply(this,arguments);
        }
    }
}


// 接口声明
function InterfaceAnnotation ( param: any ) {
    
    return function(AppInterface: any){

        console.log("AppInterface:" + AppInterface);
        console.log("AppInterface.prototype:" + JSON.stringify(AppInterface.prototype));

        let a = new AppInterface();

        console.log("new AppInterface:" + a);
        console.log("testX:" + a.testX);

        a.dsd();
    }

}

@InterfaceAnnotation({ path: "" })
class bs_user {

    @Get("",{})
    dsd(){
        console.log("asdasd1111")
    }

}


// // 创建一个express对象
// let app = express();
// // 支持跨域 //req, res, next
// app.all('*', function ( req: any , res: any, next: any ) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     res.header('Access-Control-Allow-Methods', '*');
//     // res.header('Content-Type', 'application/json;charset=utf-8');
//     // res.header('Content-Type', 'text/html;charset=utf-8');
//     next();
// });

// // 支持静态访问路径
// app.use(express.static(__dirname));

// // 配置body-parser模块
// app.use(bodyParser.urlencoded({limit: '500mb', extended: false }));
// app.use(bodyParser.json({limit: '500mb'}));

// app.post("/",function(req){
//     console.log(req.body);
// })