import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavCrump from '../../../../components/NavCrump'
import { INVITE_FORM_PATH, SETTINGS_PATH } from '../../../../constants/PathNames'
import { ToastErrorNotification } from '../../../../util'
import axios from '../../../../util/Api'
import Tr_Member from './components/Tr_Member'

export const Team = (props) => {
   const [members, setMembers] = useState([]);
   useEffect(() => {
      axios.get('/settings/team/all-members').then(({ data }) => {
         console.log(" members response : ", data);
         setMembers(data.members);
      }).catch((err) => {
         console.error("err ----", err.data);
      });
      return () => { };
   }, []);

   const onClickDeleteInvite = (id) => {
      axios.post(`/settings/team/delete-invite/${id}`)
         .then(() => {
            const arr = members.filter(member => member._id !== id);
            setMembers(arr);
         })
         .catch(err => {
            // toast.error('Failed to delete invitation.');
            // console.error("delete invitation err =>", err.response.data);
            const { errors } = err.response.data;
            ToastErrorNotification(errors);
         });
   }
   return (
      <React.Fragment>
         <NavCrump linkTo={'/app/settings'}>
            Settings
         </NavCrump>
         <div className="content">
            <h1>Team Members</h1>
            <div className="">
               <div className="mb-5">
                  <Link className="btn btn-lg btn-success" to={INVITE_FORM_PATH}>Send Invitation</Link>
               </div>

               <table className="quotient-table mb-5">
                  <tbody className="rowClick">
                     {
                        members.map((member, index) => <Tr_Member member={member} key={index} onClickDeleteInvite={(id) => onClickDeleteInvite(id)} />)
                     }
                  </tbody>
               </table>

               <div className="text-black mb-5">
                  Your plan will be automatically upgraded or downgraded, when adding or removing Team Members. <br />
                  Your current plan allows for <strong>1</strong> Team Member.
                  See <Link to="/app/settings/billing-overview">Billing Overview</Link> for more details.
               </div>

               <div className="mb-5">
                  <Link className="text-primary font-w600" to={SETTINGS_PATH}>← Return to Settings</Link>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Team