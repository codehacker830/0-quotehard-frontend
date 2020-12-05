import { isNumber } from 'highcharts';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import AddAddressBtn from '../../components/Contact/AddAddressBtn';
import AddPhoneBtn from '../../components/Contact/AddPhoneBtn';
import CompleterCompany from '../../components/Contact/CompleterCompany';
import NavCrump from '../../components/NavCrump';
import axios from '../../util/Api';
import { toastSuccessConfig } from '../../util/toastrConfig';
import { ToastErrorNotification } from '../../util';

export default class EditContact extends Component {
   constructor(props) {
      super(props);
      this.goTo = "/app/c/contacts";
      this.state = {
         show: false,
         companyId: "",
         category: "",
         firstName: "",
         lastName: "",
         email: "",
         companyName: "",

         phones: [],
         addresses: [],
      };
   }

   handleAddressForm = (ev, index) => {
      console.log(" handleAddressForm index ===>", index);
      let newAddresses = [...this.state.addresses];
      if (ev.target.name === "category") newAddresses[index].category = ev.target.value;
      else if (ev.target.name === "street") newAddresses[index].street = ev.target.value;
      else if (ev.target.name === "city") newAddresses[index].city = ev.target.value;
      else if (ev.target.name === "stateOrRegion") newAddresses[index].stateOrRegion = ev.target.value;
      else if (ev.target.name === "postCode") newAddresses[index].postCode = ev.target.value;
      else if (ev.target.name === "country") newAddresses[index].country = ev.target.value;

      console.log(" newAddresses ===>", newAddresses);
      this.setState({ addresses: newAddresses });
   }

   onHandleSubmit = () => {
      // API request to create contact
      const {
         category,
         firstName,
         lastName,
         companyName,
         companyId,
         email,
         phones,
         addresses
      } = this.state;
      const data = { category, firstName, lastName, companyName, companyId, email, phones, addresses };
      console.log("edit contact request payload =", data);
      if (category === "person" && (firstName === "" || email === "")) {
         toast.warn('First Name is required.');
         return;
      }
      if (category === "company" && companyName === "" && email === "") {
         toast.warn('You need to enter a company name or email.');
         return;
      }
      const { match } = this.props;
      const contactId = match.params.id;
      if (!contactId) {
         toast.warn("Contact can't be catched.");
         return;
      }
      axios.put(`/contacts/${contactId}`, data).then((res) => {
         console.log("api resopnse = >", res);
         toast.success("Contact was updated successfully.", toastSuccessConfig);
         this.props.history.push(this.goTo);
      }).catch(err => {
         const { errors } = err.response.data;
         ToastErrorNotification(errors);
      });
   }

   componentDidMount() {
      const { location, match } = this.props;
      if (location.state && location.state.from) this.goTo = location.state.from;

      console.error("match.params.id ==", match.params.id);
      if (!match.params.id) {
         this.props.push(this.goTo);
         return;
      }

      axios.get(`/contacts/id/${match.params.id}`).then(({ data }) => {
         console.log("get contact api res =>", data);
         const { contact } = data;
         this.setState({
            category: contact.category,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            companyId: contact.category === "person" ? (contact.company ? contact.company._id : "") : "",
            companyName: contact.category === "person" ? (contact.company ? contact.company.companyName : "") : (contact.companyName ? contact.companyName : ""),
            phones: contact.phones,
            addresses: contact.addresses
         });

      }).catch((err) => {
         console.error("get contact api error ==>", err)
      })
   }

