import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getUser } from '../actions/Auth';
import axios from '../util/Api';

class InviteValidation extends Component {
   mounted = false;
   state = {
      loading: true,
      accountInfo: null
   };

   componentDidMount() {
      this.mounted = true;
      this.setState({ loading: true });
      if (this.mounted) {
         const { invitationEntoken } = this.props.match.params;
         console.log("InviteValidation props  ==>", this.props);
         axios.post('/settings/team/validate-invitation', { invitationEntoken })
            .then(({ data }) => {
               const { _id, accountCompany, firstName, lastName, email, role } = data;
               console.log(" invitation link validated data =>", data);
               this.setState({
                  loading: false,
                  accountInfo: data,
               });
            })
            .catch(err => {
               this.setState({ loading: false });
            });
      }
   }
   componentDidUpdate(prevProps, prevState) {
      const { invitationEntoken } = this.props.match.params;
      if (prevProps.authUser !== this.props.authUser) {
         console.log("this.accountInfo ---------", this.state.accountInfo);
         if (this.props.authUser && this.state.accountInfo) {
            this.props.history.push(`/sign-in/invite/i/already-have-access/${invitationEntoken}`);
         }
      }
      if (prevState.accountInfo !== this.state.accountInfo) {
         if (this.state.accountInfo && !this.props.authUser) {
            this.props.history.push({
               pathname: '/sign-in',
               state: this.state.accountInfo
            });
         }
      }
   }
   render() {
      if (this.state.loading) return <p>loading...</p>;
      else if (this.state.accountInfo) return null;
      else return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <div className="py-3">
                              <div className="form-group">
                                 <h1 className="font-w700">Sorry, something went wrong. Perhaps try again later.</h1>
                                 <p className="font-size-h4">Could not find your invite?</p>
                                 <Link to="/sign-in">Visit the Dashboard</Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* END Main Section */}
            </div>
         </main>
      );

   }
}
const mapStateToProps = ({ auth }) => {
   const { authUser } = auth;
   return { authUser };
};
const mapDispatchToProps = { getUser };
export default connect(mapStateToProps, mapDispatchToProps)(InviteValidation);