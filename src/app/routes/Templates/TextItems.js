import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../../components/InlineHelp';

export default class TextItems extends Component {
   render() {
      const { history } = this.props;
      return (
         <div className="content">
            <div className="block block-rounded">
               <div className="block-content">
                  <div className="row p-3">
                     <div className="col-md-6">
                        <div className="form-group px-1">
                           <div className="input-group">
                              <input type="email" className="form-control" placeholder="Search by Heading or Description…" />
                              <div className="input-group-append">
                                 <button type="button" className="btn btn-alt-dark">Search</button>
                              </div>
                           </div>
                        </div>
                        <div className="row no-gutters">
                           <div className="col-sm-6 px-1">
                              <div className="form-group">
                                 <select className="form-control" id="filter_from" name="filter_from" defaultValue="Current">
                                    <option value="Current">Current</option>
                                    <option value="Archived">Archived</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="row mb-2">
                           <Link to="/app/content/item-text/create-new" className="btn btn-success ml-auto">New Item</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="block block-rounded">
               <div className="block-content">
                  <InlineHelp>
                     Create reusable items for your products and services, that autocomplete in quotes and templates.
                  </InlineHelp>
                  <table className="quotient-table">
                     <tbody className="rowClick">
                        <tr onClick={() => history.push(`/app/content/item-text/view/989002`)}>
                           <td>
                              <div className="d-flex">
                                 <div className="u-ellipsis">
                                    <Link to="/app/content/item-text/view/989002">Item Header</Link>
                                    <br />
                                    <small className="text-gray font-size-sm">It's long description</small>
                                 </div>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>

                  <div className="px-2 py-4">
                     <span>Total 2</span>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}