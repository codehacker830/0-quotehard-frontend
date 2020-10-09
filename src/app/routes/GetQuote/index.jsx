import React, { Component } from 'react';
import NavCrump from '../../../components/NavCrump';
import QuoteToPeopleList from './QuoteToPeopleList';
import QuoteSettings from '../../../components/QuoteSettings';
import PriceItemForm from '../../../components/PriceItemForm';
import TextItemForm from '../../../components/TextItemForm';
import AddItem from './AddItem';
import { toastr } from 'react-redux-toastr';
import { toastrWarningConfig, toastrSuccessConfig, toastrErrorConfig, toastrInfoConfig } from '../../../util/toastrConfig';
import CompleterContact from './CompleterContact';
import LableFor from './LableFor';
import axios from '../../../util/Api';
import {
   parseDate,
   parseTime,
   isValidDateTimeFormat,
   convertStrIntoDateObj
} from '../../../util';

const quoteData = {
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
         company: "Danil Company"
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
         location: "232"
      },
      discount: 50,
      currency: "156",
      taxMode: "no_tax",
      priceDisplayLevel: "itemQuantityAndTotal",
      displayItemCode: true
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
               "https://static.productionready.io/images/smiley-cyrus.jpg"
            ],
            itemCategory: "sales",
            tax: 10,
            untilPrice: 10,
            quantity: 10,
            itemTotal: 100
         },
      },
      {
         category: "textItem",
         textItem: {
            textHeading: "here is text heading",
            longDescription: "description",
            files: [
               "https://static.productionready.io/images/smiley-cyrus.jpg",
               "https://static.productionready.io/images/smiley-cyrus.jpg"
            ]
         },
      },
      {
         category: "subTotal",
      }
   ],
   notes: [
      {
         textHeading: "here is text heading",
         longDescription: "descriptioin",
         files: [
            "https://static.productionready.io/images/smiley-cyrus.jpg",
            "https://static.productionready.io/images/smiley-cyrus.jpg"
         ]
      }
   ]
}

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

         validDate: "",
         validTime: "",
         sentDate: "",
         sentTime: "",

         toPeopleList: [],
         title: "",
         settings: {
            validUntil: new Date(Date.now() + 1000 * 3600 * 24 * 50),  //valid for 50 days
            sentAt: new Date(),
            userFrom: {
               _id: "",
               firstName: "",
               lastName: "",
               email: "",
               companyName: "",
               location: "232"
            },
            discount: 0,
            currency: "156",
            taxMode: "no_tax",
            priceDisplayLevel: "itemQuantityAndTotal",
            displayItemCode: true,
         },
         items: [
            {
               category: "priceItem",
               priceItem: {
                  itemCode: "",
                  productHeading: "",
                  longDescription: "",
                  files: [],
                  itemCategory: "sales",
                  tax: 10,
                  untilPrice: null,
                  quantity: null,
                  itemTotal: null
               },
            }
         ],
         notes: [
            {
               textHeading: "",
               longDescription: "",
               files: []
            }
         ]
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
   handleClickSaveNext = () => {
      toastr.success('The is success', 'success message here', toastrSuccessConfig);

   }
   handleClickSave = () => {
      toastr.info('This is info', 'info message here', toastrInfoConfig);
      toastr.warning('This is warning', 'warning message here', toastrWarningConfig);
      toastr.error('This is error', 'error message here', toastrErrorConfig);
   }
   componentDidMount() {
      // if (this.props.match.params && this.props.match.params.id !== "get") {
      //    // Get quote details with quote ID
      //    axios.get(`/quotes/${this.props.match.params.id}`).then(({ data }) => {
      //       console.log(" ress sss  =>", data);
      //    }).catch(err => {
      //       console.error("get quote detail api error =>", err)
      //    });
      // }
      const { toPeopleList, title, settings, items, notes } = quoteData;
      this.setState({
         toPeopleList, title, settings, items, notes,

         validDate: parseDate(settings.validUntil),
         validTime: parseTime(settings.validUntil),
         sentDate: parseDate(settings.sentAt),
         sentTime: parseTime(settings.sentAt)
      });
   }
   render() {
      console.log(" GetQute state => ", this.state);
      console.log(" GetQute props => ", this.props);
      const { location } = this.props;
      const { state } = location;
      let HeadLinkText = 'Dashboard';
      if (state && state.from === "/app/quotes") HeadLinkText = 'Quotes';
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
                           <div className="p-1 font-w700">
                              To
                           </div>
                           <div className="p-1 w-100 maxWidth-550">
                              <div className="row no-gutters">
                                 <QuoteToPeopleList
                                    toPeopleList={this.state.toPeopleList}
                                    removeContact={(contact) => {
                                       const newCL = this.state.toPeopleList.filter((it, index) => it._id !== contact._id);
                                       this.setState({ toPeopleList: newCL });
                                    }} />
                              </div>
                              <div className="row no-gutters" style={{ position: "relative" }}>
                                 <input
                                    type="text"
                                    id="emailTo"
                                    className="form-control rounded-0"
                                    value={this.state.emailTo}
                                    onChange={(ev) => this.setState({ emailTo: ev.target.value })} />
                                 <CompleterContact
                                    emailTo={this.state.emailTo}
                                    addContact={(contact) => {
                                       if (this.state.toPeopleList.find((it) => it._id === contact._id)) this.setState({ emailTo: "" });
                                       else this.setState({
                                          toPeopleList: [...this.state.toPeopleList, contact],
                                          emailTo: ""
                                       });
                                    }} />
                                 <LableFor toPeopleList={this.state.toPeopleList} />
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* Quote Setting */}
                     <div className="col-sm-6">
                        <div className="pl-4 py-2" style={{ borderLeft: "4px solid #eee" }}>
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
                     </div>
                  </div>

                  {/* Template Title */}
                  <div className="row">
                     <div className="col-12">
                        <textarea className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2 my-4" rows={1} placeholder="Title of Quote">
                        </textarea>
                     </div>
                  </div>

                  {/* Controller button group */}
                  <PriceItemForm
                     isPaperClipDisabled={false}
                     isSettingDisabled={false}
                     isAddItemDisabled={false}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}
                  />
                  <AddItem />

                  {/* subtotal 1 */}
                  <table className="quoteTotal hasTerm table table-borderless">
                     <tbody>
                        <tr className="options">
                           <td className="total-desc">
                              <p className="quote-text-sm">Options selected</p>
                              <p className="quote-text-sm">Optional extras are excluded from this calculation</p>
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
                           <td className="total-desc"><span className="quoteTotal-gDesc">Total including tax</span></td>
                           <td className="total-price"><span className="quoteTotal-gTotal">$100.00</span>
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
                              <p className="quote-text-sm"><span>Options selected</span></p>
                              <p className="quote-text-sm">Optional extras are excluded from this calculation</p>
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
                           <td className="total-desc"><span className="quoteTotal-gDesc">Total including tax</span></td>
                           <td className="total-price"><span className="quoteTotal-gTotal">$980.00</span>
                              <p className="quote-text-sm">per week</p>
                              <p className="quote-text-sm">(for 4 weeks)</p>
                           </td>
                        </tr>
                     </tbody>
                  </table>

                  <TextItemForm
                     isPaperClipDisabled={false}
                     // isSettingDisabled={false}
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}
                  />

                  <div className="row py-4">
                     <div className="col-12">
                        <button type="button" className="btn btn-alt-light mb-2">
                           <i className="fa fa-plus mr-1"></i>
                           Add Item
                        </button>
                     </div>
                  </div>

                  {/* Footer action button group */}
                  <div className="row p-3">
                     <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={this.handleClickSaveNext}>Save, Next...</button>
                     <button className="btn btn-lg btn-rounded btn-hero-secondary mr-1" onClick={this.handleClickSave}>Save</button>
                     <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={() => this.props.history.push("/app/content/item-text/browse")}>Cancel</button>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}