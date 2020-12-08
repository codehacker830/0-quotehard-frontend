import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttachedFilesShowCase from './AttachedFilesShowCase';

class NoteItemList extends Component {
   render() {
      return (
         this.props.notes.map((note, index) => (
            <div className="tItem-text" key={index}>
               <h3>{note.textItem.textHeading}</h3>
               <p>{note.textItem.longDescription}</p>
               <AttachedFilesShowCase files={note.textItem.files} />
            </div>
         ))
      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { notes } = mainData.quote;
   return { notes };
}

export default connect(mapStateToProps)(NoteItemList)