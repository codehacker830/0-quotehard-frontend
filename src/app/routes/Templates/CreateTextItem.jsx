import React, { Component } from 'react';
import NavCrump from '../../../components/NavCrump';
import TextItemForm from '../../../components/TextItemForm';
import ToolWrapper from '../../../components/ToolWrapper';

export default class CreateTextItem extends Component {
   fileObj = [];
   fileArray = [];

   constructor(props) {
      super();
      this.state = {
         file: [null]
      };
      this.hiddenFileInput = React.createRef();
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
      return (
         <React.Fragment>
            <NavCrump linkTo="/app/content/item-text/browse">
               Items
            </NavCrump>
            <div className="content bg-custom">
               <div className="mt-6 mb-5">
                  <TextItemForm />
               </div>

               {/* Footer action button group */}
               <div className="row p-3">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1">Create</button>
                  <button className="btn btn-lg btn-rounded btn-hero-secondary" onClick={() => this.props.history.push("/app/content/item-text/browse")}>Cancel</button>
               </div>
            </div>
         </React.Fragment>
      );
   }
}