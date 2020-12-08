import React, { Component } from 'react';

export default class AttachedFilesShowCase extends Component {
   render() {
      if (!this.props.files.length) return null;
      else return (
            <div className="quoteFile-wrap">
               <div className="quoteFile-set">
                  {
                     this.props.files.map((file, index) => (
                        <div className="quoteFile-image" key={index}>
                           <a data-tg-click="root_lightboxQuote"
                              data-download-original={file}
                              className="quoteFile-image-a"
                              href={file}
                              title="quotefile">
                              <img src={file}
                                 alt="file" /></a>
                        </div>
                     ))
                  }
               </div>
               <div className="clear" />
            </div>
         );
   }
}