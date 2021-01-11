import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../../util/Api';

export default function ManualCardForm() {
   const { state } = useLocation();
   const [isLoading, setLoading] = useState(false);
   const [number, setNumber] = useState("");
   const [expMonth, setExpMonth] = useState("");
   const [expYear, setExpYear] = useState("");
   const [cvc, setCvc] = useState("");
   const [name, setName] = useState("");
   const onHandleSubmit = () => {
      if (
         !number
         || !expMonth
         || !expYear
         || !cvc
         || !name
      ) { toast.success("Please fill in all fields."); return; }
      setLoading(true);
      axios.post('/settings/payment/subscription', {
         number,
         expMonth,
         expYear,
         cvc,
         name
      }).then(() => {
         
         setLoading(false);
      }).catch(error => {

         setLoading(false);
      })
   }
   return (
      <div className="maxWidth-400 mb-2">
         <div className="mb-3">
            <div className="d-flex">
               <label htmlFor="example-text-input">Card Number</label>
               <span className="ml-auto font-size-sm text-success"><i className="fa fa-lock mr-1" />SECURE</span>
            </div>
            <input type="text" className="form-control rounded-0" id="example-text-input" name="example-text-input" value={number} onChange={ev => setNumber(ev.target.value)} />
         </div>

         <div className="mb-3">
            <label htmlFor="example-text-input">Expiry Date</label>
            <div className="d-flex maxWidth-180">
               <select className="form-control rounded-0 mr-2" id="billing__expiry_month" name="billing__expiry_month" value={expMonth} onChange={ev => setExpMonth(ev.target.value)}>
                  <option defaultValue>MM</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
               </select>
               <select className="form-control rounded-0" id="billing__expiry_year" name="billing__expiry_year" value={expYear} onChange={ev => setExpYear(ev.target.value)}>
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
            <label htmlFor="nameOnCard">Name on Card</label>
            <input type="text" className="form-control rounded-0" id="nameOnCard" name="nameOnCard" value={name} onChange={ev => setName(ev.target.value)} />
         </div>

         <div className="mb-3">
            <label htmlFor="cvc">CVC</label>
            <input type="text" className="form-control rounded-0 width-115" id="cvc" name="cvc" value={cvc} onChange={ev => setCvc(ev.target.value)} />
            <p className="text-secondary fa-xs">3 or 4 digit code, usually found on the back of your card.</p>
         </div>

         <div className="mb-4">
            <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" disabled={isLoading} onClick={onHandleSubmit}>
               {isLoading && <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />}
               Save
            </button>
            <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={`${state && state.from ? state.from : "/app"}`}>Cancel</Link>
         </div>
      </div>

   )
}
