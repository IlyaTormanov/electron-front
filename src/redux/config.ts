
export const a=0;
// import {ajax, AjaxResponse} from "rxjs/ajax";
// import {catchError} from "rxjs/operators";
// import {Observable, of} from "rxjs";
// import {history, store} from "../index";
//
//
// export type HeadersType=Record<string,string>
//
// export enum ContentType{
//     MULTIPART= 'multipart/form-data',
//     JSON= 'application/json'
// }
//
// export interface TypedAjaxResponse<T> extends AjaxResponse {
//     response: T,
// }
//
//
// export interface TypedAjaxRequest{
//     url:string,
//     method:string,
//     headers?:HeadersType,
//     type?:ContentType,
//     body?:any
// }
//
// const AuthProxyHandler:ProxyHandler<HeadersType> = {
//     get(target, props: string): string {
//         return (props === 'Authorization' ? store.getState().userState.global.token : target[props])
//     }
// }
//
// export function Ajax<R extends Object>(data:TypedAjaxRequest){
//     const newHeaders = new Proxy(data.headers || {}, AuthProxyHandler);
//     newHeaders['Authorization'] = store.getState().userState.global.token;
//
//     switch (data.type) {
//         case ContentType.MULTIPART:
//             break;
//         default:
//             newHeaders['Content-Type'] = ContentType.JSON;
//     }
//     return ajax({...data,headers:newHeaders}).pipe(
//         catchError(err=>{
//                 if(err.status===401){
//                     history.push('/login')
//                 }
//                 return of({success:false,message:'Ошибка авторизации'})
//         })
//     ) as Observable<TypedAjaxResponse<R>>
// }
// export type RequestData<R extends {} = any, D extends {} = any, Q extends {} = any> = {
//     response?: R,
//     data?: D,
//     query?: Q,
// }
//
//
// export const request=<V extends RequestData>(c:TypedAjaxRequest)=>{
//     return Ajax<V>(c)
// }
