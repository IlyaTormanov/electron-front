import React from 'react';
import './Root.sass'
import {Route,Switch} from "react-router";
import {Main} from "./Main";
import {Registration} from "./components/pages/authorization/Registration";
import {Login} from "./components/pages/authorization/Login";
import { ConnectedRouter } from 'connected-react-router';
import {history} from "./index";



function App() {
  return (
    <div className="App">
        <ConnectedRouter history={history}>
            <Switch>
                <Route path={'/login'} component={Login}/>
                <Route path={'/registration'} component={Registration}/>
                <Route path={'/'} component={Main}/>
            </Switch>
        </ConnectedRouter>
    </div>
  );
}

export default App;
