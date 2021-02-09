import React from 'react'
import { useSelector } from 'react-redux'
import { allDescribeTaxAsNameArrData } from '../../constants/Dump';

export default function TaxModeDesAs() {
   const quote = useSelector(state => state.mainData.quote);
   const describeTaxAs = useSelector(state => state.appearanceSetting.describeTaxAs);

   switch (quote.settings.taxMode) {
      case "exclusive_including": return `including ${allDescribeTaxAsNameArrData[describeTaxAs - 1]}`;
      case "exclusive_excluding": return `excluding ${allDescribeTaxAsNameArrData[describeTaxAs - 1]}`;
      case "inclusive": return `including ${allDescribeTaxAsNameArrData[describeTaxAs - 1]}`;
      case "no_tax": return "";
      default: return "";
   }
}