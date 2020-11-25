import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfTeamMember } from '../../../util';

class VisiableOnlyAuthTeamMember extends Component {
   render() {
      const { auth, teamSetting } = this.props;
      console.log("_____________________checkIfTeamMember______________ ", checkIfTeamMember(auth.authUser, teamSetting.teamMembers));
      if (checkIfTeamMember(auth.authUser, teamSetting.teamMembers)) return this.props.children;
      else return null;
   }
}
const mapStateToProps = ({ auth, teamSetting }) => ({ auth, teamSetting });
export default connect(mapStateToProps)(VisiableOnlyAuthTeamMember);