import React from 'react'

export default function PriceItemsData() {
   return (
      <div className="mb-3">
         <strong>Price Items</strong>
         <div className="row no-gutters">
            <button type="button" className="btn btn-sm btn-alt-dark mr-2"><i className="fa fa-fw fa-download" /> Download CSV</button>
            <button type="button" className="btn btn-sm btn-alt-info">Import...</button>
         </div>
      </div>
   )
}
