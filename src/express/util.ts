import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
const tokenKey:string = "chaoliumeihai"

export function getId (type: any){
    if( type === "varchar" || type === undefined ){
        return getUuid();
    }else if( type === "Int" ){
        return getMathInt();
    }
}

export function getMathInt (){
    return parseInt((Math.random()*1000).toString() + new Date().getTime().toString());
}

export function getUuid(){
    return uuidv4();
}

export function getToken (payload: any){    
    return jwt.sign(payload, tokenKey)
}

export function setToken (payload: any){
    return payload ? jwt.verify(payload,tokenKey) : {};
}

export function setTokenByHeader (header: any){
    let token:String=header.authorization;
    if( token ){
        return jwt.verify(token.split(" ")[1],tokenKey)
    }else{
        return {}
    }
}