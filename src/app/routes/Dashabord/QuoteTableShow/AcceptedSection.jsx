import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Tr_Quotient from '../../Quotes/Tr_Quotient';

class AcceptedSection extends Component {
   render() {
      const { acceptedQuotes } = this.props;
      if (acceptedQuotes.length) return (
         <React.Fragment>
            <div className="font-w700 mb-3 text-success">Accepted</div>
            <table className="quotient-table mb-4">
               <tbody className="rowClick" data-tg-click="root_rowClick">
                  {acceptedQuotes.map((item, index) => <Tr_Quotient item={item} key={index} />)}
               </tbody>
            </table>
         </React.Fragment>
      );
      else return null;
   }
}

export default withRouter(AcceptedSection);