import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTeamMembers } from '../../../../actions/Team'
import NavCrump from '../../../../components/NavCrump'
import { INVITE_FORM_PATH, SETTINGS_PATH } from '../../../../constants/PathNames'

export const Team = (props) => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getTeamMembers());
      return () => { };
   }, []);
   return (
      <React.Fragment>
         <NavCrump linkTo={'/app/settings'}>
            Settings
         </NavCrump>
         <div className="content">
            <h1>Team Members</h1>
            <div className="maxWidth-800">
               <div className="mb-5">
                  <Link className="btn btn-lg btn-hero-success" to={INVITE_FORM_PATH}>Send Invitation</Link>
               </div>

               <table className="quotient-table mb-5">
                  <tbody className="rowClick">
                     <tr>
                        <td>
                           <img className="avatar-64 float-left mr-2" src={`https://asset.quotientapp.com/file-s/1/avatar-v2/128/`} alt="..." />
                           <div className="u-ellipsis team-list">
                              <a href="/38216/settings/team/view/52036">
                                 <strong>
                                    A Devom <span className="text-success"> – Hi you!</span>
                                 </strong>
                              </a>
                              <div className="float-right">
                                 <div className="text-right">
                                    <div className="text-secondary font-size-sm font-w400 text-right">
                                       Last activity<br />
                                       <span className="dt-time" data-time="[1600976335,0,1]">10 minutes ago</span> </div>
                                 </div>
                              </div>
                              <small>
                                 <br />
                                 <span className="label label-black">Account Owner</span>
                                 <span className="font-size-sm font-w400 text-secondary">
                                    <br />
                                    honestypassion0615@gmail.com
                                 </span>
                              </small>
                           </div>
                        </td>
                     </tr>
                  </tbody>
               </table>

               <div className="text-black mb-5">
                  Your plan will be automatically upgraded or downgraded, when adding or removing Team Members. <br />
                  Your current plan allows for <strong>1</strong> Team Member.
                  See <Link to="/app/settings/billing-overview">Billing Overview</Link> for more details.
               </div>

               <div className="mb-5">
                  <Link className="text-primary" to={SETTINGS_PATH}>← Return to Settings</Link>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Team