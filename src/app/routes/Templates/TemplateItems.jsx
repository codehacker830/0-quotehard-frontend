import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import InlineHelp from '../../../components/InlineHelp';
import TotalLabelFor from '../../../components/TotalLabelFor';
import { formatDate } from '../../../util';
import axios from '../../../util/Api';
import { CONTENT_TEMPLATE_GET_PATH } from '../../../constants/PathNames';

export default class TemplateItems extends Component {
   mounted = false;
   state = {
      defaultTemplateId: null,
      filterStatus: "current",
      templates: []
   };
   componentDidMount() {
      this.mounted = true;
      if (this.mounted) {
         const Promise1 = axios.get(`/templates/status/${this.state.filterStatus}`);
         const Promise2 = axios.get(`/templates/defaultId`);
         Promise.all([Promise1, Promise2]).then((values) => {
            console.log("values --------", values)

            const { defaultTemplateId } = values[1].data;
            this.setState({
               templates: values[0].data.templates,
               defaultTemplateId
            })
         }).catch(err => {
            console.error(" error ===>", err);
            toast.error("Failed to get templates list");
         });
      }
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.filterStatus !== this.state.filterStatus) {
         axios.get(`/templates/status/${this.state.filterStatus}`).then(({ data }) => {
            console.log("data.templates --------", data.templates)
            this.setState({ templates: data.templates });
         })
      }
   }
   render() {
      const { history } = this.props;
      const { templates } = this.state;
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
                           <Link to={CONTENT_TEMPLATE_GET_PATH} className="btn btn-success ml-auto">New Template</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="block block-rounded">
               <div className="block-content">
                  {
                     templates.length === 0 ?
                        <InlineHelp>
                           Templates are collections of items.
                        <br />Save time and improve consistency by making your ideal quote reusable.
                        <br />
                           <a className="font-size-h5" target="_blank" href="https://www.quotientapp.com/help/templates-getting-started">Read more in the Help Article…</a>
                        </InlineHelp> : <React.Fragment>
                           <table className="quotient-table">
                              <tbody className="rowClick">
                                 {
                                    templates.map((item, index) => {
                                       return (
                                          <tr onClick={() => history.push(`/app/content/template/${item._id}`)} key={index}>
                                             <td>
                                                <div className="d-flex">
                                                   <div className="u-ellipsis">
                                                      <Link to={`/app/content/template/${item._id}`}>{item.title}</Link>&nbsp;
                                                      {
                                                         item.status === "archived" &&
                                                         <><span className="label">Archived</span>&nbsp;</>
                                                      }
                                                      {
                                                         this.state.defaultTemplateId === item._id &&
                                                         <><span className="label label-success">Default</span>&nbsp;</>
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
                           <TotalLabelFor list={templates} />
                        </React.Fragment>
                  }
               </div>
            </div>
         </div>
      );
   }
}