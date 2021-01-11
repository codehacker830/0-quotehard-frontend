import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTeamMembers } from '../../../actions/Team'
import NavCrump from '../../../components/NavCrump'
import { toFixedFloat } from '../../../util'
import axios from '../../../util/Api'
import dateFormat from 'dateformat';
import { toInteger } from 'lodash'
import ContentLoader from "react-content-loader"

export const MyLoader = (props) => (
   <ContentLoader
      speed={2}
      width={340}
      height={20}
      viewBox="0 0 340 20"
      backgroundColor="#cfcfcf"
      foregroundColor="#ecebeb"
      {...props}
   >
      <rect x="0" y="0" rx="3" ry="3" width={props.rwidth ? props.rwidth : 100} height={props.rheight ? props.rheight : 20} />
   </ContentLoader>
);

const CurrentPlan = ({ teamMembers }) => {
   if (teamMembers.length > 1) return <strong className="text-black">Business Time, with {teamMembers.length} Team Members</strong>
   else return <strong className="text-black">One Man Band, with {teamMembers.length} Team Member</strong>
}
const cPlanPrice = (teamMembers) => {
   if (teamMembers.length > 1) {
      if (teamMembers.length <= 5) return 45;
      else return 45 + (teamMembers.length - 5) * 6;
   }
   return 25;
}
const PaymentDetails = ({ card }) => {
   if (card["brand"] && card["last4"]) return <React.Fragment>
      <div className="mb-2">
         <strong className="">Saved:</strong>&nbsp;
         <span className="text-uppercase">{card["brand"]}</span> •••• •••• ••••{card["last4"]}
      </div>
      <div>
         <Link className="btn btn-alt-secondary mr-3" to={{
            pathname: "/app/settings/payment-details",
            state: {
               from: "/app/settings/billing-overview"
            }
         }}>Update Payment Details</Link>
         <span className="font-size-sm text-success"><i className="fa fa-lock mr-1"></i>SECURE</span>
      </div>
   </React.Fragment>;
   else return <React.Fragment>
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
   </React.Fragment>;
}
export const BillingOverview = (props) => {
   const [isLoading, setLoading] = useState(false);
   const [currency, setCurrency] = useState("")
   const [amount, setAmount] = useState("")
   const [paymentDate, setPaymentDate] = useState(null);
   const [card, setCard] = useState({
      brand: "",
      last4: ""
   });
   useEffect(() => {
      setLoading(true);
      axios.get('/settings/payment')
         .then(({ data }) => {
            setLoading(false);
            console.log(" %%%% payment details %%%%% ", data);
            const { subscription, customer, paymentMethod } = data;
            if (subscription && customer && paymentMethod) {
               const subscriptionItems = subscription["items"]["data"];
               setCard({
                  brand: paymentMethod["card"]["brand"],
                  last4: paymentMethod["card"]["last4"]
               });
               setPaymentDate(toInteger(subscription["current_period_end"] * 1000));
               setCurrency(subscriptionItems[0]["price"]["currency"]);
               setAmount(subscriptionItems[0]["price"]["unit_amount"] / 100);
            } else {
               console.log("props.accountCompany.createdAt ==>", props.accountCompany.createdAt);
               const createdAt = new Date(props.accountCompany.createdAt);
               createdAt.setDate(createdAt.getDate() + 30);
               setPaymentDate(createdAt);
               setCurrency("USD");
               setAmount(cPlanPrice(props.teamMembers));
            }
         }).catch(error => {
            setLoading(false);
         });
   }, []);
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <div className="maxWidth-800">
               <h1>Billing Overview</h1>
               <div className="mb-5">
                  <div className="mb-3 font-size-lg">
                     <span className="text-secondary font-w400">Account:</span>&nbsp;
                     <strong className="util-no-wrap text-black"><span>{props.accountCompany.companyName}</span></strong>
                     <br />
                     <span className="text-secondary font-w400">Total cost, per month:</span>&nbsp;
                     {
                        isLoading ?
                           <MyLoader rwidth={100} rheight={20} />
                           : <strong className="text-uppercase text-black"><span>{currency}&nbsp;{toFixedFloat(amount)}</span></strong>
                     }
                     <br />
                     <span className="text-secondary font-w400">Next payment:</span>&nbsp;
                     {
                        isLoading ?
                           <MyLoader rwidth={150} rheight={20} />
                           : <strong className="util-no-wrap text-black"><span>{dateFormat(paymentDate, "mmmm d, yyyy")}</span></strong>
                     }
                     <br />
                     <span className="text-secondary font-w400">Current plan:</span>&nbsp;
                     {
                        isLoading ?
                           <MyLoader rwidth={300} rheight={20} />
                           : <CurrentPlan teamMembers={props.teamMembers} />
                     }
                  </div>
                  <div className="mb-5">
                     <br />
                     5 Team Members are included in your plan. Additional Team Members are $6 each per month.
                     <br />
                     For more information, see the <a target="_blank" rel="noreferrer" href="https://www.quotientapp.com/pricing">pricing page</a>.
                  </div>
                  <div className="mb-5">
                     <h3 className="mb-2">Payment Details</h3>
                     {
                        isLoading ?
                           <React.Fragment>
                              <div>
                                 <MyLoader rwidth={240} rheight={20} />
                              </div>
                              <div>
                                 <MyLoader rwidth={300} rheight={20} />
                              </div>
                           </React.Fragment>
                           : <PaymentDetails card={card} />
                     }
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

const mapStateToProps = ({ auth, teamSetting }) => {
   const { accountCompany } = auth;
   const { teamMembers } = teamSetting;
   return { accountCompany, teamMembers };
};
// const mapDispatchToProps = { getTeamMembers };

export default connect(mapStateToProps)(BillingOverview);