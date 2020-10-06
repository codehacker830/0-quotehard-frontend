import { isNumber } from 'highcharts';
import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import AddAddressBtn from '../../components/Contact/AddAddressBtn';
import AddPhoneBtn from '../../components/Contact/AddPhoneBtn';
import NavCrump from '../../components/NavCrump';
import {
   companyData
} from "../../constants/Dump";
import axios from '../../util/Api';
import { toastrSuccessConfig } from '../../util/toastrConfig';

export default class EditContact extends Component {
   constructor(props) {
      super(props);
      this.goTo = "/app/c/contacts";
      this.state = {
         category: "",
         firstName: "",
         lastName: "",
         email: "",
         companyName: "",

         phones: [],
         addresses: [],
      };
   }

   componentDidMount() {
      const { location, match } = this.props;
      if (location.state && location.state.from) this.goTo = location.state.from;
      const contactId = match.params.id;
      console.error("match.params.id ==", contactId);
      if (!contactId) {
         this.props.push(this.goTo);
         return;
      }

      axios.get(`/contacts/id/${contactId}`).then(({ data }) => {
         console.log("get contact api res =>", data);
         this.setState({
            category: data.contact.category,
            firstName: data.contact.firstName,
            lastName: data.contact.lastName,
            email: data.contact.email,
            companyName: data.contact.companyName,
            phones: data.contact.phones,
            addresses: data.contact.addresses
         });

      }).catch((err) => {
         console.error("get contact api error ==>", err)
      })
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

      console.error(" newAddresses ===>", newAddresses);
      this.setState({ addresses: newAddresses });
   }

   onHandleSubmit = () => {
      // API request to create contact
      const {
         category,
         firstName,
         lastName,
         companyName,
         email,
         phones,
         addresses
      } = this.state;
      const data = { category, firstName, lastName, companyName, email, phones, addresses };
      console.log("edit contact request payload =", data);
      if (category === "person" && (firstName === "" || email === "")) {
         toastr.warning('Warning !', 'First Name is required.', toastrWarningConfig);
         return;
      }
      if (category === "company" && companyName === "" && email === "") {
         toastr.warning('Warning !', 'You need to enter a company name or email.', toastrWarningConfig);
         return;
      }
      const { match } = this.props;
      const contactId = match.params.id;
      if (!contactId) {
         toastr.warning('Warning !', "Contact can't be catched.", toastrWarningConfig);
         return;
      }
      axios.put(`/contacts/${contactId}`, data).then((res) => {
         console.log("api resopnse = >", res);
         toastr.success('Success !', "Contact was updated successfully.", toastrSuccessConfig);
         // this.props.history.push(this.goTo);
      }).catch(err => {
         console.error("err => ", err);
      });
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
                                 <div className="form-group">
                                    <label htmlFor="companyName">Company Name</label>
                                    <input
                                       type="text"
                                       className="form-control"
                                       id="companyName" name="companyName"
                                       placeholder="New, or lookup existing..."
                                       value={this.state.companyName}
                                       onChange={(ev) => this.setState({ companyName: ev.target.value })} />
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