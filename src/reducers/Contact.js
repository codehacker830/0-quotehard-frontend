import {
   SET_CONTACT,
   UPDATE_CONTACT_CATEGORY,
   UPDATE_CONTACT_FIRSTNAME,
   UPDATE_CONTACT_LASTNAME,
   UPDATE_CONTACT_COMPANYNAME,
   UPDATE_CONTACT_COMPANYID,
   UPDATE_CONTACT_EMAIL,
   UPDATE_CONTACT_PHONES,
   UPDATE_CONTACT_ADDRESSES
} from "../constants/ActionTypes";

const INIT_STATE = {
   category: "",
   firstName: "",
   lastName: "",
   companyName: "",
   companyId: "",
   email: "",
   phones: [],
   addresses: [],
}

export default (state = INIT_STATE, action) => {
   switch (action.type) {
      case SET_CONTACT: {
         return { ...action.payload };
      }
      case UPDATE_CONTACT_CATEGORY: {
         return { ...state, category: action.payload }
      }
      case UPDATE_CONTACT_FIRSTNAME: {
         return { ...state, firstName: action.payload }
      }
      case UPDATE_CONTACT_LASTNAME: {
         return { ...state, lastName: action.payload }
      }
      case UPDATE_CONTACT_COMPANYNAME: {
         return { ...state, companyName: action.payload }
      }
      case UPDATE_CONTACT_COMPANYID: {
         return { ...state, companyId: action.payload }
      }
      case UPDATE_CONTACT_EMAIL: {
         return { ...state, email: action.payload }
      }
      case UPDATE_CONTACT_PHONES: {
         return { ...state, phones: action.payload }
      }
      case UPDATE_CONTACT_ADDRESSES: {
         return { ...state, addresses: action.payload }
      }
      default:
         return state;
   }
}
