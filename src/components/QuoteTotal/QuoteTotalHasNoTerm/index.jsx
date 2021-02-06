import React, { Component } from 'react';
import Tr_OptionSelected from './Tr_OptionSelected';
import Tr_tax from './Tr_Tax';
import { calculateSubTotal, differentTaxIdArrGroup, filterItemArrForTaxId } from '../../../util';
import { connect } from 'react-redux';
import Tr_Total from './Tr_Total';

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
      return (
         <table className="quoteTotal hasNoTerm">
            <tbody>
               <Tr_OptionSelected items={items} />
               {
                  settings.taxMode === "exclusive_including" &&
                  <tr>
                     <td className="total-desc">Subtotal</td>
                     <td className="total-price">{calculateSubTotal(nonSubcriptionItems)}</td>
                  </tr>
               }
               {
                  uniqueTaxIdArr.map((uniqueTaxId, index) => {
                     const ItemArrFromTaxId = filterItemArrForTaxId(nonSubcriptionItems, uniqueTaxId);
                     return (
                        <Tr_tax items={ItemArrFromTaxId} salesTax={uniqueTaxId} key={index} />
                     );
                  })
               }
               <Tr_Total items={nonSubcriptionItems} />
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