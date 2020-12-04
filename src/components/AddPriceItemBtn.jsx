import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuoteItems } from '../actions/Data';
import { initPriceItem } from '../constants/InitState';

class AddPriceItemBtn extends Component {
   onClickAdd = () => {
      const newItem = {
         category: "priceItem",
         priceItem: initPriceItem
      }
      this.updateQuoteItems([...this.props.items, newItem])
   }
   render() {
      return (
         <div className="row py-4">
            <div className="col-12">
               <button type="button" className="btn btn-alt-light" onClick={() => this.onClickAdd()}>
                  <i className="fa fa-plus mr-1"></i>
                  Add Item
               </button>
            </div>
         </div>
      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { items } = mainData.quote;
   return { items }
}
const mapDispatchToProps = {
   updateQuoteItems
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPriceItemBtn)