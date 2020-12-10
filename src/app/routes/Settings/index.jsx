import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getTeamMembers } from '../../../actions/Team';
import Team from './Team';
import asyncComponent from '../../../util/asyncComponent';

class Settings extends Component {
   componentDidMount() {
      this.props.getTeamMembers();
   }
   render() {
      return (
         <Switch>
            <Route exact path="/app/settings" component={asyncComponent(() => import("./Dashboard"))} />
            <Route exact path="/app/settings/quick-start" component={asyncComponent(() => import("./QuickStart"))} />
            {/* Right section */}
            <Route exact path="/app/settings/profile" component={asyncComponent(() => import("./Profile"))} />

            {/* Left section */}
            <Route exact path="/app/settings/quote/appearance" component={asyncComponent(() => import("./Appearance"))} />
            <Route exact path="/app/settings/quote/defaults" component={asyncComponent(() => import("./QuoteDefaults"))} />

            <Route exact path="/app/settings/customer-emails" component={asyncComponent(() => import("./CustomerEmails"))} />
            <Route exact path="/app/settings/customer-email-change/:id" component={asyncComponent(() => import("./CustomerEmailChange"))} />
            <Route exact path="/app/settings/sales-tax-categories" component={asyncComponent(() => import("./SalesTaxCategories"))} />
            <Route path="/app/settings/team" component={Team} />

            <Route exact path="/app/settings/billing-overview" component={asyncComponent(() => import("./BillingOverview"))} />
            <Route exact path="/app/settings/account-information" component={asyncComponent(() => import("./AccountInformation"))} />
            <Route exact path="/app/settings/your-data" component={asyncComponent(() => import("./YourData"))} />

            <Route exact path="/app/settings/sales-category/create-new" component={asyncComponent(() => import("./SalesCategory"))} />
            <Route exact path="/app/settings/sales-category/:id" component={asyncComponent(() => import("./SalesCategory"))} />

            <Route exact path="/app/settings/sales-tax/create-new" component={asyncComponent(() => import("./SalesTax"))} />
            <Route exact path="/app/settings/sales-tax/:id" component={asyncComponent(() => import("./SalesTax"))} />

            <Route exact path="/app/settings/payment-details" component={asyncComponent(() => import("./PaymentDetails"))} />
         </Switch>
      );
   }
}

const mapDispatchToProps = { getTeamMembers };
export default connect(() => ({}), mapDispatchToProps)(Settings)