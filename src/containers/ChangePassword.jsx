import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { userResetPassword } from '../actions/Auth';
import { fetchError, fetchStart, fetchSuccess, showMessage } from '../actions/Common';
import axios from '../util/Api';
import { validatePassword } from '../util/validate';

class ChangePassword extends Component {
   state = {
      isMounted: false,
      password: "",
      loading: false,
   };
   onHandleSubmit = () => {
      const { entoken } = this.props.match.params;
      const { password } = this.state;
      const error = validatePassword(password);
      if (error) {
         toast.success(error);
         return;
      }
      this.props.userResetPassword({ entoken, password });

      // toast.success("Password changed.");
      // this.props.history.push('/sign-in');
      
      // axios.post("/reset-password", { password: this.state.password }).then((data) => {
      //    this.setState({ loading: false });
      //    if (!data.isValid) {
      //       this.props.history.push('/request-password/new/expired');
      //       return;
      //    } else {

      //    }

      // }).catch(err => {
      //    this.setState({ loading: false });
      //    console.error("error during request password-reset-link :", err);
      //    toast.success(`Try again later.`);
      // });
   }
   componentDidMount() {
      const { entoken } = this.props.match.params;
      this.props.fetchStart();
      axios.post('/validate-entoken', { entoken })
         .then(({ data }) => {
            this.setState({ isMounted: true });
            this.props.fetchSuccess();
            if (!data.isValid) {
               this.props.history.push('/request-password/new/expired');
            }
         })
         .catch(err => {
            this.props.fetchError();
            console.error("error during change password :", err);
            toast.success(`Try again later.`);
         });
   }
   render() {
      const { isMounted, password } = this.state;
      if (!isMounted) return null;
      else return (
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
                                    type="password"
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
                                 disabled={this.props.commonData.loading}
                                 onClick={this.onHandleSubmit}
                              >
                                 {
                                    this.props.commonData.loading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />
                                 }
                                 Save password
                              </button>
                              <p className="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                                 <a className="btn btn-sm btn-light d-block d-lg-inline-block mb-1" href="https://quotehard.com/">
                                    <i className="fa fa-fw fa-sign-out-alt text-muted mr-1" /> Cancel, return to Quotehard home page
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

const mapStateToProps = ({ auth, commonData }) => {
   return { auth, commonData };
}
const mapDispatchToProps = (dispatch, ownProps) => {
   return {
      fetchStart: () => dispatch(fetchStart),
      fetchSuccess: () => dispatch(fetchSuccess),
      fetchError: () => dispatch(fetchError),
      showMessage: () => dispatch(showMessage),
      userResetPassword: ({ entoken, password }) => dispatch(userResetPassword({ entoken, password }, ownProps))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);