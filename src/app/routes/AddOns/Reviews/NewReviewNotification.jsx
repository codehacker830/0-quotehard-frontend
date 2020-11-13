import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../../components/NavCrump';

export default class NewReviewNotification extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isReviewNotificationToAuthorChecked: false,
         isReviewNotificationToOtherEmailsChecked: false,
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
               <h2 className="my-4">New Review Notification</h2>
               <div className="form-group maxWidth-800 ml-2 mb-5">
                  <div className="form-check mb-2">
                     <input className="form-check-input"
                        type="checkbox"
                        id="reviewNotificationToAuthor" name="reviewNotificationToAuthor"
                        checked={this.state.isReviewNotificationToAuthorChecked}
                        onChange={() => this.setState({ isReviewNotificationToAuthorChecked: !this.state.isReviewNotificationToAuthorChecked })}
                     />
                     <span className="form-check-label" htmlFor="reviewNotificationToAuthor">Send notification to the original Quote Author</span>
                  </div>
                  <div className="form-check">
                     <input className="form-check-input"
                        type="checkbox"
                        id="reviewNotificationToOtherEmails" name="reviewNotificationToOtherEmails"
                        checked={this.state.isReviewNotificationToOtherEmailsChecked}
                        onChange={() => this.setState({ isReviewNotificationToOtherEmailsChecked: !this.state.isReviewNotificationToOtherEmailsChecked })}
                     />
                     <span className="form-check-label mb-2" htmlFor="reviewNotificationToOtherEmails">Other email address…</span>
                     <div className={`mt-2 ${this.state.isReviewNotificationToOtherEmailsChecked ? "" : "d-none"}`}>
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