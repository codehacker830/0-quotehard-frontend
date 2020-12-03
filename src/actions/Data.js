import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_QUOTE,
   UPDATE_DISCUSSIONS
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
}

export const updateDiscussions = (discussions) => {
   return (dispatch) => dispatch({ type: UPDATE_DISCUSSIONS, payload: discussions });
}

export const submitDismiss = (qaId) => {
   const entoken = localStorage.getItem('entoken');
   return async (dispatch) => {
      dispatch({ type: FETCH_START, payload: "" });
      try {
         const { data } = await axios.post('/quotes/dismiss', { entoken, qaId });
         toast.success("Answer was Dismissed.");
         console.log("========== Publick overview did mount get quote =========", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: UPDATE_DISCUSSIONS, payload: data.discussions });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
}