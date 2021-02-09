import clsx from 'clsx';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Tr_Quotient from '../../Quotes/Tr_Quotient';

class AwaitingSection extends Component {
   render() {
      const { awaitingQuotes } = this.props;
      if (awaitingQuotes.length) return (
         <React.Fragment>
            <div className="font-w700 mb-3">
               {/* <Link className="btn btn-outline-light btn-alt float-right text-primary" to="app/quotes?tab=Follow-up&author=52036">
                  Follow-up <span className="badge badge-pill px-3 py-1 badge-primary text-uppercase mb-0">1</span>
               </Link> */}
               Awaiting Acceptance
            </div>
            <table className="quotient-table mb-4">
               <tbody className="rowClick" data-tg-click="root_rowClick">
                  {awaitingQuotes.map((item, index) => <Tr_Quotient item={item} key={index} />)}
               </tbody>
            </table>
         </React.Fragment>
      );
      else return null;
   }
}

export default withRouter(AwaitingSection);