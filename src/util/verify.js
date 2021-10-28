// 验证码
const svgCaptcha = require('svg-captcha');

// 缓存
const svgCache = [];

svgCaptcha.createCode = function(id){
    var codes = svgCache.find((e)=>{ return e.id == id });
    if( codes ){
        clearTimeout(codes.key);
        svgCache.splice(svgCache.indexOf(codes),1);
    }
    var datas = svgCaptcha.create({
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 1, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#cc9966' // 验证码图片背景颜色
    });
    datas.id = id;
    // console.log("新增svgCache",JSON.stringify(svgCache));
    var key = setTimeout(()=>{
        svgCache.splice(svgCache.indexOf(datas),1);
        // console.log("删除svgCache",JSON.stringify(svgCache));
    },60000)
    svgCache.push({id: id, data: datas, key: key})
    return datas
}

svgCaptcha.exec = function( id, code ){
    // console.log("传值", id, code);
    // console.log("svgCache",JSON.stringify(svgCache.map((e)=>{ return [e.id, e.data.text] })));
    // console.log("svgCache.find",svgCache.find)

    var codes = svgCache.find((e)=>{ return e.id == id });
    if( !codes ){
        return false;    
    }
    // console.log("code.data.text === code;",codes.data.text,code)
    return codes.data.text.toLowerCase() == code.toLowerCase();
}

module.exports = svgCaptcha