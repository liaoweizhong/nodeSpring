import db from '../database'

// 数据库表模型的抽象类
export abstract class Modelabstract {

    constructor (){}

    // 抽象表名
    public abstract __name: String = "";

    public abstract get(id: any): void;

    public abstract add(fields: Array<Filed>): void;
    
    public abstract update(id: any, fields: Array<Filed>): void;

    public abstract del(id: any): void;

    public abstract processFeilds(): void;

    public abstract getFeilds(name: String): void;

    public abstract setFeilds(name: String, value: any): void;

    public abstract fields: Array<Filed>;

    static instance: Model;

}

const modelArrays:Array<Model> = [];

// 模型注解
export function ModelAnnotation (param: any){

    var name = param.name;

    return function(model: any){

        // 创建实例
        let modelAnnotation = new model(name);

        // 定义一下当前函数内部的定义属性
        modelAnnotation.getFeilds();

        modelArrays.push(modelAnnotation);

        model.instance = modelAnnotation;

    }

}

export class Model extends Modelabstract {

    // 构造函数
    constructor (){
        super();
        // 定义name
        // this.__name = name;
        return this;
    }

    public fields:Array<Filed> = [];

    // 抽象表名
    public __name: String = "";
    
    public get (){
        return new Promise((suc)=>{
            var key = this.getKey();
            if( !key ) {
                suc({ code: 401 , data: null , msg : "没有找到目标" })
                return;
            }
            var selectFeild = this.getSelectFeild();
            if( !selectFeild || selectFeild.length === 0 ){
                return suc({ code: 401 , data: null , msg : "没有查询字段" })
            }

            // 生成获取sql
            var sql = `select ${selectFeild.map((e)=>{ return e.getName(); }).join(",")} from ${this.__name} where ${key.getName()}=?`;
            var connect = db.connection();
            db.operate(connect,sql,[key.get()],function(result: any){
                suc({code: 200, data: result})
            });
        })
    }

    public add (){
        return new Promise((suc)=>{
            var fields:Array<String> = [];
            var values:Array<any> = [];
            for( var i in this.fields ){
                let it:Filed = this.fields[i];
                // 排除掉没有值的
                if(it.get() === null ){ continue }
                fields.push(it.getName());
                values.push(it.get());
            }
            // 生成获取sql
            var sql = `insert into ${this.__name} (${fields.join(",")}) values (${values.map(()=>{ return "?" }).join(",")}) `;
            var connect = db.connection();
            db.operate(connect,sql,values,function(result: any){
                suc({code: 200, data: result})
            });
        })
    }
    
    public update (){
        return new Promise((suc)=>{
            var fields:Array<String> = [];
            var values:Array<any> = [];
            var key = this.getKey();
            if( !key ) return suc({ code: 401 , data: null , msg : "没有找到目标" });
            for( var i in this.fields ){
                let it:Filed = this.fields[i];
                // 排除掉主键
                if( it === key || it.get() === null ){ continue }
                fields.push(it.getName()+"=?");
                values.push(it.get());
            }
            values.push(key.get());
            // 生成获取sql
            var sql = `UPDATE ${this.__name} SET ${fields.join(",")} where ${key.getName()}= ? `;
            var connect = db.connection();
            db.operate(connect,sql,values,function(result: any){
                suc({code: 200, data: result})
            });
        })
    }

    public del (){
        return new Promise((suc)=>{
            var key = this.getKey()
            if( !key ) {
                return suc({ code: 401 , data: null , msg : "没有找到目标" })
            }
            // 生成获取sql
            var sql = `DELETE FROM ${this.__name} where ${key.getName()} = ?`;
            var connect = db.connection();
            db.operate(connect,sql,[key.get()],function(result: any){
                suc({code: 200, data: result})
            });
        })
    } 

    public query (param: any, page: number = 0, size: number = 10){
        return new Promise((suc)=>{
            var where: String = "";
            var anny: Array<any> = [];
            var filedsString: Array<String> = this.getSelectFeild().map((e)=>{ return e.getName(); });
            for( var i in param ){
                if( filedsString.indexOf(i) > -1 ){
                    if( where !== "" ){ where += " and " }
                    where += i + "=?";
                    anny.push(param[i]);
                };
            } 
            // 生成获取sql
            var sql = `select ${filedsString.join(",")} from ${this.__name} where ${where} limit ${page},${size}`;
            var connect = db.connection();
            db.operate(connect,sql,anny,function(result: any){
                suc(result)
            });
        })
    }

    public processFeilds (){
        // 首先获取自己本身的属性成员
        for( var i in this ){
            if( this[i] instanceof Filed ){
                this.fields.push(<Filed><unknown>this[i]);
            }
        }
        return this;
    }

    public getFeilds (name: String){
        return this.fields.find((e)=>{ return e.getName() === name });
    }

    public setFeilds (name: String, value: any){
        const f = this.getFeilds(name);
        return f ? f.set(value) : null;
    }

    // 将某个字段设置成禁止获取
    public setNoGet (name: String, bool: Boolean){
        var f = this.getFeilds(name);
        return f ? f.setIsSelect(bool) : null;
    }
    
    // 获取主键
    public getKey (){
        return this.fields.find((e:Filed)=>{ return e.getKey() });
    }

    // 获取所有允许查询的字段
    public getSelectFeild (){
        return this.fields.filter((e)=>{ return e.getIsSelect() === false });
    }

    public static get (){
        // console.log(this);
        // 获取新对象
        return new this().processFeilds();;
    }
}

// 字段类型枚举
export enum Fieldtype  {
    Number= "Int",
    String= "varchar",
    Image='varchar'
}

export class Filed {

    // 字段名
    private name: String = "";

    // 数值
    private value: any = null;

    // 字段类型
    private type: Fieldtype = Fieldtype.String

    // 是否为关键字
    private key: Boolean = false
    
    // 是否屏蔽查询
    private isGet: Boolean = false

    constructor (name: String, type: Fieldtype = Fieldtype.Number , isKey: Boolean = false){
        this.name = name;
        this.type = type;
        this.key = isKey;
    } 

    public getName (){
        return this.name;
    }

    public get (){
        return this.value;
    }

    public set (value: any){
        this.value = value;
    }

    // 获取字段是否允许添加
    public getIsSelect (){
        return this.isGet;
    }

    // 将字段设置为不可添加
    public setIsSelect (bool: Boolean){
        this.isGet = bool;
    }

    // 判断是否为关键字
    public getKey (){
        return this.key;
    }
    
}

// 字段注解
export function FiledAnnotation(){
    
}
