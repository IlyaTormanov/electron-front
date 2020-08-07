import * as React from 'react'
import {FunctionComponent, useState} from "react";
import styles from './AvatarStyles.module.sass'
import classNames from "classnames";


export enum UserStatus{
    online,
    chill
}
export interface AvatarProps {
    src?: string,
    initials?: string,
    status?:UserStatus
}

let cn=classNames.bind(styles)
export const Avatar: FunctionComponent<AvatarProps> = (props) => {

    const className=cn(styles.status,{
        [styles.online]:props.status===UserStatus.online,
        [styles.chill]:props.status===UserStatus.chill
    })
    return (
        <div className={styles.container}>
            <span className={className}/>
            {
                props.src ?
                    <img src={props.src}/> :
                    <div>
                        {props.initials}
                    </div>
            }
        </div>
    )
}