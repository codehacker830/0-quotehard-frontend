import React, { Component } from 'react';
import AttachedFilesShowCase from './AttachedFilesShowCase';

export default class NoteItemList extends Component {
   render() {
      return (
         this.props.noteList.map((note, index) => (
            <div className="tItem-text" key={index}>
               <h3>{note.textItem.textHeading}</h3>
               <p>{note.textItem.longDescription}</p>
               <AttachedFilesShowCase files={note.textItem.files} />
            </div>
         ))
      );
   }
}