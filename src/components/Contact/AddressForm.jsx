import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CONTACT_ADDRESSES } from '../../constants/ActionTypes';

export default function AddressForm(props) {
   const { item, index } = props;
   const dispatch = useDispatch();
   const addresses = useSelector(state => state.contactData.addresses)
   const handleAddressForm = (ev, index) => {
      console.log(" handleAddressForm index ===>", index);
      let newAddresses = [...addresses];
      if (ev.target.name === "category") newAddresses[index].category = ev.target.value;
      else if (ev.target.name === "street") newAddresses[index].street = ev.target.value;
      else if (ev.target.name === "city") newAddresses[index].city = ev.target.value;
      else if (ev.target.name === "stateOrRegion") newAddresses[index].stateOrRegion = ev.target.value;
      else if (ev.target.name === "postCode") newAddresses[index].postCode = ev.target.value;
      else if (ev.target.name === "country") newAddresses[index].country = ev.target.value;
      dispatch({ type: UPDATE_CONTACT_ADDRESSES, payload: newAddresses });
   }
   const removeAddress = () => {
      const filteredData = addresses.filter((item, itemIndex) => itemIndex !== index);
      dispatch({ type: UPDATE_CONTACT_ADDRESSES, payload: filteredData });
   }
   return (
      <div className="form-group">
         <div className="d-flex mb-1">
            <div className="w-50">
               <select
                  className="form-control rounded-0"
                  id="addressCategory" name="category"
                  value={item.category}
                  defaultValue={`primaryAddress`}
                  onChange={(ev) => handleAddressForm(ev, index)}
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
                  onClick={removeAddress}>
                  <span>×</span>
               </button>
            </div>
         </div>
         <input
            type="text"
            className="form-control rounded-0 mb-1"
            id="street" name="street"
            placeholder="Street"
            value={item.street}
            onChange={(ev) => handleAddressForm(ev, index)} />
         <input
            type="text"
            className="form-control rounded-0 mb-1"
            id="city" name="city"
            placeholder="City"
            value={item.city}
            onChange={(ev) => handleAddressForm(ev, index)} />
         <div className="d-flex mb-1">
            <input
               type="text"
               className="form-control rounded-0 mr-1"
               id="state-region" name="stateOrRegion"
               placeholder="State / Region"
               value={item.stateOrRegion}
               onChange={(ev) => handleAddressForm(ev, index)} />
            <input
               type="text"
               className="form-control rounded-0"
               id="zip-post-code" name="postCode"
               placeholder="Zip / Post Code"
               value={item.postCode}
               onChange={(ev) => handleAddressForm(ev, index)} />
         </div>
         <input
            type="text"
            className="form-control rounded-0 mb-1"
            id="country" name="country"
            placeholder="Country"
            value={item.country}
            onChange={(ev) => handleAddressForm(ev, index)} />
      </div>
   )
}
