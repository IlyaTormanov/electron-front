import {ActionType, createAsyncAction, createReducer, isActionOf} from "typesafe-actions";
import {LoginType} from "../../../interfaces";
import {RootEpicType} from "../../root";
import {filter, map, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {api, prepareApi} from "../../../routes/api";
import {from, of} from "rxjs";
import {push} from "connected-react-router";
import {userActions} from "../../User/UserActions";

export const loginAction=createAsyncAction(
    '@AUTH/LOGIN_REQUEST',
    '@AUTH/LOGIN_SUCCESS',
    '@AUTH/LOGIN_FAILURE',
)<LoginType,undefined,undefined>();

export type LoginActionType=ActionType<typeof loginAction>




export const loginEpic:RootEpicType=(action$,state$)=>action$.pipe(
    filter(isActionOf(loginAction.request)),
    mergeMap(action=>ajax.post(prepareApi(api.login),action.payload)),
    mergeMap(res=>{
            if(res.status===200){
                    localStorage.setItem('user',JSON.stringify(res.response))
                    return from([
                            userActions.global(res.response),
                            push('/')
                    ])

            }
            else{
                    return of(loginAction.failure())
            }
    }


        )

)