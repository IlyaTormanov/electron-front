import * as React from 'react'
import {FunctionComponent} from 'react'
import styles from './TaskStyles.module.sass'
import {Avatar, UserStatus} from "../../../utils/Images/Avatar";
import img from '../../../../../src/assets/images/avatar.jpg'
import {Tag} from "../../../utils/Tags/Tag";
import {PriorityItem} from "../../../utils/TaskUtils/PriorityItem";
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import {TaskType} from "../../../../interfaces";
import {Link} from "react-router-dom";


export interface TaskProps {
data:TaskType
}

export const Task: FunctionComponent<TaskProps> = (props) => {
    return (
        // <Link to={`/task/${props.data.id}`}>
        <div className={styles.container}>

            {/*// style={{borderLeft:props.data.priorityStatus===1?'3px solid #cb3837':"1px solid #e6e7eb"}}*/}
            <div className={styles.creator}>
                <Avatar src={img}  status={UserStatus.online}/>
            </div>
            <div className={styles.task_description}>
                <span>
                    {props.data.name}
                </span>
                <Tag />
            </div>
            <div className={styles.subscribers}>
                <Avatar src={img} status={UserStatus.chill} />
                <Avatar src={img} status={UserStatus.online}/>
                <Avatar src={img} />
                <span className={styles.total_subs}>
                    {props.data.total_users}
                </span>
            </div>
            <div className={styles.target}>
                {props.data.target}
            </div>
            <PriorityItem deadline={props.data.status}/>
            <div>
                {props.data.description}
            </div>
            <DotsVerticalIcon onClick={()=>alert('syka')}/>
        </div>

    )

}