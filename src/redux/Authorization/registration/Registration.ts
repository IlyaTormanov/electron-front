import {createAsyncAction, createReducer, isActionOf} from "typesafe-actions";
import {RegistrationType} from "../../../interfaces";
import {RootEpicType} from "../../root";
import {catchError, filter, map, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import { from, of} from "rxjs";
import {api, prepareApi} from "../../../routes/api";
import {push} from "connected-react-router";

export const registrationActions=createAsyncAction(
    '@AUTH/REGISTRATION_REQUEST',
        '@AUTH/REGISTRATION_SUCCESS',
        '@AUTH/REGISTRATION_FAILURE',
)<RegistrationType,undefined,undefined>()

export const registrationEpic: RootEpicType = (action$) => action$.pipe(
    filter(isActionOf(registrationActions.request)),
    mergeMap((action) => ajax.post(prepareApi(api.registration),action.payload)),
    mergeMap(res => {
            if (res.status === 200) {
                return from([
                    registrationActions.success(),
                    push('/login')
                ]
                )
            } else {
                return of(
                    registrationActions.failure()
                )
            }
        }
    ),
    catchError(() => of(registrationActions.failure()))
);