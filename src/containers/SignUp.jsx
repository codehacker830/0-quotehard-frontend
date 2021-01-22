import dateFormat from 'dateformat';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSignUp } from '../actions/Auth';

class SignUp extends Component {
   state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      location: 232,
   };
   onHandleSubmit = (ev) => {
      ev.preventDefault();
      const {
         firstName,
         lastName,
         email,
         password,
         companyName,
         location
      } = this.state;
      if (
         firstName === ""
         || lastName === ""
         || email === ""
         || password === ""
         || companyName === ""
         || location === ""
      ) {
         toast.success("Please fill up all fields.");
         return;
      }
      this.props.userSignUp({ firstName, lastName, email, password, companyName, location });
   }
   componentWillReceiveProps(nextProps) {
      console.error(" next props : ", nextProps);
      if (nextProps.authUser) this.props.history.push('/app');
   }
   render() {
      const now = Date.now();
      const expireAt = new Date(now + 30 * 24 * 3600 * 1000);
      console.log(" Sing Up state = ", this.state);
      const {
         firstName,
         lastName,
         email,
         password,
         companyName,
         location
      } = this.state;
      const { history } = this.props;
      return (
         <main id="main-container">
            <div className="row no-gutters">
               {/* Main Section */}
               <div className="hero-static col-md-12 d-flex align-items-center bg-white">
                  <div className="container p-3 w-100">
                     {/* Header */}
                     <div className="mb-3 text-center">
                        <Link to="/" className="d-flex justify-content-center mb-2">
                           <img src="/logo-180.png" className="logo" alt="logo" />
                        </Link>
                        <div className="text-dark font-w700 font-size-h2 mb-2">Great decision, let’s get you started!</div>
                        <div className="d-flex justify-content-center m-auto" style={{ maxWidth: 650 }}>
                           <span className="font-size-h5">
                              Your free trial starts today and expires {dateFormat(expireAt, "mmmm dS, yyyy")}.
                              Already have an account?
                           <Link to="/sign-in" className="px-2">Sign in here.</Link>
                           </span>
                        </div>
                     </div>
                     {/* END Header */}
                     {/* Sign Up Form */}
                     <div className="row no-gutters justify-content-center">
                        <div className="col-sm-8 col-xl-6">
                           <div className="py-3">
                              <div className="form-group">
                                 <label className="font-w700 font-size-h4">About You</label>
                                 <div className="d-flex">
                                    <input type="text" className="form-control mr-3" placeholder="First Name" value={firstName} onChange={(ev) => this.setState({ firstName: ev.target.value })} />
                                    <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(ev) => this.setState({ lastName: ev.target.value })} />
                                 </div>
                              </div>
                              <div className="form-group">
                                 <input type="email" className="form-control" placeholder="Your Email" value={email} onChange={(ev) => this.setState({ email: ev.target.value })} />
                              </div>
                              <div className="form-group">
                                 <input type="password" className="form-control" placeholder="Password" value={password} onChange={(ev) => this.setState({ password: ev.target.value })} />
                              </div>

                              <div className="form-group">
                                 <label className="font-w700 font-size-h4">Company Info</label>
                                 <input type="text" className="form-control" placeholder="Name of Company or Organisation" value={companyName} onChange={(ev) => this.setState({ companyName: ev.target.value })} />
                              </div>
                              <div className="form-group">
                                 <select className="custom-select form-control" value={location} onChange={(ev) => this.setState({ location: ev.target.value })}>
                                    <optgroup label="––––––––––––––––––––––– " />
                                    <option value={14}>Australia</option>
                                    <option value={39}>Canada</option>
                                    <option value={158}>New Zealand</option>
                                    <option value={203}>South Africa</option>
                                    <option value={231}>United Kingdom</option>
                                    <option value={232}>United States</option>
                                    <optgroup label="––––––––––––––––––––––––––– A" />
                                    <option value={1}>Afghanistan</option>
                                    <option value={2}>Aland Islands</option>
                                    <option value={3}>Albania</option>
                                    <option value={4}>Algeria</option>
                                    <option value={5}>American Samoa</option>
                                    <option value={6}>Andorra</option>
                                    <option value={7}>Angola</option>
                                    <option value={8}>Anguilla</option>
                                    <option value={9}>Antarctica</option>
                                    <option value={10}>Antigua and Barbuda</option>
                                    <option value={11}>Argentina</option>
                                    <option value={12}>Armenia</option>
                                    <option value={13}>Aruba</option>
                                    <option value={14}>Australia</option>
                                    <option value={15}>Austria</option>
                                    <option value={16}>Azerbaijan</option>
                                    <optgroup label="––––––––––––––––––––––––––– B" />
                                    <option value={17}>Bahamas</option>
                                    <option value={18}>Bahrain</option>
                                    <option value={19}>Bangladesh</option>
                                    <option value={20}>Barbados</option>
                                    <option value={21}>Belarus</option>
                                    <option value={22}>Belgium</option>
                                    <option value={23}>Belize</option>
                                    <option value={24}>Benin</option>
                                    <option value={25}>Bermuda</option>
                                    <option value={26}>Bhutan</option>
                                    <option value={27}>Bolivia</option>
                                    <option value={28}>Bosnia and Herzegowina</option>
                                    <option value={29}>Botswana</option>
                                    <option value={30}>Bouvet Island</option>
                                    <option value={31}>Brazil</option>
                                    <option value={32}>British Indian Ocean Territory</option>
                                    <option value={33}>Brunei Darussalam</option>
                                    <option value={34}>Bulgaria</option>
                                    <option value={35}>Burkina Faso</option>
                                    <option value={36}>Burundi</option>
                                    <optgroup label="––––––––––––––––––––––––––– C" />
                                    <option value={37}>Cambodia</option>
                                    <option value={38}>Cameroon</option>
                                    <option value={39}>Canada</option>
                                    <option value={40}>Cape Verde</option>
                                    <option value={41}>Cayman Islands</option>
                                    <option value={42}>Central African Republic</option>
                                    <option value={43}>Chad</option>
                                    <option value={44}>Chile</option>
                                    <option value={45}>China</option>
                                    <option value={46}>Christmas Island</option>
                                    <option value={47}>Cocos (Keeling) Islands</option>
                                    <option value={48}>Colombia</option>
                                    <option value={49}>Comoros</option>
                                    <option value={50}>Congo</option>
                                    <option value={51}>Congo, The Democratic Republic of the</option>
                                    <option value={52}>Cook Islands</option>
                                    <option value={53}>Costa Rica</option>
                                    <option value={54}>Cote d'Ivoire</option>
                                    <option value={55}>Croatia</option>
                                    <option value={56}>Cuba</option>
                                    <option value={57}>Cyprus</option>
                                    <option value={58}>Czech Republic</option>
                                    <optgroup label="––––––––––––––––––––––––––– D" />
                                    <option value={59}>Denmark</option>
                                    <option value={60}>Djibouti</option>
                                    <option value={61}>Dominica</option>
                                    <option value={62}>Dominican Republic</option>
                                    <optgroup label="––––––––––––––––––––––––––– E" />
                                    <option value={63}>Ecuador</option>
                                    <option value={64}>Egypt</option>
                                    <option value={65}>El Salvador</option>
                                    <option value={66}>Equatorial Guinea</option>
                                    <option value={67}>Eritrea</option>
                                    <option value={68}>Estonia</option>
                                    <option value={69}>Ethiopia</option>
                                    <optgroup label="––––––––––––––––––––––––––– F" />
                                    <option value={70}>Falkland Islands (Malvinas)</option>
                                    <option value={71}>Faroe Islands</option>
                                    <option value={72}>Fiji</option>
                                    <option value={73}>Finland</option>
                                    <option value={74}>France</option>
                                    <option value={75}>French Guiana</option>
                                    <option value={76}>French Polynesia</option>
                                    <option value={77}>French Southern Territories</option>
                                    <optgroup label="––––––––––––––––––––––––––– G" />
                                    <option value={78}>Gabon</option>
                                    <option value={79}>Gambia</option>
                                    <option value={80}>Georgia</option>
                                    <option value={81}>Germany</option>
                                    <option value={82}>Ghana</option>
                                    <option value={83}>Gibraltar</option>
                                    <option value={84}>Greece</option>
                                    <option value={85}>Greenland</option>
                                    <option value={86}>Grenada</option>
                                    <option value={87}>Guadeloupe</option>
                                    <option value={88}>Guam</option>
                                    <option value={89}>Guatemala</option>
                                    <option value={90}>Guernsey</option>
                                    <option value={91}>Guinea</option>
                                    <option value={92}>Guinea-Bissau</option>
                                    <option value={93}>Guyana</option>
                                    <optgroup label="––––––––––––––––––––––––––– H" />
                                    <option value={94}>Haiti</option>
                                    <option value={95}>Heard and McDonald Islands</option>
                                    <option value={96}>Holy See (Vatican City State)</option>
                                    <option value={97}>Honduras</option>
                                    <option value={98}>Hong Kong</option>
                                    <option value={99}>Hungary</option>
                                    <optgroup label="––––––––––––––––––––––––––– I" />
                                    <option value={100}>Iceland</option>
                                    <option value={101}>India</option>
                                    <option value={102}>Indonesia</option>
                                    <option value={103}>Iran, Islamic Republic of</option>
                                    <option value={104}>Iraq</option>
                                    <option value={105}>Ireland</option>
                                    <option value={106}>Isle of Man</option>
                                    <option value={107}>Israel</option>
                                    <option value={108}>Italy</option>
                                    <optgroup label="––––––––––––––––––––––––––– J" />
                                    <option value={109}>Jamaica</option>
                                    <option value={110}>Japan</option>
                                    <option value={111}>Jersey</option>
                                    <option value={112}>Jordan</option>
                                    <optgroup label="––––––––––––––––––––––––––– K" />
                                    <option value={113}>Kazakhstan</option>
                                    <option value={114}>Kenya</option>
                                    <option value={115}>Kiribati</option>
                                    <option value={116}>Korea, Democratic People's Republic of</option>
                                    <option value={117}>Korea, Republic of</option>
                                    <option value={118}>Kuwait</option>
                                    <option value={119}>Kyrgyzstan</option>
                                    <optgroup label="––––––––––––––––––––––––––– L" />
                                    <option value={120}>Lao People's Democratic Republic</option>
                                    <option value={121}>Latvia</option>
                                    <option value={122}>Lebanon</option>
                                    <option value={123}>Lesotho</option>
                                    <option value={124}>Liberia</option>
                                    <option value={125}>Libyan Arab Jamahiriya</option>
                                    <option value={126}>Liechtenstein</option>
                                    <option value={127}>Lithuania</option>
                                    <option value={128}>Luxembourg</option>
                                    <optgroup label="––––––––––––––––––––––––––– M" />
                                    <option value={129}>Macao</option>
                                    <option value={130}>Macedonia</option>
                                    <option value={131}>Madagascar</option>
                                    <option value={132}>Malawi</option>
                                    <option value={133}>Malaysia</option>
                                    <option value={134}>Maldives</option>
                                    <option value={135}>Mali</option>
                                    <option value={136}>Malta</option>
                                    <option value={137}>Marshall Islands</option>
                                    <option value={138}>Martinique</option>
                                    <option value={139}>Mauritania</option>
                                    <option value={140}>Mauritius</option>
                                    <option value={141}>Mayotte</option>
                                    <option value={142}>Mexico</option>
                                    <option value={143}>Micronesia, Federated States of</option>
                                    <option value={144}>Moldova</option>
                                    <option value={145}>Monaco</option>
                                    <option value={146}>Mongolia</option>
                                    <option value={147}>Montenegro</option>
                                    <option value={148}>Montserrat</option>
                                    <option value={149}>Morocco</option>
                                    <option value={150}>Mozambique</option>
                                    <option value={151}>Myanmar</option>
                                    <optgroup label="––––––––––––––––––––––––––– N" />
                                    <option value={152}>Namibia</option>
                                    <option value={153}>Nauru</option>
                                    <option value={154}>Nepal</option>
                                    <option value={155}>Netherlands</option>
                                    <option value={156}>Netherlands Antilles</option>
                                    <option value={157}>New Caledonia</option>
                                    <option value={158}>New Zealand</option>
                                    <option value={159}>Nicaragua</option>
                                    <option value={160}>Niger</option>
                                    <option value={161}>Nigeria</option>
                                    <option value={162}>Niue</option>
                                    <option value={163}>Norfolk Island</option>
                                    <option value={164}>Northern Mariana Islands</option>
                                    <option value={165}>Norway</option>
                                    <optgroup label="––––––––––––––––––––––––––– O" />
                                    <option value={166}>Oman</option>
                                    <optgroup label="––––––––––––––––––––––––––– P" />
                                    <option value={167}>Pakistan</option>
                                    <option value={168}>Palau</option>
                                    <option value={169}>Palestinian Territory</option>
                                    <option value={170}>Panama</option>
                                    <option value={171}>Papua New Guinea</option>
                                    <option value={172}>Paraguay</option>
                                    <option value={173}>Peru</option>
                                    <option value={174}>Philippines</option>
                                    <option value={175}>Pitcairn</option>
                                    <option value={176}>Poland</option>
                                    <option value={177}>Portugal</option>
                                    <option value={178}>Puerto Rico</option>
                                    <optgroup label="––––––––––––––––––––––––––– Q" />
                                    <option value={179}>Qatar</option>
                                    <optgroup label="––––––––––––––––––––––––––– R" />
                                    <option value={180}>Reunion</option>
                                    <option value={181}>Romania</option>
                                    <option value={182}>Russian Federation</option>
                                    <option value={183}>Rwanda</option>
                                    <optgroup label="––––––––––––––––––––––––––– S" />
                                    <option value={184}>Saint Barthelemy</option>
                                    <option value={185}>Saint Helena</option>
                                    <option value={186}>Saint Kitts and Nevis</option>
                                    <option value={187}>Saint Lucia</option>
                                    <option value={188}>Saint Pierre and Miquelon</option>
                                    <option value={189}>Saint Vincent and the Grenadines</option>
                                    <option value={190}>Samoa</option>
                                    <option value={191}>San Marino</option>
                                    <option value={192}>Sao Tome and Principe</option>
                                    <option value={193}>Saudi Arabia</option>
                                    <option value={194}>Senegal</option>
                                    <option value={195}>Serbia</option>
                                    <option value={196}>Seychelles</option>
                                    <option value={197}>Sierra Leone</option>
                                    <option value={198}>Singapore</option>
                                    <option value={199}>Slovakia</option>
                                    <option value={200}>Slovenia</option>
                                    <option value={201}>Solomon Islands</option>
                                    <option value={202}>Somalia</option>
                                    <option value={203}>South Africa</option>
                                    <option value={204}>South Georgia and the South Sandwich Islands</option>
                                    <option value={205}>Spain</option>
                                    <option value={206}>Sri Lanka</option>
                                    <option value={207}>Sudan</option>
                                    <option value={208}>Suriname</option>
                                    <option value={209}>Svalbard and Jan Mayen</option>
                                    <option value={210}>Swaziland</option>
                                    <option value={211}>Sweden</option>
                                    <option value={212}>Switzerland</option>
                                    <option value={213}>Syrian Arab Republic</option>
                                    <optgroup label="––––––––––––––––––––––––––– T" />
                                    <option value={214}>Taiwan</option>
                                    <option value={215}>Tajikistan</option>
                                    <option value={216}>Tanzania, United Republic of</option>
                                    <option value={217}>Thailand</option>
                                    <option value={218}>Timor-Leste</option>
                                    <option value={219}>Togo</option>
                                    <option value={220}>Tokelau</option>
                                    <option value={221}>Tonga</option>
                                    <option value={222}>Trinidad and Tobago</option>
                                    <option value={223}>Tunisia</option>
                                    <option value={224}>Turkey</option>
                                    <option value={225}>Turkmenistan</option>
                                    <option value={226}>Turks and Caicos Islands</option>
                                    <option value={227}>Tuvalu</option>
                                    <optgroup label="––––––––––––––––––––––––––– U" />
                                    <option value={228}>Uganda</option>
                                    <option value={229}>Ukraine</option>
                                    <option value={230}>United Arab Emirates</option>
                                    <option value={231}>United Kingdom</option>
                                    <option value={232}>United States</option>
                                    <option value={233}>United States Minor Outlying Islands</option>
                                    <option value={234}>Uruguay</option>
                                    <option value={235}>Uzbekistan</option>
                                    <optgroup label="––––––––––––––––––––––––––– V" />
                                    <option value={236}>Vanuatu</option>
                                    <option value={237}>Venezuela</option>
                                    <option value={238}>Vietnam</option>
                                    <option value={239}>Virgin Islands, British</option>
                                    <option value={240}>Virgin Islands, U.S.</option>
                                    <optgroup label="––––––––––––––––––––––––––– W" />
                                    <option value={241}>Wallis and Futuna</option>
                                    <option value={242}>Western Sahara</option>
                                    <optgroup label="––––––––––––––––––––––––––– Y" />
                                    <option value={243}>Yemen</option>
                                    <optgroup label="––––––––––––––––––––––––––– Z" />
                                    <option value={244}>Zambia</option>
                                    <option value={245}>Zimbabwe</option>
                                 </select>
                              </div>
                           </div>
                           <div className="form-group">
                              <button type="submit" className="btn btn-block btn-hero-lg btn-hero-primary" disabled={this.props.loading} onClick={this.onHandleSubmit}>
                                 {
                                    this.props.loading ?
                                       <i className="fa fa-fw fa-circle-notch fa-spin mr-1" />
                                       : <i className="fa fa-fw fa-plus mr-1" />
                                 }
                                 Create Account
                              </button>
                              <p className="mt-4 mb-0 d-lg-flex justify-content-center">
                                 By creating an account, you agree to Quotehard’s
                                 {/* <a href="https://www.quotientapp.com/terms" className="px-1">Terms of Service.</a> */}
                                 <a href="#" className="px-1">Terms of Service.</a>
                              </p>
                           </div>
                        </div>
                     </div>
                     {/* END Sign Up Form */}
                  </div>
               </div>
               {/* END Main Section */}
               {/* Meta InfoInColumns Section */}

               {/* END Meta InfoInColumns Section */}
            </div>
         </main>
      );
   }
}

const mapStateToProps = ({ auth, commonData }) => {
   const { authUser } = auth;
   const { status, loading, error, message } = commonData;
   return { authUser, status, loading, error, message }
};
const mapDispatchToProps = { userSignUp };
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
