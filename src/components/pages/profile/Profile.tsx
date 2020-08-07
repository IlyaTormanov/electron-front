import * as React from 'react'
import {FunctionComponent, useEffect} from "react";
import styles from './ProfileStyles.module.sass'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../../redux/User/UserActions";
import {RootStateType} from "../../../redux/root";
import avatar from '../../../assets/images/avatar.jpg'
import fon from '../../../assets/images/f398ff3fb1a0330b74c23f0106904a9b.jpg'
export interface ProfileProps{

}

export const Profile:FunctionComponent<ProfileProps>=(props)=>{
    const slug=useParams<{id:string}>();
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(userActions.fetchUser.request(slug.id))
    },[dispatch]);

    const user=useSelector((state:RootStateType)=>state.userState.currentUser)
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left} style={{background:`url(${fon}) repeat scroll 50% 30%`}}>
                    <img src={avatar} className={styles.avatar}/>
                </div>
                <div className={styles.right}>
                    <div className={styles.row}>
                        Илья Торманов
                    </div>
                    <div className={styles.row}>
                        Мой статус!
                    </div>
                    <div className={styles.row}>
                        Телефон : +375255428914
                    </div>
                    <div className={styles.row}>
                        Пол: мужской
                    </div>
                    <div className={styles.row}>
                        Город: Гомель
                    </div>
                    <div className={styles.row}>
                         Увлечения : пиво
                    </div>
                </div>
            </div>

        </div>  
    )
}