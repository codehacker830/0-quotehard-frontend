import React, { Component } from 'react';
import NavCrump from '../../components/NavCrump';

export default class GetContact extends Component {
   state = {
      phoneDataArray: [],
      addressDataArray: []
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump>
               <button className="btn btn-secondary mr-2" onClick={() => this.props.history.push("/app")}>Create Contact</button>
               <button className="btn btn-alt-secondary" onClick={() => this.props.history.push("/app")}>Cancel</button>
            </NavCrump>
            <div className="content">
               <div className="block block-rounded">
                  <div className="block-content">
                     {/* Full Name */}
                     <div className="maxWidth-800 px-4 py-5">
                        <div className="form-group">
                           <div className="row">
                              <div className="col-md-6 col-sm-12">
                                 <label htmlFor="firstName">First Name</label>
                                 <input type="text" className="form-control" id="firstName" name="firstName" placeholder="" />
                              </div>
                              <div className="col-md-6 col-sm-12">
                                 <label htmlFor="lastName">Last Name</label>
                                 <input type="text" className="form-control" id="lastName" name="lastName" placeholder="" />
                              </div>
                           </div>
                        </div>
                        {/* Email Address */}
                        <div className="form-group">
                           <label htmlFor="emailAddress">Email Address<span className="text-danger fa-fx font-w600 ml-1">required</span></label>
                           <input type="text" className="form-control" id="emailAddress" name="emailAddress" placeholder="" />
                        </div>
                        {/* Company Name */}
                        <div className="form-group mb-4">
                           <label htmlFor="companyName">Company Name</label>
                           <input type="text" className="form-control" id="companyName" name="companyName" placeholder="New, or lookup existing..." />
                        </div>

                        {/* Phone From */}
                        {
                           this.state.phoneDataArray.map((item, index) => {
                              return (
                                 <div className="form-group">
                                    <div className="d-flex mb-1">
                                       <div className="w-50">
                                          <select class="form-control" id="phone" name="phone">
                                             <optgroup label="Phone">
                                                <option value="PrimaryPhone">Primary Phone</option>
                                                <option value="WorkPhone">Work Phone</option>
                                                <option value="Mobile">Mobile</option>
                                                <option value="HomePhone">Home Phone</option>
                                             </optgroup>
                                             <optgroup label="Website &amp; Social">
                                                <option value="Website">Website</option>
                                                <option value="Skype">Skype</option>
                                                <option value="Twitter">Twitter</option>
                                             </optgroup>
                                             <optgroup label="Desperate methods">
                                                <option value="Fax">Fax</option>
                                             </optgroup>
                                          </select>
                                       </div>
                                       <div className="w-50">
                                          <button type="button" class="btn close" onClick={() => this.setState({ phoneDataArray: this.state.phoneDataArray.filter((item, itemIndex) => itemIndex !== index) })}>
                                             <span>×</span>
                                          </button>
                                       </div>
                                    </div>
                                    <input type="text" className="form-control" id="phone" name="phone" placeholder="New, or lookup existing..." />
                                 </div>
                              );
                           })
                        }


                        {/* Add Phone Button */}
                        <div className="form-group">
                           <button type="button" className="btn btn-outline-dark" onClick={() => this.setState({ phoneDataArray: [...this.state.phoneDataArray, {}] })}>
                              <i className="fa fa-plus"></i> Add Phone</button>
                        </div>

                        {/* Address Form */}
                        {
                           this.state.addressDataArray.map((item, index) => {
                              return (
                                 <div className="form-group">
                                    <div className="d-flex mb-1">
                                       <div className="w-50">
                                          <select class="form-control" id="address" name="address">
                                             <option value="PrimaryAddress">Primary Address</option>
                                             <option value="PostalAddress">Postal Address</option>
                                             <option value="PhysicalAddresses">Physical Addresses</option>
                                          </select>
                                       </div>
                                       <div className="w-50">
                                          <button type="button" class="btn close" onClick={() => this.setState({ addressDataArray: this.state.addressDataArray.filter((item, itemIndex) => itemIndex !== index) })}>
                                             <span>×</span>
                                          </button>
                                       </div>
                                    </div>
                                    <input type="text" className="form-control mb-1" id="street" name="street" placeholder="Street" />
                                    <input type="text" className="form-control mb-1" id="city" name="city" placeholder="City" />
                                    <div className="d-flex mb-1">
                                       <input type="text" className="form-control mr-1" id="state-region" name="state-region" placeholder="State / Region" />
                                       <input type="text" className="form-control" id="zip-post-code" name="zip-post-code" placeholder="Zip / Post Code" />
                                    </div>
                                    <input type="text" className="form-control mb-1" id="country" name="country" placeholder="Country" />
                                 </div>
                              );
                           })
                        }

                        {/* Add Address Button */}
                        <div className="form-group">
                           <button type="button" className="btn btn-outline-dark" onClick={() => this.setState({ addressDataArray: [...this.state.addressDataArray, {}] })}>
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