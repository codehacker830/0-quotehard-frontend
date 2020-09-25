import React, { Component } from 'react';
import NavCrump from '../../../components/NavCrump';
import PriceItemForm from '../../../components/PriceItemForm';
import TemplateSettings from '../../../components/TemplateSettings';
import TextItemForm from '../../../components/TextItemForm';

export default class GetTemplate extends Component {
   constructor(orops) {
      super();
      this.state = {
         fileArray: [],
         isEditableQuantity: false,
         isDiscount: false,
         isSubscription: false,
         isCostPriceMargin: false,
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
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo="/app/content/templates">
               Templates
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  {/* Template Setting */}
                  <div className="row">
                     <div className="col-sm-6">

                     </div>
                     <div className="col-sm-6">
                        <div className="pl-4 py-2" style={{ borderLeft: "4px solid #eee" }}>
                           <TemplateSettings />
                        </div>
                     </div>
                  </div>

                  {/* Template Title */}
                  <div className="row">
                     <div className="col-12">
                        <textarea className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2 my-4" rows={1} placeholder="Title of Template">
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

                  {/* Quote total */}
                  <div className="quote-edit-total-wrap">

                     {/* Has Subscription QuoteTotal */}
                     <table className={`quoteTotal hasTerm table table-borderless`}>
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

                     {/* Has No Subscription QuoteTotal */}
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
                              <td className="total-price">
                                 <span className="quoteTotal-gTotal">$980.00</span>
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
                     <button className="btn btn-lg btn-rounded btn-hero-primary mr-1">Create</button>
                     <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={() => this.props.history.push("/app/content/item-text/browse")}>Cancel</button>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}