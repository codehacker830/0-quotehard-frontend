import React, { Component } from "react";
import NavCrump from "../../../components/NavCrump";
import { toast } from 'react-toastify';
import axios from "../../../util/Api";
import { formatDateTime } from "../../../util";
import AddNoteBtn from "../../../components/AddNoteBtn";
import QuoteTotal from "../../../components/QuoteTotal";
import { connect } from "react-redux";
import NavCrumpLeft from "../../../components/NavCrump/NavCrumpLeft";
import {
   QUOTE_GET_FROM_TEMPLATE_PATH,
   QUOTE_GET_PATH,
   QUOTE_BY_ID_PATH,
   QUOTE_GET_DUPLICATE_PATH,
   QUOTES_PATH,
   ERROR_404_PATH
} from "../../../constants/PathNames";
import NavCrumpRight from "../../../components/NavCrump/NavCrumpRight";
import {
   getDefaultSalesCategory,
   getDefaultSalesTax,
   getSalesCategories,
   getSalesTaxes,
   getQuoteDataById,
   getContentTemplateById,
   updateQuote,
   updateQuoteToPeopleList,
   updateQuoteSettings,
   markAsSentQuote,
   getQuoteDefaultSetting,
   getAppearanceSetting,
   setQuote
} from "../../../actions";
import QuoteSettings from "../../../components/QuoteSettings";
import TitleSection from "./components/TitleSection";
import AddPriceItemBtn from "../../../components/AddPriceItemBtn";
import QuoteToPeopleList from "./components/QuoteToPeopleList";
import NotesSection from "./components/NotesSection";
import ItemsSection from "./components/ItemsSection";
import _ from 'lodash';
import qs from 'qs';
import clsx from "clsx";
import QuoteActivities, { quoteActivityContent } from "../../../containers/PublicRoute/components/QuoteActivities";

