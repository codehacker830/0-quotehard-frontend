import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateAppearanceSetting } from '../../../../../actions/AppearanceSetting';

class Appearance_PricingFormat extends Component {
   render() {
      const { appearanceSetting } = this.props;
      const {
         describeTaxAs,
         displayCurrencySymbolInTotal,
         displayCurrencyCodeInTotal
      } = this.props.appearanceSetting;
      return (
         <React.Fragment>
            <h4 className="mb-2">Pricing Format</h4>
            <div className="ml-3 mb-4">
               <div className="form-group">
                  <label>Describe Tax as:</label>
                  <select className="form-control rounded-0 maxWidth-180 mb-3" name="account[tax_word_id]" id="account_tax_word_id"
                     value={describeTaxAs}
                     onChange={(ev) => this.props.updateAppearanceSetting({ ...appearanceSetting, describeTaxAs: ev.target.value })}
                  >
                     <option value={1}>GST</option>
                     <option value={2}>HST</option>
                     <option value={7}>IVA</option>
                     <option value={4}>Tax</option>
                     <option value={5}>VAT</option>
                     <option value={6}>VAT/NHIL</option>
                  </select>
               </div>
               <div className="form-group">
                  <label>Display in Total:</label>
                  <div className="ml-3">
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="account_show_currency_symbol" name="account_show_currency_symbol"
                           checked={displayCurrencySymbolInTotal}
                           onChange={() => this.props.updateAppearanceSetting({ ...appearanceSetting, displayCurrencySymbolInTotal: !displayCurrencySymbolInTotal })}
                        />
                        <label className="form-check-label" htmlFor="account_show_currency_symbol">Currency Symbol</label>
                     </div>
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="account_show_currency_code" name="account_show_currency_code"
                           checked={displayCurrencyCodeInTotal}
                           onChange={() => this.props.updateAppearanceSetting({ ...appearanceSetting, displayCurrencyCodeInTotal: !displayCurrencyCodeInTotal })}
                        />
                        <label className="form-check-label" htmlFor="account_show_currency_code">Currency Code</label>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      )
   }
}

const mapStateToProps = ({ appearanceSetting }) => ({ appearanceSetting })

const mapDispatchToProps = {
   updateAppearanceSetting
}

export default connect(mapStateToProps, mapDispatchToProps)(Appearance_PricingFormat)
