import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../../../components/InlineHelp';
import TotalLabelFor from '../../../../components/TotalLabelFor';
import axios from '../../../../util/Api';

export default class TextItems extends Component {
   state = {
      textItems: [],
      filterStatus: "current",
   };
   componentDidMount() {
      axios.get(`/templates/textitem/status/${this.state.filterStatus}`).then(({ data }) => {
         this.setState({ textItems: data.textItems });
      }).catch(err => {
         console.error("err during get priceitems =>", err);
      })
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.filterStatus !== this.state.filterStatus) {
         axios.get(`/templates/textitem/status/${this.state.filterStatus}`).then(({ data }) => {
            this.setState({ textItems: data.textItems });
         })
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
                              <input type="email" className="form-control" placeholder="Search by Heading or Description…" />
                              <div className="input-group-append">
                                 <button type="button" className="btn btn-alt-dark">Search</button>
                              </div>
                           </div>
                        </div>
                        <div className="row no-gutters">
                           <div className="col-sm-6 px-1">
                              <div className="form-group">
                                 <select className="form-control" id="textItem_filter_from" name="textItem_filter_from"
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
                           <Link to="/app/content/item-text/create-new" className="btn btn-success ml-auto">New Item</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="block block-rounded">
               <div className="block-content">
                  {
                     this.state.textItems.length === 0 ?
                        <InlineHelp>
                           Create reusable items for your products and services, that autocomplete in quotes and templates.
                        </InlineHelp>
                        : <React.Fragment>
                           <table className="quotient-table">
                              <tbody className="rowClick">
                                 {
                                    this.state.textItems.map((item, index) => {
                                       return (
                                          <tr onClick={() => history.push(`/app/content/item-text/view/${item._id}`)} key={index}>
                                             <td>
                                                <div className="d-flex">
                                                   <div className="u-ellipsis">
                                                      <Link to={`/app/content/item-text/view/${item._id}`}>{item.textHeading}</Link>
                                                      <br />
                                                      <small className="text-gray font-size-sm">{item.longDescription}&nbsp;</small>
                                                   </div>
                                                </div>
                                             </td>
                                          </tr>
                                       );
                                    })
                                 }
                              </tbody>
                           </table>
                           <TotalLabelFor list={this.state.textItems} />
                        </React.Fragment>
                  }
               </div>
            </div>
         </div>
      );
   }
}