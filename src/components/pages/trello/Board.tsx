import * as React from 'react'
import {FunctionComponent, useEffect, useState} from 'react'
import {Category} from "./components/Category";
import AccountPlusIcon from "mdi-react/AccountPlusIcon";
import AccountSupervisorIcon from "mdi-react/AccountSupervisorIcon";
import FolderOpenIcon from "mdi-react/FolderOpenIcon";
import FilterOutlineIcon from "mdi-react/FilterOutlineIcon";
import CloseIcon from "mdi-react/CloseIcon";

import styles from './BoardStyles.module.sass'
import {Input} from "../../utils/inputs/input";
import {prepareEntity} from "../../../utilsF";
import {Button, ButtonStyles} from "../../utils/button/Button";
import {useSetState} from "react-use";
import {ColumnTypeRequest, DeadlineArr, TaskRequestType} from "../../../interfaces";
import {useDispatch, useSelector} from "react-redux";
import {boardActions} from "../../../redux/TaskManager/Board/Board";
import {useParams} from "react-router";
import PlusIcon from "mdi-react/PlusIcon";
import {columnActions} from "../../../redux/TaskManager/Column/Column";
import {RootStateType} from "../../../redux/root";
import {pipe} from "fp-ts/lib/pipeable";
import {MultiSelect} from "../../utils/inputs/multiselect";
import {taskActions} from "../../../redux/TaskManager/Task/Task";
import {Textarea} from "../../utils/inputs/Textarea";


export enum ActionList {
    ENCLOSURE = 'enclosure',
    USERLIST = 'user_list',
    ADDUSER = 'add_user',
    FILTERS = 'filters',
    ADDCOLUMN = 'addColumn',
    CREATETASK = 'createTask'
}

const initialFilters: TrelloFilters = {
    creationDate: '',
    deadline: '',
    importance: 0,
    performers: [],
    name: '',
}

interface TrelloFilters {
    creationDate: string,
    deadline: string,
    importance: number
    performers: string [],
    name: string
}

export interface BoardProps {

}

export interface Test {
    a: number,
    b: string
}

