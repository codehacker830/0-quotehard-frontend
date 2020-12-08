import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfTeamMember } from '../../../util';

class PublicVisiableOnlyAuthTeamMember extends Component {
   render() {
      const { quote, teamSetting } = this.props;
      if (checkIfTeamMember(quote.author, teamSetting.teamMembers)) return this.props.children;
      else return null;
   }
}
const mapStateToProps = ({ mainData, teamSetting }) => ({ quote: mainData.quote, teamSetting });
export default connect(mapStateToProps)(PublicVisiableOnlyAuthTeamMember);