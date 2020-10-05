import React from 'react'
import { Link } from 'react-router-dom'

export const AddTeamMember = (props) => {
   return (
      <>
         <h3 className="settings-title">Team Members <span className="badge badge-info">1</span></h3>
         <Link className="set-option" to="/app/settings/team">Add a Team Member</Link>
      </>
   )
}

export default AddTeamMember