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
         || location.pathname === "/app/quote/get"
         || location.pathname === "/app/content/template/get"
         || location.pathname === "/app/content/item-text/create-new"
         || location.pathname === "/app/content/item-price/create-new"
         || location.pathname.includes("/app/settings")
      ) isWhite = true;
      return (
         <main id="main-container" className={isWhite ? "bg-white" : ""}>
            <Header />
            <Switch>
               <Route exact path="/app" component={asyncComponent(() => import("./routes/Dashboard"))} />
               <Route exact path="/app/quotes" component={asyncComponent(() => import("./routes/Quotes"))} />
               <Route exact path="/app/quote/get" component={asyncComponent(() => import("./routes/GetQuote"))} />
               <Route exact path="/app/c/contacts" component={asyncComponent(() => import("./routes/Contacts"))} />
               <Route exact path="/app/c/contacts/edit/new-person" component={asyncComponent(() => import("./routes/GetContact"))} />
               
               <Route path="/app/content" component={asyncComponent(() => import("./routes/Templates"))} />
               <Route path="/app/settings" component={asyncComponent(() => import("./routes/Settings"))} />
            </Switch>
            {/* <Footer /> */}
         </main>
      );
   }
}