var fs = require("fs")

// 存储结果配置
let fileData = [];

// 常用配置
let _config = {
	// 上传文件临时存储位置
	path: '../updateFile/temporary',
	// 上传文件最终保存地址
	paths: '../updateFile/document'
}

// 创建一个上传的实例
let updateFileProcess = function(length, name, savepath, path){
	
	// 随机一个id数字
	this.id = "updateFile_" + new Date()*1 + parseInt( Math.random()*100000 );
	
	// 名称
	this.name = name;

	// 编码
	this.code = '';
	
	// 文件段数
	this.fileCount = 0;

	// 临时文件存储路径
	this.savepath = savepath;

	// 实际文件保存路径
	this.path = path;
	
	// 文件的总大小字节
	this.fileLength = length;

	// 临时文件个数
	this.fileCount = 0;
	
	// 接受数据
	this.setFileBase64 = setFileBase64;
	
	// 创建临时文件
	this.createTemporaryBase64 = createTemporaryBase64;

	// 删除临时文件
	this.deleteFolder = deleteFolder;

	// 合并数据
	this.mergeFile = mergeFile;
	
}


let deleteFolder = function() {
	var path = this.savepath+"/"+this.id;
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

// 合并数据
let mergeFile = function(){

	return new Promise((a)=>{
		// 获取临时存储路径
		var paths = this.savepath;
		// 获取实际保存路径
		var path = this.path;
		// 获取临时存储文件个数
		var index = this.fileCount;
		// console.log("fileCount:" + index);
		// 开始遍历文件数据
		// var base64 = "";
		// 文件id；
		var id = this.id;
		// for( var i = 0; i < index ; i++ ){
		// 	console.log("获取文件开始："+paths+"/"+id+"/"+i+".das");
		// 	base64 += fs.readFileSync(paths+"/"+id+"/"+i+".das","utf8");
		// }
		// console.log("获取文件字节："+base64.length);
		var date = new Date();
		var timeString = date.getFullYear().toString()+"_"+(date.getMonth()+1).toString()+"_"+date.getDate().toString();
		fs.mkdir(path+"/"+timeString,{recursive: true}, ()=>{
			// 获取所有的base64合集之后 进行保存文件步骤
			// 将base64保存为字节进行存储
			// var dataBuffer = new Buffer.from(base64, 'base64');
			// console.log("合并文件开始："+path+"/"+id+"/"+this.name);
			// console.log("合并文件字节："+dataBuffer.byteLength());
			// fs.writeFile(path+"/"+timeString+"/"+this.name,"",function(){
				let p = path+"/"+timeString+"/"+this.id+"."+this.name.split(".")[1];
				let dhh = fs.createWriteStream(p);

				let i = 0;
				// recursive function
				let main = ()=> {
					if ( i >= index) {
						dhh.end();
						// console.log("合并完成")
						this.deleteFolder();
						// console.log("删除掉缓存文件")
						// console.log("路径:"+"/"+timeString+"/"+id+"."+this.name.split(".")[1])
						a({ path: "/"+timeString+"/"+id+"."+this.name.split(".")[1] });
						return;
					}
					currentfile = paths+"/"+id+"/"+i+".das";
					// console.log(currentfile);
					i++;
					stream = fs.createReadStream(currentfile);
					stream.pipe(dhh, {end: false});
					stream.on("end", function() {
						// console.log(currentfile + ' appended' + '-' + index);
						main();        
					});
				}
				main();
			// });
		})

	})

}

// 接受数据 
let setFileBase64 = function(param){
	return new Promise((a,b)=>{
		// 获取这个文件的段数
		var fileCountIndex = param.index;
		// 获取文件的段的base64文件
		var fileBase64 = param.base64;
		// 创建临时文件
		this.createTemporaryBase64(fileBase64,fileCountIndex).then(()=>{
			a({
				id: this.id
			});
		});
	})
}

let createTemporaryBase64 = function(base64,index){
	return new Promise((a)=>{
		// 获取临时下载文件保存路径
		var path = this.savepath;
		// 文件id；
		var id = this.id;
		// console.log("path:"+path+"/"+id)
		fs.mkdir(path+"/"+id,{recursive: true}, ()=>{
			// console.log("创建成功")
			// console.log(base64)
			// var data = fs.readFileSync('./data1/1.files', 'utf8');
			// console.log("读取成功");
			// 将base64保存为字节进行存储
			var dataBuffer = new Buffer.from(base64, 'base64');
			// 将base64存储进入临时文件中 并创建
			fs.writeFile(path+"/"+id+"/"+index+".das",dataBuffer,()=>{
				// console.log(path+"/"+id+"/"+index+".das");
				// console.log("*****************");
				this.fileCount ++;
				a();
			})
		});
	})
}

// 开始一个新的对象
let addFile = function(param){

	return new Promise((a,b)=>{
		// 默认缓存路径
		var path = _config.paths;
		// 完成保存路径
		var savepath = _config.path;
		// 名称
		var name = param.name;
		// 文件字节大小
		var length = param.length;
		// 文件下标
		var index = param.index;
		// 文件id
		var id = param.id;
		// 文件base64文件
		var base64 = param.base64;
		// 根据id查询是否已经创建了对象
		let updatefs = fileData.find((e)=>{ return e.id === id });
		if( !updatefs ){
			// 如果实例化对象不存在
			updatefs = new updateFileProcess(length, name, savepath, path);
			// 讲对象储存在集合中
			fileData.push(updatefs)
		}
		// 如果updatefs实例对象是存在的则继续添加创建
		updatefs.setFileBase64({
			base64,
			index,
		}).then((res)=>{
			// 成功完成后
			a(res);
		})
	})
}

let merge = function(id){
	return new Promise ((a,b)=>{
		// 从和集中根据id查询出实例
		let updatefs = fileData.find((e)=>{ return e.id === id });
		// 触发实例的合并功能
		updatefs.mergeFile().then((e)=>{
			// console.log(JSON.stringify(e));
			// 回调
			a({isSuccess: true, path: e.path, id: id });
		});
	})
}

module.exports = { updateFileProcess , addFile , merge }