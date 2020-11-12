import React from 'react';
import NavCrump from '../../../components/NavCrump';

export const YourData = (props) => {
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <h2 className="my-4">Import / Export</h2>

            <div className="mb-5">
               <div className="mb-2">
                  <h6>Contacts</h6>
                  <div className="row no-gutters">
                     <button type="button" className="btn btn-sm btn-alt-dark mr-2"><i className="fa fa-fw fa-download" /> Download CSV</button>
                     <button type="button" className="btn btn-sm btn-alt-info">Import...</button>
                  </div>
               </div>

               <div className="mb-2">
                  <h6>Price Items</h6>
                  <div className="row no-gutters">
                     <button type="button" className="btn btn-sm btn-alt-dark mr-2"><i className="fa fa-fw fa-download" /> Download CSV</button>
                     <button type="button" className="btn btn-sm btn-alt-info">Import...</button>
                  </div>
               </div>

               <div className="mb-2">
                  <h6>Text Items</h6>
                  <div className="row no-gutters">
                     <button type="button" className="btn btn-sm btn-alt-dark mr-2"><i className="fa fa-fw fa-download" /> Download CSV</button>
                     <button type="button" className="btn btn-sm btn-alt-info">Import...</button>
                  </div>
               </div>
            </div>

            <div className="mb-5">
               <h3>Your Quotes</h3>
               <div className="mb-2">
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
            </div>

            <div className="mb-2">
               <p>Read the <a target="_blank" href="http://quotehard.com">Help Article</a> for more details.</p>
            </div>
         </div>
      </React.Fragment>
   );
}

export default YourData;