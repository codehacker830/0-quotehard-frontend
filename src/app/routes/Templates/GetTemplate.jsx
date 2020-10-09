import React, { Component } from 'react';
import AddItemBtn from '../../../components/AddItemBtn';
import NavCrump from '../../../components/NavCrump';
import PriceItemForm from '../../../components/PriceItemForm';
import TemplateSettings from '../../../components/TemplateSettings';
import TextItemForm from '../../../components/TextItemForm';

const initNote = {
   textHeading: "",
   longDescription: "",
   files: []
};
const initItem = {
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
};
export default class GetTemplate extends Component {
   constructor(orops) {
      super();
      this.state = {
         fileArray: [],
         isEditableQuantity: false,
         isDiscount: false,
         isSubscription: false,
         isCostPriceMargin: false,


         toPeopleList: [],
         title: "",
         settings: {
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
            },
            {
               category: "textItem",
               textHeading: "here is text heading",
               longDescription: "description",
               files: []
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
   render() {
      console.log(" state  ===", this.state)
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
                           <TemplateSettings
                              {...this.state.settings}
                              updateSettings={(settings) => this.setState({ settings: settings })}
                           />
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
                  {
                     this.state.items.map((item, index) => {
                        if (item.category === "priceItem") return <PriceItemForm
                           key={index}
                           index={index}
                           isPaperClipDisabled={false}
                           isSettingDisabled={false}
                           isAddItemDisabled={true}
                           isOrderUpDisabled={true}
                           isOrderDownDisabled={true}
                           isRemoveDisabled={true}
                           {...item}
                           updateItem={(ind, item) => {
                              let newItems = { ...this.state.items };
                              newItems[ind] = item;
                              this.setState({ items: newItems });
                           }}
                        />
                        else return <TextItemForm
                           key={index}
                           index={index}
                           isPaperClipDisabled={false}
                           isSettingDisabled={true}
                           isAddItemDisabled={true}
                           isOrderUpDisabled={true}
                           isOrderDownDisabled={true}
                           isRemoveDisabled={true}
                           {...item}
                           updateItem={(ind, item) => {
                              let newItems = { ...this.state.items };
                              newItems[ind] = item;
                              this.setState({ items: newItems });
                           }}
                        />

                     })
                  }

                  <AddItemBtn onClickAdd={() => this.setState({ items: [...this.state.items, initItem] })} />

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

                  {
                     this.state.notes.map((note, index) => {
                        return <TextItemForm
                           key={index}
                           isPaperClipDisabled={false}
                           isSettingDisabled={true}
                           isAddItemDisabled={true}
                           isOrderUpDisabled={true}
                           isOrderDownDisabled={true}
                           isRemoveDisabled={true}
                        />
                     })
                  }

                  <AddItemBtn onClickAdd={() => this.setState({ notes: [...this.state.notes, initNote] })} />


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