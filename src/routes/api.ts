
import {BoardList, RegistrationType} from "../interfaces";

export const host='http://127.0.0.1:8000'
export const prefix='api'

export const prepareApi=(endpoint:string)=>{
   return `${host}/${prefix}/${endpoint}`
}


export const api= {
    registration: 'register',
    users: 'users',
    login: 'login',
    createBoard: 'createBoard',
    boardList: 'boards',
    userBoards: 'userBoards',
    updateBoard:'updateBoard',
    board:'board',
    boardColumns:'boardColumns',
    updateColumn:'updateColumn',
    createColumn:'createColumn',
    createTask:'createTask',
    user:'user',
    task:'task'
}

// export const a={
//     registration:request<{
//         data:RegistrationType,
//     }>({url:api.registration,method:'post'}),
//     userBoards:request<{
//        data:BoardList
//     }>({url:api.userBoards,method:'get'})
// }


