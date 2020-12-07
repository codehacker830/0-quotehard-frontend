import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getDefaultSalesCategory, getSalesTaxes, updateDefaultSalesCategory } from '../../../actions/GlobalSettings';
import NavCrump from '../../../components/NavCrump'
import axios from '../../../util/Api';
import { SALES_CATEGORY_CREATE_PATH, SALES_CATEGORY_UPDATE_PATH, SALES_TAX_CATEGORIES_PATH } from '../../../constants/PathNames';
import NavCrumpLeft from '../../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../../components/NavCrump/NavCrumpRight';

export const SalesCategory = (props) => {
   const { id } = props.match.params;
   const [status, setStatus] = useState("");
   const [categoryName, setCategoryName] = useState("");
   const [description, setDescription] = useState("");
   const [defaultSalesTax, setDefaultSalesTax] = useState("0");

   const globalSettings = useSelector(state => {
      const { defaultSalesCategory, salesTaxes } = state.globalSettings;
      return { defaultSalesCategory, salesTaxes };
   });
   const onClickSave = () => {
      if (props.match.path === SALES_CATEGORY_UPDATE_PATH) {
         axios.put(`/settings/sales-category/${id}`, { categoryName, description, defaultSalesTax })
            .then(() => {
               props.history.push(SALES_TAX_CATEGORIES_PATH);
               toast.success('Sales Category - Saved.')
            })
            .catch(err => {
               toast.error('Sales Category - Failed to update.');
            });
      }
      if (props.match.path === SALES_CATEGORY_CREATE_PATH) {
         axios.post(`/settings/sales-category/create-new`, { categoryName, description, defaultSalesTax })
            .then(() => {
               props.history.push(SALES_TAX_CATEGORIES_PATH);
               toast.success('Sales Category - Created.')
            })
            .catch(err => {
               toast.error('Sales Category - Failed to create.');
            });
      }
   }
   const { defaultSalesCategory, salesTaxes } = globalSettings;
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getSalesTaxes("current"));
      dispatch(getDefaultSalesCategory());
   }, []);
   useEffect(() => {
      if (props.match.path === SALES_CATEGORY_UPDATE_PATH) {
         axios.get(`/settings/sales-category/${id}`)
            .then(({ data }) => {
               console.log("dataaaa", data);
               const { status, categoryName, description, defaultSalesTax } = data.salesCategory;
               setStatus(status);
               setCategoryName(categoryName);
               setDescription(description);
               if (defaultSalesTax) setDefaultSalesTax(defaultSalesTax);
            })
            .catch(err => {
               toast.error('Sales Category - Failed to fetch');
            });
      }
      return () => { };
   }, [id]);
   const onClickArchive = () => {
      if (status === "current") {
         if (defaultSalesCategory === id) {
            toast.success('You may not archive the default category. Make another the default first.');
            return;
         }
         axios.get(`/settings/archive/sales-category/${id}`)
            .then(({ data }) => {
               console.log("archive sales cateogry res __", data);
               const { status, categoryName, description, defaultSalesTax } = data.salesCategory;
               setStatus(status);
               setCategoryName(categoryName);
               setDescription(description);
               if (defaultSalesTax) setDefaultSalesTax(defaultSalesTax);
               toast.success('Sales Category - archived.');
            })
            .catch(err => {
               toast.success('Failed to archive.');
            });
      } else {
         axios.get(`/settings/un-archive/sales-category/${id}`)
            .then(({ data }) => {
               console.log("dataaaa", data);
               const { status, categoryName, description, defaultSalesTax } = data.salesCategory;
               setStatus(status);
               setCategoryName(categoryName);
               setDescription(description);
               if (defaultSalesTax) setDefaultSalesTax(defaultSalesTax);
               toast.success('Sales Category - unarchived.');
            })
            .catch(err => {
               toast.success('Failed to undo-archive.');
            });
      }
   }
   const onClickDefault = () => {
      if (status === "current") {
         dispatch(updateDefaultSalesCategory(id));
      } else {
         toast.success('You may not make the archived one as default.');
      }
   }
   return (
      <React.Fragment>
         <NavCrump>
            <NavCrumpLeft linkTo={SALES_TAX_CATEGORIES_PATH}>
               Sales Tax
            </NavCrumpLeft>
            {
               props.match.path === SALES_CATEGORY_UPDATE_PATH &&
               <NavCrumpRight>
                  <ul className="choices" style={{ left: 45, top: 10 }}>
                     <li>
                        <button className="btn-in-action" onClick={onClickArchive}>
                           <div className="mx-3">
                              <i className="fa fa-fw fa-archive text-secondary" />
                           </div>
                           <div className="media-body font-size-sm font-w600 pr-2">
                              <span>Archive
                              {status === "archived" && <span className="choices-undo"> ← undo</span>}
                              </span>
                           </div>
                        </button>
                     </li>
                     <li>
                        <button className="btn-in-action" onClick={onClickDefault}>
                           <div className="mx-3">
                              <i className="fa fa-fw fa-star text-secondary" />
                           </div>
                           <div className="media-body font-size-sm font-w600 pr-2">
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
               {props.match.path === SALES_CATEGORY_UPDATE_PATH && <h2>Update Sales Category</h2>}
               {props.match.path === SALES_CATEGORY_CREATE_PATH && <h2>New Sales Category</h2>}
            </div>

            <div>
               {
                  status === "archived" &&
                  <div className="mb-3">
                     <span className="label">Archived</span>
                  </div>
               }
               {
                  defaultSalesCategory == id &&
                  <div className="mb-3">
                     <span className="label label-success">Default</span>
                  </div>
               }
               <div className="mb-3">
                  <label htmlFor="categoryName">Category Name</label>
                  <input type="text" className="form-control font-w700 maxWidth-200" id="categoryName" name="categoryName"
                     value={categoryName}
                     onChange={(ev) => setCategoryName(ev.target.value)} />
               </div>
               <div className="mb-3">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control maxWidth-300" id="description" name="description"
                     value={description}
                     onChange={(ev) => setDescription(ev.target.value)} />
               </div>
               <div className="mb-5">
                  <label htmlFor="defaultSalesTax">Default Sales Tax</label>
                  <select className="form-control maxWidth-300" id="defaultSalesTax" name="defaultSalesTax"
                     value={defaultSalesTax}
                     onChange={(ev) => setDefaultSalesTax(ev.target.value)}
                  >
                     <option value="0">No default sales tax</option>
                     {
                        salesTaxes.map((salesTax, index) => <option value={salesTax._id} key={index}>{salesTax.taxName}</option>)
                     }
                  </select>
               </div>
               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={onClickSave}>Save</button>
                  <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings/sales-tax-categories">Cancel</Link>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default SalesCategory