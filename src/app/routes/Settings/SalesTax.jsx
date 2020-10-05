import React from 'react'
import { Link } from 'react-router-dom'
import NavCrump from '../../../components/NavCrump'

export const SalesTax = (props) => {
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings/sales-tax-categories`}>
            Sales Tax
         </NavCrump>
         <div className="content">
            <div className="mb-5">
               <h2>Update Sales Tax</h2>
            </div>

            <div>
               <div className="mb-3">
                  <label htmlFor="example-text-input">Tax Name</label>
                  <input type="text" className="form-control font-w700 maxWidth-200" id="example-text-input" name="example-text-input" placeholder="" defaultValue="No tax" />
               </div>
               <div className="mb-5">
                  <label htmlFor="account_expire_days">Tax Rate</label>
                  <div className="input-group maxWidth-180">
                     <input type="text" className="form-control" id="example-group1-input2" name="example-group1-input2" defaultValue={10} disabled/>
                     <div className="input-group-append">
                        <span className="input-group-text">%</span>
                     </div>
                  </div>
               </div>
               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-2">Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings/sales-tax-categories">Cancel</Link>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default SalesTax