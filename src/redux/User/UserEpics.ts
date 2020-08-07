import {RootEpicType} from "../root";
import {catchError, filter, map, mergeMap} from "rxjs/operators";
import {isActionOf} from "typesafe-actions";
import {userActions} from "./UserActions";
import {ajax} from "rxjs/ajax";
import {api, prepareApi} from "../../routes/api";
import {combineEpics} from "redux-observable";
import {of} from "rxjs";



 const fetchAllUsersEpic:RootEpicType=(action$)=>action$.pipe(
    filter(isActionOf(userActions.fetchAllUsers.request)),
    mergeMap(()=>ajax.get(prepareApi(api.users))),
    map(res=>res.status===200?
        userActions.fetchAllUsers.success(res.response):
        userActions.fetchAllUsers.failure()
    ),
     catchError(() => of(userActions.fetchAllUsers.failure()))
)

    const fetchUserEpic:RootEpicType=(action$)=>action$.pipe(
        filter(isActionOf(userActions.fetchUser.request)),
        mergeMap(action=>ajax.get(`${prepareApi(api.user)}/${action.payload}`)),
        map(res=>res.status===200?
            userActions.fetchUser.success(res.response):
            userActions.fetchUser.failure()
        )
    )

// const logout:RootEpicType=(action$)=>action$.pipe(
//     filter(isActionOf(userActions.logout.request)),
//     map()
// )
export const userEpics=combineEpics(
    fetchAllUsersEpic,
    fetchUserEpic
)




