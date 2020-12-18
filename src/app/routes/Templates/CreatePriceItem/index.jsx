import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { createLogger } from 'redux-logger';
import { updatePriceItemStatus, updateQuoteItems } from '../../../../actions/Data';
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from '../../../../actions/GlobalSettings';
import NavCrump from '../../../../components/NavCrump';
import NavCrumpLeft from '../../../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../../../components/NavCrump/NavCrumpRight';
import PriceItemForm from '../../../../components/PriceItemForm';
import axios from '../../../../util/Api';
import RelatedTemplateList from '../components/RelatedTemplateList';
import ConfirmPItemMergeBanner from './ConfirmPItemMergeBanner';

class CreatePriceItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isDeleteAlertOpen: false,
      }
      this.linkTo = this.props.location.state ? this.props.location.state.from : "/app/content/item-price/browse";
      this.linkName = this.props.location.state && this.props.location.state.from.includes("/app/content/template/") ? "Edit Template" : "Items";
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
      if (productHeading === "" && itemCode === "") { toast.info("🌟 Title Or item code is missing."); return; }
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
      if (this.props.match.path === '/app/content/item-price/create-new'
         || this.props.match.path === '/app/content/item-price/duplicate/:id') {
         axios.post('/templates/priceitem', payload).then(() => {
            toast.success("Item created.");
            this.props.history.push(this.linkTo);
         }).catch(err => {
            console.error("error during create priceItem =>", err);
            toast.error("Item failed to create");
         });
      } else if (this.props.match.path === '/app/content/item-price/view/:id') {
         const priceItemId = this.props.match.params.id;
         axios.put(`/templates/priceitem/id/${priceItemId}`, payload).then(() => {
            toast.success("Item updated.");
            this.props.history.push(this.linkTo);
         }).catch(err => {
            console.error("error during update priceItem =>", err);
            toast.error("Item failed to update.");
         });
      }
   }
   updateItem = (ind, item) => {
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

      if (this.props.match.path === '/app/content/item-price/duplicate/:id') toast.success("This is a copy.");
      if (this.props.match.path === '/app/content/item-price/view/:id'
         || this.props.match.path === '/app/content/item-price/duplicate/:id') {
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
   onClickArchive = () => {
      const priceItemId = this.props.match.params.id;
      axios.put(`/templates/priceitem/archive/${priceItemId}`).then(() => {
         this.props.updatePriceItemStatus("archived");
         toast.success("Item archived.");
      }).catch((err) => {
         console.error("Failed to archive template ", err);
      });
   }
   onClickUnArchive = () => {
      const priceItemId = this.props.match.params.id;
      axios.put(`/templates/priceitem/un-archive/${priceItemId}`).then(() => {
         this.props.updatePriceItemStatus("current");
         toast.success("Item unarchived.");
      }).catch((err) => {
         console.error("Failed to un-archive template ", err);
      });
   }
   onClickCopy = () => {
      const priceItemId = this.props.match.params.id;
      this.props.history.push(`/app/content/item-price/duplicate/${priceItemId}`);
   }
   onClickDelete = () => {
      const priceItemId = this.props.match.params.id;
      axios.delete(`/templates/priceitem/id/${priceItemId}`).then(() => {
         this.props.history.push('/app/content/item-price/browse');
         toast.success("Item deleted.");
      }).catch((err) => {
         console.error("Failed to delete template ", err);
      });
   }
   onClickDeleteAndMerge = () => {
      const priceItemId = this.props.match.params.id;
      this.props.history.push({
         pathname: '/app/content/item-price/browse',
         search: `?merge_loser=${priceItemId}`
      })
   }
   render() {
      const { priceItem } = this.props.quote.items[0];
      return (
         <React.Fragment>
            <NavCrump>
               <NavCrumpLeft linkTo={this.linkTo}>
                  {this.linkName}
               </NavCrumpLeft>
               <NavCrumpRight>
                  <ul className="choices" style={{ left: 50, top: 10 }}>
                     {
                        priceItem.status === "current" &&
                        <li>
                           <button className="btn-in-action" onClick={this.onClickArchive}>
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-archive text-secondary" />
                              </div>
                              <div className="media-body font-size-sm font-w600 pr-2">
                                 <span>Archive</span>
                              </div>
                           </button>
                        </li>
                     }
                     {
                        priceItem.status === "archived" &&
                        <li>
                           <button className="btn-in-action" onClick={this.onClickUnArchive}>
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-archive text-secondary" />
                              </div>
                              <div className="media-body font-size-sm font-w600 pr-2">
                                 <span>Archived<span className="choices-undo"> ← undo</span></span>
                              </div>
                           </button>
                        </li>
                     }
                     <li>
                        <button className="btn-in-action" onClick={this.onClickCopy}>
                           <div className="icon-wrapper">
                              <i className="fa fa-fw fa-copy text-secondary" />
                           </div>
                           <div className="media-body font-size-sm font-w600 pr-2">
                              <span>Copy</span>
                           </div>
                        </button>
                     </li>
                     <li>
                        <button className="btn-in-action" onClick={() => this.setState({ isDeleteAlertOpen: true })}>
                           <div className="icon-wrapper">
                              <i className="fa fa-fw fa-trash-alt text-secondary" />
                           </div>
                           <div className="media-body font-size-sm font-w600 pr-2">
                              <span>Delete</span>
                           </div>
                        </button>
                     </li>
                     <li>
                        <button className="btn-in-action" onClick={this.onClickDeleteAndMerge}>
                           <div className="icon-wrapper">
                              <i className="fa fa-fw fa-compress-alt text-secondary" />
                           </div>
                           <div className="media-body font-size-sm font-w600 pr-2">
                              <span>Delete & merge</span>
                           </div>
                        </button>
                     </li>
                  </ul>
               </NavCrumpRight>
            </NavCrump>

            <div id="AlerterPage" style={{}}>
               {
                  this.state.isDeleteAlertOpen ?
                     <div className="alertBar alertBar-prompt">
                        <div className="container">
                           <p><strong>WARNING –</strong> This item will <strong>also be removed</strong> from within any <strong>content templates</strong>.</p>
                           <div className="btnSet">
                              <button className="btn btn-secondary mr-2" onClick={this.onClickDelete}>Delete forever</button>
                              <button className="btn" onClick={() => this.setState({ isDeleteAlertOpen: false })}>Cancel</button>
                           </div>
                        </div>
                     </div>
                     : null
               }
            </div>
            <ConfirmPItemMergeBanner />
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  {
                     priceItem.status === "archived" &&
                     <p><span className="label">Archived</span></p>
                  }
                  <PriceItemForm
                     index={0}
                     isPaperClipDisabled={false}
                     isSettingDisabled={false}
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}
                     priceItem={priceItem}
                  />
               </div>

               <RelatedTemplateList templates={priceItem.templates} />

               {/* Footer action button group */}
               <div className="row p-3">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.onClickSubmit}>
                     {this.props.match.path === '/app/content/item-price/create-new' && "Create"}
                     {this.props.match.path === '/app/content/item-price/view/:id' && `Save${priceItem.templates.length > 0 ? ` & Update ${priceItem.templates.length} template` + `${priceItem.templates.length > 1 ? "s" : ""}` : ""}`}
                     {this.props.match.path === '/app/content/item-price/duplicate/:id' && "Save"}
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
   updatePriceItemStatus,
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePriceItem)