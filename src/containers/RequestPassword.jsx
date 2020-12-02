import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from '../util/Api';
import { validateEmail } from '../util/validate';

export default class RequestPassword extends Component {
   state = {
      email: "",
      loading: false,
   };
   onHandleSubmit = () => {
      const error = validateEmail(this.state.email);
      if (error) {
         toast.success(error);
         return;
      }
      this.setState({ loading: true });
      axios.post("/request-password", { email: this.state.email }).then(({ data }) => {
         this.setState({ loading: false });
         if (!data.success) {
            toast.error(`We can’t find an account by ${this.state.email}.`);
            return;
         }
         this.props.history.push('/request-password/sent');
      }).catch(err => {
         this.setState({ loading: false });
         console.error("error during request password change :", err);
         toast.error(`Try again later.`);
      });
   }
   render() {
      const { email } = this.state;
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
                              <button type="submit"
                                 className="btn btn-block btn-hero-lg btn-hero-primary"
                                 disabled={this.state.loading}
                                 onClick={this.onHandleSubmit}
                              >
                                 {
                                    this.state.loading ?
                                       <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />
                                       : <i className="fa fa-fw fa-reply mr-1" />
                                 }
                                 Send link
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