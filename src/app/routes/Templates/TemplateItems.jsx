import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import InlineHelp from '../../../components/InlineHelp';
import TotalLabelFor from '../../../components/TotalLabelFor';
import { formatDate } from '../../../util';
import axios from '../../../util/Api';
import { toastErrorConfig, toastSuccessConfig } from '../../../util/toastrConfig';

export default class TemplateItems extends Component {
   mounted = false;
   state = {
      defaultTemplateId: null,
      filterStatus: "current",
      templates: []
   };
   filterTemplates = (templates) => {
      return templates.filter((template) => {
         return template.status === this.state.filterStatus;
      })
   }
   componentDidMount() {
      this.mounted = true;
      if (this.mounted) {
         console.log("asdfadsfasdf");
         const Promise1 = axios.get('/templates')
         // .then(({ data }) => {
         //    console.log("res data ---------------->", data);
         //    this.setState({ templates: data.templates });
         // });

         const Promise2 = axios.get(`/templates/default_id`)
         // .then(({ data }) => {
         //    console.log("res data ---------------->", data);
         //    this.setState({ templates: data.templates });
         // });
         Promise.all([Promise1, Promise2]).then((values) => {
            console.log("values ==========================>", values);
            const { defaultTemplateId } = values[1].data;
            this.setState({
               templates: values[0].data.templates,
               defaultTemplateId
            })
         }).catch(err => {
            console.error(" error ===>", err);
            toast.error("Failed to get templates list", toastErrorConfig);
         });
      }
   }
   render() {
      const { history } = this.props;
      const templateList = this.filterTemplates(this.state.templates);
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
                                 <select className="form-control" id="filter_from" name="filter_from"
                                    value={this.state.filterStatus}
                                    onChange={(ev) => this.setState({ filterStatus: ev.target.value })}
                                 >
                                    <option value="current">Current</option>
                                    <option value="archived">Archived</option>
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
                     templateList.length === 0 ?
                        <InlineHelp>
                           Templates are collections of items.
                        <br />Save time and improve consistency by making your ideal quote reusable.
                        <br />
                           <a className="font-size-h5" target="_blank" href="https://www.quotientapp.com/help/templates-getting-started">Read more in the Help Article…</a>
                        </InlineHelp> : <React.Fragment>
                           <table className="quotient-table">
                              <tbody className="rowClick">
                                 {
                                    templateList.map((item, index) => {
                                       return (
                                          <tr onClick={() => history.push(`/app/content/template/${item._id}`)} key={index}>
                                             <td>
                                                <div className="d-flex">
                                                   <div className="u-ellipsis">
                                                      <Link to={`/app/content/template/${item._id}`}>{item.title}</Link>
                                                      {
                                                         item.status === "archived" &&
                                                         <span className="badge badge-secondary px-2 py-1 ml-1 text-uppercase">Archived</span>
                                                      }
                                                      {
                                                         this.state.defaultTemplateId === item._id &&
                                                         <span className="badge badge-success px-2 py-1 ml-1 text-uppercase">Default</span>
                                                      }
                                                      <br />
                                                      <small className="text-gray font-size-sm">{formatDate(item.updatedAt)}</small>
                                                   </div>
                                                </div>
                                             </td>
                                          </tr>
                                       );
                                    })
                                 }
                              </tbody>
                           </table>
                           <TotalLabelFor list={templateList} />
                        </React.Fragment>
                  }
               </div>
            </div>
         </div>
      );
   }
}