import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const QuoteDefaults = (props) => {
   const [taxMode, setTaxMode] = useState("exclusive_excluding");
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <h2 className="my-4">Quote Defaults</h2>
            <h3 className="mb-2">Expire Quotes</h3>
            <div className="ml-3 mb-5">
               <div className="mb-2">
                  <label htmlFor="account_expire_days">Expire Quotes After</label>
                  <div className="input-group maxWidth-180">
                     <input type="text" className="form-control rounded-0" id="example-group1-input2" name="example-group1-input2" defaultValue={90} />
                     <div className="input-group-append">
                        <span className="input-group-text">days</span>
                     </div>
                  </div>
               </div>
            </div>

            <h3 className="mb-2">Quote Number</h3>
            <div className="ml-3 mb-5">
               <div className="mb-2">
                  <label htmlFor="account_expire_days">Set the Next Quote Number (last number: 5)</label>
                  <input type="text" className="form-control rounded-0 maxWidth-180" id="example-group1-input2" name="example-group1-input2" defaultValue={6} />
               </div>
            </div>

            <h3 className="mb-2">Currency &amp; Tax</h3>
            <div className="ml-3 mb-5">
               <div className="mb-2">
                  <label htmlFor="account_currency_id">Select</label>
                  <select className="form-control rounded-0 maxWidth-300" id="account_currency_id" name="account_currency_id">
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
                     <option value={156}>United States Dollar</option>
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
               <div className="mb-2">
                  <label htmlFor="account_amounts_entered">Select</label>
                  <select className="form-control rounded-0 maxWidth-300"
                     // defaultValue={`exclusive_excluding`}
                     id="account_amounts_entered"
                     name="account_amounts_entered"
                     value={taxMode}
                     onChange={(ev) => setTaxMode(ev.target.value)}>
                     <option value="exclusive_including">Tax Exclusive (Inclusive Total)</option>
                     <option value="exclusive_excluding">Tax Exclusive</option>
                     <option value="inclusive">Tax Inclusive</option>
                     <option value="no_tax">No Tax</option>
                  </select>
               </div>
            </div>

            <h3 className="mb-2">Pricing Display Level</h3>
            <div className="ml-3 mb-5">
               <div className="mb-2">
                  <label>Choose the level of pricing details to present to your customer.</label>
                  <div className="form-check">
                     <input className="form-check-input" type="radio" id="example-radios-default1" name="example-radios-default" defaultValue="option1" defaultChecked />
                     <label className="form-check-label" htmlFor="example-radios-default1">Item Quantity & Total</label>
                  </div>
                  <div className="form-check">
                     <input className="form-check-input" type="radio" id="example-radios-default2" name="example-radios-default" defaultValue="option2" />
                     <label className="form-check-label" htmlFor="example-radios-default2">Item Quantity</label>
                  </div>
                  <div className="form-check">
                     <input className="form-check-input" type="radio" id="example-radios-default3" name="example-radios-default" defaultValue="option2" />
                     <label className="form-check-label" htmlFor="example-radios-default3">Item Total</label>
                  </div>
                  <div className="form-check">
                     <input className="form-check-input" type="radio" id="example-radios-default3" name="example-radios-default" defaultValue="option2" />
                     <label className="form-check-label" htmlFor="example-radios-default3">Hide All</label>
                  </div>
                  <hr />
                  <div className="form-check">
                     <input className="form-check-input" type="checkbox" defaultValue id="display-itemcode" name="display-itemcode" />
                     <label className="form-check-label" htmlFor="display-itemcode">Display Item Code Always</label>
                  </div>

               </div>
            </div>

            <h3 className="mb-2">Cost Price &amp; Margin</h3>
            <div className="ml-3 mb-5">
               <div className="mb-2">
                  <div className="form-check">
                     <input className="form-check-input" type="checkbox" defaultValue id="showCostPrice" name="showCostPrice" />
                     <label className="form-check-label" htmlFor="showCostPrice">
                        Always show Cost Price, when editing
                        <p className="text-secondary fa-xs">Check this box if you enter a Cost Price often</p>
                     </label>
                  </div>
               </div>
               <div className="mb-2">
                  <label htmlFor="account_expire_days">Default Margin</label>
                  <div className="input-group maxWidth-180">
                     <input type="text" className="form-control rounded-0" id="example-group1-input2" name="example-group1-input2" defaultValue={20} />
                     <div className="input-group-append">
                        <span className="input-group-text">%</span>
                     </div>
                     <p className="text-secondary fa-xs">Leave empty for no default</p>
                  </div>
               </div>
            </div>

            <div className="mb-4">
               <button className="btn btn-lg btn-rounded btn-hero-primary mr-2">Save</button>
               <Link className="btn btn-lg btn-rounded btn-hero-secondary" to="/app/settings">Cancel</Link>
            </div>
         </div>
      </React.Fragment>
   )
}

export default QuoteDefaults