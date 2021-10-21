// import { updateVideo , mergeVideo } from '@/api/updateFile'
let update = window.update = function(name,base64,type){

    this.name = name;

    this.type = type;

    this.id = "";

    this.base64 = base64;

    // 每次上传字节长度
    this.countLength = 5000000;

    // 分段处理数据结果
    this.baseArray = [];

    // 处理文件进行分段处理
    this.handleFile = handleFile;

    // 加载文件
    this.updateFile = updateFile;

    // 合并文件
    this.mergeFile = mergeFile;

    // 每次成功的回调函数
    this.oncomplete = null;

    // 选择文件
    this.selectFlie = selectFlie;
    this.setFiles = setFiles;


    // 初始化事件
    this.init = init;

    // 保存的服务器路径
    this.path = '';

    // 初始化处理
    // this.init();

    return this;

}

const selectFlie = function(){
    var update = this;
    return new Promise((suc)=>{
        var file = document.createElement("input");
        file.type = 'file';
        file.onchange = function(){
            this.setFiles(this.files[0]).then(suc)   
        }
        file.click();
    })
}

const setFiles = function(files){
    var update = this;
    return new Promise((suc)=>{
        var rs = new FileReader();
        rs.onload = function(res){
            update.base64 = res.currentTarget.result.split(",")[1];
            suc(update.base64, update); 
        }
        update.name = files.name;
        update.type = files.type || files.name.split(".").pop();
        rs.readAsDataURL(files);
    })
}

const init = function(){
    // 对数据进行分段
    this.handleFile()
    // 开始对数据进行上传
    this.updateFile();
}

// 将文件进行分段处理
const handleFile = function(){
    var countLength = this.countLength;
    var base64 = this.base64;
    var min = 0;
    var max = countLength;
    var b = "";
    for( ;; ){
        b = base64.substring(min,max);
        if( b == "" ){ 
            break;
        }
        this.baseArray.push( b );
        min = max;
        max = min + countLength;
    }
    console.log("视频文件数据分段处理结束");
    console.log("分段数量为：" + this.baseArray.length);
}

const updateFile = function(index = 0){
    var name = this.name;
    var base64 = this.baseArray[index];
    if( !base64 ){ 
        this.oncomplete && this.oncomplete({
            index, name, id, res: null, isload: true,
            rate: (index)/this.baseArray.length
        });
        this.mergeFile().then((res)=>{
          console.log("合成成功");  
        })
        return console.log("请求结束"); 
    }
    var length = this.base64.length;
    var id = this.id;
    updateVideo({
        name: name,
        id: id,
        base64: base64,
        length: length,
        index: index
    }).then((res)=>{
        var rate = (index+1)/this.baseArray.length;
        this.oncomplete && this.oncomplete({
            index, name, id, res, 
            isload: false, rate: rate
        });
        this.id = res.data.id;
        setTimeout(()=>{
            this.updateFile(++index);
        },10)
    })
}

const updateVideo = function(param){
    return axios({
        url: "/bs_updateFile/updateFile",
        method: "post",
        headers: {
            "Authorization": "token eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImxpYW8xMTEiLCJwYXNzd29yZCI6IjEyMzQ1NiIsIm5hbWUiOiLlu5YiLCJjcmVhdGVEYXRhIjoiMjAyMS0wMi0xN1QxNjoxNzoxMi4wMDBaIiwiaW1hZ2VzIjpudWxsLCJpbmZvIjpudWxsLCJsZXZlbCI6Nn0.Xr9ngmrlLksCiGb02qi3o63rAC86PhEw-BjvE6qKjzg"
        },
        data: param || {
            name: "123456",
            id: "1",
            base64: "53as54da5s4d65a4sdasd",
            length: 2000,
            index: 1
        }
    })
}

const mergeFile = function(){
    return new Promise((a)=>{
        var id = this.id;
        if( !id ) return;
        mergeVideo({
            id: id,
            type: this.type
        }).then((res)=>{
            a(res.data);
        })
    })
}

const mergeVideo = function(param){
    return axios({
        url: "/bs_updateFile/mergeFile",
        method: "get",
        headers: {
            "Authorization": "token eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImxpYW8xMTEiLCJwYXNzd29yZCI6IjEyMzQ1NiIsIm5hbWUiOiLlu5YiLCJjcmVhdGVEYXRhIjoiMjAyMS0wMi0xN1QxNjoxNzoxMi4wMDBaIiwiaW1hZ2VzIjpudWxsLCJpbmZvIjpudWxsLCJsZXZlbCI6Nn0.Xr9ngmrlLksCiGb02qi3o63rAC86PhEw-BjvE6qKjzg"
        },
        params: param
    })
}

// export { update }

