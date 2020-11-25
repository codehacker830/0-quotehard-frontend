import { APPEARANCE_SETTINGS, LOGO_URL } from "../constants/ActionTypes";

const initialState = {
   logo: "https://asset.quotientapp.com/file-s/1/logo-v3/39310/7ec198e51915c507ba083486a2d9487e",

   contactDetailLayout: 1,
   layout: 1,
   isDisplayFullCustomerDetail: true,

   headingFont: 0,
   bodyText: 0,
   headingWeight: 0,

   describeTaxAs: 4,
   displayCurrencySymbolInTotal: true,
   displayCurrencyCodeInTotal: false,

   isEnabledPrintPDF: false,
   pdfPageSize: 1,

   companyDisplayName: "",
   companyAddress: "",
   companyWebsite: "",
   companyPhone: ""
};

export default (state = initialState, action) => {
   switch (action.type) {
      case LOGO_URL:
         return {
            ...state,
            logo: action.payload
         };
      case APPEARANCE_SETTINGS:
         return {
            ...state,
            ...action.payload
         }
      default:
         return state;
   }
};