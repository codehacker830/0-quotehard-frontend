import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore, { history } from "./store";
import App from "./containers/App";

import 'react-toastify/dist/ReactToastify.css';
import './styles/app.scss';
import './styles/quotient.scss';
import { STRIPE_PUBLISHABLE_KEY } from './constants/Key';

export const store = configureStore();

console.log("process.env.NODE_ENV ===>", process.env.NODE_ENV)
console.log("STRIPE_PUBLISHABLE_KEY ===>", STRIPE_PUBLISHABLE_KEY)
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const MainApp = () => {
   return (
      <Provider store={store}>
         <Router>
            <Elements stripe={stripePromise}>
               <Switch>
                  <Route path="/" component={App} />
               </Switch>
            </Elements>
         </Router>
         <ToastContainer autoClose={3000} />
      </Provider>
   );
}

export default MainApp;
