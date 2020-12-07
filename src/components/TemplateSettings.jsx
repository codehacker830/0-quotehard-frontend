import React from 'react'
import { connect } from 'react-redux';
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
                  {
                     this.props.isDefault &&
                     <div className="optionRow mb-1">
                        <span className="label label-success">Default</span>&nbsp;
                        <span className="smallGreyText">selection for New Quotes</span>
                     </div>
                  }
                  {
                     this.props.status === "archived" &&
                     <div className="optionRow mb-1">
                        <label className="editOption-label">Status</label>
                        <div className="mb-2">
                           <span className="label">Archived</span>
                        </div>
                     </div>
                  }
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
const mapStateToProps = ({ mainData }) => {
   const { status } = mainData.quote;
   return { status };
}

export default connect(mapStateToProps)(TemplateSettings);