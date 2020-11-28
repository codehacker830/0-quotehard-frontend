import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const CreateWithInvitation = (props) => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   useEffect(() => {
      const { state } = props.location;
      if (state) {
         const { _id, accountCompany, firstName, lastName, email, role } = state;
         setFirstName(firstName);
         setLastName(lastName);
         setEmail(email);
      }
   }, []);
   return (
      <main id="main-container">
         <div className="row no-gutters">
            {/* Main Section */}
            <div className="hero-static col-md-12 d-flex align-items-center bg-white">
               <div className="container p-3 w-100">
                  <div className="row no-gutters justify-content-center">
                     <div className="col-sm-8 col-xl-6">
                        <div className="py-3">
                           <div className="form-group">
                              <h1 className="font-w700">Welcome to Quotient!</h1>
                              <p className="font-size-h4">
                                 <strong>
                                    You have been invited to create and send quotes for SilverCompany.
                                    <br />
                                    Already have a sign in?
                                 </strong> &nbsp;
                                 <Link className="font-size-h4" to="/sign-in">Sign in here…</Link>
                              </p>

                           </div>
                        </div>
                        <div className="form-group row maxWidth-700">
                           <div className="col-sm-6">
                              <label htmlFor="invitationFirstName">First Name</label>
                              <input type="text" className="form-control rounded-0" id="invitationFirstName" name="invitationFirstName" placeholder="First Name"
                                 value={firstName}
                                 onChange={ev => setFirstName(ev.target.value)}
                              />
                           </div>
                           <div className="col-sm-6">
                              <label htmlFor="invitationLastName">Las Name</label>
                              <input type="text" className="form-control rounded-0" id="invitationLastName" name="invitationLastName" placeholder="Last Name"
                                 value={lastName}
                                 onChange={ev => setLastName(ev.target.value)}
                              />
                           </div>
                        </div>
                        <div className="form-group maxWidth-500">
                           <label htmlFor="invitationEmail">Email</label>
                           <input type="text" className="form-control rounded-0" id="invitationEmail" name="invitationEmail" placeholder="your@company.com"
                              value={email}
                              onChange={ev => setEmail(ev.target.value)}
                           />
                        </div>
                        <div className="form-group maxWidth-500">
                           <label htmlFor="invitationPassword">Password</label>
                           <input type="text" className="form-control rounded-0" id="invitationPassword" name="invitationPassword" placeholder=""
                              value={password}
                              onChange={ev => setPassword(ev.target.value)}
                           />
                        </div>
                        <div className="form-group pt-3">
                           <button type="button" className="btn btn-lg btn-primary">Let's Get Started...</button>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* END Main Section */}
         </div>
      </main>
   )
}

export default CreateWithInvitation