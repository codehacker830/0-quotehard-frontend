import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';
import Auth from './Auth';
import Common from './Common';
import Settings from './Settings';
import Appearance from './Appearance';


export default (history) => combineReducers({
   router: connectRouter(history),
   auth: Auth,
   commonData: Common,
   settings: Settings,
   appearanceSetting: Appearance,
   toastr: toastrReducer
});
