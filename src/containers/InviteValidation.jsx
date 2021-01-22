import React, { Component, useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getUser } from '../actions/Auth';
import axios from '../util/Api';
import _ from 'lodash';
import InvitationWentWrong from './InvitationWentWrong';
import { ACCOUNT_COMPANY_DATA, AUTH_USER_DATA } from '../constants/ActionTypes';

function usePrevious(value) {
   const ref = useRef();
   useEffect(() => {
      ref.current = value;
   });
   return ref.current;
}

const InviteValidation = (props) => {
   const [isLoading, setLoading] = useState(true);
   const [isAlreadyHaveAccess, setAlreadyHaveAccess] = useState(false);
   const [accountInfo, setAccountInfo] = useState(null);
   const dispatch = useDispatch();
   const { invitationEntoken } = props.match.params;
   // const prevPropsAuthUser = usePrevious(props.authUser);

   useEffect(() => {
      setLoading(true);
      axios.post('/settings/team/validate-invitation', { invitationEntoken })
         .then(({ data }) => {
            console.log(" account information from invitation link =>", data);
            setAccountInfo(data.account);
            axios.get('/account').then(() => {
               dispatch({ type: AUTH_USER_DATA, payload: data.account });
               dispatch({ type: ACCOUNT_COMPANY_DATA, payload: data.accountCompany });

               setAlreadyHaveAccess(true);
               setLoading(false);
            }).catch(err => {
               setLoading(false);
            });
         }).catch(err => {
            setLoading(false);
         });
   }, []);

   if (isLoading) return <div>Loading...</div>;
   else if (!accountInfo) return <InvitationWentWrong />;
   else if (isAlreadyHaveAccess) return <Redirect to={{
      pathname: '/sign-in/invite/existing',
      state: { accountInfo }
   }} />;
   else {
      const { _id, firstName, lastName, email, status, invitationStatus, accountCompany, invitedBy } = accountInfo;
      if (status === 'approved') return (
         <Redirect to={{
            pathname: '/sign-in',
            state: { accountInfo }
         }} />
      );
      else return (
         <Redirect to={{
            pathname: '/sign-in/invite/create',
            state: { accountInfo }
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