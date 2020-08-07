import * as React from 'react'
import {FunctionComponent} from "react";
import styles from './TagStyles.module.sass'

export interface TagProps{

}

export const Tag:FunctionComponent<TagProps>=()=>{
    return(
        <div className={styles.tag}>
            С++
        </div>
    )
}