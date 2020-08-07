import * as React from 'react'
import {FunctionComponent} from "react";
import styles from './Popup.module.sass'

export interface PopupProps<T>{
    render:(props:T)=>JSX.Element
}

export function Popup<T>(props:PopupProps<T>){
    return(
        <div className={styles.page_wrapper}>
            <div className={styles.popup}>
                {props.render}
            </div>
        </div>
    )
}