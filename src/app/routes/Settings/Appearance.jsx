import React, { Component } from 'react';
import NavCrump from '../../../components/NavCrump';

export default class Appearance extends Component {
   fileObj = [];
   fileArray = [];
   constructor(props) {
      super(props);
      this.state = {
         fileBlob: "",
      };
      this.hiddenFileInput = React.createRef();
   }
   handleClickFileOpen = () => {
      this.hiddenFileInput.current.click();
   }
   uploadFile = (e) => {
      console.log("e.target.files ==>", e.target.files);
      this.fileObj = [];
      this.fileObj.push(e.target.files);
      console.log("this.fileObj ==>", this.fileObj);

      for (let i = 0; i < this.fileObj[0].length; i++) {
         console.log("this.fileObj[0][i] ===>", this.fileObj[0][i]);
         this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
      }
      console.log("this.fileArray =>", this.fileArray);
      this.setState({ fileBlob: this.fileArray[0] });
   }

   removeImageItem = (url) => {
      const newFileArray = this.state.fileArray.filter(item => item !== url);
      this.setState({ fileArray: newFileArray });
   }
   render() {
      return (
         <React.Fragment>
            <NavCrump linkTo={`/app/settings`}>
               Settings
            </NavCrump>
            <div className="content">
               <h2 className="my-4">Layout, Style and Company Information</h2>
               <div className="row">
                  <div className="col-sm-7 border-right pr-4">
                     <h3>Logo</h3>
                     <div className="ml-3 my-3">
                        <input type="file"
                           ref={this.hiddenFileInput}
                           onChange={this.uploadFile}
                           className="d-none"
                        />
                        <img src={this.state.fileBlob} className="mr-2 image-preview-size" alt="..." />
                        <button className="btn btn-square btn-outline-secondary"
                           onClick={this.handleClickFileOpen}
                        ><i className="si si-paper-clip fa-fw mr-1" />Choose logo</button>
                     </div>
                  </div>

                  <div className="col-sm-5">

                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}