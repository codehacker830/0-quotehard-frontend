import React from 'react'
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';
import { personData, companyData, recentActivities } from "../../../constants/Dump";
import axios from '../../../util/Api';
import { toastSuccessConfig } from '../../../util/toastrConfig';
import AddressesShow from './AddressesShow';
import AvatarImg from './AvatarImg';
import CompanyPeopleList from './CompanyPeopleList';
import ContactName from './ContactName';
import EditContactBtn from './EditContactBtn';
import PersonCompany from './PersonCompany';
import PhonesShow from './PhonesShow';
import { CONTACTS_PATH } from '../../../constants/PathNames';
import NavCrumpLeft from '../../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../../components/NavCrump/NavCrumpRight';

export default class ViewContact extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showActivity: false,
         contact: {}
      };
   }
   componentDidMount() {
      const contactId = this.props.match.params.id;
      axios.get(`/contacts/id/${contactId}`).then(({ data }) => {
         console.log("API RESPNSE =>", data);
         this.setState({ contact: data.contact });
      }).catch((err) => {
         console.error("GET contact API error ==>", err)
         this.props.history.push(CONTACTS_PATH);

      })
   }
   onClickArchive = () => {
      axios.put(`/contacts/archive/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to archive contact", data);
         this.setState({ contact: data.contact });
         toast.success("Archived.", toastSuccessConfig);
      }).catch((err) => {
         console.error(" failed to archive contact ", err);
      });
   }
   onClickUnArchive = () => {
      axios.put(`/contacts/un-archive/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to archive contact", data);
         this.setState({ contact: data.contact });
         toast.success("Unarchived.", toastSuccessConfig);
      }).catch((err) => {
         console.error(" failed to un-archive contact ", err);
      });
   }
   onClickDelete = () => {
      axios.put(`/contacts/delete/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to archive contact", data);
         this.props.history.push(CONTACTS_PATH);
         toast.success("Contact deleted.", toastSuccessConfig);
      }).catch((err) => {
         console.error(" failed to un-archive contact ", err);
      });
   }
   render() {
      console.log(" view contact state =>", this.state);
      const linkTo = CONTACTS_PATH;
      const linkName = "Contacts";
      const { contact } = this.state;
      return (
         <React.Fragment>
            <NavCrump>
               <NavCrumpLeft linkTo={CONTACTS_PATH}>
                  Contacts
               </NavCrumpLeft>
               {
                  this.props.match.path === "/app/c/contacts/view/:id" &&
                  <NavCrumpRight>
                     <ul className="nav-items my-0 p-1">
                        {
                           this.state.contact.status === "current" &&
                           <li>
                              <button className="btn-in-action" onClick={this.onClickArchive}>
                                 <div className="mx-3">
                                    <i className="fa fa-fw fa-archive text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm font-w600 pr-2">
                                    <span>Archive</span>
                                 </div>
                              </button>
                           </li>
                        }
                        {
                           this.state.contact.status === "archived" &&
                           <li>
                              <button className="btn-in-action" onClick={this.onClickUnArchive}>
                                 <div className="mx-3">
                                    <i className="fa fa-fw fa-archive text-secondary" />
                                 </div>
                                 <div className="media-body font-size-sm font-w600 pr-2">
                                    <span>Archive</span><span className="choices-undo"> ← undo</span>
                                 </div>
                              </button>
                           </li>
                        }
                        <li>
                           <button className="btn-in-action" onClick={this.onClickDelete}>
                              <div className="mx-3">
                                 <i className="fa fa-fw fa-trash-alt text-secondary" />
                              </div>
                              <div className="media-body font-size-sm font-w600 pr-2">
                                 <span>Delete</span>
                              </div>
                           </button>
                        </li>
                     </ul>
                  </NavCrumpRight>
               }
            </NavCrump>
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
                     <div className="row no-gutters mb-1">
                        <div className="w-100 font-size-sm mb-1">
                           <i className="far fa-xs fa-clock mr-1"></i>
                        Recent Activity
                        <button className={`btn btn-rounded btn-outline-info fa-xs px-2 py-0 ml-2 ${this.state.showActivity ? "" : "d-none"}`} onClick={() => this.setState({ showActivity: false })}>Hide</button>
                        </div>
                        <div className={`w-100 mb-1 ${this.state.showActivity ? "d-none" : ""}`}>
                           <span className="w-100 text-gray font-size-sm mb-1">Edited by A Devom  –  September 21, 2020 at 11:26AM</span>
                           <button className="btn btn-rounded btn-outline-info fa-xs px-2 py-0 ml-2" onClick={() => this.setState({ showActivity: true })}>All Activity</button>
                        </div>
                        <div className={`w-100 mt-2 ${this.state.showActivity ? "" : "d-none"}`}>
                           <table className="table table-sm table-vcenter">
                              <tbody>
                                 {
                                    recentActivities.map((item, index) => {
                                       return (
                                          <tr key={index}>
                                             <td className="bg-light-gray font-size-sm p-2" style={{ width: "30%" }}>{item.date}</td>
                                             <td className="font-size-sm p-2">{item.content}</td>
                                          </tr>
                                       );
                                    })
                                 }
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment >
      )
   }
}
