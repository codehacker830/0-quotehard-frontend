import {
   GET_QUOTE,
   UPDATE_DISCUSSIONS
} from '../constants/ActionTypes';
import { initPriceItem, initQuoteSettings, initTextItem } from '../constants/InitState';

const initialSettings = {
   quote: {
      toPeopleList: [],
      title: "",
      settings: { ...initQuoteSettings },
      items: [
         {
            category: "priceItem",
            priceItem: { ...initPriceItem },
         },
      ],
      notes: [
         {
            category: "textItem",
            textItem: { ...initTextItem }
         }
      ],
      discussions: []
   }
};

export default (state = initialSettings, action) => {
   switch (action.type) {
      case GET_QUOTE:
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