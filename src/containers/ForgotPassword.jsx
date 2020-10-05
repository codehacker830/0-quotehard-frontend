import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class ForgotPassword extends Component {
   state = {
      email: ""
   };
   render() {
      const { checked, email, password } = this.state;
      const { history } = this.props;
      console.log("Login State = ", this.state);
      return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     {/* Reminder Form */}
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <div className="py-3">
                              <div className="form-group">
                                 <h2 className="font-w700">Request a new password</h2>
                                 <p className="font-size-h5">Enter the email address you signed up with and we’ll email a link to change your&nbsp;password.</p>
                                 <input
                                    type="text"
                                    className="form-control form-control-lg form-control-alt"
                                    placeholder="your@company.com"
                                    value={email}
                                    onChange={(ev) => this.setState({ email: ev.target.value })}
                                 />
                              </div>
                           </div>
                           <div className="form-group text-center">
                              <button type="submit" className="btn btn-block btn-hero-lg btn-hero-primary">
                                 <i className="fa fa-fw fa-reply mr-1" /> Send link
                              </button>
                              <p className="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                                 <Link className="btn btn-sm btn-light d-block d-lg-inline-block mb-1" to="/sign-in">
                                    <i className="fa fa-sign-in-alt text-muted mr-1" /> Sign In
                                 </Link>
                                 <Link className="btn btn-sm btn-light d-block d-lg-inline-block mb-1" to="/new-account">
                                    <i className="fa fa-plus text-muted mr-1" /> New Account
                                 </Link>
                              </p>
                           </div>
                        </div>
                     </div>
                     {/* END Sign In Form */}
                  </div>
               </div>
               {/* END Main Section */}
            </div>
         </main>
      );
   }
}