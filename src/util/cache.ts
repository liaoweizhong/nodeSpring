
let Cache = {
    // 用户级别缓存
    userLevel: new Map()
}

const setUserLevel = function(key: string, level: String){
    Cache.userLevel.set(key,level);
    console.log("缓存记录",Cache);
}

const getUserLevel = function(key: string){
    return Cache.userLevel.get(key);
}

export default {
    // 用户等级的缓存
    setUserLevel,
    getUserLevel
};