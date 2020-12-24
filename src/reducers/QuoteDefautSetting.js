import { QUOTE_DEFAULT_SETTING } from "../constants/ActionTypes";

const initialState = {
   expirationQuoteAfter: "",
   currentQuoteNumber: "",
   nextQuoteNumber: "",
   currency: "",
   taxMode: "",
   pricingDisplayLevel: "",
   displayItemCode: true,
   showCostPriceMarginAlways: false,
   defaultMargin: "",
};

export default (state = initialState, action) => {
   switch (action.type) {
      case QUOTE_DEFAULT_SETTING:
         return action.payload
      default:
         return state;
   }
};