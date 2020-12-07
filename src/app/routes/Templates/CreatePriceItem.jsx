import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { updateQuoteItems } from '../../../actions/Data';
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from '../../../actions/GlobalSettings';
import NavCrump from '../../../components/NavCrump';
import PriceItemForm from '../../../components/PriceItemForm';
import { initPriceItem } from '../../../constants/InitState';
import axios from '../../../util/Api';
import { toastErrorConfig, toastInfoConfig, toastSuccessConfig } from '../../../util/toastrConfig';

class CreatePriceItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fileArray: [],
         priceItem: initPriceItem
      }
      this.linkTo = this.props.location.state ? this.props.location.state.from : "/app/content/item-price/browse";
      this.linkName = this.props.location.state && this.props.location.state.from.includes("/app/content/template/") ? "Edit Template" : "Items";
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
      const { priceItem } = this.props.quote.items[0];
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
         salesCategory,
         salesTax,

         unitPrice,
         quantity,
         itemTotal,
      } = priceItem;
      if (productHeading === "" && itemCode === "") { toast.info("Title Or item code is missing."); return; }
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
         salesCategory,
         salesTax,

         unitPrice,
         quantity,
         itemTotal,
      };
      if (this.props.location.pathname === '/app/content/item-price/create-new') {
         axios.post('/templates/priceitem/create', payload).then(({ data }) => {
            console.log(" create priceItem res =>", data);
            toast.success("New PriceItem template was created.");
            this.props.history.push(this.linkTo);
         }).catch(err => {
            console.error("error during create priceItem =>", err);
            toast.error("PriceItem failed to create");
         });
      } else if (this.props.match.path === '/app/content/item-price/view/:id') {
         const priceItemId = this.props.match.params.id;
         axios.put(`/templates/priceitem/update/${priceItemId}`, payload).then(({ data }) => {
            console.log(" update priceItem res =>", data);
            toast.success("Item updated.");
            this.props.history.push(this.linkTo);
         }).catch(err => {
            console.error("error during update priceItem =>", err);
            toast.error("PriceItem failed to update");
         });
      }
   }
   updateItem = (ind, item) => {
      // console.log("adfasdf ", ind, item);
      const { items } = this.props.quote;
      let newItems = [...items];
      newItems[ind] = item;
      this.props.updateQuoteItems(newItems);
   }
   async componentDidMount() {
      await this.props.getDefaultSalesCategory();
      await this.props.getDefaultSalesTax();
      await this.props.getSalesCategories('current');
      await this.props.getSalesTaxes('current');
      if (this.props.location.pathname === '/app/content/item-price/view/:id') {
         // Get priceItem details with priceItem ID
         axios.get(`/templates/priceitem/id/${this.props.match.params.id}`).then(({ data }) => {
            const { priceItem } = data;
            const newPriceItem = {
               category: "priceItem",
               priceItem,
            };
            this.updateItem(0, newPriceItem);
         }).catch(err => {
            console.error("get priceItem detail api error =>", err);
         });
      }
   }
   render() {
      const { priceItem } = this.props.quote.items[0];
      return (
         <React.Fragment>
            <NavCrump linkTo={this.linkTo}>
               {this.linkName}
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  <PriceItemForm
                     priceItem={priceItem}
                     index={0}
                     isPaperClipDisabled={false}
                     isSettingDisabled={false}
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}
                  />
               </div>

               {/* Footer action button group */}
               <div className="row p-3">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.onClickSubmit}>
                     {this.props.location.pathname === '/app/content/item-price/create-new' && "Create"}
                     {this.props.match.path === '/app/content/item-price/view/:id' && "Save & Update"}
                  </button>
                  <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={() => this.props.history.push("/app/content/item-text/browse")}>Cancel</button>
               </div>
            </div>
         </React.Fragment>
      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
}

const mapDispatchToProps = {
   updateQuoteItems,
   getDefaultSalesCategory,
   getDefaultSalesTax,
   getSalesCategories,
   getSalesTaxes,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePriceItem)