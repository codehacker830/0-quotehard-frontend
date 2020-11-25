import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Auth from './Auth';
import Common from './Common';
import Settings from './Settings';
import Appearance from './Appearance';
import Team from './Team';
import PublicView from './PublicView';


export default (history) => combineReducers({
   router: connectRouter(history),
   auth: Auth,
   commonData: Common,
   settings: Settings,
   appearanceSetting: Appearance,
   teamSetting: Team,
   publicView: PublicView,
});
