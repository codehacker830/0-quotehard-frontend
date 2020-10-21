import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import InlineHelp from '../../../components/InlineHelp';
import TotalLabelFor from '../../../components/TotalLabelFor';
import axios from '../../../util/Api';
import { toastrErrorConfig, toastrSuccessConfig } from '../../../util/toastrConfig';

export default class TemplateItems extends Component {
   mounted = false;
   state = {
      templates: []
   };

   componentDidMount() {
      this.mounted = true;
      if (this.mounted) {
         axios.get('/templates')
            .then(({ data }) => {
               console.log("res data ---------------->", data);
               this.setState({ templates: data.templates });
            })
            .catch(err => {
               console.error(" error ===>", err);
               toastr.error("Error", "Template failed to create", toastrErrorConfig);
            });
      }
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
                  {
                     this.state.templates.length === 0 ?
                        <InlineHelp>
                           Templates are collections of items.
                        <br />Save time and improve consistency by making your ideal quote reusable.
                        <br />
                           <a className="font-size-h5" target="_blank" href="https://www.quotientapp.com/help/templates-getting-started">Read more in the Help Article…</a>
                        </InlineHelp> : <React.Fragment>
                           <table className="quotient-table">
                              <tbody className="rowClick">
                                 {
                                    this.state.templates.map((item, index) => {
                                       return (
                                          <tr onClick={() => history.push(`/app/content/template/${item._id}`)} key={index}>
                                             <td>
                                                <div className="d-flex">
                                                   <div className="u-ellipsis">
                                                      <Link to={`/app/content/template/${item._id}`}>{item.title}</Link>
                                                      <br />
                                                      <small className="text-gray font-size-sm">{item.updatedAt}</small>
                                                   </div>
                                                </div>
                                             </td>
                                          </tr>
                                       );
                                    })
                                 }
                              </tbody>
                           </table>
                           <TotalLabelFor list={this.state.templates} />
                        </React.Fragment>
                  }
               </div>
            </div>
         </div>
      );
   }
}