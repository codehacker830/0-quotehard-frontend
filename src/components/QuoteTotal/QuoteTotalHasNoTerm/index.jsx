import React, { Component } from 'react';
import Tr_OptionSelected from './Tr_OptionSelected';
import Tr_tax from './Tr_Tax';
import { differentTaxIdArrGroup, filterItemArrForTaxId, quoteSubTotal } from '../../../util';
import { connect } from 'react-redux';

class QuoteTotalHasNoTerm extends Component {
   render() {
      const { items, settings } = this.props;
      // const subcriptionItems = items.filter(item => {
      //    if (item.category === "priceItem") {
      //       return item.priceItem.isSubscription === true;
      //    }
      //    return false;
      // });
      const nonSubcriptionItems = items.filter(item => {
         if (item.category === "priceItem") {
            return item.priceItem.isSubscription === false;
         }
         return false;
      });
      const uniqueTaxIdArr = differentTaxIdArrGroup(nonSubcriptionItems);
      console.log(" ~~~~~~~~  uniqueTaxIdArr ~~~~~~~~", uniqueTaxIdArr);
      return (
         <table className="quoteTotal hasNoTerm">
            <tbody>
               <Tr_OptionSelected items={items} />
               <tr>
                  <td className="total-desc">Subtotal</td>
                  <td className="total-price">{quoteSubTotal(nonSubcriptionItems, settings)}</td>
               </tr>
               {
                  uniqueTaxIdArr.map((uniqueTaxId, index) => {
                     console.log(" ###########  uniqueTaxId ########### ", uniqueTaxId);
                     console.log(" ###########  nonSubcriptionItems ########### ", nonSubcriptionItems);
                     const ItemArrFromTaxId = filterItemArrForTaxId(nonSubcriptionItems, uniqueTaxId);
                     console.log(" ###########  ItemArrFromTaxId ########### ", ItemArrFromTaxId);

                     return (
                        <Tr_tax items={ItemArrFromTaxId} salesTax={uniqueTaxId} key={index} />
                     );
                  })
               }
               <tr className="total">
                  <td className="total-desc"><span className="quoteTotal-gDesc">Total USD including tax</span></td>
                  <td className="total-price"><span className="quoteTotal-gTotal" style={{}}>$300.00</span></td>
               </tr>
            </tbody>
         </table>
      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { settings, items } = mainData.quote;
   return { settings, items };
};

export default connect(mapStateToProps)(QuoteTotalHasNoTerm)