import {ActionType, createAsyncAction, createReducer, isActionOf} from "typesafe-actions";
import {TaskRequestType, TaskType} from "../../../interfaces";
import {combineEpics} from "redux-observable";
import {RootEpicType} from "../../root";
import {filter, map, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {api, prepareApi} from "../../../routes/api";
import {combineReducers} from "redux";




export const taskActions={
    createTask:createAsyncAction(
        '@TASK/CREATE_TASK_REQUEST',
        '@TASK/CREATE_TASK_SUCCESS',
        '@TASK/CREATE_TASK_FAILURE',
    )<TaskRequestType,TaskType,undefined>(),
    fetchTask:createAsyncAction(
        '@TASK/FETCH_TASK_REQUEST',
        '@TASK/FETCH_TASK_SUCCESS',
        '@TASK/FETCH_TASK_FAILURE',
    )<string,TaskType,undefined>()
};

export type TaskActionsType=ActionType<typeof taskActions>
const createTaskEpic:RootEpicType=(action$,state$)=>action$.pipe(
    filter(isActionOf(taskActions.createTask.request)),
    mergeMap(action=>ajax.post(prepareApi(api.createTask),action.payload,{
        'Authorization':state$.value.userState.global.token
    })),
    map(res=>res.status===200?
        taskActions.createTask.success(res.response):
        taskActions.createTask.failure()

    )
)


 export const taskReducer=combineReducers({
    task:createReducer<TaskType,TaskActionsType>({
        author_id: 0,
        column_id: 0,
        comments: [],
        description: "",
        id: 0,
        name: "",
        priorityStatus: 0,
        status: 0,
        tags: [],
        target: "",
        total_users: 0,
        users: []
    }).handleAction(taskActions.fetchTask.success,(state,action)=>action.payload)
})
const fetchTaskEpic:RootEpicType=(action$,state$)=>action$.pipe(
    filter(isActionOf(taskActions.fetchTask.request)),
    mergeMap(action=>ajax.get(`${prepareApi(api.task)}/${action.payload}`,{
        'Authorization':state$.value.userState.global.token,
        'Content-Type':'application/json',
    })),
    map(res=>res.status===200?
        taskActions.fetchTask.success(res.response):
        taskActions.fetchTask.failure()
    )
)

export const taskEpic=combineEpics(
createTaskEpic,
fetchTaskEpic
)
