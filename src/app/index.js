import React, { Component } from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../util/asyncComponent';

export default class AppRoot extends Component {
   render() {
      const { match, location } = this.props;
      console.log("this.props = ", this.props);

      let isWhite = false;
      if (
         location.pathname === "/app"
         || location.pathname === "/app/content/template/get"
         || location.pathname === "/app/content/item-text/create-new"
         || location.pathname === "/app/content/item-price/create-new"
      ) isWhite = true;
      return (
         <main id="main-container" className={isWhite ? "bg-white" : ""}>
            <Header />
            <Switch>
               <Route exact path="/app" component={asyncComponent(() => import("./routes/Dashboard"))} />
               <Route exact path="/app/quotes" component={asyncComponent(() => import("./routes/Quotes"))} />
               <Route exact path="/app/c/contacts" component={asyncComponent(() => import("./routes/Contacts"))} />
               <Route path="/app/content" component={asyncComponent(() => import("./routes/Templates"))} />
            </Switch>
            {/* <Footer /> */}
         </main>
      );
   }
}