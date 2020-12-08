import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfTeamMember } from '../../../../../util';

class PersonContactAuthMemberLink extends Component {
   render() {
      const { quote, teamSetting, contact } = this.props;
      const isTeamMember = checkIfTeamMember(quote.author, teamSetting.teamMembers);
      let fullName = contact.firstName + " " + contact.lastName;
      if (isTeamMember) return (
         <>
            <a className="u-understated" href={`/app/c/contacts/view/${contact._id}`}>{fullName} </a>
         </>
      );
      else return <>{fullName} </>
   }
}

const mapStateToProps = ({ mainData, teamSetting }) => ({ quote: mainData.quote, teamSetting });
export default connect(mapStateToProps)(PersonContactAuthMemberLink);