import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { userSignOut } from '../actions/Auth';

class Header extends Component {
   constructor(props) {
      super();
      this.state = {
         isOpen: false
      }
      this.toggleContainer = React.createRef();
   }
   onClickOutsideHandler = (ev) => {
      if (this.state.isOpen && !this.toggleContainer.current.contains(ev.target)) {
         console.log(" onClickOutsideHandler ");
         this.setState({ isOpen: false });
      }
   }
   componentDidMount() {
      window.addEventListener('click', this.onClickOutsideHandler);
   }
   componentWillUnmount() {
      window.removeEventListener('click', this.onClickOutsideHandler);
   }
   render() {
      const { isOpen } = this.state;
      const { history, location } = this.props;
      const { authUser } = this.props;
      console.log("~~ authUser ~~", authUser);
      let show = false;
      if (
         location.pathname === "/app"
         || location.pathname === "/app/quotes"
         || location.pathname === "/app/c/contacts"
         || location.pathname === "/app/content/templates"
         || location.pathname === "/app/content/item-price/browse"
         || location.pathname === "/app/content/item-text/browse"
         || location.pathname === "/app/settings"
      ) show = true;
      return (
         <header id="page-header" className={`bg-dark ${show ? "" : "d-none"}`}>
            {/* Header Content */}
            <div className="container content-header">
               {/* Left Section */}
               <div>
                  <ul className="nav nav-pills justify-content-center justify-content-md-start">
                     <li className="nav-item mr-1">
                        <NavLink exact to="/app" className="nav-link">
                           <i className="fa fa-building fa-fw" /> <span className="d-none d-md-inline ml-1">Dashboard</span>
                        </NavLink>
                     </li>
                     <li className="nav-item mr-1">
                        <NavLink to="/app/quotes" className="nav-link">
                           <i className="fa fa-quote-left fa-fw" /> <span className="d-none d-md-inline ml-1">Quotes</span>
                        </NavLink>
                     </li>
                     <li className="nav-item mr-1">
                        <NavLink to="/app/c/contacts" className="nav-link">
                           <i className="fa fa-phone-square fa-fw" /> <span className="d-none d-md-inline ml-1">Contacts</span>
                        </NavLink>
                     </li>
                     <li className="nav-item mr-1">
                        <NavLink to="/app/content/templates" className="nav-link">
                           <i className="fa fa-suitcase fa-fw" /> <span className="d-none d-md-inline ml-1">Templates &amp; Items</span>
                        </NavLink>
                     </li>
                  </ul>
               </div>
               {/* END Left Section */}
               {/* Right Section */}
               <div className="d-flex align-items-center">
                  <div className="dropdown d-inline-block" ref={this.toggleContainer}>
                     <button type="button" className="btn btn-dark dropdown-toggle" onClick={() => this.setState({ isOpen: !isOpen })}>
                        <img className="img-avatar img-avatar32 img-avatar-thumb" src={authUser && `${authUser.image}`} alt="avatar" />
                        <span className="d-none d-sm-inline ml-1">{authUser && `${authUser.companyName}`}</span>
                     </button>
                     {/* Toggle Dropdown */}
                     <div className={`dropdown-menu dropdown-menu-right dropdown-menu-lg p-0 ${isOpen ? "show" : ""}`}>
                        <div className="rounded-top font-w600 text-white text-center bg-image"
                           style={{ backgroundImage: 'url("/assets/media/photos/bg-blue.jpg")' }}>
                           <div className="p-3">
                              <img className="img-avatar img-avatar-thumb" src={authUser && `${authUser.image}`} alt="useravatar" />
                           </div>
                           <div className="p-3 bg-black-75">
                              <span className="text-white font-w600">{authUser && `${authUser.firstName} ${authUser.lastName}`}</span>
                           </div>
                        </div>
                        <div className="p-2">
                           <Link className="dropdown-item d-flex justify-content-between align-items-center" to="/app/settings">
                              Settings
                              <i className="fa fa-fw fa-cog text-black-50 ml-1" />
                           </Link>
                           <a className="dropdown-item d-flex justify-content-between align-items-center" href="https://www.quotientapp.com/support">
                              Help & Support
                              <i className="fa fa-fw fa-hand-holding-heart text-black-50 ml-1" />
                           </a>
                           <div role="separator" className="dropdown-divider" />
                           <button className="dropdown-item d-flex justify-content-between align-items-center" onClick={this.props.userSignOut}>
                              Sign Out
                              <i className="fa fa-fw fa-sign-out-alt text-danger ml-1" />
                           </button>
                        </div>
                     </div>
                     {/* End Toggle Dropdown */}
                  </div>
               </div>
               {/* END Right Section */}
            </div>
            {/* END Header Content */}
            {/* Header Search */}
            <div id="page-header-search" className="overlay-header bg-white">
               <div className="content-header">
                  <form className="w-100" action="be_pages_generic_search.html" method="POST">
                     <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search or hit ESC.."
                           id="page-header-search-input" name="page-header-search-input" />
                        <div className="input-group-append">
                           {/* Layout API, functionality initialized in Template._uiApiLayout() */}
                           <button type="button" className="btn btn-secondary" data-toggle="layout"
                              data-action="header_search_off">
                              <i className="fa fa-fw fa-times-circle" />
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
            {/* END Header Search */}
            {/* Header Loader */}
            {/* Please check out the Loaders page under Components category to see examples of showing/hiding it */}
            <div id="page-header-loader" className="overlay-header bg-white">
               <div className="content-header">
                  <div className="w-100 text-center">
                     <i className="fa fa-fw fa-2x fa-sun fa-spin" />
                  </div>
               </div>
            </div>
            {/* END Header Loader */}
         </header>
      );
   }
}

const mapStateToProps = ({ auth }) => {
   const { authUser } = auth;
   return { authUser }
};
const mapDispatchToProps = { userSignOut };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));