class GetQuote extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         emailTo: "",
         isDeleteAlertOpen: false
      };
   }
   onClickMarkAsSent = () => {
      const { toPeopleList, title } = this.props.quote;
      if (title === "") {
         toast.info("Missing a Quote Title.");
         this.setState({ isValidWarning: true });
         return;
      }
      if (toPeopleList.length === 0) { toast.info("You must add at least one contact."); return; }
      const quoteId = this.props.match.params.id;
      this.props.markAsSentQuote(quoteId, this.props.history);
   }
   onClickCopy = () => {
      const quoteId = this.props.match.params.id;
      this.props.history.push(`/app/quote/get/duplicate/${quoteId}`)
   }
   onClickCopyToTemplate = () => {
      const quoteId = this.props.match.params.id;
      this.props.history.push(`/app/content/template/get/copy-to-template/${quoteId}`)
   }
   onClickDelete = () => {
      const quoteId = this.props.match.params.id;
      axios.delete(`/quotes/id/${quoteId}`).then(() => {
         toast.success("Quote - deleted.");
         this.props.history.push('/app');
      }).catch((err) => {
         this.setState({ isDeleteAlertOpen: false });
         console.error(" Quote failed to deleted. ", err);
      });
   }
   async componentDidMount() {
      await this.props.getDefaultSalesCategory();
      await this.props.getDefaultSalesTax();
      await this.props.getSalesCategories('current');
      await this.props.getSalesTaxes('current');
      await this.props.getQuoteDefaultSetting();
      await this.props.getAppearanceSetting();

      console.log(" ppppppppppppp ", this.props.match)
      console.log(" llllllllllllll ", this.props.location)
      if (
         this.props.match.path === QUOTE_BY_ID_PATH
         || this.props.match.path === QUOTE_GET_DUPLICATE_PATH
      ) {
         // Get quote details with quote ID
         const quoteId = this.props.match.params.id;
         await this.props.getQuoteDataById(quoteId);
      } else if (this.props.match.path === QUOTE_GET_FROM_TEMPLATE_PATH) {
         // Get template detials with id
         const templateId = this.props.match.params.id;
         await this.props.getContentTemplateById(templateId);
      } else if (this.props.match.path === QUOTE_GET_PATH) {
         const queryObj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
         console.log(" queryObj  ===> ", queryObj)
         if (queryObj.example) {
            const res = await axios.get(`/templates/example/${queryObj.example}`);
            const { templateExample } = res.data;
            console.log(" templateExample  == ", templateExample)
            if (templateExample) this.props.setQuote(templateExample);
            else this.props.history.push(ERROR_404_PATH);
         }
      }

      const {
         expirationQuoteAfter,
         nextQuoteNumber,
         currency,
         taxMode,
         pricingDisplayLevel,
         displayItemCode,
         showCostPriceMarginAlways,
         defaultMargin
      } = this.props.quoteDefaultSetting;

      // update quoteSetting with defaultSetting
      if (this.props.match.path === QUOTE_GET_PATH) {
         console.log(" TTTTTTTTTTTTTTTTTTTTT 11 ", expirationQuoteAfter)
         const defaultSetting = {
            validUntil: new Date(Date.now() + 1000 * 3600 * 24 * parseInt(expirationQuoteAfter)),
            currency,
            taxMode,
            pricingDisplayLevel,
            displayItemCode
         };
         this.props.updateQuoteSettings({ ...this.props.quote.settings, ...defaultSetting });
      } else if (
         this.props.match.path === QUOTE_GET_DUPLICATE_PATH
         || this.props.match.path === QUOTE_GET_FROM_TEMPLATE_PATH
      ) {
         console.log(" TTTTTTTTTTTTTTTTTTTTT 22", expirationQuoteAfter);
         this.props.updateQuoteSettings({
            ...this.props.quote.settings,
            validUntil: new Date(Date.now() + 1000 * 3600 * 24 * parseInt(expirationQuoteAfter))
         });
      }

   }

   onClickSaveNext = () => {
      const { toPeopleList } = this.props.quote;
      if (toPeopleList.length === 0) { toast.info("You must add at least one contact."); return; }
      if (
         this.props.match.path === QUOTE_GET_PATH
         || this.props.match.path === QUOTE_GET_FROM_TEMPLATE_PATH
         || this.props.match.path === QUOTE_GET_DUPLICATE_PATH
      ) {
         const { toPeopleList, title, settings, items, notes } = this.props.quote;
         if (title === "") {
            toast.info("Missing a Quote Title.");
            this.setState({ isValidWarning: true });
            return;
         }
         const toPeopleIdList = [];
         for (let i = 0; i < toPeopleList.length; i++) {
            toPeopleIdList.push(toPeopleList[i]._id);
         }
         console.log(" __ Save  toPeopleList __ ", toPeopleList)
         console.log(" __ Save  toPeopleIdList __ ", toPeopleIdList)
         const payload = {
            status: "draft",
            toPeopleList: toPeopleIdList,
            title,
            settings,
            items,
            notes
         };

         this.setState({ loading: true, type: "SAVE_NEXT" });
         axios.post('/quotes', payload)
            .then(({ data }) => {
               toast.success("Quote saved.");
               this.setState({ loading: false, type: null });
               this.props.history.push(`/q/${data.entoken}`);
            })
            .catch(err => {
               toast.error("Quote failed to save.");
               this.setState({ loading: false, type: null });
            });

      } else if (this.props.match.path = QUOTE_BY_ID_PATH) {
         const quoteId = this.props.match.params.id;
         const { toPeopleList, title, settings, items, notes } = this.props.quote;
         const toPeopleIdList = [];
         for (let i = 0; i < toPeopleList.length; i++) {
            toPeopleIdList.push(toPeopleList[i]._id);
         }
         console.log(" __ SaveNext  toPeopleList __ ", toPeopleList)
         console.log(" __ SaveNext  toPeopleIdList __ ", toPeopleIdList)
         const payload = {
            toPeopleList: toPeopleIdList,
            title,
            settings,
            items,
            notes
         };
         this.setState({ loading: true, type: "SAVE_NEXT" });
         axios.put(`/quotes/id/${quoteId}`, payload)
            .then(({ data }) => {
               toast.success("Quote saved.");
               this.setState({ loading: false, type: null });
               this.props.history.push(`/q/${data.entoken}`);
            })
            .catch(err => {
               this.setState({ loading: false, type: null });
               toast.error("Quote failed to save.");
            });
      }
   };
   onClickSave = () => {
      if (this.props.location.pathname === QUOTE_GET_PATH
         || this.props.match.path === QUOTE_GET_FROM_TEMPLATE_PATH
         || this.props.match.path === QUOTE_GET_DUPLICATE_PATH
      ) {
         // Create Quote
         const { toPeopleList, title, settings, items, notes } = this.props.quote;
         if (title === "") {
            toast.info("Missing a Quote Title.");
            this.setState({ isValidWarning: true });
            return;
         }
         const toPeopleIdList = [];
         for (let i = 0; i < toPeopleList.length; i++) {
            toPeopleIdList.push(toPeopleList[i]._id);
         }
         const payload = {
            status: "draft",
            toPeopleList: toPeopleIdList,
            title,
            settings,
            items,
            notes
         };
         console.log("Quote get payload ===> ", payload)
         this.setState({ loading: true, type: "SAVE" });
         axios.post('/quotes', payload)
            .then(({ data }) => {
               console.log("!!!!!!!!!!!!! =>", data);
               toast.success("Quote saved.");
               this.setState({ loading: false, type: null });
               this.props.history.push(`/app/quote/${data.quote._id}`);
            })
            .catch(err => {
               console.error(" error ===>", err);
               this.setState({ loading: false, type: null });
               toast.error("Quote failed to create");
            });
      } else if (this.props.match.path = QUOTE_BY_ID_PATH) {
         // Update Quote
         const quoteId = this.props.match.params.id;
         if (!quoteId) { toast.error("Not found quote id."); return; }

         const { toPeopleList, title, settings, items, notes } = this.props.quote;
         const toPeopleIdList = [];
         for (let i = 0; i < toPeopleList.length; i++) {
            toPeopleIdList.push(toPeopleList[i]._id);
         }
         const payload = {
            toPeopleList: toPeopleIdList,
            title,
            settings,
            items,
            notes
         };
         this.setState({ loading: true, type: "SAVE" });
         axios.put(`/quotes/id/${quoteId}`, payload)
            .then(({ data }) => {
               this.setState({ loading: false, type: null });
               toast.success("Quote saved.");
               this.props.updateQuote(data.quote);
            })
            .catch(err => {
               console.error(" error ===>", err);
               this.setState({ loading: false, type: null });
               toast.error("Quote failed to update");
            });
      }
   };

   onClickShowActivity = () => {
      this.setState({ loading: true });
      // get all acitivities from backend
      // setTimeout(() => {
      //    this.setState({ showActivity: true, loading: false })
      // }, 1000);
      axios.get(`/quotes/activities/${this.props.quote._id}`).then(({ data }) => {
         console.log(" 000000000 ", data)
         this.setState({
            showActivity: true,
            loading: false,
            activities: data.activities
         });
      }).catch(err => {
         console.error("err during get contact activities");
         this.setState({ showActivity: false, loading: false });
      });
   }
   render() {
      console.log(" ^^^^^^^ GET QUOTE state ^^^^^^^^^^ ", this.state);
      console.log(" ^^^^^^^ GET QUOTE props ^^^^^^^^^^ ", this.props);
      const { location, quote } = this.props;
      const linkTo = location.state && location.state.from ? location.state.from : "/app";
      let linkName = "Dashboard";
      if (location.state && location.state.from === QUOTES_PATH) linkName = "Quotes";

      const hideDelete = (quote.status === "editing");
      return (
         <React.Fragment>
            <NavCrump>
               <NavCrumpLeft linkTo={linkTo}>
                  {linkName}
               </NavCrumpLeft>
               <NavCrumpRight>
                  <ul className="choices" style={{ left: 25, top: 10 }}>
                     <li>
                        <button className="btn-in-action" onClick={this.onClickMarkAsSent}>
                           <div className="icon-wrapper">
                              <i className="fa fa-fw fa-arrow-alt-circle-right text-secondary" />
                           </div>
                           <div className="media-body font-size-sm pr-2">
                              <span>Mark as Sent (don't email)</span>
                           </div>
                        </button>
                     </li>
                     <li className="choices-break" />
                     <li>
                        <button className="btn-in-action" onClick={this.onClickCopy}>
                           <div className="icon-wrapper">
                              <i className="fa fa-fw fa-copy text-secondary" />
                           </div>
                           <div className="media-body font-size-sm pr-2">
                              <span>Copy</span>
                           </div>
                        </button>
                     </li>
                     <li>
                        <button className="btn-in-action" onClick={this.onClickCopyToTemplate}>
                           <div className="icon-wrapper">
                              <i className="fa fa-fw fa-plus-circle text-secondary" />
                           </div>
                           <div className="media-body font-size-sm pr-2">
                              <span>Copy to Template</span>
                           </div>
                        </button>
                     </li>
                     <li className={clsx(hideDelete && "d-none")}>
                        <button className="btn-in-action" onClick={() => this.setState({ isDeleteAlertOpen: true })}>
                           <div className="icon-wrapper">
                              <i className="fa fa-fw fa-trash-alt text-secondary" />
                           </div>
                           <div className="media-body font-size-sm pr-2">
                              <span>Delete</span>
                           </div>
                        </button>
                     </li>
                  </ul>

               </NavCrumpRight>
            </NavCrump>
            <div id="AlerterPage">
               {
                  this.state.isDeleteAlertOpen ?
                     <div className="alertBar alertBar-prompt">
                        <div className="container">
                           <h4>Please confirm:</h4>
                           <div className="btnSet">
                              <button className="btn btn-secondary mr-2" onClick={this.onClickDelete}>Delete</button>
                              <button className="btn" onClick={() => this.setState({ isDeleteAlertOpen: false })}>Cancel</button>
                           </div>
                        </div>
                     </div>
                     : null
               }
            </div>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  <div className="row">
                     {/* Email list */}
                     <QuoteToPeopleList />
                     <QuoteSettings />
                  </div>

                  {/* Template Title */}
                  <TitleSection isValidWarning={this.state.isValidWarning} updateValidWarning={() => this.setState({ isValidWarning: false })} />

                  {/* Items */}
                  <ItemsSection />
                  <AddPriceItemBtn />

                  <QuoteTotal />

                  {/* Notes */}
                  <NotesSection />
                  <AddNoteBtn />

                  {/* Footer action button group */}
                  <div className="row p-3">
                     <button
                        className="btn btn-lg btn-rounded btn-hero-primary mr-1"
                        disabled={this.state.loading && this.state.type === "SAVE_NEXT"}
                        onClick={this.onClickSaveNext}
                     >
                        {
                           this.state.loading && this.state.type === "SAVE_NEXT" ?
                              <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />
                              : null
                        }
                        Save, Next...
                     </button>
                     <button
                        className="btn btn-lg btn-rounded btn-hero-secondary mr-1"
                        disabled={this.state.loading && this.state.type === "SAVE"}
                        onClick={this.onClickSave}
                     >
                        {
                           this.state.loading && this.state.type === "SAVE" ?
                              <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />
                              : null
                        }
                        Save
                     </button>
                     <button
                        className="btn btn-lg btn-rounded btn-hero-secondary"
                        onClick={() => this.props.history.push(QUOTES_PATH)}
                     >
                        Cancel
                     </button>
                  </div>

                  {/* Activities */}
                  <div className={clsx("row p-3", this.props.match.path === QUOTE_GET_PATH && "d-none")}>
                     <div className={clsx("w-100 font-size-sm mb-1", this.state.showActivity ? "isHidden" : "")}>
                        <i className="far fa-xs fa-clock mr-1" />Recent Activity
                     </div>
                     <div className={clsx("w-100 mb-1", this.state.showActivity ? "isHidden" : "")}>
                        {
                           this.props.quote.latestActivity &&
                           <span className="w-100 text-gray font-size-sm mb-1">{quoteActivityContent(this.props.quote.latestActivity)}  –  {formatDateTime(this.props.quote.latestActivity.at)}</span>
                        }
                        <button className="btn btn-rounded btn-outline-info fa-xs px-2 py-0 ml-2" onClick={this.onClickShowActivity}>All Activity</button>
                     </div>
                     <div className={clsx("w-100 mt-2", this.state.showActivity ? "" : "isHidden")}>
                        {
                           this.state.loading &&
                           <div className="spinner-border spinner-border-sm text-gray-light" role="status">
                              <span className="sr-only">Loading...</span>
                           </div>
                        }
                        {this.state.showActivity && <QuoteActivities onHistoryClose={() => this.setState({ showActivity: false })} activities={this.state.activities} />}
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

const mapStateToProps = ({ auth, salesSetting, quoteDefaultSetting, mainData }) => {
   const { authUser } = auth;
   const { quote } = mainData;
   const { defaultSalesTax, defaultSalesCategory } = salesSetting;
   return { authUser, quote, quoteDefaultSetting, defaultSalesTax, defaultSalesCategory }
}
const mapDispatchToProps = {
   getAppearanceSetting,
   updateQuote,
   getDefaultSalesCategory,
   getDefaultSalesTax,
   getSalesCategories,
   getSalesTaxes,
   getQuoteDataById,
   setQuote,
   getContentTemplateById,
   updateQuoteToPeopleList,
   getQuoteDefaultSetting,
   updateQuoteSettings,
   markAsSentQuote
};
export default connect(mapStateToProps, mapDispatchToProps)(GetQuote);