import React, { Component } from "react";
import NavCrump from "../../../components/NavCrump";
import { toast } from 'react-toastify';
import {
   toastWarningConfig,
   toastSuccessConfig,
   toastErrorConfig,
   toastInfoConfig,
} from "../../../util/toastrConfig";
import axios from "../../../util/Api";
import {
   parseDate,
   parseTime,
   isValidDateTimeFormat,
   convertStrIntoDateObj,
   ToastErrorNotification,
} from "../../../util";
import AddNoteBtn from "../../../components/AddNoteBtn";
import QuoteTotal from "../../../components/QuoteTotal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from "../../../actions/GlobalSettings";
import NavCrumpLeft from "../../../components/NavCrump/NavCrumpLeft";
import { QUOTE_GET_FROM_TEMPLATE_PATH, QUOTE_GET_PATH, QUOTE_BY_ID_PATH, QUOTES_PATH } from "../../../constants/PathNames";
import NavCrumpRight from "../../../components/NavCrump/NavCrumpRight";
import { getQuoteDataById, getContentTemplateById, updateQuote, updateQuoteToPeopleList } from "../../../actions/Data";
import QuoteSettings from "../../../components/QuoteSettings";
import QuoteTitle from "./components/QuoteTitle";
import AddPriceItemBtn from "../../../components/AddPriceItemBtn";
import QuoteToPeopleList from "./components/QuoteToPeopleList";
import NotesSection from "./components/NotesSection";
import ItemsSection from "./components/ItemsSection";

