import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTeamMembers } from '../../../actions/Team'
import NavCrump from '../../../components/NavCrump'

export const BillingOverview = (props) => {
   // useEffect(() => {
   //    props.getTeamMembers();
   // }, [])
   const { accountCompany } = props;
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <div className="maxWidth-800">
               <h1>
                  Billing Overview
                  <p className="text-secondary font-w400">{accountCompany.companyName}</p>
               </h1>
               <div className="mb-5">
                  <div className="mb-3 font-size-lg">
                     <span className="text-secondary font-w400">Next payment:</span>
                     <strong className="util-no-wrap"> <span>October 8, 2020</span></strong>
                     <br />
                     <span className="text-secondary font-w400">Total cost, per month:</span> <strong>USD $25.00</strong>
                     <br />
                     <span className="text-secondary font-w400">Current plan:</span> <strong>One Man Band, with 1 Team&nbsp;Member </strong>
                  </div>
                  <div className="mb-5">
                     <br />
                     5 Team Members are included in your plan. Additional Team Members are $6 each per month.
                     <br />
                     For more information, see the <a target="_blank" rel="noreferrer" href="https://www.quotientapp.com/pricing">pricing page</a>.
                  </div>
                  <div className="mb-5">
                     <h3 className="mb-2">Payment Details</h3>
                     <div className="mb-2">
                        <span className="label label-success">Not saved</span>
                     </div>
                     <div>
                        <Link className="btn btn-alt-secondary mr-3" to={{
                           pathname: "/app/settings/payment-details",
                           state: {
                              from: "/app/settings/billing-overview"
                           }
                        }}>Add Payment Details</Link>
                        <span className="font-size-sm text-success"><i className="fa fa-lock mr-1"></i>SECURE</span>
                     </div>
                  </div>
               </div>


               <div className="mb-5">
                  <h3 className="mb-2">Payment History</h3>
                  <table className="table">
                     <tbody>
                        <tr>
                           <td>Nothing to see here yet.</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="mb-5">
                  <h3 className="mb-2">Email a Copy of Invoices</h3>
                  <p className="mb-3">
                     Send a copy to <strong>A Devom</strong> (Account Owner).
                  </p>
                  <button className="btn btn-alt-secondary">Enable Email Invoices</button>
               </div>
               <div className="mb-5">
                  <div className="border border-danger p-4">
                     <h3 className="mb-4">Cancel Account</h3>
                     <button className="btn btn-danger btn-lg">
                        Deactivate, Confirm…
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment >
   )
}

const mapStateToProps = ({ auth }) => {
   const { accountCompany } = auth;
   return { accountCompany };
};
// const mapDispatchToProps = { getTeamMembers };

export default connect(mapStateToProps)(BillingOverview);