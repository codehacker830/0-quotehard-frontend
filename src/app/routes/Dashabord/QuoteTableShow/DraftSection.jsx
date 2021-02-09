import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Tr_Quotient from '../../Quotes/Tr_Quotient';

class DraftSection extends Component {
   render() {
      const { draftQuotes } = this.props;
      if (draftQuotes.length) return (
         <table className="quotient-table mb-4">
            <tbody className="rowClick" data-tg-click="root_rowClick">
               {draftQuotes.map((item, index) => <Tr_Quotient item={item} key={index} />)}
            </tbody>
         </table>
      );
      else return null;
   }
}

export default withRouter(DraftSection);