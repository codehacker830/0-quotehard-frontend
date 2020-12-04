import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_QUOTE,
   UPDATE_QUOTE_DISCUSSIONS,
   UPDATE_QUOTE_TOPEOPLELIST,
   UPDATE_QUOTE_SETTINGS,
   UPDATE_QUOTE_TITLE,
   UPDATE_QUOTE_ITEMS,
   UPDATE_QUOTE_NOTES
} from '../constants/ActionTypes';
import { toast } from 'react-toastify';

export const getPublicDataWithEntoken = () => {
   const entoken = localStorage.getItem('entoken');
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.post('/quotes/view-public', { entoken });
         console.log("========== Publick overview did mount get quote =========", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_QUOTE, payload: data.quote });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
}
export const getQuoteDataById = (quoteId) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get(`/quotes/get-by-id/${quoteId}`);
         console.log(" Quote get by id response  =>", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_QUOTE, payload: data.quote });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
}

export const getTemplateQuoteDataById = (quoteTemplateId) => {
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.get(`/templates/id/${quoteTemplateId}`);
         console.log(" Template Data by id reponse =>", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_QUOTE, payload: data.template });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
}

export const updateQuote = (quote) => {
   return (dispatch) => dispatch({ type: GET_QUOTE, payload: quote });
};

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


export const submitDismiss = (qaId) => {
   const entoken = localStorage.getItem('entoken');
   return async (dispatch) => {
      dispatch({ type: FETCH_START, payload: "" });
      try {
         const { data } = await axios.post('/quotes/dismiss', { entoken, qaId });
         toast.success("Answer was Dismissed.");
         console.log("========== Publick overview did mount get quote =========", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: UPDATE_QUOTE_DISCUSSIONS, payload: data.discussions });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
}