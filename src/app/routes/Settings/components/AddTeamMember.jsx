import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

export const AddTeamMember = (props) => {
   const { teamMembers } = props;
   return (
      <React.Fragment>
         <h3 className="settings-title">Team Members <span className="badge badge-info">{teamMembers.length}</span></h3>
         <Link className="set-option" to="/app/settings/team">Add a Team Member</Link>
      </React.Fragment>
   )
}
const mapStateToProps = ({ teamSetting }) => ({ teamMembers: teamSetting.teamMembers });
export default connect(mapStateToProps)(AddTeamMember);