import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class EmailNotifications extends Component {
   state = {
      quoteSentNotification: true,
      quoteViewedNotification: true,
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
         </NavCrump>
            <div className="content">
               <h2 className="my-4">Email Notifications</h2>

               <h3 className="mb-2">Quote Sent</h3>
               <div className="ml-3 mb-5">
                  <div className="mb-2">
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                           id="quoteSentNotification" name="quoteSentNotification"
                           value={this.state.quoteSentNotification}
                           onChange={() => this.setState({ quoteSentNotification: !this.state.quoteSentNotification })} />
                        <label className="form-check-label" htmlFor="quoteSentNotification">Send notification to email address…</label>
                     </div>
                  </div>
               </div>

               <h3 className="mb-2">Quote Viewed</h3>
               <div className="ml-3 mb-5">
                  <div className="mb-2">
                     <p>When the customer views the quote multiple times within a 24 hour period, the first-view will trigger a notification only.</p>
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox"
                           id="quoteViewedNotification" name="quoteViewedNotification"
                           value={this.state.quoteViewedNotification}
                           onChange={() => this.setState({ quoteViewedNotification: !this.state.quoteViewedNotification })} />
                        <label className="form-check-label" htmlFor="quoteViewedNotification">Send notification to email address…</label>
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
                           id="quoteAcceptedNotification" name="quoteAcceptedNotification"
                           value={this.state.quoteAcceptedNotification}
                           onChange={() => this.setState({ quoteAcceptedNotification: !this.state.quoteAcceptedNotification })} />
                        <label className="form-check-label" htmlFor="quoteAcceptedNotification">Also, send notification to email address…</label>
                     </div>
                  </div>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-2">Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings">Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}