import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ExamplesDashabord from './ExamplesDashboard'
import Bookkeeping from './Bookkeeping'
import CakeDecorating from './CakeDecorating'
import Catering from './Catering'
import CorporatePromo from './CorporatePromo'
import Florist from './Florist'
import Photography from './Photography'
import Error404 from '../../components/Error404'
import ExampleNavbar from './ExamplesDashboard/components/ExampleNavbar'
import './style.scss';

export default function Examples() {
   return (
      <Switch>
         <Route exact path='/examples' component={ExamplesDashabord} />
         <Route path="/examples">
            <ExampleNavbar />
            <Switch>
               <Route exact path='/examples/bookkeeping-quote-template' component={Bookkeeping} />
               <Route exact path='/examples/corporate-promo-quote-template' component={CorporatePromo} />
               <Route exact path='/examples/photography-quote-template' component={Photography} />
               <Route exact path='/examples/cake-decorating-quote-template' component={CakeDecorating} />
               <Route exact path='/examples/catering-quote-template' component={Catering} />
               <Route exact path='/examples/florist-quote-template' component={Florist} />
            </Switch>
         </Route>

         <Route component={Error404} />
      </Switch>
   )
}
