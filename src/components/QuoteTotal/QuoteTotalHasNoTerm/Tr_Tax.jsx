import React, { Component } from 'react';
import { connect } from 'react-redux';
import { caculateTotalTax } from '../../../util';

class Tr_tax extends Component {
   render() {
      const { items, salesTax, settings, salesTaxes } = this.props;
      const taxObj = salesTaxes.find(item => item._id === salesTax);
      const taxRate = taxObj && taxObj.taxRate ? taxObj.taxRate : 0;
      console.log('taxRate', taxRate)
      if (taxRate == 0) return null;
      return (
         <tr>
            <td className="total-desc">Tax {taxRate}%</td>
            <td className="total-price">{caculateTotalTax(items, taxRate, settings)}</td>
         </tr>
      );
   }
}
const mapStateToProps = ({ mainData, settings }) => {
   const { quote } = mainData;
   const { salesTaxes } = settings;
   return { settings: quote.settings, salesTaxes };
};
export default connect(mapStateToProps)(Tr_tax);
