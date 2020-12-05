import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuoteSettings } from '../../../../../actions/Data';
import { getTeamMembers } from '../../../../../actions/Team';
import { parseDate, parseTime } from '../../../../../util';
import Currency from './Currency';
import Discount from './Discount';
import PricingDisplayLevel from './PricingDisplayLevel';
import SentDate from './SentDate';
import TaxMode from './TaxMode';
import UserFrom from './UserFrom';

class QuoteSettings extends Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
         teamMembers: [],

         validDate: parseDate(this.props.settings.validUntil),
         validTime: parseTime(this.props.settings.validUntil),
         sentDate: parseDate(this.props.settings.sentAt),
         sentTime: parseTime(this.props.settings.sentAt),
      };
   }
   componentDidUpdate(prevProps, prevState) {
      const { authUser, settings } = this.props;
      if (authUser && !settings.userFrom) {
         this.props.updateQuoteSettings({ ...settings, userFrom: authUser._id })
      }
   }
   componentDidMount() {
      this.props.getTeamMembers();
   }

   updateValidDate = (val) => this.setState({ validDate: val });
   updateValidTime = (val) => this.setState({ validTime: val });


   render() {
      const { authUser, teamSetting, settings } = this.props;
      console.log(" Quote Settings =>", this.props.settings);
      console.log(" authUser =>", authUser);
      return (
         <div className="col-sm-6">
            <div
               className="pl-4 py-2"
               style={{ borderLeft: "4px solid #eee" }}
            >
               <h3>Quote Settings</h3>
               <div className="pb-2">
                  <label htmlFor="_expiry_date_date" className="text-gray fa-xs text-uppercase">Valid Until</label>
                  <div className="d-flex">
                     <div className="w-75 pr-2">
                        <input type="text"
                           id="_expiry_date_date"
                           className="form-control mr-2 rounded-0"
                           value={this.state.validDate}
                           onChange={(ev) => this.updateValidDate(ev.target.value)}
                        />
                        <label htmlFor="_expiry_date_date" className="text-info fa-xs">YYYY/MM/DD</label>
                     </div>
                     <div>
                        <input type="text"
                           id="_expiry_date_time"
                           className="form-control rounded-0"
                           value={this.state.validTime}
                           onChange={(ev) => this.updateValidTime(ev.target.value)}
                        />
                        <label htmlFor="_expiry_date_time" className="text-info fa-xs">HH:mm</label>
                     </div>
                  </div>
               </div>
               <div className={`mb-3 ${this.state.show ? "" : "d-none"}`}>
                  <SentDate />
                  <UserFrom />
                  <Discount />
                  <Currency />
                  <TaxMode />
                  <PricingDisplayLevel />
               </div>
               <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => this.setState({ show: !this.state.show })}>{this.state.show ? "Hide" : "Show All..."}</button>

            </div>
         </div>
      );
   }
}

const mapStateToProps = ({ auth, teamSetting, mainData }) => {
   const { settings } = mainData.quote;
   const { authUser } = auth;
   return { authUser, teamSetting, settings };
}

const mapDispatchToProps = { getTeamMembers, updateQuoteSettings };
export default connect(mapStateToProps, mapDispatchToProps)(QuoteSettings);