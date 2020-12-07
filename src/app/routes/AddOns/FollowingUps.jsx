import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class Followingups extends Component {
   state = {
      isChecked: true,
      followFirstDelayedDays: 3,
      followSecondDelayedDays: 12
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Follow-ups</h2>
               <p>
                  Get alerted on your Dashboard of quotes that need a Follow-up. <br />
                  You can quickly follow up by <strong>email or dismiss</strong> if you've followed up via other means. <br />
                  Change the default wording for Follow-up emails in Settings &gt; Customer Emails.
               </p>
               <div className="ml-3">
                  <div className="custom-control custom-checkbox custom-control-primary mb-3">
                     <input type="checkbox"
                        className="custom-control-input"
                        id="follow-ups" name="follow-ups"
                        checked={this.state.isChecked}
                        onChange={(ev) => this.setState({ isChecked: !this.state.isChecked })}
                     />
                     <label className="custom-control-label" htmlFor="follow-ups">
                        {this.state.isChecked ? "Alert on Dashboard: " : "Enable Follow-ups…"}
                     </label>
                  </div>
                  <div className={`${this.state.isChecked ? "" : "d-none"}`}>
                     <div className="row no-gutters ml-4 mb-2" style={{ lineHeight: "32px" }}>
                        If not accepted after
                        <input type="number"
                           className="form-control rounded-0 width-70 mx-1"
                           id="upopened" name="upopened" placeholder=""
                           value={this.state.followFirstDelayedDays}
                           onChange={(ev) => this.setState({ followFirstDelayedDays: ev.target.value })}
                        />
                        days OR if unopened after 12 hours
                     </div>
                     <div className="row no-gutters ml-4 mb-2" style={{ lineHeight: "32px" }}>
                        If not accepted after
                        <input type="number"
                           className="form-control rounded-0 width-70 mx-1"
                           id="unaccepted" name="unaccepted" placeholder=""
                           value={this.state.followSecondDelayedDays}
                           onChange={(ev) => this.setState({ followSecondDelayedDays: ev.target.value })}
                        />
                        days
                     </div>
                  </div>
               </div>
               <div className="mt-5">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1">Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings" >Cancel</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}