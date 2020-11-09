import React from 'react';
import { Link } from 'react-router-dom';
import AccountAndBilling from './components/AccountAndBilling';
import AddOns from './components/AddOns';
import AddTeamMember from './components/AddTeamMember';
import ConnectWithOtherApps from './components/ConnectWithOtherApps';
import SettingQuote from './components/SettingQuote';

export const Settings = (props) => {
   return (
      <div className="content py-5" >
         <div className="row">
            <div className="col-md-6 col-sm-12">
               <h1 className="pt-5 px-2 mb-5">CodeNetflix </h1>

               <SettingQuote />

               <AddTeamMember />

               <AccountAndBilling />

               <AddOns />

               <ConnectWithOtherApps />
            </div>

            <div className="col-md-6 col-sm-12">
               <div className="px-3 py-5">
                  <Link to="/app/settings/profile">
                     <img className="img-avatar img-avatar96 img-avatar-thumb border border-primary rounded-0 m-0" src="/assets/media/avatars/avatar8.jpg" alt="..." />
                  </Link>
                  <div className="row no-gutters mt-3">
                     <span className="text-black font-size-h5 font-w700">Raffale C</span>
                  </div>
                  <div className="row no-gutters mt-3">
                     <Link to="/app/settings/profile">Edit Your Profile</Link>
                  </div>
                  {/* <div className="row no-gutters mb-5">
                     <Link to="/app/settings/two-factor/info">
                        Two-Factor Authentication
                        <span className="label label-off ml-1">OFF</span>
                     </Link>
                  </div> */}

                  <div className="row no-gutters maxWidth-300 mt-3">
                     <Link to="/new-account" className="mb-1">Create Another Account</Link>
                     <span className="text-black">
                        Automatically qualify for a Multi-Account 20% Discount across everything, when 2 or more accounts have the same Account Owner.
                     </span>
                  </div>

                  {/* <div className="row no-gutters maxWidth-300 mt-3">
                     <Link to="/app/referrals" className="mb-1">Your Referral Link</Link>
                     <span className="text-black">If you refer someone and they become a paid customer, you’ll get FREE credit.</span>
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Settings;