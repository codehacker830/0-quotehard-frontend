import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Auth from './Auth';
import Common from './Common';
import GlobalSettings from './GlobalSettings';
import Appearance from './Appearance';
import Team from './Team';
import Data from './Data';


export default (history) => combineReducers({
   router: connectRouter(history),
   auth: Auth,
   commonData: Common,
   globalSettings: GlobalSettings,
   appearanceSetting: Appearance,
   teamSetting: Team,
   mainData: Data,
});
