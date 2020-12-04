import React, { Component } from "react";
import NavCrump from "../../../components/NavCrump";
import QuoteToPeopleList from "./components/QuoteToPeopleList";
import QuoteSettings from "./components/QuoteSettings";
import PriceItemForm from "../../../components/PriceItemForm";
import TextItemForm from "../../../components/TextItemForm";
import SubTotal from "../../../components/SubTotal";
import { toast } from 'react-toastify';
import {
   toastWarningConfig,
   toastSuccessConfig,
   toastErrorConfig,
   toastInfoConfig,
} from "../../../util/toastrConfig";
import CompleterContact from "./components/CompleterContact";
import LableFor from "./components/LableFor";
import axios from "../../../util/Api";
import {
   parseDate,
   parseTime,
   isValidDateTimeFormat,
   convertStrIntoDateObj,
   ToastErrorNotification,
} from "../../../util";
import {
   initQuoteSettings,
   initPriceItem,
   initTextItem,
   initSubTotal,
} from "../../../constants/InitState";
import AddItemBtn from "../../../components/AddItemBtn";
import QuoteTotal from "../../../components/QuoteTotal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes } from "../../../actions/Settings";
import NavCrumpLeft from "../../../components/NavCrump/NavCrumpLeft";

import { GET_QUOTE_FROM_TEMPLATE_PATH, GET_QUOTE_PATH, GET_QUOTE_BY_ID_PATH, QUOTE_PAGE_PATH } from "../../../constants/PathNames";
import NavCrumpRight from "../../../components/NavCrump/NavCrumpRight";
import { getQuoteDataById, getTemplateQuoteDataById, updateQuoteToPeopleList } from "../../../actions/Data";
import QuoteTitle from "./components/QuoteTitle";

