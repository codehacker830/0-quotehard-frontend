import React from 'react';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore, { history } from "./store";
import App from "./containers/App";

import './styles/app.scss';

export const store = configureStore();

const MainApp = () => {
   return (
      <Provider store={store}>
         <Router>
            <Switch>
               <Route path="/" component={App} />
            </Switch>
         </Router>
      </Provider>
   );
}

export default MainApp;
