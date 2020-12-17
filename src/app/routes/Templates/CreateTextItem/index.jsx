import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateQuoteNotes, updateTextItemStatus } from '../../../../actions/Data';
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from '../../../../actions/GlobalSettings';
import NavCrump from '../../../../components/NavCrump';
import NavCrumpLeft from '../../../../components/NavCrump/NavCrumpLeft';
import NavCrumpRight from '../../../../components/NavCrump/NavCrumpRight';
import TextItemForm from '../../../../components/TextItemForm';
import axios from '../../../../util/Api';
import { toastErrorConfig, toastInfoConfig, toastSuccessConfig } from '../../../../util/toastrConfig';
import RelatedTemplateList from '../components/RelatedTemplateList';
import ConfirmTItemMergeBanner from './ConfirmTItemMergeBanner';

class CreateTextItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isDeleteAlertOpen: false
      };
      this.linkTo = this.props.location.state ? this.props.location.state.from : "/app/content/item-text/browse";
      this.linkName = this.props.location.state && this.props.location.state.from.includes("/app/content/template/") ? "Edit Template" : "Items";
   }
   onClickSubmit = () => {
      const { textHeading, longDescription, files } = this.props.quote.notes[0].textItem;
      if (textHeading === "") { toast.info("🌟 An Item Title OR Item Code is required."); return; }
      const payload = { textHeading, longDescription, files };
      if (this.props.match.path === '/app/content/item-text/create-new'
         || this.props.match.path === '/app/content/item-text/duplicate/:id') {
         axios.post('/templates/textitem', payload).then(() => {
            toast.success("Item created.");
            this.props.history.push(this.linkTo);
         }).catch(err => {
            console.error("error during create textitem =>", err);
            toast.error("Item failed to create.");
         });
      } else if (this.props.match.path === '/app/content/item-text/view/:id') {
         const textItemId = this.props.match.params.id;
         axios.put(`/templates/textitem/id/${textItemId}`, payload).then(() => {
            toast.success("Item saved.");
            this.props.history.push(this.linkTo);
         }).catch(err => {
            console.error("error during create textitem =>", err);
            toast.error("Item failed to save.");
         });
      }
   }
   updateItem = (ind, item) => {
      // console.log("adfasdf ", ind, item);
      const { notes } = this.props.quote;
      let newNotes = [...notes];
      newNotes[ind] = item;
      this.props.updateQuoteNotes(newNotes);
   }
   async componentDidMount() {
      await this.props.getDefaultSalesCategory();
      await this.props.getDefaultSalesTax();
      await this.props.getSalesCategories('current');
      await this.props.getSalesTaxes('current');

      if (this.props.match.path === '/app/content/item-text/duplicate/:id') toast.success("This is a copy.");
      if (this.props.match.path === '/app/content/item-text/view/:id'
         || this.props.match.path === '/app/content/item-text/duplicate/:id') {
         // Get textItem details with textItem ID
         axios.get(`/templates/textitem/id/${this.props.match.params.id}`).then(({ data }) => {
            const { textItem } = data;
            const newItem = {
               category: "textItem",
               textItem
            };
            this.updateItem(0, newItem);
         }).catch(err => {
            console.error("get textItem detail api error =>", err);
         });
      }
   }
   onClickArchive = () => {
      const textItemId = this.props.match.params.id;
      axios.put(`/templates/textitem/archive/${textItemId}`).then(() => {
         this.props.updateTextItemStatus("archived");
         toast.success("Item archived.");
      }).catch((err) => {
         console.error("Failed to archive template ", err);
      });
   }
   onClickUnArchive = () => {
      const textItemId = this.props.match.params.id;
      axios.put(`/templates/textitem/un-archive/${textItemId}`).then(() => {
         this.props.updateTextItemStatus("current");
         toast.success("Item unarchived.");
      }).catch((err) => {
         console.error("Failed to un-archive template ", err);
      });
   }
   onClickCopy = () => {
      const textItemId = this.props.match.params.id;
      this.props.history.push(`/app/content/item-text/duplicate/${textItemId}`);
   }
   onClickDelete = () => {
      const textItemId = this.props.match.params.id;
      axios.delete(`/templates/textitem/id/${textItemId}`).then(() => {
         this.props.history.push('/app/content/item-text/browse');
         toast.success("Item deleted.");
      }).catch((err) => {
         console.error("Failed to delete template ", err);
      });
   }
   onClickDeleteAndMerge = () => {
      const textItemId = this.props.match.params.id;
      this.props.history.push({
         pathname: '/app/content/item-text/browse',
         search: `?merge_loser=${textItemId}`
      })
   }
   render() {
      const { textItem } = this.props.quote.notes[0];
      return (
         <React.Fragment>
            <NavCrump>
               <NavCrumpLeft linkTo={this.linkTo}>
                  {this.linkName}
               </NavCrumpLeft>
               <NavCrumpRight>
                  <ul className="choices" style={{ left: 50, top: 10 }}>
                     {
                        textItem.status === "current" &&
                        <li>
                           <button className="btn-in-action" onClick={this.onClickArchive}>
                              <div className="mx-3">
                                 <i className="fa fa-fw fa-archive text-secondary" />
                              </div>
                              <div className="media-body font-size-sm font-w600 pr-2">
                                 <span>Archive</span>
                              </div>
                           </button>
                        </li>
                     }
                     {
                        textItem.status === "archived" &&
                        <li>
                           <button className="btn-in-action" onClick={this.onClickUnArchive}>
                              <div className="mx-3">
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
                           <div className="mx-3">
                              <i className="fa fa-fw fa-copy text-secondary" />
                           </div>
                           <div className="media-body font-size-sm font-w600 pr-2">
                              <span>Copy</span>
                           </div>
                        </button>
                     </li>
                     <li>
                        <button className="btn-in-action" onClick={() => this.setState({ isDeleteAlertOpen: true })}>
                           <div className="mx-3">
                              <i className="fa fa-fw fa-trash-alt text-secondary" />
                           </div>
                           <div className="media-body font-size-sm font-w600 pr-2">
                              <span>Delete</span>
                           </div>
                        </button>
                     </li>
                     <li>
                        <button className="btn-in-action" onClick={this.onClickDeleteAndMerge}>
                           <div className="mx-3">
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

            <ConfirmTItemMergeBanner />

            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  {textItem.status === "archived" && <p><span className="label">Archived</span></p>}
                  <TextItemForm
                     index={0}
                     isNote={true}
                     isPaperClipDisabled={false}
                     isSettingDisabled={true}
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}
                     textItem={textItem}
                  />
               </div>
               <RelatedTemplateList templates={textItem.templates} />

               {/* Footer action button group */}
               <div className="row p-3">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.onClickSubmit}>
                     {this.props.match.path === '/app/content/item-text/create-new' && "Create"}
                     {this.props.match.path === '/app/content/item-text/view/:id' && `Save${textItem.templates.length > 0 ? ` & Update ${textItem.templates.length} template` + `${textItem.templates.length > 1 ? "s" : ""}` : ""}`}
                     {this.props.match.path === '/app/content/item-text/duplicate/:id' && "Save"}
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
};
const mapDispatchToProps = {
   updateQuoteNotes,
   getDefaultSalesCategory,
   getDefaultSalesTax,
   getSalesCategories,
   getSalesTaxes,
   updateTextItemStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTextItem)