import React from 'react';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore, { history } from "./store";
import App from "./containers/App";

import 'react-toastify/dist/ReactToastify.css';
import './styles/app.scss';
import './styles/quotient.scss';

export const store = configureStore();

const MainApp = () => {
   return (
      <Provider store={store}>
         <Router>
            <Switch>
               <Route path="/" component={App} />
            </Switch>
         </Router>
         <ToastContainer autoClose={3000} />
      </Provider>
   );
}

export default MainApp;
