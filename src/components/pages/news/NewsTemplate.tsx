import * as React from 'react'
import {FunctionComponent} from "react";
import styles from './NewsTemplateStyles.module.sass'
import {Avatar} from "../../utils/Images/Avatar";
import img from '../../../assets/images/avatar.jpg'
export interface NewsTemplateProps{

}

export const NewsTemplate:FunctionComponent<NewsTemplateProps>=(props)=>{
    return(
        <div className={styles.template}>
            <div className={styles.header}>
                <Avatar/>
                <div className={styles.date}>
                        6 минут назад
                </div>
            </div>
            <div className={styles.content}>
                Вы знали, что большинство алгоритмических проблем можно свести к нескольким основным парадигмам?
                В нашем материале читайте про 4 основные алгоритмические парадигмы с примерами реализации на C++.
            </div>
            <div className={styles.img}>
                <img src={img}/>
            </div>
            <div className={styles.footer}>
                
            </div>
        </div>
    )
}