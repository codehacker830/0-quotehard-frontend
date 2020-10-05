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

      let isBgGray = false;
      if (
         location.pathname === "/app/quotes"
         || location.pathname === "/app/c/contacts"
         || location.pathname.includes("/app/c/contacts/view/")
         || location.pathname === "/app/content/templates"
         || location.pathname === "/app/content/item-price/browse"
         || location.pathname === "/app/content/item-text/browse"
         || location.pathname === "/app/content/item-text/browse"

      ) isBgGray = true;
      return (
         <main id="main-container" className={isBgGray ? "" : "bg-white"}>
            <Header />
            <Switch>
               <Route exact path="/app" component={asyncComponent(() => import("./routes/Dashboard"))} />
               <Route exact path="/app/quotes" component={asyncComponent(() => import("./routes/Quotes"))} />

               <Route exact path="/app/quote/get" component={asyncComponent(() => import("./routes/GetQuote"))} />
               <Route exact path="/app/quote/:id" component={asyncComponent(() => import("./routes/GetQuote"))} />

               <Route exact path="/app/c/contacts" component={asyncComponent(() => import("./routes/Contacts"))} />
               <Route exact path="/app/c/contacts/edit/:id" component={asyncComponent(() => import("./routes/EditContact"))} />
               <Route exact path="/app/c/contacts/view/:id" component={asyncComponent(() => import("./routes/ViewContact"))} />


               <Route path="/app/content" component={asyncComponent(() => import("./routes/Templates"))} />
               <Route path="/app/settings">
                  <Switch>
                     <Route exact path="/app/settings" component={asyncComponent(() => import("./routes/Settings"))} />
                     {/* Right section */}
                     <Route exact path="/app/settings/profile" component={asyncComponent(() => import("./routes/Settings/Profile"))} />

                     {/* Left section */}
                     <Route exact path="/app/settings/quote/appearance" component={asyncComponent(() => import("./routes/Settings"))} />
                     <Route exact path="/app/settings/quote/defaults" component={asyncComponent(() => import("./routes/Settings/QuoteDefaults"))} />

                     <Route exact path="/app/settings/customer-emails" component={asyncComponent(() => import("./routes/Settings"))} />
                     <Route exact path="/app/settings/sales-tax-categories" component={asyncComponent(() => import("./routes/Settings/SalesTaxCategories"))} />
                     <Route exact path="/app/settings/team" component={asyncComponent(() => import("./routes/Settings/Team"))} />
                     <Route exact path="/app/settings/billing-overview" component={asyncComponent(() => import("./routes/Settings/BillingOverview"))} />
                     <Route exact path="/app/settings/account-information" component={asyncComponent(() => import("./routes/Settings/AccountInformation"))} />
                     <Route exact path="/app/settings/your-data" component={asyncComponent(() => import("./routes/Settings"))} />

                     <Route exact path="/app/settings/sales-category/:id" component={asyncComponent(() => import("./routes/Settings/SalesCategory"))} />
                     <Route exact path="/app/settings/sales-tax/:id" component={asyncComponent(() => import("./routes/Settings/SalesTax"))} />

                     <Route exact path="/app/settings/payment-details" component={asyncComponent(() => import("./routes/Settings/PaymentDetails"))} />
                     
                  </Switch>
               </Route>
            </Switch>
            {/* <Footer /> */}
         </main>
      );
   }
}