   render() {
      console.log("this.state =", this.state)
      return (
         <React.Fragment>
            <NavCrump linkTo="/app/c/contacts">
               Contacts
            </NavCrump>
            <div className="content">
               <div className="block block-rounded">
                  <div className="block-content">
                     <div className="maxWidth-800 p-4">
                        {/* Full Name */}
                        {
                           this.state.category === "person" &&
                           (
                              <div>
                                 <div className="form-group">
                                    <div className="row">
                                       <div className="col-md-6 col-sm-12">
                                          <label htmlFor="firstName">First Name</label>
                                          <input
                                             type="text"
                                             className="form-control"
                                             id="firstName" name="firstName"
                                             placeholder=""
                                             value={this.state.firstName}
                                             onChange={(ev) => this.setState({ firstName: ev.target.value })} />
                                       </div>
                                       <div className="col-md-6 col-sm-12">
                                          <div className="d-flex">
                                             <label htmlFor="lastName">Last Name</label>
                                             {this.state.mode === "create" && <Link className="ml-auto" to="/app/c/contacts/edit/new-company">Switch to Company</Link>}
                                          </div>
                                          <input
                                             type="text"
                                             className="form-control"
                                             id="lastName" name="lastName"
                                             placeholder=""
                                             value={this.state.lastName}
                                             onChange={(ev) => this.setState({ lastName: ev.target.value })} />
                                       </div>
                                    </div>
                                 </div>
                                 {/* Email Address */}
                                 <div className="form-group">
                                    <label htmlFor="email">Email Address<span className="text-danger fa-fx font-w600 ml-1">required</span></label>
                                    <input
                                       type="text"
                                       className="form-control"
                                       id="email" name="email"
                                       placeholder=""
                                       value={this.state.email}
                                       onChange={(ev) => this.setState({ email: ev.target.value })} />
                                 </div>
                                 {/* Company Name */}
                                 <div className="form-group" style={{ position: "relative" }}>
                                    <label htmlFor="companyName">Company Name</label>
                                    <input
                                       type="text"
                                       className="form-control"
                                       id="companyName" name="companyName"
                                       placeholder="New, or lookup existing..."
                                       value={this.state.companyName}
                                       onChange={(ev) => this.setState({ companyName: ev.target.value, show: true })} />
                                    <CompleterCompany
                                       companyName={this.state.companyName}
                                       show={this.state.show}
                                       setCompany={(contact) => {
                                          this.setState({
                                             companyName: contact.companyName,
                                             companyId: contact._id,
                                             show: false
                                          });
                                       }}
                                    />
                                 </div>
                              </div>
                           )
                        }

                        {
                           this.state.category === "company" &&
                           (
                              <div>
                                 <div className="form-group">
                                    <div className="d-flex">
                                       <label htmlFor="companyName">Company</label>
                                       {this.state.mode === "create" && <Link className="ml-auto" to="/app/c/contacts/edit/new-person">Switch to person</Link>}
                                    </div>
                                    <input
                                       type="text"
                                       className="form-control"
                                       id="companyName" name="companyName"
                                       placeholder=""
                                       value={this.state.companyName}
                                       onChange={(ev) => this.setState({ companyName: ev.target.value })} />
                                 </div>
                                 {/* Email Address */}
                                 <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                       type="text"
                                       className="form-control"
                                       id="email" name="email"
                                       placeholder=""
                                       value={this.state.email}
                                       onChange={(ev) => this.setState({ email: ev.target.value })} />
                                 </div>
                              </div>
                           )
                        }

                        {/* Address Set From */}
                        {
                           this.state.phones.map((item, index) => {
                              return (
                                 <div className="form-group" key={index}>
                                    <div className="d-flex mb-1">
                                       <div className="w-50">
                                          <select
                                             className="form-control"
                                             id="phone" name="phone"
                                             value={item.category}
                                             onChange={(ev) => {
                                                let newPhoneDataArray = [...this.state.phones];
                                                newPhoneDataArray[index].category = ev.target.value;
                                                this.setState({ phones: newPhoneDataArray });
                                             }}
                                          >
                                             <optgroup label="Phone">
                                                <option value="primaryPhone">Primary Phone</option>
                                                <option value="workPhone">Work Phone</option>
                                                <option value="mobile">Mobile</option>
                                                <option value="homePhone">Home Phone</option>
                                             </optgroup>
                                             <optgroup label="website &amp; Social">
                                                <option value="website">Website</option>
                                                <option value="skype">Skype</option>
                                                <option value="twitter">Twitter</option>
                                             </optgroup>
                                             <optgroup label="Desperate methods">
                                                <option value="fax">Fax</option>
                                             </optgroup>
                                          </select>
                                       </div>
                                       <div className="w-50">
                                          <button type="button" className="btn close" onClick={() => this.setState({ phones: this.state.phones.filter((item, itemIndex) => itemIndex !== index) })}>
                                             <span>×</span>
                                          </button>
                                       </div>
                                    </div>
                                    <input
                                       type="text"
                                       className="form-control"
                                       id="phone" name="phone"
                                       placeholder=""
                                       value={item.content}
                                       onChange={(ev) => {
                                          let newPhoneDataArray = [...this.state.phones];
                                          newPhoneDataArray[index].content = ev.target.value;
                                          this.setState({ phones: newPhoneDataArray });
                                       }}
                                    />
                                 </div>
                              );
                           })
                        }


                        {/* Add Phone Button */}
                        <AddPhoneBtn
                           handleClick={() => this.setState({ phones: [...this.state.phones, { category: "primaryPhone" }] })}
                        />

                        {/* Address Form */}
                        {
                           this.state.addresses.map((item, index) => {
                              return (
                                 <div className="form-group" key={index}>
                                    <div className="d-flex mb-1">
                                       <div className="w-50">
                                          <select
                                             className="form-control"
                                             id="addressType" name="category"
                                             value={item.category}
                                             onChange={(ev) => this.handleAddressForm(ev, index)}
                                          >
                                             <option value="primaryAddress">Primary Address</option>
                                             <option value="postalAddress">Postal Address</option>
                                             <option value="physicalAddress">Physical Addresses</option>
                                          </select>
                                       </div>
                                       <div className="w-50">
                                          <button
                                             type="button"
                                             className="btn close"
                                             onClick={() => {
                                                this.setState({ addresses: this.state.addresses.filter((item, itemIndex) => itemIndex !== index) });
                                             }}>
                                             <span>×</span>
                                          </button>
                                       </div>
                                    </div>
                                    <input
                                       type="text"
                                       className="form-control mb-1"
                                       id="street" name="street"
                                       placeholder="Street"
                                       value={item.street}
                                       onChange={(ev) => this.handleAddressForm(ev, index)} />
                                    <input
                                       type="text"
                                       className="form-control mb-1"
                                       id="city" name="city"
                                       placeholder="City"
                                       value={item.city}
                                       onChange={(ev) => this.handleAddressForm(ev, index)} />
                                    <div className="d-flex mb-1">
                                       <input
                                          type="text"
                                          className="form-control mr-1"
                                          id="state-region" name="stateOrRegion"
                                          placeholder="State / Region"
                                          value={item.stateOrRegion}
                                          onChange={(ev) => this.handleAddressForm(ev, index)} />
                                       <input
                                          type="text"
                                          className="form-control"
                                          id="zip-post-code" name="postCode"
                                          placeholder="Zip / Post Code"
                                          value={item.postCode}
                                          onChange={(ev) => this.handleAddressForm(ev, index)} />
                                    </div>
                                    <input
                                       type="text"
                                       className="form-control mb-1"
                                       id="country" name="country"
                                       placeholder="Country"
                                       value={item.country}
                                       onChange={(ev) => this.handleAddressForm(ev, index)} />
                                 </div>
                              );
                           })
                        }

                        {/* Add Address Button */}
                        <AddAddressBtn
                           handleClick={() => this.setState({ addresses: [...this.state.addresses, { category: "primaryAddress" }] })}
                        />

                        <div className="form-group py-3">
                           <button className="btn btn-lg btn-rounded btn-hero-primary mr-2" onClick={this.onHandleSubmit}>Update</button>
                           <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/c/contacts">Cancel</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment >
      );
   }
}