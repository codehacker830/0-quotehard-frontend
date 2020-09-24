import { isNumber } from 'highcharts';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavCrump from '../../components/NavCrump';
import {
   personData,
   companyData
} from "../../constants/Dump";

export default class EditContact extends Component {
   state = {
      mode: "",

      type: "",

      firstName: "",
      lastName: "",
      emailAddress: "",
      companyName: "",

      addressSetArray: [],
      addressDataArray: [],
   }

   componentDidMount() {
      const { location, match } = this.props;
      console.error("typeof match.params.id ==", typeof match.params.id);
      const parseNumber = parseInt(match.params.id);
      console.error("match.params.id match.params.id ==", parseNumber);
      if (isNumber(parseNumber)) {
         // get the api result with `match.params.id`
         const res = companyData;
         this.setState({
            mode: "update",

            type: res.type,
            firstName: res.firstName,
            lastName: res.lastName,
            emailAddress: res.emailAddress,
            companyName: res.companyName,
            addressSetArray: res.addressSetArray,
            addressDataArray: res.addressDataArray
         });

      } else {
         this.setState({ mode: "create" });
         if (match.params.id === "new-person") this.setState({ type: "person" });
         else if (match.params.id === "new-company") this.setState({ type: "company" });

         if (location.state && location.state.company) {
            this.setState({ companyName: location.state.company });
         }
      }
   }

   handleAddressForm = (ev, index) => {
      console.log(" handleAddressForm index ===>", index);
      let newAddressDataArray = [...this.state.addressDataArray];
      if (ev.target.name === "type") newAddressDataArray[index].type = ev.target.value;
      else if (ev.target.name === "street") newAddressDataArray[index].street = ev.target.value;
      else if (ev.target.name === "city") newAddressDataArray[index].city = ev.target.value;
      else if (ev.target.name === "stateOrRegion") newAddressDataArray[index].stateOrRegion = ev.target.value;
      else if (ev.target.name === "postCode") newAddressDataArray[index].postCode = ev.target.value;
      else if (ev.target.name === "country") newAddressDataArray[index].country = ev.target.value;


      console.error(" newAddressDataArray ===>", newAddressDataArray);
      this.setState({ addressDataArray: newAddressDataArray });
   }

   onClickCreateContact = () => {
      // API request to create contact
      this.props.history.push("/app");
   }

   onClickUpdateContact = () => {
      // API request to update contact
      this.props.history.push("/app");
   }

   render() {
      console.log("Get contact props => ", this.props);
      const { location } = this.props;
      console.log(" location =", location);
      console.log(" this.state =", this.state);
      return (
         <React.Fragment>
            <NavCrump>
               {this.state.mode === "create" && <button className="btn btn-secondary mr-2" onClick={() => this.onClickCreateContact}>Create Contact</button>}
               {this.state.mode === "update" && <button className="btn btn-secondary mr-2" onClick={() => this.onClickUpdateContact}>Save</button>}
               <Link className="btn btn-alt-secondary" to="/app/c/contacts">Cancel</Link>
            </NavCrump>
            <div className="content">
               <div className="block block-rounded">
                  <div className="block-content">
                     <div className="maxWidth-800 p-4">
                        {/* Full Name */}
                        {
                           this.state.type === "person" &&
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
                                    <label htmlFor="emailAddress">Email Address<span className="text-danger fa-fx font-w600 ml-1">required</span></label>
                                    <input
                                       type="text"
                                       className="form-control"
                                       id="emailAddress" name="emailAddress"
                                       placeholder=""
                                       value={this.state.emailAddress}
                                       onChange={(ev) => this.setState({ emailAddress: ev.target.value })} />
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
                           this.state.type === "company" &&
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
                                    <label htmlFor="emailAddress">Email Address</label>
                                    <input
                                       type="text"
                                       className="form-control"
                                       id="emailAddress" name="emailAddress"
                                       placeholder=""
                                       value={this.state.emailAddress}
                                       onChange={(ev) => this.setState({ emailAddress: ev.target.value })} />
                                 </div>
                              </div>
                           )
                        }

                        {/* Address Set From */}
                        {
                           this.state.addressSetArray.map((item, index) => {
                              return (
                                 <div className="form-group" key={index}>
                                    <div className="d-flex mb-1">
                                       <div className="w-50">
                                          <select
                                             className="form-control"
                                             id="phone" name="phone"
                                             value={item.type}
                                             onChange={(ev) => {
                                                let newPhoneDataArray = [...this.state.addressSetArray];
                                                newPhoneDataArray[index].type = ev.target.value;
                                                this.setState({ addressSetArray: newPhoneDataArray });
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
                                          <button type="button" className="btn close" onClick={() => this.setState({ addressSetArray: this.state.addressSetArray.filter((item, itemIndex) => itemIndex !== index) })}>
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
                                          let newPhoneDataArray = [...this.state.addressSetArray];
                                          newPhoneDataArray[index].content = ev.target.value;
                                          this.setState({ addressSetArray: newPhoneDataArray });
                                       }}
                                    />
                                 </div>
                              );
                           })
                        }


                        {/* Add Phone Button */}
                        <div className="form-group">
                           <button
                              type="button"
                              className="btn btn-outline-dark"
                              onClick={() => this.setState({ addressSetArray: [...this.state.addressSetArray, { type: "primaryPhone" }] })}
                           >
                              <i className="fa fa-plus"></i> Add Phone</button>
                        </div>

                        {/* Address Form */}
                        {
                           this.state.addressDataArray.map((item, index) => {
                              return (
                                 <div className="form-group" key={index}>
                                    <div className="d-flex mb-1">
                                       <div className="w-50">
                                          <select
                                             className="form-control"
                                             id="addressType" name="type"
                                             value={item.type}
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
                                                this.setState({ addressDataArray: this.state.addressDataArray.filter((item, itemIndex) => itemIndex !== index) });
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
                        <div className="form-group">
                           <button
                              type="button"
                              className="btn btn-outline-dark"
                              onClick={() => this.setState({ addressDataArray: [...this.state.addressDataArray, { type: "primayAddress" }] })}>
                              <i className="fa fa-plus"></i> Add Address</button>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment >
      );
   }
}