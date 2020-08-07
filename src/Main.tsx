import * as React from 'react'
import {FunctionComponent, useEffect, useState} from "react";
import {Sidebar} from "./components/pages/static/sidebar";
import {Route, Switch} from "react-router";
import {Board} from "./components/pages/trello/Board";
import {News} from "./components/pages/news/News";
import {useDispatch} from "react-redux";
import {userActions} from "./redux/User/UserActions";
import {boardActions} from "./redux/TaskManager/Board/Board";
import styles from './MainStyles.module.sass'
import {TaskManager} from "./components/pages/trello/TaskManager";
import {Profile} from "./components/pages/profile/Profile";
import {TaskPage} from "./components/pages/trello/components/TaskPage";



export const ButtonContext=React.createContext('black')


export const Main:FunctionComponent=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(userActions.fetchAllUsers.request())
    },[dispatch])
    return(
    <div  className={styles.container}>
        <Sidebar/>
        <div className={styles.content}>
            <Switch>

                <Route path={'/taskmanager/:id/board/:boardId'} component={Board}/>
                <Route path={'/task/:task_id'} component={TaskPage}/>
                <Route path={'/taskmanager/:id'} component={TaskManager}/>
                <Route path={'/news'} component={News}/>
                <Route path={'/main/:id'} component={Profile}/>
            </Switch>
        </div>
    </div>
    )
}