import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkIfTeamMember } from '../../../util';

class PublicVisiableOnlyAuthTeamMember extends Component {
   render() {
      const { quote, teamSetting } = this.props;
      const isPreviewMode = this.props.match.path === "/q/:entoken/preview";
      if (checkIfTeamMember(quote.author, teamSetting.teamMembers) && !isPreviewMode) return this.props.children;
      else return null;
   }
}
const mapStateToProps = ({ mainData, teamSetting }) => ({ quote: mainData.quote, teamSetting });
export default connect(mapStateToProps)(withRouter(PublicVisiableOnlyAuthTeamMember));