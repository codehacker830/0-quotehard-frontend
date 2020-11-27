import {
   GET_DISCUSSIONS,
   GET_QUOTE,
   UPDATE_QUOTE,
   UPDATE_DISCUSSIONS
} from '../constants/ActionTypes';

const initialSettings = {
   quote: {},
   discussions: []
};

export default (state = initialSettings, action) => {
   switch (action.type) {
      case GET_QUOTE:
         return {
            ...state,
            quote: action.payload
         };
      case GET_DISCUSSIONS:
         return {
            ...state,
            discussions: action.payload
         }
      case UPDATE_QUOTE:
         return {
            ...state,
            quote: action.payload
         };
      case UPDATE_DISCUSSIONS:
         return {
            ...state,
            discussions: action.payload
         };
      default:
         return state;
   }
};