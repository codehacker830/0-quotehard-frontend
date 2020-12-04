import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuoteNotes } from '../actions/Data';
import { initTextItem } from '../constants/InitState';

class AddNoteBtn extends Component {
   onClickAdd = () => this.props.updateQuoteNotes([...this.props.notes, { category: "textItem", textItem: initTextItem }])
   render() {
      return (
         <div className="row py-4">
            <div className="col-12">
               <button type="button" className="btn btn-alt-light" onClick={() => this.onClickAdd()}>
                  <i className="fa fa-plus mr-1"></i>
                  Add Item
               </button>
            </div>
         </div>
      );
   }
}
const mapStateToProps = ({ mainData }) => {
   const { notes } = mainData.quote;
   return { notes }
}
const mapDispatchToProps = {
   updateQuoteNotes
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteBtn)