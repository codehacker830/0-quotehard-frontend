import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_QUOTE,
   UPDATE_QUOTE_STATUS,
   UPDATE_QUOTE_DISCUSSIONS,
   UPDATE_QUOTE_TOPEOPLELIST,
   UPDATE_QUOTE_SETTINGS,
   UPDATE_QUOTE_TITLE,
   UPDATE_QUOTE_ITEMS,
   UPDATE_QUOTE_NOTES,
   INITIALIZE_QUOTE,
   UPDATE_PRICEITEM_STATUS,
   UPDATE_TEXTITEM_STATUS,
   UPDATE_ADDITIOINAL_COMMENT,
   UPDATE_ORDERREFERENCE_NUMBER
} from '../constants/ActionTypes';
import { toast } from 'react-toastify';
import { initPriceItem, initTextItem } from '../constants/InitState';

export const setQuote = (quote) => {
   return (dispatch) => dispatch({ type: GET_QUOTE, payload: quote });
}
export const getQuoteDataById = (quoteId) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get(`/quotes/id/${quoteId}`);
         console.log(" Quote get by id response  =>", data);
         const { items, notes } = data.quote;
         const payload = {
            ...data.quote,
            items: items.length ? items : [
               {
                  category: "priceItem",
                  priceItem: { ...initPriceItem },
               },
            ],
            notes: notes.length ? notes : [
               {
                  category: "textItem",
                  textItem: { ...initTextItem }
               }
            ]
         }
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_QUOTE, payload: payload });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
};

export const getContentTemplateById = (quoteTemplateId) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get(`/templates/id/${quoteTemplateId}`);
         const { status, title, settings, items, notes } = data.template;
         console.log(" SETTTINGGGS ", settings);
         const payload = {
            toPeopleList: [],
            status,
            title,
            settings,
            items: items.length ? items : [
               {
                  category: "priceItem",
                  priceItem: { ...initPriceItem },
               },
            ],
            notes: notes.length ? notes : [
               {
                  category: "textItem",
                  textItem: { ...initTextItem }
               }
            ],
            discussions: []
         };
         dispatch({ type: GET_QUOTE, payload: payload });
         dispatch({ type: FETCH_SUCCESS });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
};
export const getDuplicateTemplateById = (quoteTemplateId) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get(`/templates/id/${quoteTemplateId}`);
         const { title, settings, items, notes } = data.template;
         const payload = { status: "current", title, settings, items, notes };
         dispatch({ type: GET_QUOTE, payload: payload });
         dispatch({ type: FETCH_SUCCESS });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
};

export const initializeQuote = () => {
   return (dispatch) => dispatch({ type: INITIALIZE_QUOTE });
};

export const updateQuote = (quote) => {
   let items = quote.items;
   let notes = quote.notes;
   if (!quote.items.length) items = [
      {
         category: "priceItem",
         priceItem: { ...initPriceItem },
      },
   ];
   if (!quote.notes.length) notes = [
      {
         category: "textItem",
         textItem: { ...initTextItem }
      }
   ];
   return (dispatch) => dispatch({ type: GET_QUOTE, payload: { ...quote, items, notes } });
};
export const updateQuoteStatus = (status) => {
   return (dispatch) => dispatch({ type: UPDATE_QUOTE_STATUS, payload: status })
}
export const updateQuoteToPeopleList = (toPeopleList) => {
   return (dispatch) => dispatch({ type: UPDATE_QUOTE_TOPEOPLELIST, payload: toPeopleList });
};

export const updateQuoteSettings = (settings) => {
   return (dispatch) => dispatch({ type: UPDATE_QUOTE_SETTINGS, payload: settings });
};

export const updateQuoteTitle = (title) => {
   return (dispatch) => dispatch({ type: UPDATE_QUOTE_TITLE, payload: title });
};

export const updateQuoteItems = (items) => {
   return (dispatch) => dispatch({ type: UPDATE_QUOTE_ITEMS, payload: items });
};

export const updateQuoteNotes = (notes) => {
   return (dispatch) => dispatch({ type: UPDATE_QUOTE_NOTES, payload: notes });
};

export const updateQuoteDiscussions = (discussions) => {
   return (dispatch) => dispatch({ type: UPDATE_QUOTE_DISCUSSIONS, payload: discussions });
};

export const updatePriceItemStatus = (status) => {
   return (dispatch) => dispatch({ type: UPDATE_PRICEITEM_STATUS, payload: status })
}
export const updateTextItemStatus = (status) => {
   return (dispatch) => dispatch({ type: UPDATE_TEXTITEM_STATUS, payload: status })
}
export const submitDismiss = (qaId) => {
   const entoken = localStorage.getItem('entoken');
   return async (dispatch) => {
      dispatch({ type: FETCH_START, payload: "" });
      try {
         const { data } = await axios.post('/quotes/dismiss', { entoken, qaId });
         toast.success("Answer dismissed.");
         console.log("========== Publick overview did mount get quote =========", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: UPDATE_QUOTE_DISCUSSIONS, payload: data.discussions });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
};
export const archiveQuote = (quoteId) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.put(`/quotes/archive/${quoteId}`);
         toast.success('Update – archived.')
         dispatch({ type: GET_QUOTE, payload: data.quote });
         dispatch({ type: FETCH_SUCCESS });
      } catch (err) {
         toast.error('Quote failed to archive.');
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
};
export const unArchiveQuote = (quoteId) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.put(`/quotes/un-archive/${quoteId}`);
         toast.success('Update – unarchived.')
         dispatch({ type: GET_QUOTE, payload: data.quote });
         dispatch({ type: FETCH_SUCCESS });
      } catch (err) {
         toast.error('Quote failed to unarchive.');
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
};
export const markAsSentQuote = (quoteId) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.put(`/quotes/status/${quoteId}`, { status: "awaiting" });
         toast.success('Not emailed, marked as sent.');
         dispatch({ type: GET_QUOTE, payload: data.quote });
         dispatch({ type: FETCH_SUCCESS });
      } catch (err) {
         toast.error('Quote failed to mark as sent.');
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
};
export const acceptOnBehalfQuote = ({ quoteId, additionalComment, orderReferenceNumber, onBehalfOfPersonId, isAcceptEmailNotify }) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.post(`/quotes/accept-on-behalf`, { quoteId, additionalComment, orderReferenceNumber, onBehalfOfPersonId, isAcceptEmailNotify });
         toast.success('Quote accpeted.');
         dispatch({ type: GET_QUOTE, payload: data.quote });
         dispatch({ type: FETCH_SUCCESS });
      } catch (err) {
         toast.error('Quote failed to accept quote.');
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
};



export const updateAdditionalComment = (payload) => {
   return (dispatch) => dispatch({ type: UPDATE_ADDITIOINAL_COMMENT, payload: payload });
}

export const updateOrderReferenceNumber = (payload) => {
   return (dispatch) => dispatch({ type: UPDATE_ORDERREFERENCE_NUMBER, payload: payload });
}