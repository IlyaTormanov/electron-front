import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'

import {useDispatch, useSelector} from "react-redux";
import {boardActions} from "../../../redux/TaskManager/Board/Board";
import {useParams} from "react-router";
import {RootStateType} from "../../../redux/root";
import {Link} from "react-router-dom";
import {Button, ButtonStyles} from "../../utils/button/Button";
import {MultiSelect} from "../../utils/inputs/multiselect";
import styles from './TaskManagerStyles.module.sass'
import FilterOutlineIcon from "mdi-react/FilterOutlineIcon";
import PlusIcon from "mdi-react/PlusIcon";
import {Input} from "../../utils/inputs/input";
import {useSetState} from "react-use";
import {BoardRequestType} from "../../../interfaces";
import {DeadLine} from "../../utils/TaskUtils/PriorityItem";

export interface TrelloProps{

}




type taskManagerActions='filter'|'addBoard'
export const TaskManager:FunctionComponent<TrelloProps>=()=>{
    const dispatch=useDispatch()

    const slug=useParams<{id:string}>()

    const userId=useSelector((state:RootStateType)=>state.userState.global.id)
    const userList=useSelector((state:RootStateType)=>state.userState.users)
    const boardList=useSelector((state:RootStateType)=>state.boardState.userBoards)


    const setActiveAction=(current:taskManagerActions)=>{
        return current===controlPanelActions?'#5F97B4':'#939393'
    }

    const toggleActions=(action:taskManagerActions)=>()=>setControlPanelActions(controlPanelActions===action?undefined:action)

    useEffect(()=>{
        dispatch(boardActions.userBoards.request(slug.id))
    },[dispatch])

    const [controlPanelActions,setControlPanelActions]=useState<taskManagerActions>();
    const [query,setQuery]=useState('')
    const [newBoard,setNewBoard]=useSetState<BoardRequestType>({name:'',users:[userId],creator_id:userId})
    console.log(query)

    return(
        <div>
            <div className={styles.task_manager_control_panel}>
                <div className={styles.stats}>
                    Вы состоите/Руководите в {boardList.length} досках
                </div>
               <div className={styles.action_block}>
                   <FilterOutlineIcon size={20} onClick={toggleActions('filter')} style={{color:setActiveAction('filter')}}/>
                   <PlusIcon size={20} onClick={toggleActions('addBoard')}
                             style={{color:setActiveAction('addBoard')}}/>
               </div>
            </div>
            {
                controlPanelActions==='addBoard'&&
                    <div className={styles.addBoardPanel}>
                        <Input type={'text'}
                               onChange={value => setNewBoard({name:value})}
                               value={newBoard.name}
                               placeholder={'Имя доски...'}/>
                        <MultiSelect render={value =><div>{value.firstName}</div>}
                                     data={userList}
                                     itemToKey={key => key.id}
                                     onClick={arg => setNewBoard(prevState => ({users:[...prevState.users,arg.id]}))}
                                     selected={newBoard.users}
                                     onChange={value => setQuery(value) }
                                     typingValue={query}/>

                        <Button text={'Создать доску'} color={ButtonStyles.habr} onClick={()=>dispatch(boardActions.createBoard.request(newBoard))} />
                    </div>
            }


            <div>
              {/*<Board/>*/}
                {boardList.map(board=>
                    <Link to={`/taskmanager/${userId}/board/${board.id}`} key={board.id}>{board.name}</Link>
                )}
            </div>
        </div>
    )
}