import React, { Component } from 'react';
import AttachedFilesShowCase from '../AttachedFilesShowCase';

export default class QuoteTextItem extends Component {
   render() {
      const { item } = this.props;
      return (
         <div className="tItem-text">
            <h3>{item.textItem.textHeading}</h3>
            <p>{item.textItem.longDescription}</p>
            <AttachedFilesShowCase files={item.textItem.files} />
         </div>
      );
   }
}