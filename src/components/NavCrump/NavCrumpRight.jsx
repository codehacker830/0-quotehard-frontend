import clsx from 'clsx';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { QUOTE_GET_PATH, QUOTE_GET_DUPLICATE_PATH, CONTENT_TEMPLATE_BY_ID_PATH, CONTENT_TEMPLATE_GET_COPYTOTEMPLATE_PATH, CONTACT_VIEW_PATH } from '../../constants/PathNames';

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
      const hideActions = (
         this.props.match.path === QUOTE_GET_PATH
         || this.props.match.path === QUOTE_GET_DUPLICATE_PATH
         || this.props.match.path === CONTENT_TEMPLATE_BY_ID_PATH
         || this.props.match.path === CONTENT_TEMPLATE_GET_COPYTOTEMPLATE_PATH
         || this.props.match.path === CONTACT_VIEW_PATH
      );
      return (
         <div className={clsx("dropdown", hideActions ? "d-none" : "")} ref={this.actionsContainer}>
            <button type="button" className="btn btn-sm" style={{ boxShadow: "none" }} onClick={() => this.setState({ show: !this.state.show })}>
               <span className="text-primary">Actions</span>
               <i className="fa fa-fw fa-angle-down ml-1 text-primary" />
            </button>
            <div className={clsx("dropdown-menu dropdown-menu-right p-0", this.state.show ? "show" : "")} style={{ minWidth: 250 }}>
               {this.props.children}
            </div>
         </div>
      );
   }
}

export default withRouter(NavCrumpRight);
