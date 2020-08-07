import {ActionType, createAction, createAsyncAction} from "typesafe-actions";
import {User, UserList} from "../../interfaces";

export type GlobalType={
    expires_at: string
    id: number
    token:string
}
export const userActions={
    fetchAllUsers:createAsyncAction(
        '@USERS/FETCH_ALL_USERS_REQUEST',
        '@USERS/FETCH_ALL_USERS_SUCCESS',
        '@USERS/FETCH_ALL_USERS_FAILURE'
    )<undefined,UserList,undefined>(),
    global:createAction('@GLOBAL/GLOBAL_DATA' )<GlobalType>(),
    fetchUser:createAsyncAction(
        'USERS/FETCH_USER_REQUEST',
        'USERS/FETCH_USER_SUCCESS',
        'USERS/FETCH_USER_FAILURE',
    )<string,User,undefined>(),
    logout:createAsyncAction(
        '@NAVIGATION/LOGOUT_REQUEST',
        '@NAVIGATION/LOGOUT_SUCCESS',
        '@NAVIGATION/LOGOUT_FAILURE',
    )<undefined,undefined,undefined>()
}

export type UserActionType=ActionType<typeof userActions>