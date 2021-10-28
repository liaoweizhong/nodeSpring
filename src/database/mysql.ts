const mysql = require('mysql');
const databaseConfig = require("../../database.config")

class MysqlDB {

    connection () {
        let connection = mysql.createPool({
            user     : databaseConfig.user,
            password : databaseConfig.password,
            host     : databaseConfig.host,
            port: databaseConfig.port,
            database: databaseConfig.database,
        });
        return connection;
    }
    //关闭数据库
    close ( connection: any){
        //关闭连接
        connection.end(function(err: any){
            if(err){
                return;
            }else{
                console.log('关闭连接');
            }
        });
    }
    operate (connection: any,sql: any,param: any,callback: any, errorCallback: any = new Function()) {
        connection.query(sql,param,function(err: any,data: any){
            if(err){
                errorCallback && errorCallback(err)
                console.log("sql执行错误:"+err);
            } else {
              callback(data)
            }
        })
    }

    // 回滚查询
    transaction (callback: Function){
        let connection = this.connection()
        connection.beginTransaction(function (err: any) {
            if (err) {
                return callback(err, null);
            }
            
            try {
                callback(connection)
            }catch (e){
                connection.rollback(function (err: any) {
                    callback(err, null);
                });
            }
        })
    }

}

let db = new MysqlDB();

export default db;