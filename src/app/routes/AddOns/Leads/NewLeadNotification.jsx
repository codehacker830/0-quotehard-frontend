import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../../components/NavCrump';

export default class NewLeadNotification extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isEmailLeadCopyToAccountOwnerChecked: false,
         isEmailLeadCopyToOtherEmailsChecked: false,
         emailAddressStr: "",
      }
   }
   onHandleSubmit = () => {
      // this.state.emailAddressStr;
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/add-ons/leads`}>
               Leads
            </NavCrump>
            <div className="content">
               <h2 className="my-4">New Lead Notification</h2>
               <div className="form-group maxWidth-800 ml-2 mb-5">
                  <div className="form-check mb-2">
                     <input className="form-check-input"
                        type="checkbox"
                        id="emailLeadCopyToAccountOwner" name="emailLeadCopyToAccountOwner"
                        checked={this.state.isEmailLeadCopyToAccountOwnerChecked}
                        onChange={() => this.setState({ isEmailLeadCopyToAccountOwnerChecked: !this.state.isEmailLeadCopyToAccountOwnerChecked })}
                     />
                     <span className="form-check-label" htmlFor="emailLeadCopyToAccountOwner">Send notification to: Account Owner (userName)</span>
                  </div>
                  <div className="form-check">
                     <input className="form-check-input"
                        type="checkbox"
                        id="emailLeadCopyToOtherEmails" name="emailLeadCopyToOtherEmails"
                        checked={this.state.isEmailLeadCopyToOtherEmailsChecked}
                        onChange={() => this.setState({ isEmailLeadCopyToOtherEmailsChecked: !this.state.isEmailLeadCopyToOtherEmailsChecked })}
                     />
                     <span className="form-check-label mb-2" htmlFor="emailLeadCopyToOtherEmails">Other email address…</span>
                     <div className={`mt-2 ${this.state.isEmailLeadCopyToOtherEmailsChecked ? "" : "d-none"}`}>
                        <input type="text" id="otherEmailAddresses" className="form-control rounded-0"
                           placeholder="somebody@your-company.com"
                           value={this.state.emailAddressStr}
                           onChange={(ev) => this.setState({ emailAddressStr: ev.target.value })} />
                        <label htmlFor="otherEmailAddresses" className="text-gray fa-xs">Use a comma to separate multiple email addresses.</label>
                     </div>
                  </div>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-2" onClick={this.onHandleSubmit}>Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={`/app/add-ons/leads`}>Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}