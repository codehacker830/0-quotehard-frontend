import axios from '../util/Api';
import {
   FETCH_START,
   FETCH_SUCCESS,
   FETCH_ERROR,
   GET_TEAMMATES
} from '../constants/ActionTypes';
import { setInitUrl, userSignOut } from './Auth';

export const getTeamMembers = () => {
   return (dispatch) => {
      dispatch({ type: FETCH_START });
      axios.get('/team-members').then(({ data }) => {
         console.log("team-members response : ", data);
         dispatch({ type: FETCH_SUCCESS });
         dispatch({ type: GET_TEAMMATES, payload: data.teamMembers });
      }).catch((err) => {
         dispatch({ type: FETCH_ERROR, payload: err.message });
         console.log("Error****:", err.message);
      });
   }
}

// export const getTeamMembersWithEntoken = () => {
//    const entoken = localStorage.getItem('entoken');
//    return (dispatch) => {
//       dispatch({ type: FETCH_START });
//       axios.post('/entoken/team-members').then(({ data }) => {
//          console.log("team-members response : ", data);
//          dispatch({ type: FETCH_SUCCESS });
//          dispatch({ type: GET_TEAMMATES, payload: data.teamMembers });
//       }).catch((err) => {
//          dispatch({ type: FETCH_ERROR, payload: err.message });
//          console.log("Error****:", err.message);
//          dispatch(setInitUrl(`/q/${entoken}`));
//          dispatch(userSignOut());
//       });
//    }
// }

