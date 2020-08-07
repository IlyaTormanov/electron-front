import * as React from 'react'
import {FunctionComponent} from "react";
import styles from './TextareaStyles.module.sass'
export interface TextareaProps{
    value:string
    onChange:(value:string)=>void,
    placeholder?:string
}

export const Textarea:FunctionComponent<TextareaProps>=(props)=>{
    return(
        <div className={styles.container}>
            {
                props.placeholder&&
                    <div className={styles.placeholder}>{props.placeholder}</div>
            }
            <textarea value={props.value} onChange={event => props.onChange(event.target.value)}/>

        </div>
    )
}