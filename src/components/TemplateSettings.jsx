import React from 'react'
import Currency from './QuoteSettings/Currency';
import Discount from './QuoteSettings/Discount';
import PricingDisplayLevel from './QuoteSettings/PricingDisplayLevel';
import TaxMode from './QuoteSettings/TaxMode';

class TemplateSettings extends React.Component {
   state = {
      show: true
   }
   render() {
      return (
         <div className="row">
            <div className="col-sm-6" />
            <div className="col-sm-6">
               <div className="pl-4 py-2" style={{ borderLeft: "4px solid #eee" }}>
                  <h3>Template Settings</h3>
                  <div className={`mb-3 ${this.state.show ? "" : "d-none"}`}>
                     <Discount />
                     <Currency />
                     <TaxMode />
                     <PricingDisplayLevel />
                  </div>
                  <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => this.setState({ show: !this.state.show })}>{this.state.show ? "Hide" : "Show All..."}</button>
               </div>
            </div>
         </div>
      )
   }
}

export default TemplateSettings;