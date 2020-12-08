import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfTeamMember } from '../../../util';

class PublicVisiableOnlyAuthTeamMember extends Component {
   render() {
      const { auth, teamSetting } = this.props;
      if (checkIfTeamMember(auth.authUser, teamSetting.teamMembers)) return this.props.children;
      else return null;
   }
}
const mapStateToProps = ({ auth, teamSetting }) => ({ auth, teamSetting });
export default connect(mapStateToProps)(PublicVisiableOnlyAuthTeamMember);