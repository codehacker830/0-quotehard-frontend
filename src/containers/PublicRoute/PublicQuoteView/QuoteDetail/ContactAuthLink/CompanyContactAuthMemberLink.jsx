import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfTeamMember } from '../../../../../util';

class CompanyContactAuthMemberLink extends Component {
   render() {
      const { auth, teamSetting, contact } = this.props;
      const isTeamMember = checkIfTeamMember(auth.authUser, teamSetting.teamMembers);
      if (!contact) return null;
      else {
         let companyName = contact.companyName;
         if (isTeamMember) return (
            <>
               <a className="u-understated" href={`/app/c/contacts/view/${contact._id}`}>{companyName}</a>&nbsp;
            </>
         );
         else return <>{companyName}&nbsp;</>
      }
   }
}

const mapStateToProps = ({ auth, teamSetting }) => ({ auth, teamSetting });
export default connect(mapStateToProps)(CompanyContactAuthMemberLink);