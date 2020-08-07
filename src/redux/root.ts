import {combineReducers} from "redux";

import {ActionType, StateType} from "typesafe-actions";
import {combineEpics, Epic} from "redux-observable";

import {registrationActions, registrationEpic,} from "./Authorization/registration/Registration";
import {userReducer} from "./User/UserReducers";
import {userEpics} from "./User/UserEpics";
import {userActions} from "./User/UserActions";
import {loginAction, loginEpic} from "./Authorization/login/Login";
import {boardActions, boardEpics, boardReducer,} from "./TaskManager/Board/Board";
import {connectRouter, RouterAction} from "connected-react-router";
import {columnActions, columnEpics, columnReducers} from "./TaskManager/Column/Column";
import {taskActions, taskEpic, taskReducer} from "./TaskManager/Task/Task";


export const RootAction={
    registration:registrationActions,
    users:userActions,
    login:loginAction,
    board:boardActions,
    column:columnActions,
    task:taskActions
}

export type RootActionType = RouterAction|ActionType<typeof RootAction>

export const RootState=(history:any)=>combineReducers({
    userState:userReducer,
    boardState:boardReducer,
    taskState:taskReducer,
    columnState:columnReducers,
    router:connectRouter(history)
});

export type RootStateType=StateType<ReturnType<typeof RootState>>

export const RootEpic=combineEpics(
    registrationEpic,
    userEpics,
    loginEpic,
    boardEpics,
    columnEpics,
    taskEpic
);

export type RootEpicType = Epic<RootActionType, RootActionType, RootStateType>;