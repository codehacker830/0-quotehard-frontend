import { APPEARANCE_SETTINGS, LOGO_URL } from "../constants/ActionTypes";

const initialState = {
   logo: "https://asset.quotientapp.com/file-s/1/logo-v3/39310/7ec198e51915c507ba083486a2d9487e",

   colors: {
      buttonsAndLinks: "#2176C7",
      highlights: "#E9F1F9",
      background: "#fff1f5"
   },

   contactDetailLayout: 0,
   layout: 0,
   isDisplayFullCustomerDetail: true,

   headingFont: 0,
   bodyText: 0,
   headingWeight: 0,

   describeTaxAs: 4,
   displayCurrencySymbolInTotal: true,
   displayCurrencyCodeInTotal: true,

   isEnabledPrintPDF: false,
   pdfPageSize: 1,

   // companyDisplayName: "",
   // companyAddress: "",
   // companyWebsite: "",
   // companyPhone: "",

   companyDisplayName: "companyDisplayName",
   companyAddress: "companyAddress",
   companyWebsite: "www.example.com",
   companyPhone: "companyPhone-123",
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