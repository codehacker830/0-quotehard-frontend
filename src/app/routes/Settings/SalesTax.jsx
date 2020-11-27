import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getSalesCategories } from '../../../actions/Settings';
import NavCrump from '../../../components/NavCrump'
import axios from '../../../util/Api';
import { SALES_TAX_CATEGORIES_PATH, SALES_TAX_CREATE_PATH, SALES_TAX_UPDATE_PATH } from '../../../constants/PathNames';

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
      if (props.match.path === SALES_TAX_UPDATE_PATH) {
         axios.put(`/settings/sales-tax/${id}`, { taxName, taxRate })
            .then(() => {
               props.history.push(SALES_TAX_CATEGORIES_PATH);
               toast.success('Sales Tax - Saved.')
            })
            .catch(err => {
               toast.error('Sales Tax - Failed to update.');
            });
      }
      if (props.match.path === SALES_TAX_CREATE_PATH) {
         axios.post(`/settings/sales-tax/create-new`, { taxName, taxRate })
            .then(() => {
               props.history.push(SALES_TAX_CATEGORIES_PATH);
               toast.success('Sales Tax - Created.')
            })
            .catch(err => {
               toast.error('Sales Tax - Failed to create.');
            });
      }
   }

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getSalesCategories("current"));
   }, []);
   useEffect(() => {
      console.log("********** props ", props);
      if (props.match.path === SALES_TAX_UPDATE_PATH) {
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
      }
      return () => { };
   }, [id]);
   return (
      <React.Fragment>
         <NavCrump linkTo={SALES_TAX_CATEGORIES_PATH}>
            Sales Tax
         </NavCrump>
         <div className="content">
            <div className="mb-5">
               {
                  props.match.path === SALES_TAX_UPDATE_PATH && <h2>Update Sales Tax</h2>
               }
               {
                  props.match.path === SALES_TAX_CREATE_PATH && <h2>New Sales Tax</h2>
               }
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
                     <input type="text" className="form-control" id="taxRate" name="taxRate"
                        disabled={props.match.path === "/settings/sales-category/:id"}
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
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={SALES_TAX_CATEGORIES_PATH}>Cancel</Link>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default SalesTax