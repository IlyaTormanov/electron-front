import * as React from 'react'
import {FunctionComponent} from "react";
import {Link} from "react-router-dom"
import styles from './Sidebar.module.sass'
import AccountCircleIcon from "mdi-react/AccountCircleIcon";
import FileTreeIcon from "mdi-react/FileTreeIcon";
import NewBoxIcon from "mdi-react/NewBoxIcon";
import ForumIcon from "mdi-react/ForumIcon";
import AccountGroupIcon from "mdi-react/AccountGroupIcon";
import CogIcon from "mdi-react/CogIcon";
import CloseCircleIcon from "mdi-react/CloseCircleIcon";
import {useSelector} from "react-redux";
import {RootState, RootStateType} from "../../../redux/root";

export interface SidebarProps {

}

export const Sidebar: FunctionComponent<SidebarProps> = () => {
    const userId=useSelector((state:RootStateType)=>state.userState.global.id)
    return (
        <div className={styles.container}>
            <div className={styles.main_links}>
                <Link to={`/main/${userId}`}>
                    <AccountCircleIcon/>
                    <span>
                     Главная
                    </span>
                </Link>

                <Link to={`/taskmanager/${userId}`}>
                    <FileTreeIcon/>
                    <span>
                    Менеджер задач
               </span>
                </Link>
                <Link to={'/news'}>
                    <NewBoxIcon/>
                    <span>
                    Новости
                </span>
                </Link>
                <Link to={'/chats'}>
                    <ForumIcon/>
                    <span>
                    Чаты
                </span>
                </Link>
                <Link to={'/groups'}>
                    <AccountGroupIcon/>
                    <span>
                    Группы
                </span>
                </Link>
            </div>
            <div className={styles.footer_links}>
                <Link to={'/settings'}>
                    <CogIcon/>
                </Link>
                <Link to={'/login'}>
                    <span>
                        Выход
                    </span>
                </Link>
            </div>
        </div>
    )
}