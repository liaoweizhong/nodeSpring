import mysql from "./mysql";
const databaseConfig = require("../../config/database.config")

let defaultDB;
if( databaseConfig.type === "mysql" ){
    defaultDB = mysql;
}

export default mysql;