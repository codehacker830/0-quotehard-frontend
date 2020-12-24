import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuoteSettings } from '../../actions/Data';
import { getTeamMembers } from '../../actions/Team';
import Currency from './Currency';
import Discount from './Discount';
import PricingDisplayLevel from './PricingDisplayLevel';
import SentDate from './SentDate';
import TaxMode from './TaxMode';
import UserFrom from './UserFrom';
import ValidUntil from './ValidUntil';

class QuoteSettings extends Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
      };
   }
   componentDidUpdate(prevProps, prevState) {
      const { authUser, settings } = this.props;
      if (authUser && !settings.userFrom) {
         this.props.updateQuoteSettings({ ...settings, userFrom: authUser._id })
      }
   }
   async componentDidMount() {
      await this.props.getTeamMembers();
   }
   render() {
      return (
         <div className="col-sm-6">
            <div className="pl-4 py-2" style={{ borderLeft: "4px solid #eee" }}>
               <h3>Quote Settings</h3>
               <ValidUntil />
               <div className={`mb-3 ${this.state.show ? "" : "d-none"}`}>
                  <SentDate />
                  <UserFrom />
                  <Discount />
                  <Currency />
                  <TaxMode />
                  <PricingDisplayLevel />
               </div>
               <button type="button" className={`btn btn-sm btn-outline-dark ${this.state.show ? "d-none" : ""}`} onClick={() => this.setState({ show: true })}>Show All...</button>
            </div>
         </div>
      );
   }
}

const mapStateToProps = ({ auth, mainData }) => {
   const { settings } = mainData.quote;
   const { authUser } = auth;
   return { authUser, settings };
}

const mapDispatchToProps = {
   getTeamMembers,
   updateQuoteSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(QuoteSettings);