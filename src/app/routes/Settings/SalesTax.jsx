import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getDefaultSalesTax, getSalesCategories, setSalesTaxAsDefault } from '../../../actions/SalesSetting';
import NavCrump from '../../../components/NavCrump'
import axios from '../../../util/Api';
import { SALES_TAX_CATEGORIES_PATH, SALES_TAX_CREATE_PATH, SALES_TAX_UPDATE_PATH } from '../../../constants/PathNames';
import NavCrumpLeft from '../../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../../components/NavCrump/NavCrumpRight';

export const SalesTax = (props) => {
   const { id } = props.match.params;
   const [status, setStatus] = useState("");
   const [taxName, setTaxName] = useState("");
   const [taxRate, setTaxRate] = useState("");
   const defaultSalesTax = useSelector(state => state.salesSetting.defaultSalesTax);
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
      dispatch(getDefaultSalesTax());
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
   const onClickArchive = () => {
      if (status === "current") {
         if (defaultSalesTax === id) {
            toast.success('You may not archive the default tax. Make another the default first.');
            return;
         }
         axios.get(`/settings/sales-tax/archive/${id}`)
            .then(({ data }) => {
               const { status, taxName, taxRate } = data.salesTax;
               setStatus(status);
               setTaxName(taxName);
               setTaxRate(taxRate);
               toast.success('Sales Tax - archived.');
            })
            .catch(err => {
               toast.success('Failed to archive.');
            });
      } else {
         axios.get(`/settings/sales-tax/un-archive/${id}`)
            .then(({ data }) => {
               console.log("dataaaa", data);
               const { status, taxName, taxRate } = data.salesTax;
               setStatus(status);
               setTaxName(taxName);
               setTaxRate(taxRate);
               toast.success('Sales Tax - unarchived.');
            })
            .catch(err => {
               toast.success('Failed to undo-archive.');
            });
      }
   }
   const onClickDefault = () => {
      if (status === "current") {
         dispatch(setSalesTaxAsDefault(id));
      } else {
         toast.success('You may not make the archived one as default.');
      }
   }

   return (
      <React.Fragment>
         <NavCrump >
            <NavCrumpLeft linkTo={SALES_TAX_CATEGORIES_PATH}>
               Sales Tax
            </NavCrumpLeft>
            {
               props.match.path === SALES_TAX_UPDATE_PATH &&
               <NavCrumpRight>
                  <ul className="choices" style={{ left: 45, top: 10 }}>
                     <li>
                        <button className="btn-in-action" onClick={onClickArchive}>
                           <div className="icon-wrapper">
                              <i className="fa fa-fw fa-archive text-secondary" />
                           </div>
                           <div className="media-body font-size-sm pr-2">
                              <span>Archive
                              {status === "archived" && <span className="choices-undo"> ← undo</span>}
                              </span>
                           </div>
                        </button>
                     </li>
                     <li>
                        <button className="btn-in-action" onClick={onClickDefault}>
                           <div className="icon-wrapper">
                              <i className="fa fa-fw fa-star text-secondary" />
                           </div>
                           <div className="media-body font-size-sm pr-2">
                              <span>Make default</span>
                           </div>
                        </button>
                     </li>
                  </ul>
               </NavCrumpRight>
            }
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
                     defaultSalesTax == id &&
                     <div className="mb-3">
                        <span className="label label-success">Default</span>
                     </div>
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
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={onClickSave}>Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={SALES_TAX_CATEGORIES_PATH}>Cancel</Link>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default SalesTax