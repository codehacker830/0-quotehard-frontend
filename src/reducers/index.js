import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';
import Auth from './Auth';
import Common from './Common';


export default (history) => combineReducers({
   router: connectRouter(history),
   auth: Auth,
   commonData: Common,
   toastr: toastrReducer
});
