
namespace appAction {

    var fs = require('fs');
    var path = require('path');//解析需要遍历的文件夹
    var filePath = path.resolve('./src/appAction');
    //文件遍历方法
    let fileDisplay = function (filePath:String){
        //根据文件路径读取文件，返回文件列表
        fs.readdir(filePath,function(err:any,files:any){
            if(err){
                console.warn(err)
            }else{
                //遍历读取到的文件列表
                files.forEach(function(filename:any){
                    //获取当前文件的绝对路径
                    var filedir = path.join(filePath, filename);
                    //根据文件路径获取文件信息，返回一个fs.Stats对象
                    fs.stat(filedir,function(eror:any, stats:any){ 
                        if(eror){
                            console.warn('获取文件stats失败');
                        }else{
                            var isFile = stats.isFile();//是文件
                            var isDir = stats.isDirectory();//是文件夹
                            if(isFile){
                                if(filename.indexOf(".action.") > -1){
                                    // console.log("加载:"+filedir.split("\\src\\appAction\\")[1]);
                                    require("./"+filedir.split("\\src\\appAction\\")[1]);
                                }
                            }
                            if(isDir){
                                fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            }
                        }
                    })
                });
            }
        });
    }

    fileDisplay(filePath);
}