export const Board: FunctionComponent<BoardProps> = () => {

    const dispatch = useDispatch();
    const boardId = useParams<{ boardId: string }>()


    useEffect(() => {
        dispatch(boardActions.board.request(boardId.boardId))
        // dispatch(columnActions.boardColumns.request(boardId.boardId))
    }, [dispatch, boardId])

    const prepareFilters = (changes: Partial<TrelloFilters>) => setFilters(prepareEntity(changes))
    const toggleActions = (action: ActionList,columnId?:number) => () => {
        if(columnId){
            setNewTask({column_id:columnId})
        }
        return setActions(actions === action ? undefined : action)
    }
    const setActive = (value: ActionList) => {
        return value === actions ? '#5F97B4' : '#939393'
    }

    const board = useSelector((state: RootStateType) => state.boardState.board)
    const userId=useSelector((state:RootStateType)=>state.userState.global.id)

    const [searchUserList,setSearchUserList]=useState('');
    const [searchUserStatus,setSearchUserStatus]=useState('');
    const [search, setSearch] = useState('')
    const [filters, setFilters] = useState(initialFilters)
    const [actions, setActions] = useState<ActionList>()
    const [newColumn, setNewColumn] = useSetState<ColumnTypeRequest>({board_id: boardId.boardId, name: "", total: 0})
    const [newTask,setNewTask]=useSetState<TaskRequestType>({
        column_id: 0,
        description: "",
        name: "",
        status:0,
        target: "",
        users: [],
        author_id:userId,
        priorityStatus:0,
    })

    return (
        <div className={styles.board}>

            <div className={styles.management}>
                <div className={styles.board_description}>
                    <div className={styles.board_name}>{board.name}</div>
                    <div className={styles.statistic}>
                        <span>
                        Всего категорий: {board.columns?.length}
                    </span>
                        <span>
                        Всего задач: 9
                    </span>
                    </div>
                </div>
                <div className={styles.icons}>
                    <FolderOpenIcon size={20}
                                    onClick={toggleActions(ActionList.ENCLOSURE)}
                                    style={{color: setActive(ActionList.ENCLOSURE)}}/>
                    <div>
                        <AccountSupervisorIcon size={20}/>
                        <AccountPlusIcon size={20}/>

                    </div>
                    <FilterOutlineIcon size={20}
                                       style={{color: setActive(ActionList.FILTERS)}}
                                       onClick={toggleActions(ActionList.FILTERS)}/>
                </div>
                <div style={{justifySelf: 'flex-end', paddingRight: '34px', boxSizing: 'border-box'}}>
                    <Input placeholder={'Поиск по задачам ...'}
                           type={'text'}
                           onChange={value => setSearch(value)}
                           value={search}/>
                </div>


            </div>
            {actions === ActionList.CREATETASK&&
            <div className={styles.createTaskPanel}>
                <Input type={'text'} onChange={value => setNewTask({name:value})} value={newTask.name} placeholder={'Наименование задачи'}/>
                <Textarea value={newTask.description}
                          placeholder={'Описание задачи'}
                          onChange={value => setNewTask({description:value})}/>
                <Input type={'text'}
                       onChange={value => setNewTask({target:value})}
                       value={newTask.target}
                       placeholder={'Предмет задачи'}/>
                <MultiSelect render={value =><div>{value.firstName} {value.secondName}</div> }
                             data={board.users}
                             itemToKey={key => key.id}
                             onClick={arg => setNewTask(prevState => ({users:[...prevState.users,arg.id]}))}
                             selected={newTask.users}
                             onChange={value => setSearchUserList(value)}
                             typingValue={searchUserList}
                             />
                <MultiSelect render={value => <div>{value.name}</div>}
                             data={DeadlineArr}
                             itemToKey={key => key.id}
                             onClick={arg => setNewTask({status:arg.id})}
                             selected={newTask.status}
                             onChange={value => setSearchUserStatus(value)}
                             typingValue={searchUserStatus}/>
                <div className={styles.buttonBlock}>
                    <Button text={'Создать задачу'}
                            onClick={()=>dispatch(taskActions.createTask.request(newTask))}
                            color={ButtonStyles.habr}/>
                </div>
            </div>
            }
            {actions === ActionList.FILTERS &&
            <div className={styles.filterPanel}>
                <div className={styles.close}>
                    <CloseIcon className={styles.closeIcon} size={20} color={'#939393'}
                               onClick={toggleActions(ActionList.FILTERS)}/>
                </div>
                <div className={styles.filters}>
                    <Input type={'text'}
                           onChange={value => prepareFilters({creationDate: value})}
                           value={filters.creationDate}
                           placeholder={'По дате создания'}/>
                    <Input type={'text'} onChange={value => prepareFilters({deadline: value})}
                           value={filters.deadline}
                           placeholder={'По дате окончания'}/>

                    <Input type={'text'}
                           onChange={value => prepareFilters({creationDate: value})}
                           value={filters.creationDate}
                           placeholder={'По названию '}/>
                    <Input type={'text'}
                           onChange={value => prepareFilters({creationDate: value})}
                           value={filters.creationDate}
                           placeholder={'По исполнителям'}/>
                    <Input type={'text'}
                           onChange={value => prepareFilters({creationDate: value})}
                           value={filters.creationDate}
                           placeholder={'По тэгам'}/>
                    <Input type={'text'}
                           onChange={value => prepareFilters({creationDate: value})}
                           value={filters.creationDate}
                           placeholder={'По автору задачи'}/>
                    <Input type={'text'}
                           onChange={value => prepareFilters({creationDate: value})}
                           value={filters.creationDate}
                           placeholder={'По ключевым словам'}/>
                </div>
                <div className={styles.save_filters}>
                    <div className={styles.checkbox_block}>
                        <div className={styles.checkbox}>
                            <input type={'checkbox'}/>
                            <label>
                                Только срочные
                            </label>
                        </div>
                        <div className={styles.checkbox}>
                            <input type={'checkbox'}/>
                            <label>
                                Ваши задачи
                            </label>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Button text={'Очистить'}
                                color={ButtonStyles.border}
                                onClick={() => {
                                }}
                                icon={{content: <CloseIcon/>, position: 'left'}}/>
                        <Button text={'Применить'}
                                onClick={() => {
                                }}
                                color={ButtonStyles.habr}/>
                    </div>
                </div>

            </div>
            }
            {
                !actions &&
                <div className={styles.addColumn} onClick={toggleActions(ActionList.ADDCOLUMN)}>
                    <span>
                        Добавить колонку
                    </span>
                    <PlusIcon size={18}/>
                </div>
            }
            {
                actions === ActionList.ADDCOLUMN &&
                <div className={styles.create_column_panel}>
                    <div className={styles.close}>
                        <CloseIcon className={styles.closeIcon} size={20}
                                   onClick={toggleActions(ActionList.ADDCOLUMN)}/>
                    </div>
                    <div className={styles.create_column_panel_content}>
                        <Input type={'text'}
                               onChange={value => setNewColumn({name: value})}
                               value={newColumn.name}
                               placeholder={'Имя колонки'}/>
                        <div className={styles.create_column_panel_content_button_wrapper}>
                            <Button text={'Добавить колонку'}
                                    color={ButtonStyles.habr}
                                    onClick={() => dispatch(columnActions.createColumn.request(newColumn))}/>
                        </div>
                    </div>
                </div>
            }
            {/*()=>setNewTask({column_id:column.id})*/}
            <div className={styles.category_list}>
                {board.columns?.map(column =>
                    <Category data={column}
                              key={column.id}
                              createTaskMode={toggleActions(ActionList.CREATETASK,column.id)}
                    />
                )}

            </div>
        </div>
    )
}