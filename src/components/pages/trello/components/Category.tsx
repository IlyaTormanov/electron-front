import * as React from 'react'
import {FunctionComponent} from 'react'
import {Task} from "./Task";
import styles from './CategoryStyles.module.sass'


import {ColumnType} from "../../../../interfaces";

export interface CategoryProps {
    data:ColumnType,
    createTaskMode:()=>void
}

export const Category: FunctionComponent<CategoryProps> = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.content_left}>
                    <div>
                            {props.data.name} ({props.data.tasks.length})
                     </div>
                     {/*<DeleteForeverIcon className={styles.deleteIcon}/>*/}
                </div>
                <div className={styles.add_task} onClick={props.createTaskMode}>
                        Добавить задачу
                    {/*<PlusIcon size={13}/>*/}
                </div>

            </div>
            <div className={styles.taskList}>
                {props.data.tasks.map(task=>
                <Task data={task} key={task.id}/>
                )}

            </div>
        </div>
    )
}