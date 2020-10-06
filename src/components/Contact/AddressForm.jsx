import React, { Component } from 'react';

export default class AddressForm extends Component {

   render() {
      const { item, index } = this.props;
      return (
         <div className="form-group">
            <div className="d-flex mb-1">
               <div className="w-50">
                  <select
                     className="form-control"
                     id="addressCategory" name="category"
                     value={item.category}
                     defaultValue={`primaryAddress`}
                     onChange={(ev) => this.props.handleAddressForm(ev, index)}
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
                     onClick={this.props.removeAddress}>
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
               onChange={(ev) => this.props.handleAddressForm(ev, index)} />
            <input
               type="text"
               className="form-control mb-1"
               id="city" name="city"
               placeholder="City"
               value={item.city}
               onChange={(ev) => this.props.handleAddressForm(ev, index)} />
            <div className="d-flex mb-1">
               <input
                  type="text"
                  className="form-control mr-1"
                  id="state-region" name="stateOrRegion"
                  placeholder="State / Region"
                  value={item.stateOrRegion}
                  onChange={(ev) => this.props.handleAddressForm(ev, index)} />
               <input
                  type="text"
                  className="form-control"
                  id="zip-post-code" name="postCode"
                  placeholder="Zip / Post Code"
                  value={item.postCode}
                  onChange={(ev) => this.props.handleAddressForm(ev, index)} />
            </div>
            <input
               type="text"
               className="form-control mb-1"
               id="country" name="country"
               placeholder="Country"
               value={item.country}
               onChange={(ev) => this.props.handleAddressForm(ev, index)} />
         </div>
      );
   }
}