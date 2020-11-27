import React from 'react'
import { Link, withRouter } from 'react-router-dom';

export const SalesCategoryTable = (props) => {
   const { salesCatgories, defaultSalesCategory } = props;
   if (!salesCatgories.length) return <p className="u-section">No Sales Categories to show.</p>
   else return (
      <table className="quotient-table table">
         <tbody className="rowClick" data-tg-click="root_rowClick">
            {
               salesCatgories.map((salesCategory, index) => (
                  <tr key={index} onClick={() => props.history.push(`/app/settings/sales-category/${salesCategory._id}`)}>
                     <td>
                        <Link to={`/app/settings/sales-category/${salesCategory._id}`}>
                           {salesCategory.categoryName}
                           {
                              salesCategory._id === defaultSalesCategory &&
                              <span className="label label-success ml-1">Default</span>
                           }
                           <br />
                           <p className="text-secondary font-size-sm">{salesCategory.description}</p>
                        </Link>
                     </td>
                  </tr>
               ))
            }
         </tbody>
      </table>
   )
}

export default withRouter(SalesCategoryTable);