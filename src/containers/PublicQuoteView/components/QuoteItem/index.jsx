import React, { Component } from 'react';
import { connect } from "react-redux"; import { toFixedFloat } from '../../../../util';
import AttachedFilesShowCase from '../AttachedFilesShowCase';
import QuotePriceItem from './QuotePriceItem';
import QuoteSubTotal from './QuoteSubTotal';
import QuoteTextItem from './QuoteTextItem';

export default class QuoteItem extends Component {
   render() {
      const { item, index } = this.props;
      if (item.category === "priceItem") return <QuotePriceItem item={item} index={index} />;
      else if (item.category === "textItem") return <QuoteTextItem item={item} />;
      else if (item.category === "subTotal") return <QuoteSubTotal index={index} />;
   }
}
