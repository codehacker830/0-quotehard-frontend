import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../util/Api';
import QuoteTableShow from './QuoteTableShow';
import QuoteOverview from './QuoteOverview';
import { initializeQuote } from '../../../actions/Data';
import { connect } from 'react-redux';
import NewQuoteBtn from './NewQuoteBtn';
import SearchBar from './SearchBar';

class Dashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoadingQuotes: false,
         quotes: []
      };
   }
   componentDidMount() {
      // Initiate mainData quote reducer
      this.props.initializeQuote();

      // Get all Quotes
      this.setState({ isLoadingQuotes: true });
      axios.get('/quotes').then(({ data }) => {
         const quotes = data.quotes.filter(quote => {
            return quote.state !== "archived";
         });
         this.setState({
            isLoadingQuotes: false,
            quotes: quotes
         });
      }).catch(err => {
         this.setState({ isLoadingQuotes: false });
         console.error("  Promise all error ===>", err);
      });
   }
   render() {
      return (
         <div className="content">
            <div className="row py-3">
               <NewQuoteBtn />
               <SearchBar />
            </div>
            <div className="row">
               {
                  this.state.isLoadingQuotes ?
                     <div className="col-md-6">
                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                           <span className="sr-only">Loading...</span>
                        </div>
                     </div>
                     :
                     <React.Fragment>
                        <QuoteTableShow quotes={this.state.quotes} />
                        <QuoteOverview quotes={this.state.quotes} />
                     </React.Fragment>
               }
            </div>
            <div className="row py-5 justify-content-center">
               <p className="text-center">
                  <strong>Your trial ends in <span className="badge badge-primary">11</span>
                  </strong>
                  <br />
                  To carry on beyond your trial, please <Link to="/app/settings/payment-details"> add payment details</Link>
               </p>
            </div>
         </div>
      );
   }
}

const mapDispatchToProps = {
   initializeQuote
}
export default connect(() => ({}), mapDispatchToProps)(Dashboard);