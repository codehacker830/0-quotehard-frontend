import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from '../../../../actions/Settings';
import NavCrump from '../../../../components/NavCrump'
import SalesCategoryTable from './SalesCategoryTable';
import SalesTaxTable from './SalesTaxTable';

export const SalesTaxCategories = (props) => {
   const [status, setStatus] = useState("current");
   const settings = useSelector(state => {
      const { salesCatgories, salesTaxes, defaultSalesCategory, defaultSalesTax } = state.settings;
      return { salesCatgories, salesTaxes, defaultSalesCategory, defaultSalesTax };
   });
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getDefaultSalesCategory());
      dispatch(getDefaultSalesTax());
   }, []);
   useEffect(() => {
      dispatch(getSalesCategories(status));
      dispatch(getSalesTaxes(status));
   }, [status]);

   const { salesCatgories, salesTaxes, defaultSalesCategory, defaultSalesTax } = settings;
   console.log("SETTTINGS   ->", settings);
   console.log("status   ->", status);
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <h2>Sales Tax &amp; Categories</h2>
            <div className="mb-4">
               <label htmlFor="browser-filter">Filter by</label>
               <select className="form-control maxWidth-300" id="browser-filter" name="browser-filter"
                  onChange={(ev) => setStatus(ev.target.value)}>
                  <option value="current">Current</option>
                  <option value="archived">Archived</option>
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
                  <SalesTaxTable salesTaxes={salesTaxes} defaultSalesTax={defaultSalesTax}/>
                  <div className="mb-4">
                     <Link className="btn btn-success" to="/app/settings/sales-tax/create-new">New Sales Tax</Link>
                  </div>
               </div>
               <div className="col-sm-6">
                  <h3>Sales Categories</h3>
                  <SalesCategoryTable salesCatgories={salesCatgories} defaultSalesCategory={defaultSalesCategory} />
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