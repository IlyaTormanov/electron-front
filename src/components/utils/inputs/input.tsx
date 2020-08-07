import * as React from 'react'
import {FunctionComponent} from "react";
import styles from './InputStyles.module.sass'
import CachedIcon from "mdi-react/CachedIcon";

export enum InputSize{
    medium,
    full
}
export type InputProps = {
    type: 'text' | 'password' | 'email',
    onChange: (value: string) => void,
    value: string,
    placeholder: string,
    setActive?:(value:boolean)=>void,
    active?:boolean
} | {
    type: 'number',
    setActive?:(value:boolean)=>void,
    placeholder: string,
    onChange: (value: number) => void,
    value: number,
    active?:boolean
}


export const Input: FunctionComponent<InputProps> = (props) => {

    return (
        <div className={styles.default}>
            <input
                   placeholder={props.placeholder}
                   value={props.value}
                   onBlur={()=>props.setActive&&props.setActive(false)}
                   onFocus={()=>props.setActive&&props.setActive(true)}
                   onChange={(event) => props.type === 'number' ?
                       props.onChange(parseInt(event.target.value)) : props.onChange(event.target.value)
                   }
                   type={props.type}/>
            {props.active&&
            <CachedIcon
                size={15}
                color={'#939393'}
                onClick={()=>props.type === 'number'?
                    props.onChange(parseInt('')):props.onChange('')
                }/>
            }
        </div>
    )
}