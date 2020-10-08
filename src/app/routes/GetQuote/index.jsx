import React, { Component } from 'react';
import NavCrump from '../../../components/NavCrump';
import QuoteToPeopleList from './QuoteToPeopleList';
import QuoteSettings from '../../../components/QuoteSettings';
import PriceItemForm from '../../../components/PriceItemForm';
import TextItemForm from '../../../components/TextItemForm';
import { toastr } from 'react-redux-toastr';
import { toastrWarningConfig, toastrSuccessConfig, toastrErrorConfig, toastrInfoConfig } from '../../../util/toastrConfig';
import CompleterContact from './CompleterContact';
import LableFor from './LableFor';
import axios from '../../../util/Api';

export default class GetQuote extends Component {
   constructor(orops) {
      super();
      this.state = {
         fileArray: [],
         isEditableQuantity: false,
         isDiscount: false,
         isSubscription: false,
         isCostPriceMargin: false,
         toPeopleList: [],
         emailTo: ""
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
      if (this.props.match.params && this.props.match.params.id !== "get") {
         // Get quote details with quote ID
         axios.get(`/quotes/${this.props.match.params.id}`).then(({ data }) => {
            console.log(" ress sss  =>", data);
         }).catch(err => {
            console.error("get quote detail api error =>", err)
         });
      }
   }
   render() {
      console.log(" GetQute props => ", this.props)
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
                           <QuoteSettings />
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
                     isAddItemDisabled={true}
                     isOrderUpDisabled={true}
                     isOrderDownDisabled={true}
                     isRemoveDisabled={true}

                  // onHandleChange={()}

                  />
                   
                  <div className="row py-4">
                     <div className="col-12">
                        <button type="button" className="btn btn-alt-light">
                           <i className="fa fa-plus mr-1"></i>
                           Add Item
                        </button>
                     </div>
                  </div>

                  <div className="quote-edit-total-wrap">
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
                  </div>

                  <TextItemForm
                     isPaperClipDisabled={false}
                     isSettingDisabled={true}
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