class GetQuote extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         emailTo: ""
      };
   }

   handleClickSaveNext = () => {
      const { toPeopleList, title, settings, items, notes } = this.props.quote;
      if (toPeopleList.length === 0) { toast.info("You must add at least one contact.", toastInfoConfig); return; }
      if (title === "") { toast.info("You are missing a Quote Title.", toastInfoConfig); return; }
      const toPeopleIdList = [];
      for (let i = 0; i < toPeopleList.length; i++) {
         toPeopleIdList.push(toPeopleList[i]._id);
      }
      console.log("people id listtttttttttttttttt ", toPeopleIdList);
      const data = {
         status: "draft",
         toPeopleList: toPeopleIdList,
         title,
         settings: { ...settings, userFrom: settings.userFrom ? settings.userFrom : this.props.authUser._id },
         items,
         notes
      };
      console.log(" Quote save data ===> ", data);
      if (this.props.match.path === QUOTE_GET_PATH || this.props.match.path === QUOTE_GET_FROM_TEMPLATE_PATH) {
         this.setState({ loading: true, type: "SAVE_NEXT" });
         axios.post('/quotes', data)
            .then(({ data }) => {
               console.log("res data =>", data);
               toast.success("New quote defined.", toastSuccessConfig);
               this.setState({ loading: false, type: null });
               this.props.history.push(`/q/${data.entoken}`);
            })
            .catch(err => {
               console.error(" error ===>", err);
               toast.error("Quote failed to create", toastErrorConfig);
               this.setState({ loading: false, type: null });
            });
      } else if (this.props.match.path = QUOTE_BY_ID_PATH) {
         const quoteId = this.props.match.params.id;
         this.setState({ loading: true, type: "SAVE_NEXT" });
         axios.put(`/quotes/id/${quoteId}`, data)
            .then(({ data }) => {
               console.log("uuuuuuuuuuuuuuuuu =>", data);
               toast.success("Quote defined.", toastSuccessConfig);
               this.setState({ loading: false, type: null });
               this.props.history.push(`/q/${data.entoken}`);
            })
            .catch(err => {
               const { errors } = err.response.data;
               ToastErrorNotification(errors);
            });
      } else {
         console.error("Error !!!!!!!!!!!!!!");
         // toast.warn("Failed before request.", toastWarningConfig);
      }
   };
   handleClickSave = () => {
      const { toPeopleList, title, settings, items, notes } = this.props.quote;
      if (title === "") { toast.info("Missing a Quote Title.", toastInfoConfig); return; }
      const toPeopleIdList = [];
      for (let i = 0; i < toPeopleList.length; i++) {
         toPeopleIdList.push(toPeopleList[i]._id);
      }
      console.log("people id listtttttttttttttttt ", toPeopleIdList);
      const data = {
         status: "draft",
         toPeopleList: toPeopleIdList,
         title,
         settings,
         items,
         notes
      };
      if (this.props.location.pathname === QUOTE_GET_PATH || this.props.match.path === QUOTE_GET_FROM_TEMPLATE_PATH) {
         this.setState({ loading: true, type: "SAVE" });
         axios.post('/quotes', data)
            .then(({ data }) => {
               console.log("res data =>", data);
               toast.success("New Quote draft was created.", toastSuccessConfig);
               this.setState({ loading: false, type: null });
               this.props.history.push(`/app/quote/${data.quote._id}`)
            })
            .catch(err => {
               console.error(" error ===>", err);
               this.setState({ loading: false, type: null });
               toast.error("Quote failed to create", toastErrorConfig);
            });
      } else if (this.props.match.path = QUOTE_BY_ID_PATH) {
         const quoteId = this.props.match.params.id;
         this.setState({ loading: true, type: "SAVE" });
         axios.put(`/quotes/id/${quoteId}`, data)
            .then(({ data }) => {
               console.log("uuuuuuuuuuuuuuuuu =>", data);
               this.setState({ loading: false, type: null });
               toast.success("Quote draft was updated.", toastSuccessConfig);
            })
            .catch(err => {
               console.error(" error ===>", err);
               this.setState({ loading: false, type: null });
               toast.error("Quote failed to update", toastErrorConfig);
            });
      }
      else {
         toast.warn("Failed before request.", toastWarningConfig);
      }

   };
   async componentDidMount() {
      await this.props.getDefaultSalesCategory();
      await this.props.getDefaultSalesTax();
      await this.props.getSalesCategories('current');
      await this.props.getSalesTaxes('current');

      
      if (this.props.match.path === QUOTE_GET_PATH) {

      }
      if (this.props.match.path === QUOTE_BY_ID_PATH) {
         // Get quote details with quote ID
         await this.props.getQuoteDataById(this.props.match.params.id);
      }
      if (this.props.match.path === QUOTE_GET_FROM_TEMPLATE_PATH) {
         // Get template detials with id
         await this.props.getContentTemplateById(this.props.match.params.id);
      }
   }
   render() {
      console.log(" ^^^^^^^ GET QUOTE state ^^^^^^^^^^ ", this.state);
      console.log(" ^^^^^^^ GET QUOTE props ^^^^^^^^^^ ", this.props);
      const { location } = this.props;
      const {
         items,
         notes
      } = this.props.quote;
      const linkTo = location.state && location.state.from ? location.state.from : "/app";
      let linkName = "Dashboard";
      if (location.state && location.state.from === QUOTES_PATH) linkName = "Quotes";

      return (
         <React.Fragment>
            <NavCrump>
               <NavCrumpLeft linkTo={linkTo}>
                  {linkName}
               </NavCrumpLeft>
               {
                  this.props.match.path === QUOTE_BY_ID_PATH &&
                  <NavCrumpRight>
                     <ul className="choices" style={{ left: 25, top: 10 }}>
                        <li>
                           <button className="btn-in-action">
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-arrow-alt-circle-right text-secondary" />
                              </div>
                              <div className="media-body font-size-sm pr-2">
                                 <span>Mark as Sent(don't email)</span>
                              </div>
                           </button>
                        </li>
                        <li className="choices-break" />
                        <li>
                           <button className="btn-in-action">
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-copy text-secondary" />
                              </div>
                              <div className="media-body font-size-sm pr-2">
                                 <span>Copy</span>
                              </div>
                           </button>
                        </li>
                        <li>
                           <button className="btn-in-action">
                              <div className="icon-wrapper">
                                 <i className="fa fa-fw fa-plus-circle text-secondary" />
                              </div>
                              <div className="media-body font-size-sm pr-2">
                                 <span>Copy to Template</span>
                              </div>
                           </button>
                        </li>
                        <li>
                           <button className="btn-in-action">
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
               }
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  <div className="row">
                     {/* Email list */}
                     <QuoteToPeopleList />
                     <QuoteSettings />
                  </div>

                  {/* Template Title */}
                  <QuoteTitle />

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
                        disabled={this.state.loading}
                        onClick={this.handleClickSaveNext}
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
                        disabled={this.state.loading}
                        onClick={this.handleClickSave}
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
               </div>
            </div>
         </React.Fragment>
      );
   }
}
const mapStateToProps = ({ auth, globalSettings, mainData }) => {
   const { authUser } = auth;
   const { quote } = mainData;
   const { defaultSalesTax, defaultSalesCategory } = globalSettings;
   return { authUser, quote, defaultSalesTax, defaultSalesCategory }
}
const mapDispatchToProps = { updateQuote, getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes, getQuoteDataById, getContentTemplateById, updateQuoteToPeopleList };
export default connect(mapStateToProps, mapDispatchToProps)(GetQuote);