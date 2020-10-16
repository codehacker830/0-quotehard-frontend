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

const quoteDataApiRes = {
   createdBy: "thisisuseridwhocreatetshi",
   toPeopleList: [
      {
         _id: "12345",
         firstName: "Raffale",
         lastName: "Cantatore",
         email: "honestypassion0615@gmail.com",
         company: "Raff Company",
      },
      {
         _id: "13452",
         firstName: "Danil",
         lastName: "Zolo",
         email: "danilo@gmail.com",
         company: "Danil Company",
      },
      // {
      //    _id: "248318",
      //    firstName: "Radoje",
      //    lastName: "Cofallo",
      //    email: "cofallo@gmail.com",
      //    company: "AllOver"
      // }
   ],
   title: "this is Quote title",
   settings: {
      validUntil: new Date(Date.now() + 1000 * 3600 * 24 * 50),
      sentAt: new Date(),
      userFrom: {
         _id: "5f85447fed77730be4610ef4",
         firstName: "A",
         lastName: "Devom",
         email: "honestypasion0615@gmail.com",
         companyName: "AllOver",
         location: "232",
      },
      discount: 50,
      currency: "156",
      taxMode: "no_tax",
      priceDisplayLevel: "itemQuantityAndTotal",
      displayItemCode: true,
   },
   items: [
      {
         category: "priceItem",
         priceItem: {
            itemCode: "icode-1",
            productHeading: "this is product heading",
            longDescription: "long description",
            files: [
               "https://static.productionready.io/images/smiley-cyrus.jpg",
               "https://static.productionready.io/images/smiley-cyrus.jpg",
            ],
            itemCategory: "sales",
            tax: 10,
            unitPrice: 10,
            quantity: 10,
            itemTotal: 100,
         },
      },
      {
         category: "textItem",
         textItem: {
            textHeading: "here is text heading",
            longDescription: "description",
            files: [
               "https://static.productionready.io/images/smiley-cyrus.jpg",
               "https://static.productionready.io/images/smiley-cyrus.jpg",
            ],
         },
      },
      {
         category: "subTotal",
      },
   ],
   notes: [
      {
         textHeading: "here is text heading",
         longDescription: "descriptioin",
         files: [
            "https://static.productionready.io/images/smiley-cyrus.jpg",
            "https://static.productionready.io/images/smiley-cyrus.jpg",
         ],
      },
   ],
};

class GetQuote extends Component {
   initSettings = {
      validUntil: new Date(Date.now() + 1000 * 3600 * 24 * 365),
      sentAt: new Date(),
      userFrom: {
         _id: this.props.authUser._id,
         firstName: this.props.authUser.firstName,
         lastName: this.props.authUser.lastName,
         email: this.props.authUser.email,
         companyName: this.props.authUser.companyName,
         location: this.props.authUser.location,
      },

      discount: 0,
      currency: "156",
      taxMode: "no_tax",
      priceDisplayLevel: "itemQuantityAndTotal",
      displayItemCode: true,
   };

   constructor(props) {
      super(props);
      this.state = {
         fileArray: [],
         emailTo: "",

         validDate: parseDate(this.initSettings.validUntil),
         validTime: parseTime(this.initSettings.validUntil),
         sentDate: parseDate(this.initSettings.sentAt),
         sentTime: parseTime(this.initSettings.sentAt),

         toPeopleList: [],
         title: "",
         settings: this.initSettings,
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
      if (this.props.location.pathname === '/app/quote/get') {
         axios.post('/quotes', data)
            .then(({ data }) => {
               console.log("res data =>", data);
               toastr.success(
                  "Success",
                  "New Quote draft was created.",
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
                  "Quote draft was defined.",
                  toastrSuccessConfig
               );
               this.props.history.push(`/q/${data.entoken}`);
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
      if (this.props.location.pathname === '/app/quote/get') {
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
   componentDidMount() {
      if (this.props.match.params && this.props.match.params.id) {
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
            toastr.error("Error", "Quote was not found", toastrErrorConfig);
         });
      }
      //  const { toPeopleList, title, settings, items, notes } = quoteDataApiRes;
      //  this.setState({
      //    toPeopleList,
      //    title,
      //    settings,
      //    items,
      //    notes,
      //    validDate: parseDate(settings.validUntil),
      //    validTime: parseTime(settings.validUntil),
      //    sentDate: parseDate(settings.sentAt),
      //    sentTime: parseTime(settings.sentAt),
      //  });
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
   render() {
      console.log(" GetQute initSettings ===> ", this.initSettings);
      console.log(" GetQute state => ", this.state);
      console.log(" GetQute props => ", this.props);
      const { location } = this.props;
      let HeadLinkText = "Dashboard";
      if (location.state && location.state.from === "/app/quotes") HeadLinkText = "Quotes";
      return (
         <React.Fragment>
            <NavCrump linkTo={`${location.state && location.state.from ? location.state.from : "/app"}`}>
               {HeadLinkText}
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