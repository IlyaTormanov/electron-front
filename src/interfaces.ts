import {DeadLine} from "./components/utils/TaskUtils/PriorityItem";




export interface ColumnTypeRequest{
    name:string,
    board_id:string,
    total:number
}

export interface ColumnType{
    id:number,
    name:string,
    total:number,
    board_id:string,
    tasks:TaskType[]
}
export interface BoardRequestType{
    name:string,
    creator_id:number,
    users:number[],

}
export interface BoardType{
    id:number,
    name:string,
    users:UserList,
    columns:ColumnType[]
}
export type BoardList=BoardType[]
export interface LoginType{
    email:string,
    password:string
}
export interface RegistrationType{
    firstName:string,
    secondName:string,
    email:string,
    password:string,
}

export interface User{
    firstName:string,
    secondName:string,
    email:string,
    id:number,
    sex:string,
    status:number,
}

export type UserList=User[]


export type TaskRequestType={
    author_id:number,
    name:string,
    target:string,
    status:number,
    column_id:number,
    description:string,
    users:number[],
    priorityStatus:1|0
}
export interface Tag{
    name:string
}
export interface TaskType{
    id:number,
    name:string
    target:string,
    status:number,
    column_id:number,
    description:string,
    users:User[],
    author_id:number,
    total_users:number,
    tags:Tag[],
    priorityStatus:1|0,
    comments?:Comment[]
}
export interface Comment{
    name:string
}

export const DeadlineArr:{name:string,id:DeadLine}[]=[
    {
    name:'Скоро',
    id:DeadLine.soon
},
    {
        name:'Старт',
        id:DeadLine.start
    },
    {
        name:'Неважно',
        id:DeadLine.nevermind
    },
    {
        name:'Просрочено ',
        id:DeadLine.overdue
    }
]