import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_QUOTE,
   GET_DISCUSSIONS,
   UPDATE_QUOTE
} from '../constants/ActionTypes';

export const getQuote = () => {
   const entoken = localStorage.getItem('entoken');
   return async (dispatch) => {
      dispatch({ type: FETCH_START });
      try {
         const { data } = await axios.post('/quotes/view-public', { entoken });
         console.log("========== Publick overview did mount get quote =========", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_QUOTE, payload: data.quote });
         dispatch({ type: GET_DISCUSSIONS, payload: data.quote.discussions ? data.quote.discussions : [] });
      } catch (err) {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      }
   }
}

export const updateQuote = (quote) => {
   return (dispatch) => dispatch({ type: UPDATE_QUOTE, payload: quote });
}

export const updateDiscussions = (discussions) => {
   return (dispatch) => dispatch({ type: UPDATE_QUOTE, payload: discussions });
}