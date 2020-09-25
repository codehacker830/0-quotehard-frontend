import React from 'react'
import { Link } from 'react-router-dom'
import NavCrump from '../../../components/NavCrump'

export const SalesTaxCategories = (props) => {
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <h2>Sales Tax &amp; Categories</h2>
            <div className="mb-4">
               <label htmlFor="browser-filter">Filter by</label>
               <select className="form-control maxWidth-300" id="browser-filter" name="browser-filter">
                  <option value selected="selected">Current</option>
                  <option value="Archived">Archived</option>
               </select>
            </div>
            <h3 className="text-gray font-w400 p-5">
               Create new Sales Taxes and Categories. You can also set the default Sales Tax and Sales Categories for new Quote Items.
               <br />
               <a target="_blank" rel="noreferrer" className="font-size-sm" href="https://www.quotientapp.com/help/sales-taxes-categories">Read more in the Help Article…
                </a>
            </h3>
            <div className="row">
               <div className="col-sm-6">
                  <h3>Sales Tax</h3>
                  <table className="quotient-table table">
                     <tbody className="rowClick" data-tg-click="root_rowClick">
                        <tr>
                           <td>
                              <Link to="/app/settings/sales-tax/86349">
                                 10% tax <span className="label label-success">Default</span> <br />
                                 <small>10%</small>
                              </Link>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <Link to="/app/settings/sales-tax/86350">
                                 No tax <br />
                                 <small>0%</small>
                              </Link>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <div className="mb-4">
                     <Link className="btn btn-success" to="/app/settings/sales-tax/create-new">New Sales Tax</Link>
                  </div>
               </div>
               <div className="col-sm-6">
                  <h3>Sales Categories</h3>
                  <table className="quotient-table table">
                     <tbody className="rowClick" data-tg-click="root_rowClick">
                        <tr>
                           <td>
                              <Link to="/app/settings/sales-category/61417">
                                 Sales <span className="label label-success">Default</span> <br />
                                 <p className="text-secondary font-size-sm">General sales</p>
                              </Link>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <div className="clear" />
                  <div className="mb-4">
                     <Link className="btn btn-success" to="/app/settings/sales-category/create-new">New Sales Category</Link>
                  </div>
               </div>
            </div>

            <div className="mb-4">

            </div>
         </div>
      </React.Fragment>
   )
}

export default SalesTaxCategories