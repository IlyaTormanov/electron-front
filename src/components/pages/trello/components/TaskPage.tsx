import * as React from 'react'
import {FunctionComponent, useEffect} from "react";
import styles from './TaskPageStyles.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {taskActions} from "../../../../redux/TaskManager/Task/Task";
import {RootStateType} from "../../../../redux/root";

export interface TaskPageProps{

}

export const TaskPage:FunctionComponent<TaskPageProps>=()=>{
    const slug=useParams<{task_id:string}>();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(taskActions.fetchTask.request(slug.task_id))
    },[dispatch])


    const task=useSelector((state:RootStateType)=>state.taskState.task)
    return(
        <div className={styles.container}>
            <div className={styles.task}>
                {task.name}

                <div>

                </div>
            </div>
        </div>
    )
}