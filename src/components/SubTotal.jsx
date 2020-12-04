import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuoteItems } from '../actions/Data';
import { initPriceItem } from '../constants/InitState';
import { numberOfOption } from '../util';

export const FilterPriceItemsForSubTotal = (items, ind) => {
   console.log('items', items)
   if (ind < 1) return [];
   let startInd = null;
   for (let i = ind - 1; i >= 0; i--) {
      if (items[i].category === "subTotal") break;
      if (items[i].category === "priceItem") {
         startInd = i;
         break;
      }
   }
   console.log('startInd', startInd)
   if (startInd === null) return [];

   const firstPriceItem = items[startInd];
   console.log('firstPriceItem', firstPriceItem)

   const {
      isSubscription,
      per,
      every,
      period,
   } = firstPriceItem.priceItem;
   let resArr = [];
   let seq = true;
   for (let i = startInd; i >= 0; i--) {
      if (seq === false) break;
      if (items[i].category === "subTotal") break;
      if (items[i].category === "priceItem") {
         const { priceItem } = items[i];
         if (isSubscription) {
            if (true == priceItem.isSubscription
               && per == priceItem.per
               && every == priceItem.every
               && period == priceItem.period) resArr.push({ ...items[i] });
            else seq = false;
         } else {
            if (false == priceItem.isSubscription) resArr.push({ ...items[i] });
            else seq = false;
         }
      }
   }
   return resArr;
}

export const calculateTotalForItems = (items) => {
   if (!items.length) return 0;
   let total = 0;
   for (let i = 0; i < items.length; i++) {
      if (items[i].category === "priceItem") {
         total += items[i].priceItem.itemTotal;
      }
   }
   return total;
}

class SubTotal extends Component {
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
   }

   render() {
      const { quote } = this.props;
      const filteredItems = FilterPriceItemsForSubTotal(quote.items, this.props.index);

      console.log('filteredItems >>>>', filteredItems)

      const optionNum = numberOfOption(filteredItems);
      console.log('subtotal index ___', this.props.index)
      console.log('optionNum ____', optionNum)
      return (
         <div className="row">
            <div className="d-flex ml-auto">
               <div className="py-3">
                  <button className="btn btn-light mb-auto" onClick={() => this.removeItem(this.props.index)}>
                     <i className="fa fa-trash-alt"></i>
                  </button>
               </div>
               <div className="p-3 text-right my-auto">
                  <p className={`text-secondary mb-0 ${optionNum.total ? "" : "d-none"}`}>Option selected</p>
                  <p className="text-black mb-0">Subtotal</p>
               </div>
               <div className="border p-3 text-right my-auto" style={{ width: 240, height: "100%" }}>
                  <p className={`text-secondary mb-0 ${optionNum.total ? "" : "d-none"}`}>{optionNum.selected} of {optionNum.total}</p>
                  <p className="text-black mb-0">{calculateTotalForItems(filteredItems)}</p>
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