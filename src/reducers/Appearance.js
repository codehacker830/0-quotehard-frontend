import { LOGO_URL } from "../constants/ActionTypes";
import { initPricingFormat, initTextStyles } from "../constants/InitState";

const initialState = {
   logoURL: null,
   contactDetail: null,
   layout: null,
   textStyles: initTextStyles,
   pricingFormat: initPricingFormat,
   isEnablePrintPDF: false,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case LOGO_URL:
         return {
            ...state,
            logoURL: action.payload
         };
      default:
         return state;
   }
};