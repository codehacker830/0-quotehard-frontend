import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../util/Api';

export default class InviteValidation extends Component {
   mounted = false;
   state = {
      loading: true
   };
   componentDidMount() {
      this.mounted = true;
      this.setState({ loading: true });
      if (this.mounted) {
         const { invitationEntoken } = this.props.match.params;
         axios.post('/settings/team/validate-invitation', { invitationEntoken })
            .then(({ data }) => {
               const { accountCompany, firstName, lastName, email, role } = data;
               this.setState({ loading: false });
               this.props.history.push({
                  pathname: '/sign-in',
                  state: { accountCompany, firstName, lastName, email, role }
               });
            })
            .catch(err => {
               this.props.history.push('/sign-in');
            });
      }
   }
   render() {
      if (this.state.loading) return <p>validating...</p>;
      else return null;
   }
}