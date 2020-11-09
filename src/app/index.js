import React, { Component } from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../util/asyncComponent';
import { connect } from 'react-redux';

class AppRoot extends Component {

   componentWillReceiveProps(nextProps) {
      console.log(" NEXT PROPS => ", nextProps);
      // if (nextProps.authUser) {
      //     const { email_verified_at, plan_id } = nextProps.authUser;
      //     if (email_verified_at === null) this.props.history.push('/verification');
      //     if (plan_id === null) this.props.history.push('/subscription');
      // }
   }
   render() {
      const { match, location } = this.props;
      console.log("this.props = ", this.props);

      let isBgGray = false;
      if (
         location.pathname === "/app/quotes"
         || location.pathname === "/app/c/contacts"
         || location.pathname.includes("/app/c/contacts/create/")
         || location.pathname.includes("/app/c/contacts/view/")
         || location.pathname.includes("/app/c/contacts/edit/")
         || location.pathname === "/app/content/templates"
         || location.pathname === "/app/content/item-price/browse"
         || location.pathname === "/app/content/item-text/browse"

      ) isBgGray = true;
      return (
         <main id="main-container" className={isBgGray ? "" : "bg-white"}>
            <Header />
            <Switch>
               <Route exact path="/app" component={asyncComponent(() => import("./routes/Dashabord/index"))} />
               <Route exact path="/app/quotes" component={asyncComponent(() => import("./routes/Quotes"))} />

               <Route exact path="/app/quote/get" component={asyncComponent(() => import("./routes/GetQuote"))} />
               <Route exact path="/app/quote/get/from-template/:id" component={asyncComponent(() => import("./routes/GetQuote"))} />
               <Route exact path="/app/quote/:id" component={asyncComponent(() => import("./routes/GetQuote"))} />

               <Route exact path="/app/c/contacts" component={asyncComponent(() => import("./routes/Contacts"))} />
               <Route exact path="/app/c/contacts/create/:category" component={asyncComponent(() => import("./routes/CreateContact"))} />
               <Route exact path="/app/c/contacts/edit/:id" component={asyncComponent(() => import("./routes/EditContact"))} />
               <Route exact path="/app/c/contacts/view/:id" component={asyncComponent(() => import("./routes/ViewContact"))} />


               <Route path="/app/content" component={asyncComponent(() => import("./routes/Templates"))} />
               <Route path="/app/settings" component={asyncComponent(() => import("./routes/Settings"))} />
               <Route path="/app/add-ons" component={asyncComponent(() => import("./routes/AddOns"))} />
            </Switch>
            {/* <Footer /> */}
         </main>
      );
   }
}
const mapStateToProps = ({ auth }) => {
   const { authUser } = auth;
   return { authUser }
}
export default connect(mapStateToProps)(AppRoot);