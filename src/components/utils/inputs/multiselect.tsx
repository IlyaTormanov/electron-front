import * as React from 'react'
import {Input} from "./input";
import {Dropdown} from "./Dropdown";
import {useState} from "react";


export interface MultiSelectProps<T,S> {
    render: (value: T) => JSX.Element,
    data:T[]
    itemToKey:(key:T)=>number|string
    onClick:(arg:T)=>void,
    selected:S[]|number
    onChange:(value:string)=>void,
    typingValue:string,

}

export function MultiSelect<T,S>(props: MultiSelectProps<T,S>) {
    const [active,setActive]=useState(false)
    return (
        <div>
            <Input type={'text'}
                   onChange={props.onChange}
                   active={active}
                   value={props.typingValue} placeholder={'Введите имя пользователя'}
                   setActive={value => setActive(value)}/>

            <Dropdown data={props.data} onClick={item => props.onClick(item)} render={v => props.render(v)} itemToKey={key => props.itemToKey(key)}/>


        </div>
    )
}