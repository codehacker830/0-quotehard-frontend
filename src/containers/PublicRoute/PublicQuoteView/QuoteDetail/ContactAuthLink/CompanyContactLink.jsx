import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkIfTeamMember } from '../../../../../util';

class CompanyContactLink extends Component {
   render() {
      const { quote, teamSetting, contact } = this.props;
      const isTeamMember = checkIfTeamMember(quote.author, teamSetting.teamMembers);
      const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
      if (!contact) return null;
      else {
         let companyName = contact.companyName;
         if (isTeamMember) return (
            <React.Fragment>
               {
                  isPreviewMode ? <>{companyName}&nbsp;</>
                     : <><a className="u-understated" href={`/app/c/contacts/view/${contact._id}`}>{companyName}</a>&nbsp;</>
               }

            </React.Fragment>
         );
         else return <>{companyName}&nbsp;</>
      }
   }
}

const mapStateToProps = ({ mainData, teamSetting }) => ({ quote: mainData.quote, teamSetting });
export default connect(mapStateToProps)(withRouter(CompanyContactLink));