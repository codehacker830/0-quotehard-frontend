import React, { Component } from 'react';
import InlineHelp from '../../../components/InlineHelp';
import TotalLabelFor from '../../../components/TotalLabelFor';
import axios from '../../../util/Api';
import QuoteControlPanel from './QuoteControlPanel';
import Tr_Quotient from './Tr_Quotient';
import qs from 'qs';

export default class Quotes extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         quotes: []
      };

      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      this.search = queryObj.search ? queryObj.search : "";
      this.tab = queryObj.tab ? queryObj.tab : "currentAndArchived";
      this.author = queryObj.author ? queryObj.author : "allTeamMembers";
      this.status = queryObj.status ? queryObj.status : "anyStatus";
   }
   filterQuotes = (quotes) => {
      return quotes.filter(quote => {
         if (this.tab === "currentAndArchived") {
            if (this.author === "allTeamMembers") {
               if (this.status === "anyStatus") return true;
               else return quote.status === this.status;
            } else {
               if (this.status === "anyStatus") return (quote.author === this.author);
               else return (quote.author === this.author && quote.status === this.status);
            }
         } else {
            if (this.author === "allTeamMembers") {
               if (this.status === "anyStatus") return (quote.state === this.tab);
               else return (quote.state === this.tab && quote.status === this.status);
            } else {
               if (this.status === "anyStatus") return (quote.state === this.tab && quote.author === this.author);
               else return (quote.state === this.tab && quote.author === this.author && quote.status === this.status);
            }
         }
      })
   }
   componentDidMount() {
      if (this.search) {
         console.log(" this.search ====> ", this.search)
         this.setState({ isLoading: true });
         axios.get(`/quotes/search/${this.search}`).then(({ data }) => {
            console.log(" aa quotes === ", data)

            this.setState({
               isLoading: false,
               quotes: this.filterQuotes(data.quotes)
            })
         }).catch(err => {
            console.error(" error search quotes :", err)
         });
      } else {
         this.setState({ isLoading: true });
         axios.get(`/quotes`).then(({ data }) => {
            console.log(" quotes === ", data)
            this.setState({
               isLoading: false,
               quotes: this.filterQuotes(data.quotes)
            });
         }).catch(err => {
            console.error(" error during get quotes :", err)
         });
      }
   }
   render() {
      console.log("Quotes state --", this.state);
      console.log("Quotes prpos --", this.props);
      return (
         <div className="content">
            <QuoteControlPanel />
            <div className="block block-rounded">
               <div className="block-content">
                  {
                     this.state.quotes.length === 0 ?
                        <InlineHelp>
                           Organise and search all your quotes in&nbsp;one&nbsp;place.
                           <br />
                           You&nbsp;can&nbsp;create and send your first quote in&nbsp;a matter of&nbsp;minutes.
                        </InlineHelp>
                        :
                        <React.Fragment>
                           <table className="quotient-table">
                              <tbody className="rowClick" data-tg-click="root_rowClick">
                                 {this.state.quotes.map((item, index) => <Tr_Quotient item={item} key={index} />)}
                              </tbody>
                           </table>
                           <TotalLabelFor list={this.state.quotes} />
                        </React.Fragment>
                  }
               </div>
            </div>
         </div>
      );
   }
}