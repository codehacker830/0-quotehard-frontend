import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuoteItems } from '../actions/Data';
import { initPriceItem } from '../constants/InitState';
import { numberOfOption, FilterSeqItemsForPartSubTotal, calculateSubTotal } from '../util';

class SubTotal extends Component {
   state = {
      isConfirmingDelete: false
   };
   removeItem = (ind) => {
      const { items } = this.props.quote;
      let newItems = [...items];
      if (newItems.length > 2) {
         newItems.splice(ind, 1);
         this.props.updateQuoteItems(newItems);
      } else if (newItems.length === 2) {
         newItems.splice(ind, 1);
         if (newItems[0].category === "subTotal") this.props.updateQuoteItems([
            {
               category: "priceItem",
               priceItem: initPriceItem,
            },
         ]);
         else this.props.updateQuoteItems(newItems);
      } else this.props.updateQuoteItems([
         {
            category: "priceItem",
            priceItem: initPriceItem,
         },
      ]);
      this.setState({ isConfirmingDelete: false });
   }

   render() {
      const { quote } = this.props;
      const filteredItems = FilterSeqItemsForPartSubTotal(quote.items, this.props.index);
      // console.log('filteredItems >>>>', filteredItems)
      const optionNum = numberOfOption(filteredItems);
      // console.log('subtotal index ___', this.props.index)
      // console.log('optionNum ____', optionNum)
      return (
         <div className="row">
            <div className="d-flex ml-auto">
               <div className="py-3">
                  {
                     this.state.isConfirmingDelete ?
                        <button className="btn btn-sm btn-danger mb-auto" onClick={() => this.removeItem(this.props.index)}>Remove?</button>
                        :
                        <button className="btn btn-light mb-auto" onClick={() => this.setState({ isConfirmingDelete: true })}>
                           <i className="fa fa-trash-alt"></i>
                        </button>
                  }
               </div>
               <div className="p-3 text-right my-auto">
                  <p className={`text-secondary mb-0 ${optionNum.total ? "" : "d-none"}`}>Option selected</p>
                  <p className="text-black mb-0">Subtotal</p>
               </div>
               <div className="border p-3 text-right my-auto" style={{ width: 240, height: "100%" }}>
                  <p className={`text-secondary mb-0 ${optionNum.total ? "" : "d-none"}`}>{optionNum.selected} of {optionNum.total}</p>
                  <p className="text-black mb-0">{calculateSubTotal(filteredItems)}</p>
               </div>
            </div>
         </div>
      );
   }
}
const mapStateToProps = ({ mainData }) => ({
   quote: mainData.quote
})
const mapDispatchToProps = {
   updateQuoteItems
}
export default connect(mapStateToProps, mapDispatchToProps)(SubTotal)