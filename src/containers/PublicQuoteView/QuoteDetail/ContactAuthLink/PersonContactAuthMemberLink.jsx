import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfTeamMember } from '../../../../util';

class PersonContactAuthMemberLink extends Component {
   render() {
      const { auth, teamSetting, contact } = this.props;
      const isTeamMember = checkIfTeamMember(auth.authUser, teamSetting.teamMembers);
      let fullName = contact.firstName + " " + contact.lastName;
      if (isTeamMember) return (
         <>
            <a className="u-understated" href={`/app/c/contacts/view/${contact._id}`}>{fullName} </a>
         </>
      );
      else return <>{fullName} </>
   }
}

const mapStateToProps = ({ auth, teamSetting }) => ({ auth, teamSetting });
export default connect(mapStateToProps)(PersonContactAuthMemberLink);