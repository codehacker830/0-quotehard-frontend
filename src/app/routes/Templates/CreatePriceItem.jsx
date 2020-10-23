import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import NavCrump from '../../../components/NavCrump';
import PriceItemForm from '../../../components/PriceItemForm';
import { initPriceItem } from '../../../constants/InitState';
import axios from '../../../util/Api';
import { toastrErrorConfig, toastrInfoConfig, toastrSuccessConfig } from '../../../util/toastrConfig';

export default class CreatePriceItem extends Component {
   constructor(orops) {
      super();
      this.state = {
         fileArray: [],
         priceItem: initPriceItem
      }
   }
   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }
   uploadFiles = (e) => {
      e.preventDefault()
      console.log(this.state.fileArray)
   }
   updateItem = (ind, item) => {
      this.setState({ priceItem: item.priceItem });
   }
   onClickSubmit = () => {
      const {
         isOptional,
         isOptionSelected,
         isMultipleChoice,
         isChoiceSelected,
         isEditableQuantity,
         isDiscount,
         discount,
         isSubscription,
         per,
         every,
         period,
         isCostPriceMargin,
         costPrice,
         margin,
         itemCode,

         productHeading,
         longDescription,
         files,
         itemCategory,

         tax,
         unitPrice,
         quantity,
         itemTotal,
      } = this.state.priceItem;
      if (productHeading === "" && itemCode === "") { toastr.info("Required", "Title Or item code is missing.", toastrInfoConfig); return; }
      const payload = {
         isOptional,
         isOptionSelected,
         isMultipleChoice,
         isChoiceSelected,
         isEditableQuantity,
         isDiscount,
         discount,
         isSubscription,
         per,
         every,
         period,
         isCostPriceMargin,
         costPrice,
         margin,
         itemCode,

         productHeading,
         longDescription,
         files,
         itemCategory,

         tax,
         unitPrice,
         quantity,
         itemTotal,
      };
      if (this.props.location.pathname === '/app/content/item-price/create-new') {
         axios.post('/templates/create-priceitem', payload).then(({ data }) => {
            console.log(" create priceItem res =>", data);
            toastr.success(
               "Success",
               "New PriceItem template was created.",
               toastrSuccessConfig
            );
            this.props.history.push("/app/content/item-price/browse");
         }).catch(err => {
            console.error("error during create priceItem =>", err);
            toastr.error("Error", "PriceItem failed to create", toastrErrorConfig);
         });
      } else if (this.props.match.path === '/app/content/item-price/view/:id') {
         const priceItemId = this.props.match.params.id;
         axios.post(`/templates/update-priceitem-by-id/${priceItemId}`, payload).then(({ data }) => {
            console.log(" update priceItem res =>", data);
            toastr.success(
               "Success",
               "PriceItem template was updated.",
               toastrSuccessConfig
            );
            this.props.history.push("/app/content/item-price/browse");
         }).catch(err => {
            console.error("error during update priceItem =>", err);
            toastr.error("Error", "PriceItem failed to update", toastrErrorConfig);
         });
      }
   }
   componentDidMount() {
      if (this.props.location.pathname !== '/app/content/item-price/create-new' && this.props.match.params) {
         // Get priceItem details with priceItem ID
         axios.get(`/templates/priceitem-by-id/${this.props.match.params.id}`).then(({ data }) => {
            console.log(" res ^^^^^^^^^^^^^^^^^^^^^^^^^^^ =>", data);
            const { priceItem } = data;
            this.setState({
               priceItem: priceItem
            });
         }).catch(err => {
            console.error("get priceItem detail api error =>", err);
            toastr.error("Error", "PirceItem was not found", toastrErrorConfig);
         });
      }
   }
   render() {
      const from = this.props.location.state ? this.props.location.state.from : "/app/content/item-price/browse";
      const LinkTo = this.props.location.state && this.props.location.state.from.includes("/app/content/template/") ? "Origin Template" : "Items";
      return (
         <React.Fragment>
            <NavCrump linkTo={from}>
               {LinkTo}
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  <PriceItemForm
                     priceItem={this.state.priceItem}
                     index={0}
                     isPaperClipDisabled={false}
                     isSettingDisabled={false}
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}
                     updateItem={this.updateItem}
                  />
               </div>

               {/* Footer action button group */}
               <div className="row p-3">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.onClickSubmit}>
                     {this.props.location.pathname === '/app/content/item-price/create-new' && "Create"}
                     {this.props.match.path === '/app/content/item-price/view/:id' && "Update"}
                  </button>
                  <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={() => this.props.history.push("/app/content/item-text/browse")}>Cancel</button>
               </div>
            </div>
         </React.Fragment>
      );
   }
}