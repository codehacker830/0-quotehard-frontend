import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkIfTeamMember } from '../../../../../util';

class PersonContactLink extends Component {
   render() {
      const { quote, teamSetting, contact } = this.props;
      const isTeamMember = checkIfTeamMember(quote.author, teamSetting.teamMembers);
      const isPreviewMode = this.props.match.path === "/q/:entoken/preview";

      if (!contact) return null;
      else {
         const fullName = contact.firstName + " " + contact.lastName;
         if (isTeamMember) return (
            <React.Fragment>
               {
                  isPreviewMode ? <>{fullName}&nbsp;</>
                     : <><a className="u-understated" href={`/app/c/contacts/view/${contact._id}`}>{fullName}</a>&nbsp;</>
               }

            </React.Fragment>
         );
         else return <>{fullName} </>
      }
   }
}

const mapStateToProps = ({ mainData, teamSetting }) => ({ quote: mainData.quote, teamSetting });
export default connect(mapStateToProps)(withRouter(PersonContactLink));