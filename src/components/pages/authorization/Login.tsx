import * as React from 'react'
import {FunctionComponent, useCallback} from "react";
import {Input} from "../../utils/inputs/input";
import {useSetState} from "react-use";
import {LoginType} from "../../../interfaces";
import {useDispatch} from "react-redux";
import {loginAction} from "../../../redux/Authorization/login/Login";

export const Login:FunctionComponent=()=>{
    const [data,setData]=useSetState<LoginType>({email: "", password: ""})
    const dispatch=useDispatch();
    const submit=useCallback(()=>{
        dispatch(loginAction.request(data))
    },[data,dispatch])
    return(
        <div>
            <Input type={'email'} onChange={value =>setData({email:value}) } value={data.email} placeholder={'Ваш email'}/>
            <Input type={'password'} onChange={value => setData({password:value})} value={data.password} placeholder={'Пароль'}/>
            <button onClick={submit}>
                отправить
            </button>
        </div>
    )
}