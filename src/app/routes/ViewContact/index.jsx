import React from 'react'
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import NavCrump from '../../../components/NavCrump';
import { personData, companyData, recentActivities } from "../../../constants/Dump";
import axios from '../../../util/Api';
import { toastSuccessCenterConfig, toastSuccessConfig } from '../../../util/toastrConfig';
import AddressesShow from './AddressesShow';
import AvatarImg from './AvatarImg';
import CompanyPeopleList from './CompanyPeopleList';
import ContactName from './ContactName';
import EditContactBtn from './EditContactBtn';
import PersonCompany from './PersonCompany';
import PhonesShow from './PhonesShow';

export default class ViewContact extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showActivity: false,
         contact: {}
      };
      this.actionsContainer = React.createRef();
   }
   onClickOutsideHandler = (ev) => {
      if (!this.actionsContainer.current.contains(ev.target)) {
         this.setState({ show: false });
      }
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
      const contactId = this.props.match.params.id;
      axios.get(`/contacts/id/${contactId}`).then(({ data }) => {
         console.log("API RESPNSE =>", data);
         this.setState({ contact: data.contact });
      }).catch((err) => {
         console.error("GET contact API error ==>", err)
         props.history.push("/app/c/contacts");
      })
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
   }
   onClickArchive = () => {
      axios.put(`/contacts/archive/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to archive contact", data);
         this.setState({ contact: data.contact });
         toast.success("Archived.", toastSuccessCenterConfig);
      }).catch((err) => {
         console.error(" failed to archive contact ", err);
      });
   }
   onClickUnArchive = () => {
      axios.put(`/contacts/un-archive/${this.props.match.params.id}`).then(({ data }) => {
         console.log(" success to archive contact", data);
         this.setState({ contact: data.contact });
         toast.success("Unarchived.", toastSuccessCenterConfig);
      }).catch((err) => {
         console.error(" failed to un-archive contact ", err);
      });
   }
   render() {
      console.log(" view contact state =>", this.state);
      const linkTo = `/app/c/contacts`;
      const linkName = "Contacts";
      const { contact } = this.state;
      return (
         <React.Fragment>
            <div className="bg-body-light border-top border-bottom">
               <div className="content content-full py-3">
                  <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                     <h1 className="flex-sm-fill font-size-sm text-uppercase font-w700 mt-2 mb-0 mb-sm-2">
                        <Link to={linkTo}>
                           <i className="fa fa-arrow-left fa-fw mr-2" />
                           <span className="text-primary">{linkName}</span>
                        </Link>
                     </h1>

                     <div className={`dropdown ${this.props.match.path === "/app/c/contacts/view/:id" ? "d-inline-block" : "d-none"}`} ref={this.actionsContainer}>
                        <button type="button" className="btn btn-dual" onClick={() => this.setState({ show: !this.state.show })}>
                           <span className="text-primary">Actions</span>
                           <i className="fa fa-fw fa-angle-down ml-1 text-primary" />
                        </button>

                        <div className={`dropdown-menu dropdown-menu-right p-0 ${this.state.show ? "show" : ""}`} style={{ minWidth: 250 }}>
                           <ul className="nav-items my-0 p-1">
                              {
                                 this.state.contact.status === "current" &&
                                 <li>
                                    <button className="dropdown-item media py-2" onClick={this.onClickArchive}>
                                       <div className="mx-3">
                                          <i className="fa fa-fw fa-archive text-secondary" />
                                       </div>
                                       <div className="media-body font-size-sm pr-2">
                                          <div className="font-w600">Archive</div>
                                       </div>
                                    </button>
                                 </li>
                              }
                              {
                                 this.state.contact.status === "archived" &&
                                 <li>
                                    <button className="dropdown-item media py-2" onClick={this.onClickUnArchive}>
                                       <div className="mx-3">
                                          <i className="fa fa-fw fa-archive text-secondary" />
                                       </div>
                                       <div className="media-body font-size-sm pr-2">
                                          <div className="font-w600">Archived<i className="fa fa-fw fa-long-arrow-alt-left"></i> Undo</div>
                                       </div>
                                    </button>
                                 </li>
                              }
                              <li>
                                 <button className="dropdown-item media py-2" onClick={this.onClickDelete}>
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-trash-alt text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Delete</div>
                                    </div>
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* <NavCrump linkTo={`/app/c/contacts`}>
            Contacts
         </NavCrump> */}
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
                                       <span className="badge badge-secondary px-3 py-1 text-uppercase">archived</span>
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
