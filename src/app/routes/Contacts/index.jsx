import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../../components/InlineHelp';
import TotalLabelFor from '../../../components/TotalLabelFor';
import axios from '../../../util/Api';
import Tr_Contact from './Tr_Contact';
import qs from 'qs';
import ContactsPanel from './ContactsPanel';
import SelectWinnerBrand from '../Templates/components/SelectWinnerBrand';

export default class Contacts extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: true,
         contacts: []
      };

      const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      this.search = queryObj.search ? queryObj.search : "";
      this.category = queryObj.category ? queryObj.category : "peopleAndCompanies";
      this.status = queryObj.status ? queryObj.status : "current";
      this.merge_loser = queryObj.merge_loser ? queryObj.merge_loser : "";
   }

   filterContacts = (contacts) => {
      return contacts.filter((contact) => {
         if (this.category === "person" || this.category === "company") return (contact.category === this.category && contact.status === this.status);
         else return contact.status === this.status;
      })
   }
   componentDidMount() {
      if (this.search) {
         axios.get(`/contacts/search/${this.search}`).then(({ data }) => {
            this.setState({
               isLoading: false,
               contacts: this.filterContacts(data.contacts)
            });
         });
      }
      else {
         axios.get('/contacts').then(({ data }) => {
            this.setState({
               isLoading: false,
               contacts: this.filterContacts(data.contacts)
            });
         });
      }
   }
   render() {
      return (
         <div className="content">
            <SelectWinnerBrand />
            <ContactsPanel />
            <div className="block block-rounded">
               <div className="block-content">
                  {
                     this.state.contacts.length === 0 ?
                        <InlineHelp>
                           People & Companies will be added here automatically when you create and send quotes.
                        </InlineHelp>
                        :
                        <React.Fragment>
                           <table className="quotient-table mt-3">
                              <tbody className="rowClick">
                                 {this.state.contacts.map((contact, index) => <Tr_Contact key={index} contact={contact} />)}
                              </tbody>
                           </table>
                           <TotalLabelFor list={this.state.contacts} />
                        </React.Fragment>
                  }

               </div>
            </div>
         </div>
      );
   }
}