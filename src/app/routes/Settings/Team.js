import React from 'react'
import NavCrump from '../../../components/NavCrump'

export const Team = (props) => {
   return (
      <React.Fragment>
         <NavCrump linkTo={'/app/settings'}>
            Settings
         </NavCrump>
         <div className="content">
            sdf
         </div>
      </React.Fragment>
   )
}

export default Team