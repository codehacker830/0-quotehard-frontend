import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';
import clsx from 'clsx';
import axios from '../../../util/Api';
import { toast } from 'react-toastify';
import { updateEmailNotificationSetting } from '../../../actions';
import { connect } from 'react-redux';

const extractEmails = (words) => {
   const pWords = words.map(word => {
      const pStr = word.trim();
      if (pStr) return pStr;
      else return null;
   });
   return pWords.filter(wd => wd !== null)
}
const makeStrFromEmails = (emails) => {
   let str = "";
   if (Array.isArray(emails)) {
      for (let i = 0; i < emails.length; i++) {
         str += emails[i];
         if (i === emails.length - 1) str += "";
         else str += ", ";
      }
      return str;
   } else return "";
}

const filterInvalidEmailsArray = (emailArr) => {
   let invalidEmails = [];
   if (Array.isArray(emailArr)) {
      for (let i = 0; i < emailArr.length; i++) {
         if (!emailIsValid(emailArr[i])) invalidEmails.push(emailArr[i]);
      }
   }
   return invalidEmails;
}

const emailIsValid = (email) => {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

class EmailNotifications extends Component {
   state = {
      isLoading: false,

      isSentNotificationEnabled: true,
      isViewedNotificationEnabled: true,
      isAcceptedNotificationEnabled: false,

      quoteSentNotificationEmailsStr: "",
      quoteAccptedNotificationEmailsStr: "",

      invalidEmails: []
   }
   onHandleSubmit = () => {
      const { isSentNotificationEnabled, isViewedNotificationEnabled, isAcceptedNotificationEnabled, quoteSentNotificationEmailsStr, quoteAccptedNotificationEmailsStr } = this.state;
      const words1 = isSentNotificationEnabled ? quoteSentNotificationEmailsStr.split(",") : [];
      const words2 = isAcceptedNotificationEnabled ? quoteAccptedNotificationEmailsStr.split(",") : [];
      const quoteSentNotificationEmails = extractEmails(words1);
      const quoteAccptedNotificationEmails = extractEmails(words2);

      this.setState({ isLoading: true });
      axios.post('/settings/notifications', { isViewedNotificationEnabled, quoteSentNotificationEmails, quoteAccptedNotificationEmails })
         .then(({ data }) => {
            if (data.success) {
               this.setState({
                  isLoading: false,
                  invalidEmails: []
               })
               toast.success("Saved.");
               this.props.updateEmailNotificationSetting({
                  isQuoteViewedNotificationToAuthorEnabled: isViewedNotificationEnabled,
                  quoteSentNotificationEmails: quoteAccptedNotificationEmails,
                  quoteAccptedNotificationEmails: quoteSentNotificationEmails
               });
               this.props.history.push('/app/settings');
            } else {
               this.setState({
                  isLoading: false,
                  invalidEmails: data.invalidEmails
               });
            }
         })
         .catch(error => {
            console.error("Fetch error for email notification settings");
            this.setState({ isLoading: false });
            // this.props.history.push('/app/settings');
         });
   }
   componentDidMount() {
      axios.get('/settings/notifications').then(({ data }) => {
         console.log(" GET DATA ", data)
         const {
            isQuoteViewedNotificationToAuthorEnabled,
            quoteSentNotificationEmails,
            quoteAccptedNotificationEmails
         } = data;

         this.setState({
            isSentNotificationEnabled: Array.isArray(quoteSentNotificationEmails) && quoteSentNotificationEmails.length ? true : false,
            isViewedNotificationEnabled: isQuoteViewedNotificationToAuthorEnabled,
            isAcceptedNotificationEnabled: Array.isArray(quoteAccptedNotificationEmails) && quoteAccptedNotificationEmails.length ? true : false,
            quoteSentNotificationEmailsStr: makeStrFromEmails(quoteSentNotificationEmails),
            quoteAccptedNotificationEmailsStr: makeStrFromEmails(quoteAccptedNotificationEmails),
         });
      }).catch(error => {
         console.error(" Fetch Error for notification setting.")
      })
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div id="AlerterPage">
               <div className={clsx(!this.state.invalidEmails.length && "d-none", "alertBar alertBar-general")}>
                  <div className="container">
                     <div className="alertBar-content">
                        <ul className="alertBar-ul">
                           {this.state.invalidEmails.map((email, index) => <li key={index}>The email “<strong>{email}</strong>” does not appear to be a valid. Verify the address and try again.</li>)}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            <div className="content">
               <h2 className="my-4">Email Notifications</h2>
               <h3 className="mb-2">Quote Sent</h3>
               <div className="ml-3 mb-5">
                  <div className="mb-2">
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                           id="isSentNotificationEnabled" name="isSentNotificationEnabled"
                           checked={this.state.isSentNotificationEnabled}
                           onChange={() => this.setState({ isSentNotificationEnabled: !this.state.isSentNotificationEnabled })} />
                        <label className="form-check-label mb-2" htmlFor="isSentNotificationEnabled">
                           {this.state.isSentNotificationEnabled ? "Send notification to:" : "Send notification to email address…"}
                        </label>
                        <div className={clsx(!this.state.isSentNotificationEnabled && 'd-none')}>
                           <TextareaAutosize rows={1} className="form-control maxWidth-700 rounded-0" id="sentNotification" name="sentNotification"
                              placeholder="manager@your-company.com"
                              value={this.state.quoteSentNotificationEmailsStr}
                              onChange={(ev) => this.setState({ quoteSentNotificationEmailsStr: ev.target.value })} />
                           <label htmlFor="sentNotification" className="text-gray fa-xs">Use a comma to separate multiple email addresses.</label>
                        </div>
                     </div>
                  </div>
               </div>

               <h3 className="mb-2">Quote Viewed</h3>
               <div className="ml-3 mb-5">
                  <div className="mb-2">
                     <p>When the customer views the quote multiple times within a 24 hour period, the first-view will trigger a notification only.</p>
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                           id="isViewedNotificationEnabled" name="isViewedNotificationEnabled"
                           checked={this.state.isViewedNotificationEnabled}
                           onChange={() => this.setState({ isViewedNotificationEnabled: !this.state.isViewedNotificationEnabled })} />
                        <label className="form-check-label" htmlFor="isViewedNotificationEnabled">Send notification to: Quote Author</label>
                     </div>
                  </div>
               </div>

               <h3 className="mb-2">Quote Accepted</h3>
               <div className="ml-3 mb-5">
                  <div className="mb-2">
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                           id="quoteAcceptedNotificationToAuthor" name="quoteAcceptedNotificationToAuthor"
                           defaultChecked
                           disabled
                        />
                        <label className="form-check-label" htmlFor="quoteAcceptedNotificationToAuthor">Send notification to: Quote Author</label>
                     </div>
                  </div>
                  <div className="mb-2">
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                           id="isAcceptedNotificationEnabled" name="isAcceptedNotificationEnabled"
                           checked={this.state.isAcceptedNotificationEnabled}
                           onChange={() => this.setState({ isAcceptedNotificationEnabled: !this.state.isAcceptedNotificationEnabled })} />
                        <label className="form-check-label mb-2" htmlFor="isAcceptedNotificationEnabled">
                           {this.state.isAcceptedNotificationEnabled ? "Also, send notification to:" : "Also, send notification to email address…"}
                        </label>
                        <div className={clsx(!this.state.isAcceptedNotificationEnabled && 'd-none')}>
                           <TextareaAutosize rows={1} className="form-control maxWidth-700 rounded-0" id="acceptedNotification" name="acceptedNotification"
                              placeholder="manager@your-company.com"
                              value={this.state.quoteAccptedNotificationEmailsStr}
                              onChange={(ev) => this.setState({ quoteAccptedNotificationEmailsStr: ev.target.value })} />
                           <label htmlFor="acceptedNotification" className="text-gray fa-xs">Use a comma to separate multiple email addresses.</label>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.onHandleSubmit} disabled={this.state.isLoading}>
                     {this.state.isLoading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}&nbsp;Save
                  </button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings">Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}
const mapDispatchToProps = { updateEmailNotificationSetting }
export default connect(() => ({}), mapDispatchToProps)(EmailNotifications);