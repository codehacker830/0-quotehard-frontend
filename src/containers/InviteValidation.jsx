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
         console.error("prevPropsAuthUser --------------------------", prevPropsAuthUser);
         console.error("props.authUser --------------------------", props.authUser);

         axios.post('/settings/team/validate-invitation', { invitationEntoken })
            .then(({ data }) => {
               console.log(" invitation link validated data =>", data);
               setAccountInfo(data);
               setIsLoading(false);
            })
            .catch(err => {
               setIsLoading(false);
            });
      }
   }, [props, isLoading, accountInfo]);

   if (isLoading) return <>Loading...</>;
   else if (!accountInfo) return <Redirect to={`/sign-in/invite/i/went-wrong`} />;
   else if (props.authUser) return <Redirect to={`/sign-in/invite/i/already-have-access/${invitationEntoken}`} />;
   else {
      // const { _id, firstName, lastName, email, status, invitationStatus, accountCompany, invitedBy } = accountInfo;
      if (status === 'approved') return (
         <Redirect to={{
            pathname: '/sign-in',
            state: invitationEntoken
         }} />
      );
      else return (
         <Redirect to={{
            pathname: '/sign-in/invite/create',
            state: invitationEntoken
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