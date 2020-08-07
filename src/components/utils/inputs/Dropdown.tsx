import * as React from 'react'
import styles from './DropdownStyles.module.sass'

export interface DropdownProps<T>{
    data:T[],
    onClick:(item:T)=>void,
    render:(v:T)=>JSX.Element,
    itemToKey:(key:T)=>number|string
}

export function Dropdown<T>(props:DropdownProps<T>){
    return(
        <div className={styles.container}>
            {props.data.map(item=>
                <div key={props.itemToKey(item)} className={styles.child}    onClick={()=>props.onClick(item)} >
                    {props.render(item)}
                </div>
            )}
        </div>
    )
}