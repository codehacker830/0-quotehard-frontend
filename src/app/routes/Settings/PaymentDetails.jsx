import React from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump'

export const PaymentDetails = (props) => {
   const { location } = props;
   const { state } = location;
   let HeadLinkText = 'Dashboard';
   if (state && state.from === "/app/settings/billing-overview") HeadLinkText = 'Billing Overview';
   return (
      <React.Fragment>
         <NavCrump linkTo={`${state && state.from ? state.from : "/app"}`}>
            {HeadLinkText}
         </NavCrump>
         <div className="content">
            <h1>Payment Details</h1>
            <div className="maxWidth-400 mb-2">
               <div className="mb-3">
                  <div className="d-flex">
                     <label htmlFor="example-text-input">Card Number</label>
                     <span className="ml-auto font-size-sm text-success"><i className="fa fa-lock mr-1" />SECURE</span>
                  </div>
                  <input type="text" className="form-control rounded-0" id="example-text-input" name="example-text-input" placeholder="" />
               </div>

               <div className="mb-3">
                  <label htmlFor="example-text-input">Expiry Date</label>
                  <div className="d-flex maxWidth-180">
                     <select className="form-control rounded-0 mr-2" id="billing__expiry_month" name="billing__expiry_month">
                        <option defaultValue>MM</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                     </select>
                     <select className="form-control rounded-0" id="billing__expiry_year" name="billing__expiry_year">
                        <option defaultValue>YY</option>
                        <option value={2020}>20</option>
                        <option value={2021}>21</option>
                        <option value={2022}>22</option>
                        <option value={2023}>23</option>
                        <option value={2024}>24</option>
                        <option value={2025}>25</option>
                        <option value={2026}>26</option>
                        <option value={2027}>27</option>
                        <option value={2028}>28</option>
                        <option value={2029}>29</option>
                     </select>
                  </div>
               </div>

               <div className="mb-3">
                  <label htmlFor="example-text-input">Name on Card</label>
                  <input type="text" className="form-control rounded-0" id="example-text-input" name="example-text-input" placeholder="" />
               </div>

               <div className="mb-3">
                  <label htmlFor="example-text-input">CVC</label>
                  <input type="text" className="form-control rounded-0 width-115" id="example-text-input" name="example-text-input" placeholder="" />
                  <p className="text-secondary fa-xs">3 or 4 digit code, usually found on the back of your card.</p>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1">Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={`${state && state.from ? state.from : "/app"}`}>Cancel</Link>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default PaymentDetails