import React from 'react'
import { useSelector } from 'react-redux';
import { formatDate } from '../../../../../util';

export const Tr_Member = (props) => {
   const { member } = props;
   const state = useSelector(state => {
      const { authUser } = state.auth;
      const { accountCompany } = state.auth;
      return { authUser, accountCompany }
   })
   const isOwner = member._id === state.accountCompany.owner;
   const isYou = member._id === state.authUser._id;
   return (
      <React.Fragment>
         <tr className={`${member.status === "pending" ? "rowClick-disable" : ""}`}>
            <td>
               <img className="avatar-64 float-left mr-2" src={member.image} alt="..." />
               {
                  member.status === "pending" ?
                     <div className="u-ellipsis team-list">
                        <button className="btn btn-default btn-sm float-right"
                           onClick={() => props.onClickDeleteInvite(member._id)}>Delete invite</button>
                        <strong>{member.firstName + " " + member.lastName}</strong>
                        <small>
                           {member.role && <strong><br />Administrator</strong>}
                           <br />
                           <span className="lighter">{member.email}</span>
                           <br />
                           Invite sent&nbsp;
                           <span className="dt-time">{formatDate(member.invitedAt)}</span> and expires&nbsp;
                           <span className="dt-time">{formatDate(member.expireAt)}</span>
                        </small>
                     </div>
                     : <div className="u-ellipsis team-list">
                        <a href="/app/settings/team/view/52036">
                           <strong>
                              {member.firstName + " " + member.lastName}
                              {isYou && <span className="text-success"> – Hi you!</span>}
                           </strong>
                        </a>
                        <div className="float-right">
                           <div className="text-right">
                              <div className="text-secondary font-size-sm font-w400 text-right">
                                 Created At<br />
                                 <span className="dt-time">{formatDate(member.createdAt)}</span>
                              </div>
                           </div>
                        </div>
                        <small>
                           <br />
                           {
                              isOwner ? <span className="label label-black">Account Owner</span>
                                 : member.role ? <span className="label">Administrator</span> :
                                    null
                           }
                           <span className="font-size-sm font-w400 text-secondary">
                              <br />
                              {member.email}
                           </span>
                        </small>
                     </div>
               }

            </td>
         </tr>
      </React.Fragment>
   )
}

export default Tr_Member