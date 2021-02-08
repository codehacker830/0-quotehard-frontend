import {
   INIT_URL,
   SIGNOUT_USER_SUCCESS,
   AUTH_USER_DATA,
   ACCOUNT_COMPANY_DATA,
   PERSON_DATA,
   USER_TOKEN_SET,
   EMAIL_NOTIFICATION_SETTING,
   FOLLOW_UP_SETTING,
   COMPANY_DISPLAY_NAME
} from "../constants/ActionTypes";

const INIT_STATE = {
   token: JSON.parse(localStorage.getItem('token')),
   initURL: "",
   authUser: null,
   accountCompany: null,
   person: null
};


export default (state = INIT_STATE, action) => {
   switch (action.type) {
      case INIT_URL: {
         return { ...state, initURL: action.payload };
      }

      case SIGNOUT_USER_SUCCESS: {
         return {
            ...state,
            token: null,
            authUser: null,
            initURL: ''
         }
      }
      case AUTH_USER_DATA: {
         return {
            ...state,
            authUser: action.payload,
         };
      }
      case ACCOUNT_COMPANY_DATA: {
         return {
            ...state,
            accountCompany: action.payload,
         };
      }
      case PERSON_DATA: {
         return {
            ...state,
            person: action.payload
         }
      }
      case USER_TOKEN_SET: {
         return {
            ...state,
            token: action.payload,
         };
      }
      case EMAIL_NOTIFICATION_SETTING: {
         return {
            ...state,
            accountCompany: {
               ...state.accountCompany,
               emailNotificationSetting: action.payload
            }
         }
      }
      case FOLLOW_UP_SETTING: {
         return {
            ...state,
            accountCompany: {
               ...state.accountCompany,
               followUpSetting: action.payload
            }
         }
      }
      case COMPANY_DISPLAY_NAME: {
         return {
            ...state,
            accountCompany: {
               ...state.accountCompany,
               companyDisplayName: action.payload
            }
         }
      }
      default:
         return state;
   }
}
