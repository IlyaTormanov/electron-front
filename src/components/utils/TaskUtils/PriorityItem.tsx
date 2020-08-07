import * as React from 'react'
import {FunctionComponent, useMemo} from "react";
import styles from './PriorityItemStyles.module.sass'
import classNames from "classnames";



export enum DeadLine{
    soon=1,
    start=2,
    nevermind=3,
    overdue=4,
}

export interface PriorityItemProps{
deadline:number
}

let cn=classNames.bind(styles)

export const PriorityItem:FunctionComponent<PriorityItemProps>=(props)=>{

    const deadlineValue=()=>{
        if(props.deadline==DeadLine.soon){
            return 'Скоро'
        }
        else if(props.deadline==DeadLine.start){
            return 'Старт'
        }
        else if(props.deadline==DeadLine.nevermind){
            return 'Неважно'
        }
        else{
            return 'Просрочено'
        }
    }

    let classes=cn(styles.default,{
        [styles.dangerous]:props.deadline==DeadLine.soon,
        [styles.start]:props.deadline==DeadLine.start,
        [styles.nevermind]:props.deadline==DeadLine.nevermind,
        [styles.overdue]:props.deadline==DeadLine.overdue
    })
    return(
        <div className={classes}>
            {deadlineValue()}
        </div>
    )
}