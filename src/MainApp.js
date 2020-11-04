import React from 'react';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import ReduxToastr from 'react-redux-toastr';
import { ToastContainer } from 'react-toastify';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { toastrDefaultConfig } from './util/toastrConfig';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore, { history } from "./store";
import App from "./containers/App";

import 'react-toastify/dist/ReactToastify.css';
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
         <ToastContainer autoClose={3000} />
         <ReduxToastr
            timeOut={toastrDefaultConfig.timeOut}
            newestOnTop={toastrDefaultConfig.newestOnTop}
            preventDuplicates={toastrDefaultConfig.preventDuplicates}
            position={toastrDefaultConfig.position}
            getState={(state) => {
               return state.toastr
            }}
            transitionIn={toastrDefaultConfig.transitionIn}
            transitionOut={toastrDefaultConfig.transitionOut}
            progressBar={toastrDefaultConfig.progressBar}
            closeOnToastrClick={toastrDefaultConfig.closeOnToastrClick}
         />
      </Provider>
   );
}

export default MainApp;
