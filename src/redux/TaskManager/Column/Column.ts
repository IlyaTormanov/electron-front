import {createAsyncAction, createReducer, isActionOf} from "typesafe-actions";
import {ColumnType, ColumnTypeRequest} from "../../../interfaces";
import {combineReducers} from "redux";
import {ActionType} from "typesafe-actions/dist/type-helpers";
import {combineEpics} from "redux-observable";
import {RootEpicType} from "../../root";
import {filter, map, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {api, prepareApi} from "../../../routes/api";

export const columnActions={
    createColumn:createAsyncAction(
        '@COLUMN/CREATE_COLUMN_REQUEST',
        '@COLUMN/CREATE_COLUMN_SUCCESS',
        '@COLUMN/CREATE_COLUMN_FAILURE',
    )<ColumnTypeRequest,ColumnType,undefined>(),
    boardColumns:createAsyncAction(
        '@COLUMN/FETCH_BOARD_COLUMNS_REQUEST',
        '@COLUMN/FETCH_BOARD_COLUMNS_REQUEST',
        '@COLUMN/FETCH_BOARD_COLUMNS_REQUEST',
    )<string,ColumnType[],undefined>()
}


type columnActionType=ActionType<typeof columnActions>


export const columnReducers=combineReducers({
    boardColumns:createReducer<ColumnType[],columnActionType>([])
        .handleAction(columnActions.boardColumns.success,(state,action)=>action.payload)
})

const fetchBoardColumns:RootEpicType=(action$)=>action$.pipe(
    filter(isActionOf(columnActions.boardColumns.request)),
    mergeMap(action=>ajax.get(prepareApi(`${api.boardColumns}/${action.payload}`))),
    map(res=>res.status===200?
        columnActions.boardColumns.success(res.response):
        columnActions.boardColumns.failure()
    )
)

const createColumn:RootEpicType=(action$,state$)=>action$.pipe(
    filter(isActionOf(columnActions.createColumn.request)),
    mergeMap(action=>ajax.post(prepareApi(`${api.createColumn}`),action.payload,{
        'Content-Type':'application/json',
        'Authorization':state$.value.userState.global.token
    })),
    map(res=>res.status===200?
    columnActions.createColumn.success(res.response):
        columnActions.createColumn.failure()
    )
)

export const columnEpics=combineEpics(
    fetchBoardColumns,
    createColumn
)