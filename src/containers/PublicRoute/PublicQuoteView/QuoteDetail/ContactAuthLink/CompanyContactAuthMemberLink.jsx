import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfTeamMember } from '../../../../../util';

class CompanyContactAuthMemberLink extends Component {
   render() {
      const { quote, teamSetting, contact } = this.props;
      const isTeamMember = checkIfTeamMember(quote.author, teamSetting.teamMembers);
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

const mapStateToProps = ({ mainData, teamSetting }) => ({ quote: mainData.quote, teamSetting });
export default connect(mapStateToProps)(CompanyContactAuthMemberLink);