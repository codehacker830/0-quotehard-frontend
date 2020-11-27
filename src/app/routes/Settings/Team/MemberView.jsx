import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavCrump from '../../../../components/NavCrump';
import axios from '../../../../util/Api';

export const MemberView = (props) => {
   const { id } = props.match.params;
   const [accountInfo, setAccountInfo] = useState({
      firstName: "",
      lastName: "",
      email: "",
      role: false,
      companyName: ""
   });
   useEffect(() => {
      axios.get(`/settings/team/view/${id}`)
         .then(({ data }) => {
            setAccountInfo(data);
         }).catch(err => {
            toast.error('Failed to fetch member info.')
            props.history.push('/app/settings');
         })
   }, [id]);
   const { firstName, lastName, email, role, companyName } = accountInfo;
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <h1 className="my-4">{firstName + " " + lastName}</h1>

            <div className="mb-5">
               <strong>Email: </strong>
               {email} <br />
               {role && "You are an administrator for SilverCompany."}
               <br />
               <a href={`/app/settings/profile`}>Edit Your Profile</a>
            </div>

            <div className="mb-4">
               <Link className="text-primary font-w600" to={`/app/settings`}>← Return to Settings</Link>
            </div>
         </div>
      </React.Fragment>
   )
}

export default MemberView