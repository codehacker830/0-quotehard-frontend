import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfHasTerm, toFixedFloat } from '../../util';
import QuoteTotalHasNoTerm from './QuoteTotalHasNoTerm';

class QuoteTotal extends Component {
   render() {
      return (
         <div className="quote-edit-total-wrap">
            <QuoteTotalHasNoTerm />
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
const mapStateToProps = ({ mainData }) => {
   const { settings, items } = mainData.quote;
   return { settings, items }
};
export default connect(mapStateToProps)(QuoteTotal)