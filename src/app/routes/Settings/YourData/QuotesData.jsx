import React from 'react'

export default function QuotesData() {
   return (
      <div className="mb-3">
         <label htmlFor="downloadType">What to download</label>
         <div className="input-group">
            <select className="form-control rounded-0 maxWidth-300 mr-1"
               id="downloadType"
               name="downloadType">
               <option value="quotes">Quotes</option>
               <option value="quotesAndPriceItems">Quotes, Price Items</option>
            </select>
            <div className="input-group-append">
               <button type="button" className="btn btn-sm btn-alt-dark mr-2"><i className="fa fa-fw fa-download" /> Download CSV</button>
            </div>
         </div>
      </div>
   )
}
