import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from '../util/Api';
import { validateEmail } from '../util/validate';

export default class ChangePassword extends Component {
   state = {
      password: "",
      loading: false,
   };
   onHandleSubmit = () => {
      // const error = validateEmail(this.state.password);
      // if (error) {
      //    toast.success(error);
      //    return;
      // }
      // this.setState({ loading: true });
      // axios.post("/request-password", { password: this.state.password }).then((data) => {
      //    this.setState({ loading: false });
      //    if (!data.account) {
      //       toast.success(`We can’t find an account by ${this.state.password}.`);
      //       return;
      //    }
      //    this.props.history.push('/request-password/sent');
      // }).catch(err => {
      //    this.setState({ loading: false });
      //    console.error("error during request password-reset-link :", err);
      //    toast.success(`Try again later.`);
      // });
   }
   componentDidMount() {
      const { entoken } = this.props.match.params;
      axios.post('/validate-entoken', { entoken })
         .then(({ data }) => {
            if (!data.isValid) {
               this.setState({ loading: false });
               this.props.history.push('/request-password/new/expired');
            }
         })
         .catch(err => {
            this.setState({ loading: false });
            console.error("error during change password :", err);
            toast.success(`Try again later.`);
         });
   }
   render() {
      const { password } = this.state;
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
                                 <h2 className="font-w700">Change your password</h2>
                                 <label className="font-size-h5" for="new-password">New password</label>
                                 <input
                                    type="text"
                                    className="form-control form-control-lg form-control-alt"
                                    placeholder=""
                                    id="new-password"
                                    name="new-password"
                                    value={password}
                                    onChange={(ev) => this.setState({ password: ev.target.value })}
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
                                    this.state.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />
                                 }
                                 Save password
                              </button>
                              <p className="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                                 <a className="btn btn-sm btn-light d-block d-lg-inline-block mb-1" href="https://quotehard.com/">
                                    <i className="fa fa-fw fa-sign-out-alt text-muted mr-1" /> Cancel, return to Quotient home page
                                 </a>
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