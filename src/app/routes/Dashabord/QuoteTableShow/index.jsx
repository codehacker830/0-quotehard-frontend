import React, { Component } from 'react';
import AcceptedSection from './AcceptedSection';
import AwaitingSection from './AwaitingSection';
import DeclinedSection from './DeclinedSection';
import DraftSection from './DraftSection';

class QuoteTableShow extends Component {
   render() {
      console.log(" =============== this.props.quotes   ///", this.props.quotes);
      const draftQuotes = this.props.quotes.filter((it) => it.status === "draft");
      const awaitingQuotes = this.props.quotes.filter((it) => it.status === "awaiting");
      const acceptedQuotes = this.props.quotes.filter((it) => it.status === "accepted");
      const declinedQuotes = this.props.quotes.filter((it) => it.status === "declined");

      return (
         <div className="col-md-6">
            {
               this.props.quotes.length ?
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
                  : null
            }
         </div>
      );
   }
}

export default QuoteTableShow;