import React, { Component } from 'react';
import AcceptedSection from './AcceptedSection';
import AwaitingSection from './AwaitingSection';
import DeclinedSection from './DeclinedSection';
import DraftSection from './DraftSection';

class QuoteTableShow extends Component {
   render() {
      const { quotes } = this.props;
      const draftQuotes = quotes.filter((it) => it.status === "draft");
      const awaitingQuotes = quotes.filter((it) => it.status === "awaiting");
      const acceptedQuotes = quotes.filter((it) => it.status === "accepted");
      const declinedQuotes = quotes.filter((it) => it.status === "declined");

      if (!quotes.length) return (<div className="col-md-6"></div>);
      else return (
         <div className="col-md-6">
            <div className="mb-4">
               {/* Draft Section */}
               <DraftSection draftQuotes={draftQuotes} />
               {/* Awating Acceptance Section*/}
               <AwaitingSection awaitingQuotes={awaitingQuotes} />
               {/* Accepted Section */}
               <AcceptedSection acceptedQuotes={acceptedQuotes} />
               {/* Declined Section */}
               <DeclinedSection declinedQuotes={declinedQuotes} />
            </div>
         </div>
      );
   }
}

export default QuoteTableShow;