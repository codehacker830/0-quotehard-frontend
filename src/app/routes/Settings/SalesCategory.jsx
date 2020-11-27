import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getSalesTaxes } from '../../../actions/Settings';
import NavCrump from '../../../components/NavCrump'
import axios from '../../../util/Api';

export const SalesCategory = (props) => {
   const { id } = props.match.params;
   const [status, setStatus] = useState("");
   const [categoryName, setCategoryName] = useState("");
   const [description, setDescription] = useState("");
   const [defaultSalesTax, setDefaultSalesTax] = useState("0");
   
   const settings = useSelector(state => {
      const { defaultSalesCategory, salesTaxes } = state.settings;
      return { defaultSalesCategory, salesTaxes };
   });
   const onClickSave = () => {
      if (props.match.path === "/app/settings/sales-category/:id") {
         axios.put(`/settings/sales-category/${id}`, { categoryName, description, defaultSalesTax })
            .then(() => {
               props.history.push('/app/settings/sales-tax-categories');
               toast.success('Sales Category - Saved.')
            })
            .catch(err => {
               toast.error('Sales Category - Failed to update.');
            });
      }
      if (props.match.path === "/app/settings/sales-category/create-new") {
         axios.post(`/settings/sales-category/create-new`, { categoryName, description, defaultSalesTax })
            .then(() => {
               props.history.push('/app/settings/sales-tax-categories');
               toast.success('Sales Category - Created.')
            })
            .catch(err => {
               toast.error('Sales Category - Failed to create.');
            });
      }
   }

   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getSalesTaxes("current"));
   }, []);
   useEffect(() => {
      if (props.match.path === "/app/settings/sales-category/:id") {
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

   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings/sales-tax-categories`}>
            Sales Tax
         </NavCrump>
         <div className="content">
            <div className="mb-5">
               {props.match.path === "/app/settings/sales-category/:id" && <h2>Update Sales Category</h2>}
               {props.match.path === "/app/settings/sales-category/create-new" && <h2>New Sales Category</h2>}
            </div>

            <div>
               {
                  status === "archived" &&
                  <div className="mb-3">
                     <span className="label">Archived</span>
                  </div>
               }
               {
                  settings.defaultSalesCategory == id &&
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
                        settings.salesTaxes.map((salesTax, index) => <option value={salesTax._id} key={index}>{salesTax.taxName}</option>)
                     }
                  </select>
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

export default SalesCategory