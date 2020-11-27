import React from 'react'
import { Link, withRouter } from 'react-router-dom';

export const SalesTaxTable = (props) => {
   const { salesTaxes, defaultSalesTax } = props;
   if (!salesTaxes.length) return <p className="u-section">No Sales Taxes to show.</p>
   else return (
      <table className="quotient-table table">
         <tbody className="rowClick" data-tg-click="root_rowClick">
            {
               salesTaxes.map((salesTax, index) => (
                  <tr key={index} onClick={() => props.history.push(`/app/settings/sales-tax/${salesTax._id}`)}>
                     <td>
                        <Link to={`/app/settings/sales-tax/${salesTax._id}`}>
                           {salesTax.taxName}
                           {
                              salesTax._id === defaultSalesTax &&
                              <span className="label label-success ml-1">Default</span>
                           }
                           <br />
                           <small>{salesTax.taxRate}%</small>
                        </Link>
                     </td>
                  </tr>
               ))
            }
         </tbody>
      </table>
   )
}

export default withRouter(SalesTaxTable);