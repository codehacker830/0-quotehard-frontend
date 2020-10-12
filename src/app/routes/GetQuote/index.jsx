import React, { Component } from "react";
import NavCrump from "../../../components/NavCrump";
import QuoteToPeopleList from "./QuoteToPeopleList";
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
import CompleterContact from "./CompleterContact";
import LableFor from "./LableFor";
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
         _id: "5f7b39e8f1f85766fc60d8d3",
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

export default class GetQuote extends Component {
   constructor(orops) {
      super();
      this.state = {
         fileArray: [],
         isEditableQuantity: false,
         isDiscount: false,
         isSubscription: false,
         isCostPriceMargin: false,
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
         notes: [initTextItem],
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
      toastr.success(
         "The is success",
         "success message here",
         toastrSuccessConfig
      );
   };
   handleClickSave = () => {
      toastr.info("This is info", "info message here", toastrInfoConfig);
      toastr.warning(
         "This is warning",
         "warning message here",
         toastrWarningConfig
      );
      toastr.error("This is error", "error message here", toastrErrorConfig);
   };
   componentDidMount() {
      // if (this.props.match.params && this.props.match.params.id !== "get") {
      //    // Get quote details with quote ID
      //    axios.get(`/quotes/${this.props.match.params.id}`).then(({ data }) => {
      //       console.log(" ress sss  =>", data);
      //    }).catch(err => {
      //       console.error("get quote detail api error =>", err)
      //    });
      // }
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
         priceItem: initTextItem,
      });
      else newItems.splice(ind + 1, 0, {
         category: category,
         subTotal: null
      });
      this.setState({ items: newItems });
   }
   orderUpItem = (ind) => {
      let newItems = [...this.state.items];
      newItems.splice(ind, 1);
      newItems.splice(Math.max(ind - 1, 0), 0);
      this.setState({ items: newItems });
   }
   orderDownItem = (ind) => {
      let newItems = [...this.state.items];
      const [dIt,] = newItems.splice(ind, 1);
      newItems.splice(Math.min(ind + 1, this.state.items.length), 0);
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
   updateNote = (ind, item) => {
      let newNotes = { ...this.state.notes };
      newNotes[ind] = item;
      this.setState({ notes: newNotes });
   }
   addNote = (ind, category) => {
      let newNotes = [...this.state.notes];
      if (category === "priceItem") newNotes.splice(ind + 1, 0, initPriceItem);
      else if (category === "textItem") newNotes.splice(ind + 1, 0, initTextItem);
      else newNotes.splice(ind + 1, 0, initSubTotal);
      this.setState({ notes: newNotes });
   }
   orderUpNote = (ind) => {
      let newNotes = [...this.state.notes];
      newNotes.splice(ind, 1);
      newNotes.splice(Math.max(ind - 1, 0), 0);
      this.setState({ notes: newNotes });
   }
   orderDownNote = (ind) => {
      let newNotes = [...this.state.notes];
      const [dIt,] = newNotes.splice(ind, 1);
      newNotes.splice(Math.min(ind + 1, this.state.notes.length), 0);
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
      console.log(" GetQute state => ", this.state);
      console.log(" GetQute props => ", this.props);
      const { location } = this.props;
      const { state } = location;
      let HeadLinkText = "Dashboard";
      if (state && state.from === "/app/quotes") HeadLinkText = "Quotes";
      return (
         <React.Fragment>
            <NavCrump linkTo={`${state && state.from ? state.from : "/app"}`}>
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
                                    removeContact={(contact) => {
                                       const newCL = this.state.toPeopleList.filter(
                                          (it, index) => it._id !== contact._id
                                       );
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
                                    value={this.state.emailTo}
                                    onChange={(ev) =>
                                       this.setState({ emailTo: ev.target.value })
                                    }
                                 />
                                 <CompleterContact
                                    emailTo={this.state.emailTo}
                                    addContact={(contact) => {
                                       if (
                                          this.state.toPeopleList.find(
                                             (it) => it._id === contact._id
                                          )
                                       )
                                          this.setState({ emailTo: "" });
                                       else
                                          this.setState({
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

                  {/* subtotal 1 */}
                  <table className="quoteTotal hasTerm table table-borderless">
                     <tbody>
                        <tr className="options">
                           <td className="total-desc">
                              <p className="quote-text-sm">Options selected</p>
                              <p className="quote-text-sm">
                                 Optional extras are excluded from this calculation
                              </p>
                           </td>
                           <td className="total-price">
                              <p className="quote-text-sm">1 of 1</p>
                           </td>
                        </tr>
                        <tr>
                           <td className="total-desc">Subtotal</td>
                           <td className="total-price">100.00</td>
                        </tr>
                        <tr className="total">
                           <td className="total-desc">
                              <span className="quoteTotal-gDesc">
                                 Total including tax
                           </span>
                           </td>
                           <td className="total-price">
                              <span className="quoteTotal-gTotal">$100.00</span>
                              <div className="quote-text-sm">per week</div>
                              <div className="quote-text-sm">(for 4 weeks)</div>
                           </td>
                        </tr>
                     </tbody>
                  </table>

                  {/* subtotal 2 */}
                  <table className="quoteTotal hasNoTerm table table-borderless">
                     <tbody>
                        <tr className="options">
                           <td className="total-desc">
                              <p className="quote-text-sm">
                                 <span>Options selected</span>
                              </p>
                              <p className="quote-text-sm">
                                 Optional extras are excluded from this calculation
                              </p>
                           </td>
                           <td className="total-price">
                              <p className="quote-text-sm">2 of 4</p>
                           </td>
                        </tr>
                        <tr>
                           <td className="total-desc">Subtotal</td>
                           <td className="total-price">900.00</td>
                        </tr>
                        <tr className="tProfit">
                           <td className="total-desc">Total margin 20%</td>
                           <td className="total-price">100.00</td>
                        </tr>
                        <tr>
                           <td className="total-desc">Tax 10%</td>
                           <td className="total-price">80.00</td>
                        </tr>
                        <tr className="total">
                           <td className="total-desc">
                              <span className="quoteTotal-gDesc">
                                 Total including tax
                    </span>
                           </td>
                           <td className="total-price">
                              <span className="quoteTotal-gTotal">$980.00</span>
                              <p className="quote-text-sm">per week</p>
                              <p className="quote-text-sm">(for 4 weeks)</p>
                           </td>
                        </tr>
                     </tbody>
                  </table>

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

                  <AddItemBtn onClickAdd={() => this.setState({ notes: [...this.state.notes, initTextItem] })} />

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
                        onClick={() =>
                           this.props.history.push("/app/content/item-text/browse")
                        }
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
