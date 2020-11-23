import React, { Component } from 'react';
import ActivityHistoryFull from './ActivityHistoryFull';

export default class StatusShowCase extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         show: false,
      },
         this.data = "123"
   }
   onClickActivity = () => {
      this.setState({ loading: true });
      // get all acitivities from backend
      setTimeout(() => {
         this.data = "acitivities data";
         this.setState({ show: true, loading: false })
      }, 1000);

   }
   render() {
      console.log(" StatusShowCase state --->", this.state);
      return (
         <React.Fragment>
            <div className="author-box author-box-sent">
               <h3 className="author-box-title">Sent</h3>
               <div><span className="dt-time" data-time="[1605892380,0,1]">30 minutes ago</span></div>
            </div>
            <div className="author-stat-spacer">
            </div>
            <div className="author-stat mod-private">
               <div className="author-stat-title">
                  Opens
                           </div>
               <div className="author-stat-count">
                  0 </div>
            </div>
            <div className="author-stat">
               <div className="author-stat-title">
                  Edits
                           </div>
               <div className="author-stat-count">
                  1 </div>
            </div>
            <div className="author-stat-link author-stat-link-preview">
               <a href="/q/ciTUQh0ZhuDtzul4uSj0vo182Ar2MMQVBLjfG6XCxH0?preview">Preview as Your Customer</a>
            </div>
            <div className={`author-stat-link history-snippet ${this.state.show ? "isHidden" : ""}`}>
               <button className={`buttonLink ${this.state.loading ? "disabled" : ""}`}
                  disabled={this.state.loading}
                  onClick={this.onClickActivity}>
                  {
                     this.state.loading ?
                        <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />
                        : <i className="fa fa-fw fa-history mr-1" />
                  }
                  All Activity
               </button>
            </div>
            <div className="clear" />
            <div className="history-full" style={{}}>
               {this.state.show && <ActivityHistoryFull onHistoryClose={() => this.setState({ show: false })} data={this.data} />}
            </div>
         </React.Fragment>
      );
   }
}