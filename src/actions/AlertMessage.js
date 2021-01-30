import {
   SHOW_EXAMPLE_IGNORE_MESSAGE,
   HIDE_EXAMPLE_IGNORE_MESSAGE
} from '../constants/ActionTypes';

export const showExampleIgnoreMessage = () => {
   return (dispatch) => {
      dispatch({ type: SHOW_EXAMPLE_IGNORE_MESSAGE, payload: true });
      setTimeout(() => {
         dispatch({ type: HIDE_EXAMPLE_IGNORE_MESSAGE, payload: false });
      }, 2000);
   }
}


export const hideExampleIgnoreMessage = () => {
   return (dispatch) => dispatch({ type: HIDE_EXAMPLE_IGNORE_MESSAGE, payload: false });
}