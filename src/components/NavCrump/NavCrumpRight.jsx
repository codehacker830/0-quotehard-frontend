import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NavCrumpRight extends Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false
      };
      this.actionsContainer = React.createRef();
   }
   onClickOutsideHandler = (ev) => {
      if (!this.actionsContainer.current.contains(ev.target)) {
         this.setState({ show: false });
      }
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
   }
   render() {
      let isShow = true;
      if (
         this.props.match.path === "/app/quote/get/duplicate/:id"
      ) isShow = false;

      return (
         <div className={`dropdown d-inline-block ${isShow ? "" : "d-none"}`} ref={this.actionsContainer}>
            <button type="button" className="btn btn-dual" onClick={() => this.setState({ show: !this.state.show })}>
               <span className="text-primary">Actions</span>
               <i className="fa fa-fw fa-angle-down ml-1 text-primary" />
            </button>

            <div className={`dropdown-menu dropdown-menu-right p-0 ${this.state.show ? "show" : ""}`} style={{ minWidth: 250 }}>
               {this.props.children}
            </div>
         </div>
      );
   }
}

export default withRouter(NavCrumpRight);
