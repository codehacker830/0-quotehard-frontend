import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InlineHelp from '../../components/InlineHelp';
import TotalLabelFor from '../../components/TotalLabelFor';
import axios from '../../util/Api';

export default class Contacts extends Component {
   state = {
      isLoading: true,
      filterStatus: "current",
      filterCategory: "peopleAndCompanies",
      contacts: []
   };
   filterContacts = (contacts) => {
      return contacts.filter((contact) => {
         if (this.state.filterCategory === "people") return (contact.category === "person" && contact.status === this.state.filterStatus);
         else if (this.state.filterCategory === "companies") return (contact.category === "company" && contact.status === this.state.filterStatus);
         else return contact.status === this.state.filterStatus;
      })
   }
   componentDidMount() {
      axios.get('/contacts').then(({ data }) => {
         console.error("data =", data);
         // const filteredContacts = this.filterContacts(data.contacts)
         this.setState({
            isLoading: false,
            contacts: data.contacts
         });
      });
   }
   render() {
      const { history } = this.props;
      const contactList = this.filterContacts(this.state.contacts);
      console.log(" contactList =>", contactList)
      return (
         <div className="content">
            <div className="block block-rounded">
               <div className="block-content">
                  <div className="row p-3">
                     <div className="col-md-6">
                        <div className="form-group px-1">
                           <div className="input-group">
                              <input type="email" className="form-control" placeholder="Search by Quote Title, Number or Contact..." />
                              <div className="input-group-append">
                                 <button type="button" className="btn btn-alt-dark">Search</button>
                              </div>
                           </div>
                        </div>
                        <div className="row no-gutters">
                           <div className="col-sm-6 px-1">
                              <div className="form-group">
                                 <select className="form-control"
                                    id="filter_category" name="filter_category"
                                    value={this.state.filterCategory}
                                    onChange={(ev) => this.setState({ filterCategory: ev.target.value })} >
                                    <optgroup label="---------------------------"></optgroup>
                                    <option value="peopleAndCompanies">People &amp; Companies</option>
                                    <optgroup label="---------------------------"></optgroup>
                                    <option value="people">People</option>
                                    <option value="companies">Companies</option>
                                 </select>
                              </div>
                           </div>
                           <div className="col-sm-6 px-1">
                              <div className="form-group">
                                 <select className="form-control"
                                    id="filter_status" name="filter_status"
                                    value={this.state.filterStatus}
                                    onChange={(ev) => this.setState({ filterStatus: ev.target.value })}
                                 >
                                    <option value="current">Current</option>
                                    <option value="archived">Archived</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="row no-gutters mb-2 px-1">
                           <Link to="/app/c/contacts/create/person" className="btn btn-success ml-auto">New Contact</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="block block-rounded">
               <div className="block-content">
                  {
                     !!contactList.length ||
                     <InlineHelp>
                        People & Companies will be added here automatically when you create and send quotes.
                     </InlineHelp>
                  }
                  <table className="quotient-table mt-3">
                     <tbody className="rowClick">
                        {
                           contactList.map((contact, index) => {
                              if (contact.category === "person") return (
                                 <tr onClick={() => history.push(`/app/c/contacts/view/${contact._id}`)} key={index}>
                                    <td>
                                       <div className="d-flex">
                                          <img className="avatar-36 mr-2 my-auto"
                                             src="/assets/media/avatars/person1.png"
                                             alt="..." />
                                          <div className="u-ellipsis">
                                             <Link to={`/app/c/contacts/view/${contact._id}`}>{contact.firstName} {contact.lastName}</Link>
                                             <br />
                                             <small className="text-gray font-size-sm">{contact.companyName}</small>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                              );
                              else return (
                                 <tr onClick={() => history.push(`/app/c/contacts/view/${contact._id}`)}>
                                    <td>
                                       <div className="d-flex">
                                          <img className="avatar-36 mr-2 my-auto"
                                             src="/assets/media/avatars/company1.png"
                                             alt="..." />
                                          <div className="u-ellipsis">
                                             <Link to="/app/c/contacts/view/4128663">{contact.companyName}</Link>
                                             <br />
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                              );
                           })
                        }
                     </tbody>
                  </table>
                  <TotalLabelFor list={contactList} />
               </div>
            </div>
         </div>
      );
   }
}