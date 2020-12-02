import {
   GET_QUOTE,
   UPDATE_QUOTE,
   UPDATE_DISCUSSIONS
} from '../constants/ActionTypes';

const initialSettings = {
   quote: {}
};

export default (state = initialSettings, action) => {
   switch (action.type) {
      case GET_QUOTE:
         return {
            ...state,
            quote: action.payload
         };
      case UPDATE_QUOTE:
         return {
            ...state,
            quote: action.payload
         };
      case UPDATE_DISCUSSIONS:
         return {
            ...state,
            quote: {
               ...state.quote,
               discussions: action.payload
            }
         };
      default:
         return state;
   }
};