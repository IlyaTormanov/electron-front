import * as React from 'react'
import {FunctionComponent, useCallback, useState} from "react";
import {Input} from "../../utils/inputs/input";
import {Button} from "../../utils/button/Button";
import {RegistrationType} from "../../../interfaces";
import {useSetState} from "react-use";
import {useDispatch} from "react-redux";
import {registrationActions} from "../../../redux/Authorization/registration/Registration";



const registrationData:RegistrationType={

    email: "",
    firstName: "",
    password: "",
    secondName: ""

}
export const Registration:FunctionComponent=()=>{
    const [data,setData]=useSetState<RegistrationType>(registrationData);
    const dispatch=useDispatch()
    const submitData=useCallback(()=>{
        dispatch(registrationActions.request(data))
        console.log('ewf')
    },[data,dispatch])
    return(
        <div>
            <Input type={'text'}
                   onChange={value => setData({firstName:value})}
                   value={data.firstName}
                   placeholder={'Имя'}/>
            <Input type={'text'}
                   onChange={value => setData({secondName:value})}
                   value={data.secondName}
                   placeholder={'Фамилия'}/>
            <Input type={'email'}
                   onChange={value => setData({email:value})}
                   value={data.email}
                   placeholder={'Ваш email'}/>
            <Input type={'password'}
                   onChange={value => setData({password:value})}
                   value={data.password}
                   placeholder={'Пароль'}/>

            <div onClick={()=>submitData()}>
                Завершить
            </div>
        </div>
    )
}