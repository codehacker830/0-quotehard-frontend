import { LOGO_URL } from "../constants/ActionTypes";
import { initCompanyInformation, initTextStyles } from "../constants/InitState";

const initialState = {
   logoURL: "",
   contactDetail: 0,
   isDisplayFullCustomerDetail: false,
   layout: 0,
   textStyles: initTextStyles,
   describeTaxAs: "",
   displayInTotal: {
      isCurrencySymbol: true,
      isCurrencyCode: false
   },
   isEnablePrintPDF: false,
   companyInformation: initCompanyInformation
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