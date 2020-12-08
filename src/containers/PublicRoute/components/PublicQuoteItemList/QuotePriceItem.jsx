import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuote } from '../../../../actions/Data';
import { SwitchQuoteItemClass, toFixedFloat } from '../../../../util';
import AttachedFilesShowCase from '../AttachedFilesShowCase';

class QuotePriceItem extends Component {
   render() {
      const { quote, item, index } = this.props;
      let isSelected = true;
      if (item.priceItem.isMultipleChoice) isSelected = item.priceItem.isChoiceSelected;
      if (item.priceItem.isOptional) isSelected = item.priceItem.isOptionSelected;
      return (
         <div className={SwitchQuoteItemClass(item)}>
            <div className="tItem-desc">
               <div className="tItem-desc-table">
                  {
                     item.priceItem.isMultipleChoice &&
                     <div className="tItem-desc-option">
                        <input type="checkbox"
                           value={item.priceItem.isChoiceSelected}
                           onChange={(ev) => {
                              const newItems = [...quote.items];
                              newItems[index].priceItem.isChoiceSelected = !item.priceItem.isChoiceSelected;
                              this.props.updateQuote({ ...quote, items: newItems });
                           }}
                        />
                     </div>
                  }
                  {
                     item.priceItem.isOptional &&
                     <div className="tItem-desc-option">
                        <input type="radio"
                           value={item.priceItem.isOptionSelected}
                           onChange={(ev) => {
                              const newItems = [...quote.items];
                              newItems[index].priceItem.isOptionSelected = !item.priceItem.isOptionSelected;
                              this.props.updateQuote({ ...quote, items: newItems });
                           }}
                        />
                     </div>
                  }
                  <div className="tItem-desc-cell">
                     <p className="item_code">{item.priceItem.itemCode}</p>
                     <h3>{item.priceItem.productHeading}</h3>
                     <p>{item.priceItem.longDescription}</p>
                     <AttachedFilesShowCase files={item.priceItem.files} />
                  </div>
               </div>
            </div>
            <div className="tItem-price">
               {
                  item.priceItem.isCostPriceMargin &&
                  <p className="quote-text-sm text-success">
                     {toFixedFloat(item.priceItem.costPrice)}
                     <br />
                     {item.priceItem.margin}% margin
                  </p>
               }

               <p className="quote-text-sm">{item.priceItem.unitPrice}</p>
               {
                  item.priceItem.isEditableQuantity ?
                     <div className="itemPartEditableWrap">
                        <label htmlFor={`chooseQuantity${item._id}`}>
                           x <input
                              className="form-control rounded-0"
                              type="number"
                              value={item.priceItem.quantity}
                              onChange={(ev) => {
                                 const newItems = [...quote.items];
                                 newItems[index].priceItem.quantity = ev.target.value;
                                 newItems[index].priceItem.itemTotal = newItems[index].priceItem.unitPrice * newItems[index].priceItem.quantity;
                                 this.props.updateQuote({ ...quote, items: newItems });
                              }}
                           />
                        </label>
                        <label className="quote-text-sm" htmlFor={`chooseQuantity${item._id}`}>Choose quantity</label>
                     </div>
                     : <p className="quote-text-sm">x {item.priceItem.quantity}</p>
               }
               <p><span className="itemPartItemTotal">{item.priceItem.itemTotal}</span></p>
               <p className="quote-text-sm"><span className="option-text">Not selected</span></p>
            </div>
         </div>
      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
};
const mapDispatchToProps = { updateQuote };
export default connect(mapStateToProps, mapDispatchToProps)(QuotePriceItem);