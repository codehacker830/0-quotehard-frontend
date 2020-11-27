import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';

export default class TwoFactorForAll extends Component {
   state = {
      isEnabled: false,
   }
   onClickDisable = () => {
      this.setState({ isEnabled: false });
   }
   onClickEnable = () => {
      this.setState({ isEnabled: true });
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Two-Factor For All</h2>
               <div className="maxWidth-800">
                  <p className="font-size-h4">Two-Factor Authentication adds an additional layer of security to prevent unauthorized access to your account.</p>
                  <div className="mb-5">
                     <h4>Two-Factor Authentication is {
                        this.state.isEnabled ?
                           "required."
                           : "currently optional."
                     }</h4>
                     <p>
                        {
                           this.state.isEnabled ?
                              "Team Members will need to set up Two-Factor Authentication when they next sign in (if they haven’t already)."
                              : "Hitting ‘Enable’ will prompt Team Members to set up Two-Factor Authentication when they next sign in."
                        }
                     </p>
                     {
                        this.state.isEnabled ?
                           <button className="btn btn-sm btn-secondary" onClick={this.onClickDisable}>Disable</button>
                           : <button className="btn btn-sm btn-alt-primary" onClick={this.onClickEnable}>Enable</button>
                     }
                  </div>
               </div>

               <div className="mb-4">
                  <Link className="text-primary font-w600" to={`/app/settings`}>← Return to Settings</Link>
               </div>
            </div>
         </React.Fragment>
      );
   }
}