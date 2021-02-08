import React from 'react'
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';
import axios from '../../../util/Api';
import { toastSuccessConfig } from '../../../util/toastrConfig';
import AddressesShow from './AddressesShow';
import AvatarImg from './AvatarImg';
import CompanyPeopleList from './CompanyPeopleList';
import ContactName from './ContactName';
import EditContactBtn from './EditContactBtn';
import PersonCompany from './PersonCompany';
import PhonesShow from './PhonesShow';
import { CONTACTS_PAGE_PATH } from '../../../constants/PathNames';
import NavCrumpLeft from '../../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../../components/NavCrump/NavCrumpRight';
import ConfirmContactMergeBanner from './ConfirmContactMergeBanner';
import RecentActivities from './RecentActivities';

export default class ViewContact extends Component {
   constructor(props) {
      super(props);
      this.state = {
         contact: {}
      };
   }
   componentDidMount() {
      const contactId = this.props.match.params.id;
      axios.get(`/contacts/id/${contactId}`).then(({ data }) => {
         console.log("VIEW CONTACT BY ID RESPONSE =>", data);
         this.setState({ contact: data.contact });
      }).catch((err) => {
         console.error("GET contact API error ==>", err)
         this.props.history.push(CONTACTS_PAGE_PATH);

      })
   }
   onClickArchive = () => {
      axios.put(`/contacts/${this.state.contact.category}/archive/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to archive contact", data);
         this.setState({ contact: data.contact });
         toast.success("Archived.", toastSuccessConfig);
      }).catch((err) => {
         console.error(" failed to archive contact ", err);
      });
   }
   onClickUnArchive = () => {
      axios.put(`/contacts/${this.state.contact.category}/un-archive/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to archive contact", data);
         this.setState({ contact: data.contact });
         toast.success("Unarchived.", toastSuccessConfig);
      }).catch((err) => {
         console.error(" failed to un-archive contact ", err);
      });
   }
   onClickDeleteAndMerge = () => {
      const contactId = this.props.match.params.id;
      this.props.history.push({
         pathname: '/app/c/contacts',
         search: `?category=${this.state.contact.category}&merge_loser=${contactId}`
      });
   }
   render() {
      console.log(" view contact state =>", this.state);
      const { contact } = this.state;
      return (
         <React.Fragment>
            <NavCrump>
               <NavCrumpLeft linkTo={CONTACTS_PAGE_PATH}>
                  Contacts
               </NavCrumpLeft>
               {
                  this.props.match.path === "/app/c/contacts/view/:id" &&
                  <NavCrumpRight>
                     <ul className="choices" style={{ left: 50, top: 10 }}>
                        {
                           this.state.contact.status === "current" ?
                           <li>
                              <button className="btn-in-action" onClick={this.onClickArchive}>
                                 <div className="icon-wrapper">
                                    <i className="fa fa-fw fa-archive text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm pr-2">
                                    <span>Archive</span>
                                 </div>
                              </button>
                           </li>
                           : <li>
                           <button className="btn-in-action" onClick={this.onClickUnArchive}>
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-archive text-secondary" />
                              </div>
                              <div className="media-body font-size-sm pr-2">
                                 <span>Archive</span><span className="choices-undo"> ← undo</span>
                              </div>
                           </button>
                        </li>
                        }
                        <li>
                           <button className="btn-in-action" onClick={this.onClickDeleteAndMerge}>
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-compress-alt text-secondary" />
                              </div>
                              <div className="media-body font-size-sm pr-2">
                                 <span>Delete &amp; merge</span>
                              </div>
                           </button>
                        </li>
                     </ul>
                  </NavCrumpRight>
               }
            </NavCrump>

            <ConfirmContactMergeBanner contact={this.state.contact} />

            <div className="content">
               <div className="block block-rounded">
                  <div className="block-content p-5">
                     <ContactName contact={contact} />
                     <div className="row">
                        <div className="col-md-6 col-sm-12">
                           <div className="d-flex">
                              <AvatarImg contact={contact} />
                              <div className="d-block">
                                 {
                                    contact.status === "archived" &&
                                    <div className="mb-2">
                                       <span className="label">archived</span>
                                    </div>
                                 }
                                 <PersonCompany contact={contact} />
                                 <div className="form-group">
                                    <span className="text-gray fa-xs text-uppercase">Quotes</span>
                                    <Link className="d-block" to={{
                                       pathname: "/app/quotes",
                                       state: {
                                          category: contact.category,
                                          id: contact._id
                                       }
                                    }}>View quotes</Link>
                                 </div>
                                 <div className="form-group">
                                    <span className="text-gray fa-xs text-uppercase">Email</span>
                                    <a className="d-block" href={`mailto:${contact.email}`}>{contact.email}</a>
                                 </div>

                                 <div className="form-group">
                                    <PhonesShow phones={contact && (contact.phones || [])} />
                                    <AddressesShow addresses={contact && (contact.addresses || [])} />
                                 </div>
                                 <EditContactBtn contact={contact} />
                              </div>
                           </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                           {
                              contact.category === "company" &&
                              <CompanyPeopleList contact={contact} />
                           }
                        </div>
                     </div>

                     {/* Recent Activity */}
                     <RecentActivities contact={contact} />
                  </div>
               </div>
            </div>
         </React.Fragment >
      )
   }
}
