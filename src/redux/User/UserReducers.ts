import {combineReducers} from "redux";
import {createReducer} from "typesafe-actions";
import {GlobalType, userActions, UserActionType} from "./UserActions";
import {User, UserList} from "../../interfaces";
import {useEffect} from "react";

export const userReducer=combineReducers({
    users:createReducer<UserList,UserActionType>([])
        .handleAction(userActions.fetchAllUsers.success,(state,action)=>action.payload),
    global:createReducer<GlobalType,UserActionType>({expires_at: "", id: 0, token: ""} )
          .handleAction(userActions.global,(state,action)=>action.payload),
    currentUser:createReducer<User,UserActionType>({
        email: "",
        firstName: "",
        id: 0,
        secondName: "",
        sex: '',
        status: 0
    })
        .handleAction(userActions.fetchUser.success,(state,action)=>action.payload)
})

