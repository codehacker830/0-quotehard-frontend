import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import NavCrump from '../../../components/NavCrump'
import axios from '../../../util/Api';

export const SalesTax = (props) => {
   const { id } = props.match.params;
   const [status, setStatus] = useState("");
   const [taxName, setTaxName] = useState("");
   const [taxRate, setTaxRate] = useState("");
   const settings = useSelector(state => {
      const { defaultSalesTax } = state.settings;
      return { defaultSalesTax };
   })
   const onClickSave = () => {
      axios.put(`/settings/sales-tax/${id}`, { taxName, taxRate })
         .then(() => {
            props.history.push('/app/settings/sales-tax-categories');
            toast.success('Sales Tax - Saved.')
         })
         .catch(err => {
            toast.error('Sales Tax - Failed to update.');
         });
   }
   useEffect(() => {
      axios.get(`/settings/sales-tax/${id}`)
         .then(({ data }) => {
            const { status, taxName, taxRate } = data.salesTax;
            setStatus(status);
            setTaxName(taxName);
            setTaxRate(taxRate);
         })
         .catch(err => {
            toast.error('Sales Tax - Failed to fetch');
         });
      return () => { };
   }, [id]);
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
                  {
                     status === "archived" &&
                     <div className="mb-3">
                        <span className="label">Archived</span>
                     </div>
                  }
                  {
                     settings.defaultSalesTax == id &&
                     <span className="label success">Default</span>
                  }
                  <label htmlFor="taxName">Tax Name</label>
                  <input type="text" className="form-control font-w700 maxWidth-200" id="taxName" name="taxName" placeholder=""
                     value={taxName}
                     onChange={(ev) => setTaxName(ev.target.value)}
                  />
               </div>
               <div className="mb-5">
                  <label htmlFor="taxRate">Tax Rate</label>
                  <div className="input-group maxWidth-180">
                     <input type="text" className="form-control" id="taxRate" name="taxRate" disabled
                        value={taxRate}
                        onChange={(ev) => setTaxRate(ev.target.value)}
                     />
                     <div className="input-group-append">
                        <span className="input-group-text">%</span>
                     </div>
                  </div>
               </div>
               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-2" onClick={onClickSave}>Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings/sales-tax-categories">Cancel</Link>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default SalesTax