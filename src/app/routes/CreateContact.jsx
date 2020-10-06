import { isNumber } from 'highcharts';
import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import NavCrump from '../../components/NavCrump';
import {
   companyData
} from "../../constants/Dump";
import axios from '../../util/Api';
import { toastrErrorConfig, toastrSuccessConfig, toastrWarningConfig } from '../../util/toastrConfig';
import AddressForm from '../../components/Contact/AddressForm';
import AddAddressBtn from '../../components/Contact/AddAddressBtn';
import AddPhoneBtn from '../../components/Contact/AddPhoneBtn';
import CompleterCompany from '../../components/Contact/CompleterCompany';

export default class CreateContact extends Component {
   constructor(props) {
      super(props);
      this.goTo = "/app/c/contacts";

      this.state = {
         show: false,
         companyId: "",

         category: this.props.match.params.category,
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
      console.log("request payload =", data);
      if (category === "person" && (firstName === "" || email === "")) {
         toastr.warning('Warning', 'First Name is required.', toastrWarningConfig);
         return;
      }
      if (category === "company" && companyName === "" && email === "") {
         toastr.warning('Warning', 'You need to enter a company name or email.', toastrWarningConfig);
         return;
      }
      axios.post("/contacts", data).then((res) => {
         toastr.success("Succeeed", "New Contact was created successfully.", toastrSuccessConfig);
         console.log("create contact api resopnse ==>", res);
      }).catch(err => {
         toastr.error("Error", "Break down during request.", toastrErrorConfig);
         console.error("create contact api error ==>", err);
      });
   }

   componentDidMount() {
      const { location, match } = this.props;
      if (match.params.category !== "person" && !match.params.category !== "company") {
         this.props.history.push('/app/c/contacts');
         return;
      };
      if (location.state && location.state.company) this.setState({ companyName: location.state.company });
      if (location.state && location.state.from) this.goTo = location.state.from;
   }

   render() {
      console.log("this.state =>", this.state)
      return (
         <React.Fragment>
            <NavCrump linkTo={this.goTo}>
               Previous
            </NavCrump>
            <div className="content">
               <div className="block block-rounded">
                  <div className="block-content">
                     <div className="maxWidth-800 p-4">
                        {/* Full Name */}
                        {
                           this.props.match.params.category === "person" &&
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
                                             <Link className="ml-auto" to="/app/c/contacts/create/company">Switch to Company</Link>
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
                           this.props.match.params.category === "company" &&
                           (
                              <div>
                                 <div className="form-group">
                                    <div className="d-flex">
                                       <label htmlFor="companyName">Company</label>
                                       <Link className="ml-auto" to="/app/c/contacts/create/person">Switch to person</Link>
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
                           this.state.phones && this.state.phones.map((item, index) => {
                              return (
                                 <div className="form-group" key={index}>
                                    <div className="d-flex mb-1">
                                       <div className="w-50">
                                          <select
                                             className="form-control"
                                             id="phone" name="phone"
                                             value={item.category}
                                             defaultValue={`primaryPhone`}
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
                                 <AddressForm
                                    key={index}
                                    index={index}
                                    item={item}
                                    handleAddressForm={(ev, index) => this.handleAddressForm(ev, index)}
                                    removeAddress={() => {
                                       this.setState({ addresses: this.state.addresses.filter((item, itemIndex) => itemIndex !== index) });
                                    }}
                                 />
                              );
                           })
                        }

                        {/* Add Address Button */}
                        <AddAddressBtn
                           handleClick={() => this.setState({ addresses: [...this.state.addresses, { category: "primaryAddress" }] })}
                        />

                        <div className="form-group py-3">
                           <button className="btn btn-lg btn-rounded btn-hero-primary mr-2" onClick={this.onHandleSubmit}>Create</button>
                           <Link className="btn btn-lg btn-rounded btn-hero-secondary" to={this.goTo}>Cancel</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment >
      );
   }
}