import React, { Component } from "react";
import NavCrump from "../../../components/NavCrump";
import QuoteToPeopleList from "./components/QuoteToPeopleList";
import QuoteSettings from "../../../components/QuoteSettings";
import PriceItemForm from "../../../components/PriceItemForm";
import TextItemForm from "../../../components/TextItemForm";
import SubTotal from "../../../components/SubTotal";
import { toastr } from "react-redux-toastr";
import {
   toastrWarningConfig,
   toastrSuccessConfig,
   toastrErrorConfig,
   toastrInfoConfig,
} from "../../../util/toastrConfig";
import CompleterContact from "./components/CompleterContact";
import LableFor from "./components/LableFor";
import axios from "../../../util/Api";
import {
   parseDate,
   parseTime,
   isValidDateTimeFormat,
   convertStrIntoDateObj,
} from "../../../util";
import {
   initQuoteSettings,
   initPriceItem,
   initTextItem,
   initSubTotal,
} from "../../../constants/InitState";
import AddItemBtn from "../../../components/AddItemBtn";
import QuoteItemTotal from "../../../components/QuoteItemTotal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class GetQuote extends Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
         fileArray: [],
         emailTo: "",

         validDate: parseDate(initQuoteSettings.validUntil),
         validTime: parseTime(initQuoteSettings.validUntil),
         sentDate: parseDate(initQuoteSettings.sentAt),
         sentTime: parseTime(initQuoteSettings.sentAt),

         toPeopleList: [],
         title: "",
         settings: initQuoteSettings,
         items: [
            {
               category: "priceItem",
               priceItem: initPriceItem,
            },
         ],
         notes: [
            {
               category: "textItem",
               textItem: initTextItem
            }
         ],
      };
      this.actionsContainer = React.createRef();
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
      const { toPeopleList, title, settings, items, notes } = this.state;
      if (toPeopleList.length === 0) { toastr.info("Required", "You must add at least one contact.", toastrInfoConfig); return; }
      if (title === "") { toastr.info("Required", "You are missing a Quote Title.", toastrInfoConfig); return; }
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
      if (this.props.match.path === '/app/quote/get' || this.props.match.path === '/app/quote/get/from-template/:id') {
         axios.post('/quotes', data)
            .then(({ data }) => {
               console.log("res data =>", data);
               toastr.success(
                  "Success",
                  "New Quote was defined.",
                  toastrSuccessConfig
               );
               this.props.history.push(`/q/${data.entoken}`);
            })
            .catch(err => {
               console.error(" error ===>", err);
               toastr.error("Error", "Quote failed to create", toastrErrorConfig);
            });
      } else if (this.props.match.path = "/app/quote/:id") {
         const quoteId = this.props.match.params.id;
         axios.put(`/quotes/${quoteId}`, data)
            .then(({ data }) => {
               console.log("uuuuuuuuuuuuuuuuu =>", data);
               toastr.success(
                  "Success",
                  "Quote was defined.",
                  toastrSuccessConfig
               );
               this.props.history.push(`/q/${data.entoken}`);
            })
            .catch(err => {
               console.error(" error ===>", err);
               toastr.error("Error", "Quote failed to update", toastrErrorConfig);
            });
      } else {
         console.error("Error !!!!!!!!!!!!!!");
         // toastr.warning(
         //    "Warning",
         //    "Failed before request.",
         //    toastrWarningConfig
         // );
      }
   };
   handleClickSave = () => {
      const { toPeopleList, title, settings, items, notes } = this.state;
      if (title === "") { toastr.info("Required", "You are missing a Quote Title.", toastrInfoConfig); return; }
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
      if (this.props.location.pathname === '/app/quote/get' || this.props.match.path === "/app/quote/get/from-template/:id") {
         if (toPeopleIdList.length === 0) { toastr.info("Required", "You must add at least one contact.", toastrInfoConfig); return; }
         axios.post('/quotes', data)
            .then(({ data }) => {
               console.log("res data =>", data);
               toastr.success(
                  "Success",
                  "New Quote draft was created.",
                  toastrSuccessConfig
               );
            })
            .catch(err => {
               console.error(" error ===>", err);
               toastr.error("Error", "Quote failed to create", toastrErrorConfig);
            });
      } else if (this.props.match.path = "/app/quote/:id") {
         const quoteId = this.props.match.params.id;
         axios.put(`/quotes/${quoteId}`, data)
            .then(({ data }) => {
               console.log("uuuuuuuuuuuuuuuuu =>", data);
               toastr.success(
                  "Success",
                  "Quote draft was updated.",
                  toastrSuccessConfig
               );
            })
            .catch(err => {
               console.error(" error ===>", err);
               toastr.error("Error", "Quote failed to update", toastrErrorConfig);
            });
      }
      else {
         toastr.warning(
            "Warning",
            "Something went wrong before request.",
            toastrWarningConfig
         );
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

   updateItem = (ind, item) => {
      // console.log("adfasdf ", ind, item);
      let newItems = [...this.state.items];
      newItems[ind] = item;
      console.log("adfasdf ", ind, newItems);
      this.setState({ items: newItems });
   }
   addItem = (ind, category) => {
      let newItems = [...this.state.items];
      if (category === "priceItem") newItems.splice(ind + 1, 0, {
         category: category,
         priceItem: initPriceItem,
      });
      else if (category === "textItem") newItems.splice(ind + 1, 0, {
         category: category,
         textItem: initTextItem,
      });
      else newItems.splice(ind + 1, 0, {
         category: category,
         subTotal: null
      });
      this.setState({ items: newItems });
   }
   orderUpItem = (ind) => {
      let newItems = [...this.state.items];
      const [dIt,] = newItems.splice(ind, 1);
      newItems.splice(Math.max(ind - 1, 0), 0, dIt);
      this.setState({ items: newItems });
   }
   orderDownItem = (ind) => {
      let newItems = [...this.state.items];
      const [dIt,] = newItems.splice(ind, 1);
      newItems.splice(Math.min(ind + 1, this.state.items.length), 0, dIt);
      this.setState({ items: newItems });
   }
   removeItem = (ind) => {
      let newItems = [...this.state.items];
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
      let newNotes = [...this.state.notes];
      newNotes[ind] = note;
      this.setState({ notes: newNotes });
   }
   addNote = (ind, category) => {
      let newNotes = [...this.state.notes];
      newNotes.splice(ind + 1, 0, {
         category: "textItem",
         textItem: initTextItem,
      });
      this.setState({ notes: newNotes });
   }
   orderUpNote = (ind) => {
      let newNotes = [...this.state.notes];
      const [dIt,] = newNotes.splice(ind, 1);
      newNotes.splice(Math.max(ind - 1, 0), 0, dIt);
      this.setState({ notes: newNotes });
   }
   orderDownNote = (ind) => {
      let newNotes = [...this.state.notes];
      const [dIt,] = newNotes.splice(ind, 1);
      newNotes.splice(Math.min(ind + 1, this.state.notes.length), 0, dIt);
      this.setState({ notes: newNotes });
   }
   removeNote = (ind) => {
      let newNotes = [...this.state.notes];
      if (newNotes.length > 1) {
         newNotes.splice(ind, 1);
         this.setState({ notes: newNotes });
      }
      else this.setState({ notes: [initTextItem] })
   }

   onClickOutsideHandler = (ev) => {
      if (!this.actionsContainer.current.contains(ev.target)) {
         this.setState({ show: false });
      }
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
      if (this.props.match.path === "/app/quote/:id") {
         // Get quote details with quote ID
         axios.get(`/quotes/get-by-id/${this.props.match.params.id}`).then(({ data }) => {
            console.log(" ressssssssssssssssssss  =>", data);
            const { quote } = data;
            this.setState({
               title: quote.title,
               toPeopleList: quote.toPeopleList,
               settings: quote.settings,
               items: quote.items,
               notes: quote.notes
            });
         }).catch(err => {
            console.error("get quote detail api error =>", err);
         });
      } else if (this.props.match.path === "/app/quote/get/from-template/:id") {
         // get template detials with id
         axios.get(`/templates/id/${this.props.match.params.id}`).then(({ data }) => {
            const { template } = data;
            console.log("DDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAATTTTTTTTTTT", data);
            console.log("template", template);
            console.log("initQuoteSettings", initQuoteSettings);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", { ...initQuoteSettings, ...template.settings });
            this.setState({
               title: template.title,
               toPeopleList: [],
               settings: { ...initQuoteSettings, ...template.settings, userFrom: this.props.authUser._id },
               items: template.items,
               notes: template.notes
            });
         }).catch(err => {
            console.error("get tempate detail api error =>", err);
         });
      }
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
   }
   render() {
      console.log(" GetQute initSettings ===> ", initQuoteSettings);
      console.log(" GetQute state => ", this.state);
      console.log(" GetQute props => ", this.props);
      const { location } = this.props;
      const linkTo = location.state && location.state.from ? location.state.from : "/app";
      let linkName = "Dashboard";
      if (location.state && location.state.from === "/app/quotes") linkName = "Quotes";
      return (
         <React.Fragment>
            <div className="bg-body-light border-top border-bottom">
               <div className="content content-full py-3">
                  <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                     <h1 className="flex-sm-fill font-size-sm text-uppercase font-w700 mt-2 mb-0 mb-sm-2">
                        <Link to={linkTo}>
                           <i className="fa fa-arrow-left fa-fw mr-2" />
                           <span className="text-primary">{linkName}</span>
                        </Link>
                     </h1>

                     <div className={`dropdown ${this.props.match.path === "/app/quote/:id" ? "d-inline-block" : "d-none"}`} ref={this.actionsContainer}>
                        <button type="button" className="btn btn-dual" onClick={() => this.setState({ show: !this.state.show })}>
                           <span className="text-primary">Actions</span>
                           <i className="fa fa-fw fa-angle-down ml-1 text-primary" />
                        </button>

                        <div className={`dropdown-menu dropdown-menu-right p-0 ${this.state.show ? "show" : ""}`} style={{ minWidth: 250 }}>
                           <ul className="nav-items my-0 py-1">
                              <li>
                                 <button className="dropdown-item text-dark media py-2">
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-arrow-alt-circle-right text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Mark as Sent(don't email)</div>
                                    </div>
                                 </button>
                              </li>
                              <li>
                                 <button className="dropdown-item text-dark media py-2">
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-copy text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Copy</div>
                                    </div>
                                 </button>
                              </li>
                              <li>
                                 <button className="dropdown-item text-dark media py-2">
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-plus-circle text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Copy to Template</div>
                                    </div>
                                 </button>
                              </li>
                              <li>
                                 <button className="dropdown-item text-dark media py-2">
                                    <div className="mx-3">
                                       <i className="fa fa-fw fa-trash-alt text-secondary" />
                                    </div>
                                    <div className="media-body font-size-sm pr-2">
                                       <div className="font-w600">Delete</div>
                                    </div>
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* <NavCrump linkTo={linkTo}>
               {linkName}
            </NavCrump> */}
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
                                    toPeopleList={this.state.toPeopleList}
                                    removeContact={(ind) => {
                                       const newCL = this.state.toPeopleList.filter((it, index) => index !== ind);
                                       this.setState({ toPeopleList: newCL });
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
                                       if (this.state.toPeopleList.find((it) => it._id === contact._id)) this.setState({ emailTo: "" });
                                       else this.setState({
                                          toPeopleList: [
                                             ...this.state.toPeopleList,
                                             contact,
                                          ],
                                          emailTo: "",
                                       });
                                    }}
                                 />
                                 <LableFor toPeopleList={this.state.toPeopleList} />
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* Quote Setting */}
                     <QuoteSettings
                        {...this.state.settings}
                        validDate={this.state.validDate}
                        validTime={this.state.validTime}
                        sentDate={this.state.sentDate}
                        sentTime={this.state.sentTime}
                        updateValidDate={(val) => this.setState({ validDate: val })}
                        updateValidTime={(val) => this.setState({ validTime: val })}
                        updateSentDate={(val) => this.setState({ sentDate: val })}
                        updateSentTime={(val) => this.setState({ sentTime: val })}
                        updateSettings={(settings) => this.setState({ settings: settings })}
                     />
                  </div>

                  {/* Template Title */}
                  <div className="row">
                     <div className="col-12">
                        <textarea
                           className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2 my-4"
                           rows={1}
                           placeholder="Title of Quote"
                           value={this.state.title}
                           onChange={(ev) => this.setState({ title: ev.target.value })}
                        ></textarea>
                     </div>
                  </div>

                  {/* Controller button group */}

                  {
                     this.state.items.map((item, index) => {
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
                           updateItem={this.updateItem}
                           addItem={this.addItem}
                           orderUpItem={this.orderUpItem}
                           orderDownItem={this.orderDownItem}
                           removeItem={this.removeItem}
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
                     this.setState({ items: [...this.state.items, newItem] })
                  }} />

                  <QuoteItemTotal settings={this.state.settings} items={this.state.items} />

                  {
                     this.state.notes.map((item, index) => {
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

                  <AddItemBtn onClickAdd={() => this.setState({ notes: [...this.state.notes, { category: "textItem", textItem: initTextItem }] })} />

                  {/* Footer action button group */}
                  <div className="row p-3">
                     <button
                        className="btn btn-lg btn-rounded btn-hero-primary mr-1"
                        onClick={this.handleClickSaveNext}
                     >
                        Save, Next...
                     </button>
                     <button
                        className="btn btn-lg btn-rounded btn-hero-secondary mr-1"
                        onClick={this.handleClickSave}
                     >
                        Save
                     </button>
                     <button
                        className="btn btn-lg btn-rounded btn-hero-secondary"
                        onClick={() => this.props.history.push("/app/quotes")}
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
const mapStateToProps = ({ auth }) => {
   const { authUser } = auth;
   return { authUser }
}
export default connect(mapStateToProps)(GetQuote)