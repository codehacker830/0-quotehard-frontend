import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../../components/InlineHelp';

export default class TemplateItems extends Component {
   
   componentDidMount() {

   }
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
                                 <input type="email" className="form-control" placeholder="Search by Quote Title, Number or Contact..." />
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
                              <Link to="/app/content/template/get" className="btn btn-success ml-auto">New Template</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="block block-rounded">
                  <div className="block-content">
                     <InlineHelp>
                        Templates are collections of items.
                        <br />Save time and improve consistency by making your ideal quote reusable.
                        <br />
                        <a className="font-size-h5" target="_blank" href="https://www.quotientapp.com/help/templates-getting-started">Read more in the Help Article…</a>
                     </InlineHelp>
                  </div>
               </div>
            </div>
      );
   }
}