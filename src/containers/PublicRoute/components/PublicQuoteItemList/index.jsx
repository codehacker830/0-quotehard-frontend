import React, { Component } from 'react';
import { connect } from "react-redux";
import { toFixedFloat } from '../../../../util';
import AttachedFilesShowCase from '../AttachedFilesShowCase';
import QuotePriceItem from './QuotePriceItem';
import QuoteSubTotal from './QuoteSubTotal';
import QuoteTextItem from './QuoteTextItem';

class QuoteItem extends Component {
   render() {
      const { item, index } = this.props;
      if (item.category === "priceItem") return <QuotePriceItem item={item} index={index} />;
      else if (item.category === "textItem") return <QuoteTextItem item={item} />;
      else return <QuoteSubTotal index={index} />;
   }
}

class PublicQuoteItemList extends Component {
   render() {
      const { quote } = this.props;
      if (!quote.items.length) return null;
      else return quote.items.map((item, index) => <QuoteItem item={item} key={index} index={index} />);
   }
}
const mapStateToProps = ({ mainData }) => {
   const { quote } = mainData;
   return { quote };
}

export default connect(mapStateToProps)(PublicQuoteItemList);