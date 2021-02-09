import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Tr_Quotient from '../../Quotes/Tr_Quotient';

class DeclinedSection extends Component {
   render() {
      const { declinedQuotes } = this.props;
      if (declinedQuotes.length) return (
         <React.Fragment>
            <div className="font-w700 mb-3 text-danger">Declined</div>
            <table className="quotient-table mb-4">
               <tbody className="rowClick" data-tg-click="root_rowClick">
                  {declinedQuotes.map((item, index) => <Tr_Quotient item={item} key={index} />)}
               </tbody>
            </table>
         </React.Fragment>
      );
      else return null;
   }
}

export default withRouter(DeclinedSection);