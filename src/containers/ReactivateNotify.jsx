import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { userSignOut } from '../actions';

export default function ReactivateNotify() {
   const dispatch = useDispatch();
   const history = useHistory();
   const onClickSignOut = () => {
      dispatch(userSignOut());
      history.push('/sign-in');
   }
   return (
      <main id="main-container">
         <div className="row no-gutters">
            {/* Main Section */}
            <div className="hero-static col-md-12 d-flex align-items-center bg-white">
               <div className="container p-3 w-100">
                  <div className="row no-gutters justify-content-center">
                     <div className="col-sm-8 col-xl-6">
                        <h1>Account Deactivated</h1>
                        <p className="u-larger maxWidth-700 mb-5">
                           You will no longer be charged for this account.
                           <br />
                           You can reactivate this account anytime within the next 12 months.
                           <br />
                           After&nbsp;this&nbsp;time, your account data may be deleted.
                           <br />
                           To delete your account data, see Personal Settings &gt; Deactivated Accounts.
                        </p>
                        <p>
                           <Link className="btn btn-primary mr-2" to="/app/settings">Personal Settings…</Link>
                           &nbsp;
                           <button className="btn btn-light" onClick={onClickSignOut}>Sign out</button>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            {/* END Main Section */}
         </div>
      </main>
   )
}
