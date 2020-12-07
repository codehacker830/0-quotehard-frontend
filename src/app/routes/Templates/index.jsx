import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SubHeader from '../../../components/SubHeader';
import CreatePriceItem from './CreatePriceItem';
import CreateTextItem from './CreateTextItem';
import GetTemplate from './GetTemplate';
import PriceItems from './PriceItems';
import TemplateItems from './TemplateItems';
import TextItems from './TextItems';
export default class Templates extends Component {
   render() {
      return (
         <React.Fragment>
            <SubHeader />
            <Switch>
               <Redirect exact path="/app/content" to="/app/content/templates" />
               <Route exact path="/app/content/templates" component={TemplateItems} />
               <Route exact path="/app/content/template/get" component={GetTemplate} />
               <Route exact path="/app/content/template/:id" component={GetTemplate} />

               <Route exact path="/app/content/item-price/browse" component={PriceItems} />
               <Route exact path="/app/content/item-price/create-new" component={CreatePriceItem} />
               <Route exact path="/app/content/item-price/view/:id" component={CreatePriceItem} />

               <Route exact path="/app/content/item-text/browse" component={TextItems} />
               <Route exact path="/app/content/item-text/create-new" component={CreateTextItem} />
               <Route exact path="/app/content/item-text/view/:id" component={CreateTextItem} />

            </Switch>
         </React.Fragment>
      );
   }
}