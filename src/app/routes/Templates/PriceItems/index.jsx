import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../../../components/InlineHelp';
import { toFixedFloat } from '../../../../util';
import axios from '../../../../util/Api';
import SelectWinnerBrand from '../components/SelectWinnerBrand';
import NewPriceItemBtn from './NewPriceItemBtn';
import Tr_PriceItem from './Tr_PriceItem';

export default class PriceItems extends Component {
   state = {
      priceItems: [],
      filterStatus: "current",
   };
   componentDidMount() {
      axios.get(`/templates/priceitem/status/${this.state.filterStatus}`).then(({ data }) => {
         this.setState({ priceItems: data.priceItems });
      }).catch(err => {
         console.error("err during get priceitems =>", err);
      })
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.filterStatus !== this.state.filterStatus) {
         axios.get(`/templates/priceitem/status/${this.state.filterStatus}`).then(({ data }) => {
            this.setState({ priceItems: data.priceItems });
         })
      }
   }
   render() {
      return (
         <div className="content">
            <SelectWinnerBrand />

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
                                 <select className="form-control" id="priceItem_filter_from" name="priceItem_filter_from"
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
                     <NewPriceItemBtn />
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
                                    this.state.priceItems.map((item, index) => <Tr_PriceItem key={index} item={item} />)
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