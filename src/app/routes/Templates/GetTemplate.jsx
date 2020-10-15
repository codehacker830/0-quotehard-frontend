import React, { Component } from 'react';
import AddItemBtn from '../../../components/AddItemBtn';
import NavCrump from '../../../components/NavCrump';
import PriceItemForm from '../../../components/PriceItemForm';
import SubTotal from '../../../components/SubTotal';
import TemplateSettings from '../../../components/TemplateSettings';
import TextItemForm from '../../../components/TextItemForm';
import {
   initTemplateSettings,
   initPriceItem,
   initTextItem,
   initSubTotal,
} from '../../../constants/InitState';

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
         settings: initTemplateSettings,
         items: [
            {
               category: "priceItem",
               priceItem: initPriceItem,
            }
         ],
         notes: [
            {
               category: "textItem",
               textItem: initTextItem
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
      console.log("index  ===", ind)
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
                     <TemplateSettings
                        {...this.state.settings}
                        updateSettings={(settings) => this.setState({ settings: settings })}
                     />
                  </div>

                  {/* Template Title */}
                  <div className="row">
                     <div className="col-12">
                        <textarea className="form-control font-size-h4 font-w700 border-top-0 border-right-0 border-left-0 rounded-0 p-2 my-4"
                           rows={1} placeholder="Title of Template"
                           value={this.state.title}
                           onChange={(ev) => this.setState({ title: ev.target.value })}
                        >
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
                     <button className="btn btn-lg btn-rounded btn-hero-primary mr-1">Create</button>
                     <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={() => this.props.history.push("/app/content/templates")}>Cancel</button>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}