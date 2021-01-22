import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Auth from './Auth';
import Common from './Common';
import SalesSetting from './SalesSetting';
import AppearanceSetting from './AppearanceSetting';
import QuoteDefautSetting from './QuoteDefautSetting';
import CustomerEmailSetting from './CustomerEmailSetting';
import Team from './Team';
import Data from './Data';


export default (history) => combineReducers({
   router: connectRouter(history),
   auth: Auth,
   commonData: Common,
   salesSetting: SalesSetting,
   appearanceSetting: AppearanceSetting,
   quoteDefaultSetting: QuoteDefautSetting,
   customerEmailSetting: CustomerEmailSetting,
   teamSetting: Team,
   mainData: Data,
});