class GetQuote extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         fileArray: [],
         emailTo: "",



         // toPeopleList: [],
         // title: "",
         // settings: { ...initQuoteSettings, userFrom: this.props.authUser._id },
         // items: [
         //    {
         //       category: "priceItem",
         //       priceItem: { ...initPriceItem },
         //    },
         // ],
         // notes: [
         //    {
         //       category: "textItem",
         //       textItem: { ...initTextItem }
         //    }
         // ],
      };
   }
   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter((item) => item !== url);
      this.setState({ fileArray: newFileArray });
   };
   uploadFiles = (e) => {
      e.preventDefault();
      console.log(this.state.fileArray);
   };
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
      if (this.props.match.path === GET_QUOTE_PATH || this.props.match.path === GET_QUOTE_FROM_TEMPLATE_PATH) {
         this.setState({ loading: true, type: "SAVE_NEXT" });
         axios.post('/quotes', data)
            .then(({ data }) => {
               console.log("res data =>", data);
               toast.success("New Quote was defined.", toastSuccessConfig);
               this.setState({ loading: false, type: null });
               this.props.history.push(`/q/${data.entoken}`);
            })
            .catch(err => {
               console.error(" error ===>", err);
               toast.error("Quote failed to create", toastErrorConfig);
               this.setState({ loading: false, type: null });
            });
      } else if (this.props.match.path = GET_QUOTE_BY_ID_PATH) {
         const quoteId = this.props.match.params.id;
         this.setState({ loading: true, type: "SAVE_NEXT" });
         axios.put(`/quotes/${quoteId}`, data)
            .then(({ data }) => {
               console.log("uuuuuuuuuuuuuuuuu =>", data);
               toast.success("Quote was defined.", toastSuccessConfig);
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
      if (this.props.location.pathname === GET_QUOTE_PATH || this.props.match.path === GET_QUOTE_FROM_TEMPLATE_PATH) {
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
      } else if (this.props.match.path = GET_QUOTE_BY_ID_PATH) {
         const quoteId = this.props.match.params.id;
         this.setState({ loading: true, type: "SAVE" });
         axios.put(`/quotes/${quoteId}`, data)
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

   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }
   uploadFiles = (e) => {
      e.preventDefault()
      console.log(this.state.fileArray)
   }

   // updateItem = (ind, item) => {
   //    // console.log("adfasdf ", ind, item);
   //    const { items } = this.props.quote;
   //    let newItems = [...items];
   //    newItems[ind] = item;
   //    console.log("adfasdf ", ind, newItems);
   //    this.setState({ items: newItems });
   // }

   // addItem = (ind, category) => {
   //    const { items } = this.props.quote;
   //    let newItems = [...items];
   //    if (category === "priceItem") newItems.splice(ind + 1, 0, {
   //       category: category,
   //       priceItem: initPriceItem,
   //    });
   //    else if (category === "textItem") newItems.splice(ind + 1, 0, {
   //       category: category,
   //       textItem: initTextItem,
   //    });
   //    else newItems.splice(ind + 1, 0, {
   //       category: category,
   //       subTotal: null
   //    });
   //    this.setState({ items: newItems });
   // }
   
   orderUpItem = (ind) => {
      const { items } = this.props.quote;
      let newItems = [...items];
      const [dIt,] = newItems.splice(ind, 1);
      newItems.splice(Math.max(ind - 1, 0), 0, dIt);
      this.setState({ items: newItems });
   }
   orderDownItem = (ind) => {
      const { items } = this.props.quote;
      let newItems = [...items];
      const [dIt,] = newItems.splice(ind, 1);
      newItems.splice(Math.min(ind + 1, items.length), 0, dIt);
      this.setState({ items: newItems });
   }
   removeItem = (ind) => {
      const { items } = this.props.quote;
      let newItems = [...items];
      if (newItems.length > 2) {
         newItems.splice(ind, 1);
         this.setState({ items: newItems });
      } else if (newItems.length === 2) {
         newItems.splice(ind, 1);
         if (newItems[0].category === "subTotal") this.setState({
            items: [
               {
                  category: "priceItem",
                  priceItem: initPriceItem,
               },
            ]
         });
         else this.setState({ items: newItems });
      } else this.setState({
         items: [
            {
               category: "priceItem",
               priceItem: initPriceItem,
            },
         ]
      });
   }
   updateNote = (ind, note) => {
      const { notes } = this.props.quote;
      let newNotes = [...notes];
      newNotes[ind] = note;
      this.setState({ notes: newNotes });
   }
   addNote = (ind, category) => {
      const { notes } = this.props.quote;
      let newNotes = [...notes];
      newNotes.splice(ind + 1, 0, {
         category: "textItem",
         textItem: initTextItem,
      });
      this.setState({ notes: newNotes });
   }
   orderUpNote = (ind) => {
      const { notes } = this.props.quote;
      let newNotes = [...notes];
      const [dIt,] = newNotes.splice(ind, 1);
      newNotes.splice(Math.max(ind - 1, 0), 0, dIt);
      this.setState({ notes: newNotes });
   }
   orderDownNote = (ind) => {
      const { notes } = this.props.quote;
      let newNotes = [...notes];
      const [dIt,] = newNotes.splice(ind, 1);
      newNotes.splice(Math.min(ind + 1, notes.length), 0, dIt);
      this.setState({ notes: newNotes });
   }
   removeNote = (ind) => {
      const { notes } = this.props.quote;
      let newNotes = [...notes];
      if (newNotes.length > 1) {
         newNotes.splice(ind, 1);
         this.setState({ notes: newNotes });
      }
      else this.setState({ notes: [initTextItem] })
   }

   async componentDidMount() {
      await this.props.getDefaultSalesCategory();
      await this.props.getDefaultSalesTax();
      await this.props.getSalesCategories('current');
      await this.props.getSalesTaxes('current');

      if (this.props.match.path === GET_QUOTE_BY_ID_PATH) {
         // Get quote details with quote ID
         await this.props.getQuoteDataById(this.props.match.params.id);
      } else if (this.props.match.path === GET_QUOTE_FROM_TEMPLATE_PATH) {
         // get template detials with id
         await this.props.getTemplateQuoteDataById(this.props.match.params.id);
      }
   }
   componentDidUpdate(prevProps, prevState) {
      if (this.props.defaultSalesTax !== prevProps.defaultSalesTax || this.props.defaultSalesCategory !== prevProps.defaultSalesCategory) {
         // if (this.props.match.path === GET_QUOTE_PATH)
         //    Upate all tax and item category in items

         //    this.setState({
         //       items: [{
         //          category: "priceItem",
         //          priceItem: { ...initPriceItem, tax: this.props.defaultSalesTax, itemCategory: this.props.defaultSalesCategory },
         //       }]
         //    });
      }
   }
   render() {
      console.log(" ^^^^^^^ GET QUOTE state ^^^^^^^^^^ ", this.state);
      console.log(" ^^^^^^^ GET QUOTE props ^^^^^^^^^^ ", this.props);
      const { location } = this.props;
      const {
         toPeopleList,
         title,
         settings,
         items,
         notes
      } = this.props.quote;
      const linkTo = location.state && location.state.from ? location.state.from : "/app";
      let linkName = "Dashboard";
      if (location.state && location.state.from === QUOTE_PAGE_PATH) linkName = "Quotes";
      return (
         <React.Fragment>
            <NavCrump>
               <NavCrumpLeft linkTo={linkTo}>
                  {linkName}
               </NavCrumpLeft>
               {
                  this.props.match.path === GET_QUOTE_BY_ID_PATH &&
                  <NavCrumpRight>
                     <ul className="choices" style={{ left: 25, top: 10 }}>
                        <li>
                           <button className="btn-in-action">
                              <div className="mx-3">
                                 <i className="fa fa-fw fa-arrow-alt-circle-right text-secondary" />
                              </div>
                              <div className="media-body font-size-sm font-w600 pr-2">
                                 <span>Mark as Sent(don't email)</span>
                              </div>
                           </button>
                        </li>
                        <li className="choices-break" />
                        <li>
                           <button className="btn-in-action">
                              <div className="mx-3">
                                 <i className="fa fa-fw fa-copy text-secondary" />
                              </div>
                              <div className="media-body font-size-sm font-w600 pr-2">
                                 <span>Copy</span>
                              </div>
                           </button>
                        </li>
                        <li>
                           <button className="btn-in-action">
                              <div className="mx-3">
                                 <i className="fa fa-fw fa-plus-circle text-secondary" />
                              </div>
                              <div className="media-body font-size-sm font-w600 pr-2">
                                 <span>Copy to Template</span>
                              </div>
                           </button>
                        </li>
                        <li>
                           <button className="btn-in-action">
                              <div className="mx-3">
                                 <i className="fa fa-fw fa-trash-alt text-secondary" />
                              </div>
                              <div className="media-body font-size-sm font-w600 pr-2">
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
                     <div className="col-sm-6">
                        <div className="d-flex">
                           <div className="p-1 font-w700">To</div>
                           <div className="p-1 w-100 maxWidth-550">
                              <div className="row no-gutters">
                                 <QuoteToPeopleList
                                    toPeopleList={toPeopleList}
                                    removeContact={(ind) => {
                                       const newCL = toPeopleList.filter((it, index) => index !== ind);
                                       this.props.updateQuoteToPeopleList(newCL);
                                    }}
                                 />
                              </div>
                              <div
                                 className="row no-gutters"
                                 style={{ position: "relative" }}
                              >
                                 <input
                                    type="text"
                                    id="emailTo"
                                    className="form-control rounded-0"
                                    autoComplete="off"
                                    value={this.state.emailTo}
                                    onChange={(ev) => this.setState({ emailTo: ev.target.value })}
                                 />
                                 <CompleterContact
                                    emailTo={this.state.emailTo}
                                    addContact={(contact) => {
                                       if (toPeopleList.find((it) => it._id === contact._id)) this.setState({ emailTo: "" });
                                       else {
                                          this.props.updateQuoteToPeopleList([
                                             ...toPeopleList,
                                             contact
                                          ]);
                                          this.setState({ emailTo: "" });
                                       }
                                    }}
                                 />
                                 <LableFor />
                              </div>
                           </div>
                        </div>
                     </div>
                     <QuoteSettings />
                  </div>

                  {/* Template Title */}
                  <QuoteTitle />

                  {/* Items */}
                  {
                     items.map((item, index) => {
                        if (item.category === "priceItem") return <PriceItemForm
                           key={index}
                           index={index}
                           isPaperClipDisabled={false}
                           isSettingDisabled={false}
                           isAddItemDisabled={false}
                           isOrderUpDisabled={false}
                           isOrderDownDisabled={false}
                           isRemoveDisabled={false}
                           {...item}
                           // updateItem={this.updateItem}
                           // addItem={this.addItem}
                           // orderUpItem={this.orderUpItem}
                           // orderDownItem={this.orderDownItem}
                           // removeItem={this.removeItem}
                        />
                        else if (item.category === "textItem") return <TextItemForm
                           key={index}
                           index={index}
                           isNote={false}
                           isPaperClipDisabled={false}
                           isSettingDisabled={false}
                           isAddItemDisabled={false}
                           isOrderUpDisabled={false}
                           isOrderDownDisabled={false}
                           isRemoveDisabled={false}
                           {...item}
                           updateItem={this.updateItem}
                           addItem={this.addItem}
                           orderUpItem={this.orderUpItem}
                           orderDownItem={this.orderDownItem}
                           removeItem={this.removeItem}
                        />
                        else return <SubTotal
                           key={index}
                           index={index}
                           removeItem={this.removeItem}
                        />
                     })
                  }

                  <AddItemBtn onClickAdd={() => {
                     const newItem = {
                        category: "priceItem",
                        priceItem: initPriceItem
                     }
                     this.setState({ items: [...items, newItem] })
                  }} />

                  <div className="quote-edit-total-wrap">
                     <QuoteTotal settings={settings} items={items} />
                  </div>

                  {
                     notes.map((item, index) => {
                        return <TextItemForm
                           key={index}
                           index={index}
                           isNote={true}
                           isPaperClipDisabled={false}
                           // isSettingDisabled={true}
                           isAddItemDisabled={false}
                           isOrderUpDisabled={false}
                           isOrderDownDisabled={false}
                           isRemoveDisabled={false}
                           {...item}
                           updateItem={this.updateNote}
                           addItem={this.addNote}
                           orderUpItem={this.orderUpNote}
                           orderDownItem={this.orderDownNote}
                           removeItem={this.removeNote}
                        />
                     })
                  }

                  <AddItemBtn onClickAdd={() => this.setState({ notes: [...notes, { category: "textItem", textItem: initTextItem }] })} />

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
                        onClick={() => this.props.history.push(QUOTE_PAGE_PATH)}
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
const mapStateToProps = ({ auth, settings, mainData }) => {
   const { authUser } = auth;
   const { quote } = mainData;
   const { defaultSalesTax, defaultSalesCategory } = settings;
   return { authUser, quote, defaultSalesTax, defaultSalesCategory }
}

const mapDispatchToProps = { getDefaultSalesCategory, getDefaultSalesTax, getSalesCategories, getSalesTaxes, getQuoteDataById, getTemplateQuoteDataById, updateQuoteToPeopleList };
export default connect(mapStateToProps, mapDispatchToProps)(GetQuote);