import {stringify} from "querystring";

export const prepareEntity=<T>(changes:Partial<T>)=>(object:T)=>({...object,...changes});

export const urlWithQuery=(url:string,query:{} )=>{
    return `${url}/${stringify(query)}`
}