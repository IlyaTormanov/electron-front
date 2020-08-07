import * as React from 'react'
import {FunctionComponent, ReactNode} from "react";
import classNames from "classnames";
import styles from './ButtonStyles.module.sass'




export enum ButtonStyles{
    'red',
    'habr',
    'border'
}

export interface ButtonProps{
color?:ButtonStyles,
text:string,
onClick:()=>void,
icon?:{
    content:JSX.Element,
    position?:string
},
}

let cn=classNames.bind(styles)
export const Button:FunctionComponent<ButtonProps>=(props)=>{
    const classes=cn(styles.default,{
        [styles.red]:props.color===ButtonStyles.red,
        [styles.habr]:props.color===ButtonStyles.habr,
        [styles.border]:props.color===ButtonStyles.border
    })
    return(
        <button className={classes} onClick={props.onClick}>
            {
                props.icon?.content
            }
            <span>
                {
                    props.text
                }
            </span>
        </button>
    )
}