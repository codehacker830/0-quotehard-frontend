import React, { Component } from 'react';
import Tr_OptionSelected from './Tr_OptionSelected';
import Tr_tax from './Tr_Tax';
import { differentTaxIdArrGroup, filterItemArrForTaxId } from '../../../util';

export default class QuoteTotalHasNoTerm extends Component {
   render() {
      const { items, settings } = this.props;
      const { ArrUniqueTaxHasNoTerm } = differentTaxIdArrGroup(items);
      console.log(" ~~~~~~~~  ArrUniqueTaxHasNoTerm ~~~~~~~~", ArrUniqueTaxHasNoTerm);
      return (
         <table className="quoteTotal hasNoTerm">
            <tbody>
               <Tr_OptionSelected items={items} />
               <tr>
                  <td className="total-desc">Subtotal</td>
                  <td className="total-price">{ }</td>
               </tr>
               {
                  ArrUniqueTaxHasNoTerm.map((uniqueTaxHasNoTerm, index) => {
                     const { ArrItemFromTaxIdHasNoTerm } = filterItemArrForTaxId(items, uniqueTaxHasNoTerm._id);
                     console.log(" ###########  ArrItemFromTaxIdHasNoTerm ########### ", ArrItemFromTaxIdHasNoTerm);

                     return (
                        <Tr_tax items={ArrItemFromTaxIdHasNoTerm} settings={settings} tax={uniqueTaxHasNoTerm} key={index} />
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