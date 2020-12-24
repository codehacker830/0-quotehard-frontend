import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Auth from './Auth';
import Common from './Common';
import GlobalSetting from './GlobalSetting';
import AppearanceSetting from './AppearanceSetting';
import QuoteDefautSetting from './QuoteDefautSetting';
import Team from './Team';
import Data from './Data';


export default (history) => combineReducers({
   router: connectRouter(history),
   auth: Auth,
   commonData: Common,
   globalSetting: GlobalSetting,
   appearanceSetting: AppearanceSetting,
   quoteDefaultSetting: QuoteDefautSetting,
   teamSetting: Team,
   mainData: Data,
});
