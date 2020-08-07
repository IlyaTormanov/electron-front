import {ActionType, createAsyncAction, createReducer, isActionOf, StateType} from "typesafe-actions";
import {BoardList, BoardRequestType, BoardType} from "../../../interfaces";
import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";
import {RootEpicType} from "../../root";
import {filter, map, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import { api, prepareApi} from "../../../routes/api";


export const boardActions={
    createBoard:createAsyncAction(
        '@BOARD/CREATE_BOARD_REQUEST',
        '@BOARD/CREATE_BOARD_SUCCESS',
        '@BOARD/CREATE_BOARD_FAILURE'
    )<BoardRequestType,BoardType,undefined>(),
    fetchBoards:createAsyncAction(
        '@BOARD/FETCH_ALL_BOARDS_REQUEST',
        '@BOARD/FETCH_ALL_BOARDS_SUCCESS',
        '@BOARD/FETCH_ALL_BOARDS_FAILURE',
    )<undefined,BoardList,undefined>(),
    updateBoard:createAsyncAction(
        '@BOARD/UPDATE_BOARD_REQUEST',
        '@BOARD/UPDATE_BOARD_SUCCESS',
        '@BOARD/UPDATE_BOARD_FAILURE',
    )<BoardType,BoardType,undefined>(),
    userBoards:createAsyncAction(
        '@BOARD/USER_BOARDS_REQUEST',
        '@BOARD/USER_BOARDS_SUCCESS',
        '@BOARD/USER_BOARDS_FAILURE',

    )<string,BoardList,undefined>(),
    board:createAsyncAction(
        '@BOARD/BOARD_REQUEST',
        '@BOARD/BOARD_SUCCESS',
        '@BOARD/BOARD_FAILURE',
    )<string,BoardType,undefined>()
}

export type BoardActionsType=ActionType<typeof boardActions>


export const boardReducer=combineReducers({
    boardList:createReducer<BoardList,BoardActionsType>([])
        .handleAction(boardActions.fetchBoards.success,(state,action)=>action.payload),
    userBoards:createReducer<BoardList,BoardActionsType>([])
        .handleAction(boardActions.userBoards.success,(state,action)=>action.payload),
    board:createReducer<BoardType,BoardActionsType>({} as BoardType)
        .handleAction(boardActions.board.success,(state,action)=>action.payload)
})

export type boardType=StateType<typeof boardReducer>



const createBoardEpic:RootEpicType=(action$)=>action$.pipe(
    filter(isActionOf(boardActions.createBoard.request)),
    mergeMap(action=>ajax.post(prepareApi(api.createBoard),action.payload)),
    map(res=>res.status===200?
        boardActions.createBoard.success(res.response):
        boardActions.createBoard.failure()
    )
)


const updateBoard:RootEpicType=(action$,state$)=>action$.pipe(
    filter(isActionOf(boardActions.updateBoard.request)),
    mergeMap(action=>ajax.put(prepareApi(`${api.updateBoard}/${action.payload.id}`),action.payload,{
        'Content-Type':'application/json;charset=utf-8',
        'Authorization':state$.value.userState.global.token
    })),
    map(res=>res.status===200?
    boardActions.updateBoard.success(res.response):
        boardActions.updateBoard.failure()
    )
)

const fetchBoard:RootEpicType=(action$)=>action$.pipe(
    filter(isActionOf(boardActions.board.request)),
    mergeMap(action=>ajax.get(prepareApi(`${api.board}/${action.payload}`))),
    map(res=>res.status===200?
        boardActions.board.success(res.response):
        boardActions.board.failure()
    )
)
const userBoards:RootEpicType=(action$,state$)=>action$.pipe(
    filter(isActionOf(boardActions.userBoards.request)),
    mergeMap(action=>ajax.get(prepareApi(`${api.userBoards}/${action.payload}`),{
        'Content-Type':'application/json',
        'Authorization':state$.value.userState.global.token
    })),
    map(res=>res.status===200?
    boardActions.userBoards.success(res.response):
        boardActions.userBoards.failure()
    )
)


const fetchBoardsEpic:RootEpicType=(action$)=>action$.pipe(
    filter(isActionOf(boardActions.fetchBoards.request)),
    mergeMap(()=>ajax.get(prepareApi(api.boardList))),
        map(res=>res.status===200?
        boardActions.fetchBoards.success(res.response):
            boardActions.fetchBoards.failure()
        )
)

export const boardEpics=combineEpics(
    createBoardEpic,
    fetchBoardsEpic,
    userBoards,
    updateBoard,
    fetchBoard
)