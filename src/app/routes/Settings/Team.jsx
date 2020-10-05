import React from 'react'
import { Link } from 'react-router-dom'
import NavCrump from '../../../components/NavCrump'

export const Team = (props) => {
   return (
      <React.Fragment>
         <NavCrump linkTo={'/app/settings'}>
            Settings
         </NavCrump>
         <div className="content">
            <h1>Team Members</h1>
            <div className="maxWidth-800">
               <h3 className="text-primary">Invite a New Team Member</h3>
               <p className="mb-3">
                  Simply enter the name and email address of your new Team&nbsp;Member.
                  <br />
                  They'll receive an email with an 'Accept Invite' link – where they can set their own password.
               </p>
               <div className="form-group mb-4">
                  <div className="row">
                     <div className="col-md-6 col-sm-12">
                        <label htmlFor="example-text-input">First Name</label>
                        <input type="text" className="form-control mr-3" placeholder="First Name" defaultValue />
                     </div>
                     <div className="col-md-6 col-sm-12">
                        <label htmlFor="example-text-input">Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name" defaultValue />
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-12">
                        <label htmlFor="example-text-input">Email Address</label>
                        <input type="text" className="form-control mr-3" placeholder="First Name" defaultValue />
                     </div>
                  </div>
               </div>

               <div className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" defaultValue id="example-checkbox-default1" name="example-checkbox-default1" />
                  <label className="form-check-label" htmlFor="example-checkbox-default1">
                     Give Administrator Powers
                     <p className="text-secondary fa-xs">An administrator may invite, add and remove others</p>
                  </label>
               </div>
               <div className="mb-5">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-2">Send Invitation</button>
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

               <div className="text-black">
                  Your plan will be automatically upgraded or downgraded, when adding or removing Team Members. <br />
                  Your current plan allows for <strong>1</strong> Team Member.
                  See <Link to="/app/settings/billing-overview">Billing Overview</Link> for more details.
               </div>

            </div>
         </div>
      </React.Fragment>
   )
}

export default Team