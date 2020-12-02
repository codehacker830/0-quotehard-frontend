import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeamMembers } from '../../../../actions/Team';

class QuoteSettings extends Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
         teamMembers: []
      };
   }
   componentDidMount() {
      this.props.getTeamMembers();
   }
   render() {
      const settings = { ... this.props };
      console.log(" Quote Settings =>", settings);
      return (
         <div className="col-sm-6">
            <div
               className="pl-4 py-2"
               style={{ borderLeft: "4px solid #eee" }}
            >
               <h3>Quote Settings</h3>
               <div className="pb-2">
                  <label htmlFor="_expiry_date_date" className="text-gray fa-xs text-uppercase">Valid Until</label>
                  <div className="d-flex">
                     <div className="w-75 pr-2">
                        <input type="text"
                           id="_expiry_date_date"
                           className="form-control mr-2 rounded-0"
                           value={this.props.validDate}
                           onChange={(ev) => this.props.updateValidDate(ev.target.value)}
                        />
                        <label htmlFor="_expiry_date_date" className="text-info fa-xs">YYYY/MM/DD</label>
                     </div>
                     <div>
                        <input type="text"
                           id="_expiry_date_time"
                           className="form-control rounded-0"
                           value={this.props.validTime}
                           onChange={(ev) => this.props.updateValidTime(ev.target.value)}
                        />
                        <label htmlFor="_expiry_date_time" className="text-info fa-xs">HH:mm</label>
                     </div>
                  </div>
               </div>
               <div className={`mb-3 ${this.state.show ? "" : "d-none"}`}>
                  <div className="pb-2">
                     <label htmlFor="_sent_when_date" className="text-gray fa-xs text-uppercase">Date</label>
                     <div className="d-flex">
                        <div className="w-75 pr-2">
                           <input type="text"
                              id="_sent_when_date"
                              className="form-control mr-2 rounded-0"
                              value={this.props.sentDate}
                              onChange={(ev) => this.props.updateSentDate(ev.target.value)}
                           />
                           <label htmlFor="_sent_when_date" className="text-info fa-xs">YYYY/MM/DD</label>
                        </div>
                        <div>
                           <input type="text"
                              id="_sent_when_time"
                              className="form-control rounded-0"
                              value={this.props.sentTime}
                              onChange={(ev) => this.props.updateSentTime(ev.target.value)} />
                           <label htmlFor="_sent_when_time" className="text-info fa-xs">HH:mm</label>
                        </div>
                     </div>
                     <p className="fa-xs text-secondary">
                        <span className="label mr-1">TIP</span>
                  Leave empty to set automatically (when Sent)
               </p>
                  </div>
                  <div className="pb-2">
                     <label htmlFor="quantity" className="text-gray fa-xs text-uppercase">FROM</label>
                     <select className="custom-select rounded-0"
                        value={this.props.userFrom}
                        onChange={(ev) => this.props.updateSettings({ ...settings, userFrom: ev.target.value })}>
                        {
                           this.props.teamSetting.teamMembers.map((mate, index) => {
                              const mateFullName = mate.firstName + " " + mate.lastName;
                              return (<option value={mate._id} key={index}>{mateFullName}</option>);
                           })
                        }

                     </select>
                  </div>
                  <div className="pb-2">
                     <label htmlFor="quote_discount_overall" className="text-gray fa-xs text-uppercase">DISCOUNT %</label>
                     <input type="number"
                        id="quote_discount_overall"
                        className="form-control rounded-0 maxWidth-180"
                        value={this.props.discount}
                        onChange={(ev) => {
                           const discount = ev.target.value === "" ? 0 : ev.target.value;
                           this.props.updateSettings({ ...settings, discount })
                        }}
                     />
                  </div>
                  <div className="pb-2">
                     <label htmlFor="quote_currency_id" className="text-gray fa-xs text-uppercase">CURRENCY</label>
                     <select className="custom-select rounded-0"
                        id="quote_currency_id"
                        value={this.props.currency}
                        onChange={(ev) => this.props.updateSettings({ ...settings, currency: ev.target.value })}
                     >
                        <optgroup label="––––––––––––––––––––––– " />
                        <option value={8}>Australia Dollar</option>
                        <option value={27}>Canada Dollar</option>
                        <option value={107}>New Zealand Dollar</option>
                        <option value={134}>South Africa Rand</option>
                        <option value={155}>United Kingdom Pound</option>
                        <option value={156}>United States Dollar</option>
                        <optgroup label="––––––––––––––––––––––––––– A" />
                        <option value={1}>Afghanistan Afghani</option>
                        <option value={2}>Albania Lek</option>
                        <option value={3}>Algerian Dinar</option>
                        <option value={4}>Angolan Kwanza</option>
                        <option value={5}>Argentina Peso</option>
                        <option value={6}>Armenian Dram</option>
                        <option value={7}>Aruba Guilder</option>
                        <option value={8}>Australia Dollar</option>
                        <option value={9}>Azerbaijan New Manat</option>
                        <optgroup label="––––––––––––––––––––––––––– B" />
                        <option value={10}>Bahamas Dollar</option>
                        <option value={11}>Bahraini Dinar</option>
                        <option value={12}>Bangladeshi Taka</option>
                        <option value={13}>Barbados Dollar</option>
                        <option value={14}>Belarus Ruble</option>
                        <option value={15}>Belize Dollar</option>
                        <option value={16}>Bermuda Dollar</option>
                        <option value={17}>Bhutanese Ngultrum</option>
                        <option value={18}>Bitcoin</option>
                        <option value={19}>Bolivia Boliviano</option>
                        <option value={20}>Bosnia and Herzegovina Convertible Marka</option>
                        <option value={21}>Botswana Pula</option>
                        <option value={22}>Brazil Real</option>
                        <option value={23}>Brunei Darussalam Dollar</option>
                        <option value={24}>Bulgaria Lev</option>
                        <option value={25}>Burundian Franc</option>
                        <optgroup label="––––––––––––––––––––––––––– C" />
                        <option value={26}>Cambodia Riel</option>
                        <option value={27}>Canada Dollar</option>
                        <option value={28}>Cape Verdean Escudo</option>
                        <option value={29}>Cayman Islands Dollar</option>
                        <option value={30}>Central African CFA Franc</option>
                        <option value={31}>CFP Franc</option>
                        <option value={32}>Chile Peso</option>
                        <option value={33}>China Yuan Renminbi</option>
                        <option value={34}>Colombia Peso</option>
                        <option value={35}>Comorian Franc</option>
                        <option value={36}>Congolese Franc</option>
                        <option value={37}>Costa Rica Colon</option>
                        <option value={38}>Croatia Kuna</option>
                        <option value={39}>Cuba Peso</option>
                        <option value={40}>Cuban Convertible Peso</option>
                        <option value={41}>Czech Republic Koruna</option>
                        <optgroup label="––––––––––––––––––––––––––– D" />
                        <option value={42}>Denmark Krone</option>
                        <option value={43}>Djiboutian Franc</option>
                        <option value={44}>Dominican Republic Peso</option>
                        <optgroup label="––––––––––––––––––––––––––– E" />
                        <option value={45}>East Caribbean Dollar</option>
                        <option value={46}>Egypt Pound</option>
                        <option value={47}>El Salvador Colon</option>
                        <option value={48}>Eritrean Nakfa</option>
                        <option value={49}>Estonia Kroon</option>
                        <option value={50}>Ethiopian Birr</option>
                        <option value={51}>Euro Member Countries</option>
                        <optgroup label="––––––––––––––––––––––––––– F" />
                        <option value={52}>Falkland Islands (Malvinas) Pound</option>
                        <option value={53}>Fiji Dollar</option>
                        <optgroup label="––––––––––––––––––––––––––– G" />
                        <option value={54}>Gambian Dalasi</option>
                        <option value={55}>Georgian Lari</option>
                        <option value={56}>Ghana Cedis</option>
                        <option value={57}>Gibraltar Pound</option>
                        <option value={58}>Guatemala Quetzal</option>
                        <option value={59}>Guernsey Pound</option>
                        <option value={60}>Guinean Franc</option>
                        <option value={61}>Guyana Dollar</option>
                        <optgroup label="––––––––––––––––––––––––––– H" />
                        <option value={62}>Haitian Gourde</option>
                        <option value={63}>Honduras Lempira</option>
                        <option value={64}>Hong Kong Dollar</option>
                        <option value={65}>Hungary Forint</option>
                        <optgroup label="––––––––––––––––––––––––––– I" />
                        <option value={66}>Iceland Krona</option>
                        <option value={67}>India Rupee</option>
                        <option value={68}>Indonesia Rupiah</option>
                        <option value={69}>Iran Rial</option>
                        <option value={70}>Iraqi Dinar</option>
                        <option value={71}>Isle of Man Pound</option>
                        <option value={72}>Israel Shekel</option>
                        <optgroup label="––––––––––––––––––––––––––– J" />
                        <option value={73}>Jamaica Dollar</option>
                        <option value={74}>Japan Yen</option>
                        <option value={75}>Jersey Pound</option>
                        <option value={76}>Jordanian Dinar</option>
                        <optgroup label="––––––––––––––––––––––––––– K" />
                        <option value={77}>Kazakhstan Tenge</option>
                        <option value={78}>Kenyan Shilling</option>
                        <option value={79}>Korea (North) Won</option>
                        <option value={80}>Korea (South) Won</option>
                        <option value={81}>Kuwaiti Dinar</option>
                        <option value={82}>Kyrgyzstan Som</option>
                        <optgroup label="––––––––––––––––––––––––––– L" />
                        <option value={83}>Laos Kip</option>
                        <option value={84}>Latvia Lat</option>
                        <option value={85}>Lebanon Pound</option>
                        <option value={86}>Lesotho Loti</option>
                        <option value={87}>Liberia Dollar</option>
                        <option value={88}>Libyan Dinar</option>
                        <option value={89}>Lithuania Litas</option>
                        <optgroup label="––––––––––––––––––––––––––– M" />
                        <option value={90}>Macanese Pataca</option>
                        <option value={91}>Macedonia Denar</option>
                        <option value={92}>Malagasy Ariary</option>
                        <option value={93}>Malawian Kwacha</option>
                        <option value={94}>Malaysia Ringgit</option>
                        <option value={95}>Maldivian Rufiyaa</option>
                        <option value={96}>Mauritanian Ouguiya</option>
                        <option value={97}>Mauritius Rupee</option>
                        <option value={98}>Mexico Peso</option>
                        <option value={99}>Moldovan Leu</option>
                        <option value={100}>Mongolia Tughrik</option>
                        <option value={101}>Moroccan Dirham</option>
                        <option value={102}>Mozambique Metical</option>
                        <option value={103}>Myanmar Kyat</option>
                        <optgroup label="––––––––––––––––––––––––––– N" />
                        <option value={104}>Namibia Dollar</option>
                        <option value={105}>Nepal Rupee</option>
                        <option value={106}>Netherlands Antilles Guilder</option>
                        <option value={107}>New Zealand Dollar</option>
                        <option value={108}>Nicaragua Cordoba</option>
                        <option value={109}>Nigeria Naira</option>
                        <option value={110}>Norway Krone</option>
                        <optgroup label="––––––––––––––––––––––––––– O" />
                        <option value={111}>Oman Rial</option>
                        <optgroup label="––––––––––––––––––––––––––– P" />
                        <option value={112}>Pakistan Rupee</option>
                        <option value={113}>Panama Balboa</option>
                        <option value={114}>Papua New Guinean Kina</option>
                        <option value={115}>Paraguay Guarani</option>
                        <option value={116}>Peru Nuevo Sol</option>
                        <option value={117}>Philippines Peso</option>
                        <option value={118}>Poland Zloty</option>
                        <optgroup label="––––––––––––––––––––––––––– Q" />
                        <option value={119}>Qatar Riyal</option>
                        <optgroup label="––––––––––––––––––––––––––– R" />
                        <option value={120}>Romania New Leu</option>
                        <option value={121}>Russia Ruble</option>
                        <option value={122}>Rwandan Franc</option>
                        <optgroup label="––––––––––––––––––––––––––– S" />
                        <option value={123}>Saint Helena Pound</option>
                        <option value={124}>Samoan Tala</option>
                        <option value={125}>São Tomé and Príncipe Dobra</option>
                        <option value={126}>Saudi Arabia Riyal</option>
                        <option value={127}>Serbia Dinar</option>
                        <option value={128}>Seychelles Rupee</option>
                        <option value={129}>Sierra Leonean Leone</option>
                        <option value={130}>Singapore Dollar</option>
                        <option value={131}>Slovak Koruna</option>
                        <option value={132}>Solomon Islands Dollar</option>
                        <option value={133}>Somalia Shilling</option>
                        <option value={134}>South Africa Rand</option>
                        <option value={135}>Sri Lanka Rupee</option>
                        <option value={136}>Sudanese Pound</option>
                        <option value={137}>Suriname Dollar</option>
                        <option value={138}>Swazi Lilangeni</option>
                        <option value={139}>Sweden Krona</option>
                        <option value={140}>Swiss Franc</option>
                        <option value={141}>Syria Pound</option>
                        <optgroup label="––––––––––––––––––––––––––– T" />
                        <option value={142}>Taiwan New Dollar</option>
                        <option value={143}>Tajikistani Somoni</option>
                        <option value={165}>Tanzanian Shilling</option>
                        <option value={144}>Thailand Baht</option>
                        <option value={145}>Tongan Pa'anga</option>
                        <option value={146}>Trinidad and Tobago Dollar</option>
                        <option value={147}>Tunisian Dinar</option>
                        <option value={148}>Turkey Lira</option>
                        <option value={150}>Turkmenistani Manat</option>
                        <option value={151}>Tuvalu Dollar</option>
                        <optgroup label="––––––––––––––––––––––––––– U" />
                        <option value={152}>Ugandan Shilling</option>
                        <option value={153}>Ukraine Hryvna</option>
                        <option value={154}>United Arab Emirates Dirham</option>
                        <option value={155}>United Kingdom Pound</option>
                        <option value={156} >United States Dollar</option>
                        <option value={157}>Uruguay Peso</option>
                        <option value={158}>Uzbekistan Som</option>
                        <optgroup label="––––––––––––––––––––––––––– V" />
                        <option value={159}>Venezuela Bolivar</option>
                        <option value={160}>Viet Nam Dong</option>
                        <optgroup label="––––––––––––––––––––––––––– W" />
                        <option value={161}>West African CFA Franc</option>
                        <optgroup label="––––––––––––––––––––––––––– Y" />
                        <option value={162}>Yemen Rial</option>
                        <optgroup label="––––––––––––––––––––––––––– Z" />
                        <option value={163}>Zambian Kwacha</option>
                        <option value={164}>Zimbabwe Dollar</option>
                     </select>
                  </div>
                  <div className="pb-2">
                     <label htmlFor="quantity" className="text-gray fa-xs text-uppercase">AMOUNTS ARE</label>
                     <select className="custom-select rounded-0"
                        value={this.props.taxMode}
                        onChange={(ev) => this.props.updateSettings({ ...settings, taxMode: ev.target.value })}>
                        <option value="exclusive_including">Tax Exclusive (Inclusive Total)</option>
                        <option value="exclusive_excluding">Tax Exclusive</option>
                        <option value="inclusive">Tax Inclusive</option>
                        <option value="no_tax">No Tax</option>
                     </select>
                  </div>
                  <div className="pb-2">
                     <label htmlFor="quantity" className="text-gray fa-xs text-uppercase">PRICING DISPLAY LEVEL</label>
                     <p className="text-secondary fa-xs">Choose the level of pricing details to present to your customer.</p>
                     <div className="custom-control custom-radio custom-control-primary mb-1">
                        <input type="radio"
                           className="custom-control-input"
                           id="pricing-display-level1"
                           name="pricing-display-level"
                           value="itemQuantityAndTotal"
                           checked={this.props.pricingDisplayLevel === "itemQuantityAndTotal"}
                           onChange={(ev) => this.props.updateSettings({ ...settings, pricingDisplayLevel: ev.target.value })}
                        />
                        <label className="custom-control-label" htmlFor="pricing-display-level1">Item Quantity & Total</label>
                     </div>
                     <div className="custom-control custom-radio custom-control-primary mb-1">
                        <input type="radio"
                           className="custom-control-input"
                           id="price-display-level2"
                           name="pricing-display-level"
                           value="itemQuantity"
                           checked={this.props.pricingDisplayLevel === "itemQuantity"}
                           onChange={(ev) => this.props.updateSettings({ ...settings, pricingDisplayLevel: ev.target.value })}
                        />
                        <label className="custom-control-label" htmlFor="price-display-level2">Item Quantity</label>
                     </div>
                     <div className="custom-control custom-radio custom-control-primary mb-1">
                        <input type="radio"
                           className="custom-control-input"
                           id="pricing-display-level3"
                           name="pricing-display-level"
                           value="itemTotal"
                           checked={this.props.pricingDisplayLevel === "itemTotal"}
                           onChange={(ev) => this.props.updateSettings({ ...settings, pricingDisplayLevel: ev.target.value })}
                        />
                        <label className="custom-control-label" htmlFor="pricing-display-level3">Item Total</label>
                     </div>
                     <div className="custom-control custom-radio custom-control-primary mb-1">
                        <input type="radio"
                           className="custom-control-input"
                           id="pricing-display-level4"
                           name="pricing-display-level"
                           value="hideAll"
                           checked={this.props.pricingDisplayLevel === "hideAll"}
                           onChange={(ev) => this.props.updateSettings({ ...settings, pricingDisplayLevel: ev.target.value })}
                        />
                        <label className="custom-control-label" htmlFor="pricing-display-level4">Hide All</label>
                     </div>
                     <hr />
                     <div className="custom-control custom-checkbox custom-control-primary mb-1">
                        <input type="checkbox"
                           id="display-item-code"
                           className="custom-control-input"
                           name="display-item-code"
                           checked={this.props.displayItemCode}
                           onChange={(ev) => this.props.updateSettings({ ...settings, displayItemCode: !this.props.displayItemCode })}
                        />
                        <label className="custom-control-label" htmlFor="display-item-code">Display Item Code Always</label>
                     </div>
                  </div>
               </div>
               <button type="button" className="btn btn-outline-dark" onClick={() => this.setState({ show: !this.state.show })}>{this.state.show ? "Hide" : "Show All..."}</button>

            </div>
         </div>
      );
   }
}

const mapStateToProps = ({ auth, teamSetting }) => {
   return { auth, teamSetting };
}

const mapDispatchToProps = { getTeamMembers };
export default connect(mapStateToProps, mapDispatchToProps)(QuoteSettings);