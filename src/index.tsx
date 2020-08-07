import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {createBrowserHistory} from "history";
import {applyMiddleware, createStore} from "redux";
import {routerMiddleware} from "connected-react-router";
import {createEpicMiddleware} from "redux-observable";
import {composeWithDevTools} from "redux-devtools-extension";
import {RootActionType, RootEpic, RootState, RootStateType} from "./redux/root";
import {userActions} from "./redux/User/UserActions";



const epicMiddleware=createEpicMiddleware<RootActionType,RootActionType,RootStateType>();
export const history=createBrowserHistory()


export default function configureStore() {
     const store=createStore(
        RootState(history),
        composeWithDevTools(applyMiddleware(epicMiddleware,routerMiddleware(history)))
    );
    epicMiddleware.run(RootEpic)
    return store
}

export const store=configureStore();
const userData=localStorage.getItem('user');
if(userData){
    try{
        store.dispatch(userActions.global(JSON.parse(userData)))
    }
    catch (e) {
        console.error(e,'Произошла ошибка')
    }
}


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
            <App/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
