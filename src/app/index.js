import React, { Component } from 'react';
import Header from '../components/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../util/asyncComponent';
import { connect } from 'react-redux';
import Error404 from '../components/Error404';

function QuoteRoutes() {
   return (
      <Switch>
         <Route path="/app/quote/get" component={asyncComponent(() => import("./routes/GetQuote"))} />
         <Route path="/app/quote/get/duplicate/:id" component={asyncComponent(() => import("./routes/GetQuote"))} />
         <Route path="/app/quote/get/from-template/:id" component={asyncComponent(() => import("./routes/GetQuote"))} />
         <Route path="/app/quote/:id" component={asyncComponent(() => import("./routes/GetQuote"))} />
      </Switch>
   )
}

function ContactRoutes() {
   return (
      <Switch>
         <Route exact path="/app/c/contacts" component={asyncComponent(() => import("./routes/Contacts"))} />
         <Route exact path="/app/c/contacts/create/:category" component={asyncComponent(() => import("./routes/CreateContact"))} />
         <Route exact path="/app/c/contacts/edit/:id" component={asyncComponent(() => import("./routes/EditContact"))} />
         <Route exact path="/app/c/contacts/view/:id" component={asyncComponent(() => import("./routes/ViewContact"))} />
      </Switch>
   )
}

class AppRoot extends Component {
   render() {
      const { match, location, authUser, accountCompany } = this.props;

      let isBgGray = false;
      if (
         location.pathname === "/app/quotes"
         || location.pathname === "/app/c/contacts"
         || location.pathname.includes("/app/c/contacts/create/")
         || location.pathname.includes("/app/c/contacts/view/")
         || location.pathname.includes("/app/c/contacts/edit/")
         || location.pathname.includes("/app/settings/customer-email-change/")
         || location.pathname === "/app/content/templates"
         || location.pathname === "/app/content/item-price/browse"
         || location.pathname === "/app/content/item-text/browse"
      ) isBgGray = true;

      if (!authUser || !accountCompany) return <>Loading...</>;
      else return (
         <main id="main-container" className={isBgGray ? "bg-app" : "bg-white"}>
            <Header />
            <Switch>
               <Route exact path="/app" component={asyncComponent(() => import("./routes/Dashabord"))} />
               <Route exact path="/app/quotes" component={asyncComponent(() => import("./routes/Quotes"))} />

               <Route path="/app/quote" component={QuoteRoutes} />
               <Route path="/app/c" component={ContactRoutes} />

               <Route path="/app/content" component={asyncComponent(() => import("./routes/Templates"))} />
               <Route path="/app/settings" component={asyncComponent(() => import("./routes/Settings"))} />
               <Route path="/app/add-ons" component={asyncComponent(() => import("./routes/AddOns"))} />
               
               <Route component={Error404} />
            </Switch>
         </main>
      );
   }
}
const mapStateToProps = ({ auth }) => {
   const { authUser, accountCompany } = auth;
   return { authUser, accountCompany }
}
export default connect(mapStateToProps)(AppRoot);