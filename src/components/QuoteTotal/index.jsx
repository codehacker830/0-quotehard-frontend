import React, { Component } from 'react';
import { checkIfHasTerm, toFixedFloat } from '../../util';
import QuoteTotalHasNoTerm from './QuoteTotalHasNoTerm';

export default class QuoteTotal extends Component {
   render() {
      const { settings, items } = this.props;
      console.log("_________ checkIfHasTerm(items) ___________", checkIfHasTerm(items));
      console.log(" --------- QuoteTotal Props ---------> ", this.props);
      const pItems = this.props.items.filter(item => item.category === "priceItem");

      let isTaxEnable = false;
      let isSubscriptionEnable = false;
      let isMarginShowEnable = false;

      let subTotal = 0;
      let discountTotal = 0;
      let maxTax = 0;
      let taxTotal = 0;
      let costPriceTotal = 0;
      for (let i = 0; i < pItems.length; i++) {
         if (parseFloat(pItems[i].priceItem.tax) > maxTax) maxTax = parseFloat(pItems[i].priceItem.tax);
         const itemDiscount = pItems[i].priceItem.itemTotal * parseFloat(this.props.settings.discount) / 100;
         discountTotal += itemDiscount;

         isTaxEnable = !!pItems[i].priceItem.tax;
         isSubscriptionEnable = pItems[i].priceItem.isSubscription;
         isMarginShowEnable = pItems[i].priceItem.isCostPriceMargin;

         subTotal += (pItems[i].priceItem.itemTotal - itemDiscount);
         taxTotal += (pItems[i].priceItem.itemTotal - itemDiscount) * parseFloat(pItems[i].priceItem.tax) / 100;
         costPriceTotal += pItems[i].priceItem.costPrice * pItems[i].priceItem.quantity;
      }
      let totalIncludingTax = subTotal + taxTotal;
      let marginTotal = subTotal - costPriceTotal;
      console.log(">>>>>>>>>>>>>> discountTotal >>>>>>", discountTotal);
      return (
         <div>


            <QuoteTotalHasNoTerm settings={settings} items={items} />

            {/* subtotal 1 */}
            {/* <table className="quoteTotal hasTerm table table-borderless">
               <tbody>
                  <tr className="options">
                     <td className="total-desc">
                        <p className="quote-text-sm"><span>Options selected</span></p>
                        <p className="quote-text-sm">Optional extras are excluded from this calculation</p>
                     </td>
                     <td className="total-price">
                        <p className="quote-text-sm">1 of 1</p>
                     </td>
                  </tr>
                  <tr>
                     <td className="total-desc">Subtotal</td>
                     <td className="total-price">100.00</td>
                  </tr>
                  <tr className="total">
                     <td className="total-desc">
                        <span className="quoteTotal-gDesc">
                           Total including tax
                           </span>
                     </td>
                     <td className="total-price">
                        <span className="quoteTotal-gTotal">$100.00</span>
                        <div className="quote-text-sm">per week</div>
                        <div className="quote-text-sm">(for 4 weeks)</div>
                     </td>
                  </tr>
               </tbody>
            </table> */}

            {/* Quote total */}
            {/* <table className={`quoteTotal hasTerm table table-borderless`}>
                        <tbody>
                           <tr className="options">
                              <td className="total-desc">
                                 <p className="quote-text-sm">Options selected</p>
                                 <p className="quote-text-sm">Optional extras are excluded from this calculation</p>
                              </td>
                              <td className="total-price">
                                 <p className="quote-text-sm">1 of 1</p>
                              </td>
                           </tr>
                           <tr>
                              <td className="total-desc">Subtotal</td>
                              <td className="total-price">100.00</td>
                           </tr>
                           <tr className="total">
                              <td className="total-desc"><span className="quoteTotal-gDesc">Total including tax</span></td>
                              <td className="total-price"><span className="quoteTotal-gTotal">$100.00</span>
                                 <div className="quote-text-sm">per week</div>
                                 <div className="quote-text-sm">(for 4 weeks)</div>
                              </td>
                           </tr>
                        </tbody>
                     </table>

                     <table className="quoteTotal hasNoTerm table table-borderless">
                        <tbody>
                           <tr className="options">
                              <td className="total-desc">
                                 <p className="quote-text-sm"><span>Options selected</span></p>
                                 <p className="quote-text-sm">Optional extras are excluded from this calculation</p>
                              </td>
                              <td className="total-price">
                                 <p className="quote-text-sm">2 of 4</p>
                              </td>
                           </tr>
                           <tr>
                              <td className="total-desc">Subtotal</td>
                              <td className="total-price">900.00</td>
                           </tr>
                           <tr className="tProfit">
                              <td className="total-desc">Total margin 20%</td>
                              <td className="total-price">100.00</td>
                           </tr>
                           <tr>
                              <td className="total-desc">Tax 10%</td>
                              <td className="total-price">80.00</td>
                           </tr>
                           <tr className="total">
                              <td className="total-desc"><span className="quoteTotal-gDesc">Total including tax</span></td>
                              <td className="total-price">
                                 <span className="quoteTotal-gTotal">$980.00</span>
                                 <p className="quote-text-sm">per week</p>
                                 <p className="quote-text-sm">(for 4 weeks)</p>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                   */}

         </div>
      );
   }
}