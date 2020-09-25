import React from 'react'
import { Link } from 'react-router-dom'
import NavCrump from '../../../components/NavCrump'

export const SalesCategory = (props) => {
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings/sales-tax-categories`}>
            Sales Tax
         </NavCrump>
         <div className="content">
            <div className="mb-5">
               <h2>Update Sales Category</h2>
            </div>

            <div>
               <div className="mb-3">
                  <span className="label label-success">Default</span>
               </div>

               <div className="mb-3">
                  <label htmlFor="example-text-input">Category Name</label>
                  <input type="text" className="form-control font-w700 maxWidth-200" id="example-text-input" name="example-text-input" placeholder="" defaultValue="Sales" />
               </div>
               <div className="mb-3">
                  <label htmlFor="example-text-input">Description</label>
                  <input type="text" className="form-control maxWidth-300" id="example-text-input" name="example-text-input" placeholder="" defaultValue="General sales" />
               </div>
               <div className="mb-5">
                  <label htmlFor="example-select">Default Sales Tax</label>
                  <select className="form-control maxWidth-300" id="example-select" name="example-select">
                     <option value={0} selected="selected">No default sales tax</option>
                     <option value={86349}>10% tax</option>
                     <option value={86350}>No tax</option>
                  </select>
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

export default SalesCategory