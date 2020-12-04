import { set } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { caculateTotalTax, swichDescribeTaxAs, toFixedFloat, getTaxRateFromId } from '../../../util';

class Tr_tax extends Component {
   render() {
      const { items, salesTax } = this.props;
      const { settings, salesTaxes, describeTaxAs } = this.props;
      const taxRate = getTaxRateFromId(salesTax, salesTaxes);
      console.log('taxRate', taxRate)
      const { taxMode } = settings;
      if (taxRate == 0 ||
         taxMode === "exclusive_excluding" ||
         taxMode === "no_tax"
      ) return null;
      return (
         <tr>
            <td className="total-desc">{swichDescribeTaxAs(describeTaxAs)} {taxRate}%</td>
            <td className="total-price">{toFixedFloat(caculateTotalTax(items, taxRate, settings))}</td>
         </tr>
      );
   }
}
const mapStateToProps = ({ mainData, settings, appearanceSetting }) => {
   const { quote } = mainData;
   const { salesTaxes } = settings;
   const {
      describeTaxAs
   } = appearanceSetting;
   return {
      settings: quote.settings, salesTaxes, describeTaxAs
   };
};

export default connect(mapStateToProps)(Tr_tax);
