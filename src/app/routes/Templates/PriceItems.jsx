import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../../components/InlineHelp';
import { toFixedFloat } from '../../../util';
import axios from '../../../util/Api';

export default class PriceItems extends Component {
   state = {
      priceItems: []
   };
   componentDidMount() {
      axios.get('/templates/priceitem/all').then(({ data }) => {
         console.log("response ============", data);
         this.setState({
            priceItems: data.priceItems
         });
      }).catch(err => {
         console.error("err during get priceitems =>", err);
      })
   }
   render() {
      console.log("111111 priceItems state 1111111", this.state);
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
                           <Link to="/app/content/item-price/create-new" className="btn btn-success ml-auto" >New Item</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="block block-rounded">
               <div className="block-content">
                  {
                     this.state.priceItems.length === 0 ?
                        <InlineHelp>
                           Create reusable items for your products and services, that autocomplete in quotes and templates.
                        </InlineHelp>
                        : <React.Fragment>
                           <table className="quotient-table">
                              <tbody className="rowClick">
                                 {
                                    this.state.priceItems.map((item, index) => {
                                       return (
                                          <tr onClick={() => this.props.history.push(`/app/content/item-price/view/${item._id}`)} key={index}>
                                             <td>
                                                <div className="d-flex">
                                                   <div className="u-ellipsis">
                                                      <Link to={`/app/content/item-price/view/${item._id}`}>{item.productHeading}</Link>
                                                      <br />
                                                      <small className="text-gray font-size-sm">{item.longDescription}</small>
                                                   </div>
                                                   {
                                                      item.isSubscription ?
                                                         <>
                                                            <span className="text-gray font-size-sm ml-auto"> per {item.per} {item.every}</span>
                                                            {
                                                               item.period ?
                                                                  null
                                                                  : <span className="text-gray font-size-sm ml-auto"> (for {item.period} months)</span>
                                                            }
                                                         </>
                                                         : <span className="text-black font-size-sm ml-auto">{item.quantity} @ {toFixedFloat(item.unitPrice)}</span>
                                                   }
                                                </div>
                                             </td>
                                          </tr>
                                       );
                                    })
                                 }

                              </tbody>
                           </table>
                           <div className="px-2 py-4">
                              <span>Total {this.state.priceItems.length}</span>
                           </div>
                        </React.Fragment>
                  }
               </div>
            </div>
         </div>
      );
   }
}