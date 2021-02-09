import {
   GET_QUOTE,
   UPDATE_QUOTE_STATUS,
   UPDATE_QUOTE_TOPEOPLELIST,
   UPDATE_QUOTE_TITLE,
   UPDATE_QUOTE_SETTINGS,
   UPDATE_QUOTE_ITEMS,
   UPDATE_QUOTE_NOTES,
   UPDATE_QUOTE_DISCUSSIONS,
   INITIALIZE_QUOTE,
   UPDATE_PRICEITEM_STATUS,
   UPDATE_TEXTITEM_STATUS,
   UPDATE_ADDITIOINAL_COMMENT,
   UPDATE_ORDERREFERENCE_NUMBER,
} from '../constants/ActionTypes';
import { initPriceItem, initQuoteSettings, initTextItem } from '../constants/InitState';

const initialSettings = {
   quote: {
      status: null,
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
      discussions: [],
      orderReferenceNumber: "",
      additionalComment: "",
      declinedComment: ""
   }
};

export default (state = initialSettings, action) => {
   switch (action.type) {
      case INITIALIZE_QUOTE:
         return initialSettings;
      case GET_QUOTE:
         return {
            ...state,
            quote: action.payload
         };
      case UPDATE_QUOTE_STATUS:
         return {
            ...state,
            quote: {
               ...state.quote,
               status: action.payload
            }
         }
      case UPDATE_QUOTE_TOPEOPLELIST:
         return {
            ...state,
            quote: {
               ...state.quote,
               toPeopleList: action.payload
            }
         };
      case UPDATE_QUOTE_TITLE:
         return {
            ...state,
            quote: {
               ...state.quote,
               title: action.payload
            }
         };
      case UPDATE_QUOTE_SETTINGS:
         return {
            ...state,
            quote: {
               ...state.quote,
               settings: action.payload
            }
         };

      case UPDATE_QUOTE_ITEMS:
         return {
            ...state,
            quote: {
               ...state.quote,
               items: action.payload
            }
         };
      case UPDATE_QUOTE_NOTES:
         return {
            ...state,
            quote: {
               ...state.quote,
               notes: action.payload
            }
         };
      case UPDATE_QUOTE_DISCUSSIONS:
         return {
            ...state,
            quote: {
               ...state.quote,
               discussions: action.payload
            }
         };

      case UPDATE_PRICEITEM_STATUS:
         return {
            ...state,
            quote: {
               ...state.quote,
               items: [{
                  ...state.quote.items[0],
                  priceItem: { ...state.quote.items[0].priceItem, status: action.payload }
               }]
            }
         };
      case UPDATE_TEXTITEM_STATUS:
         return {
            ...state,
            quote: {
               ...state.quote,
               notes: [{
                  ...state.quote.notes[0],
                  textItem: { ...state.quote.notes[0].textItem, status: action.payload }
               }]
            }
         };
      case UPDATE_ADDITIOINAL_COMMENT:
         return {
            ...state,
            quote: {
               ...state.quote,
               additionalComment: action.payload
            }
         };
      case UPDATE_ORDERREFERENCE_NUMBER:
         return {
            ...state,
            quote: {
               ...state.quote,
               orderReferenceNumber: action.payload
            }
         };
      default:
         return state;
   }
};