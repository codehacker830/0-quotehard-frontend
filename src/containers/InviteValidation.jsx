import React, { Component, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getUser } from '../actions/Auth';
import axios from '../util/Api';
import _ from 'lodash';

function usePrevious(value) {
   const ref = useRef();
   useEffect(() => {
      ref.current = value;
   });
   return ref.current;
}

export const InviteValidation = (props) => {
   const [isLoading, setIsLoading] = useState(true);
   const [accountInfo, setAccountInfo] = useState(null);
   const prevPropsAuthUser = usePrevious(props.authUser);
   const { invitationEntoken } = props.match.params;

   useEffect(() => {
      if (prevPropsAuthUser !== props.authUser) {
         // console.error("prevPropsAuthUser --------------------------", prevPropsAuthUser);
         // console.error("props.authUser --------------------------", props.authUser);

         axios.post('/settings/team/validate-invitation', { invitationEntoken })
            .then(({ data }) => {
               // const { _id, firstName, lastName, email, status, inviationStatus } = data;
               console.log(" invitation link validated data =>", data);
               setIsLoading(false);
               setAccountInfo(data);
            })
            .catch(err => {
               setIsLoading(false);
            });
      }
   }, [props, isLoading, accountInfo]);

   if (isLoading) return <>Loading...</>;
   else if (!accountInfo) return (
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
   else if (props.authUser) return (
      <Redirect to={`/sign-in/invite/i/already-have-access/${invitationEntoken}`} />
   );
   else {
      const { _id, firstName, lastName, email, status, inviationStatus } = accountInfo;
      if (status === 'pending') return (
         <Redirect to={{
            pathname: '/sign-in/invite/create',
            state: { _id, firstName, lastName, email }
         }} />
      );
      else if (status === 'approved') return (
         <Redirect to={{
            pathname: '/sign-in',
            state: { _id, firstName, lastName, email }
         }} />
      );
   }
}
const mapStateToProps = ({ auth }) => {
   const { authUser } = auth;
   return { authUser };
};
const mapDispatchToProps = { getUser };
export default connect(mapStateToProps, mapDispatchToProps)(InviteValidation);