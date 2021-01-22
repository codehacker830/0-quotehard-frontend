import React, { useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeLogo, updateAppearanceSetting, uploadLogo } from '../../../actions/AppearanceSetting';
import { getQuoteDefaultSetting, updateQuoteDefaultSetting } from '../../../actions/QuoteDefautSetting';
import { getDefaultSalesTax } from '../../../actions/SalesSetting';
import { ACCOUNT_COMPANY_DATA, GET_SALES_TAXES, LOGO_URL } from '../../../constants/ActionTypes';
import axios from '../../../util/Api';

export const QuickStart = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();
   const hiddenFileInput = useRef();
   const accountCompany = useSelector(state => state.auth.accountCompany);
   const appearanceSetting = useSelector(state => state.appearanceSetting);
   const quoteDefaultSetting = useSelector(state => state.quoteDefaultSetting);
   const salesSetting = useSelector(state => state.salesSetting);
   const commonData = useSelector(state => state.commonData);
   const logo = useSelector(state => appearanceSetting.logo);
   useEffect(() => {
      dispatch(getQuoteDefaultSetting());
      dispatch(getDefaultSalesTax());
   }, [])
   const defaultSalexTax = salesSetting.salesTaxes.find(item => item._id === salesSetting.defaultSalesTax);
   const handleClickFileOpen = () => {
      hiddenFileInput.current.click();
   }
   const {
      timeZone,
      companyDisplayName,
      address,
      website,
      phone
   } = accountCompany;
   const {
      describeTaxAs,
   } = appearanceSetting;
   const {
      currency,
      taxMode,
   } = quoteDefaultSetting;

   const onClickSave = () => {
      if (!companyDisplayName) { toast.success("Please enter an Company Name"); return; }
      const payload = {
         accountCompany: {
            logo,
            timeZone,
            companyDisplayName,
            address,
            website,
            phone
         },
         quoteDefaultSetting: {
            currency,
            taxMode,
         },
         appearanceSetting: {
            describeTaxAs
         },
         defaultSalesTaxRate: defaultSalexTax.taxRate
      };
      console.log(" PAYLOAD --", payload)
      axios.post('/settings/quick-start', payload)
         .then(({ data }) => {
            history.push('/app');
         }).catch(err => {
            console.error("Failed to setup quick start setting.")
         });
   }
   return (
      <div>
         <div className="h1StartWelcome">
            <h1>Account created. Welcome&nbsp;aboard!</h1>
            <h3>You can jump in and get started&nbsp;now.</h3>
            <Link className="btn btn-primary btn-lg rounded-0" to="/app">View your Dashboard</Link>
         </div>

         <div className="content d-flex">
            <div className="maxWidth-800 px-3 mx-auto">
               {/* Time Zone */}
               <h4 className="mb-2">Time Zone</h4>
               <div className="ml-3 mb-5">
                  <select className="form-control rounded-0 maxWidth-550" id="timeZone" name="timeZone"
                     value={timeZone}
                     onChange={(ev) => dispatch({ type: ACCOUNT_COMPANY_DATA, payload: { ...accountCompany, timeZone: ev.target.value } })}
                  >
                     <optgroup label=" –––––– US &amp; Canada">
                        <option value={10001}>Hawaii (GMT-10:00)</option>
                        <option value={20001}>Alaska (GMT-09:00)</option>
                        <option value={30002}>Pacific Time (GMT-08:00 / US &amp; Canada)</option>
                        <option value={40000}>Mountain Time (GMT-07:00 / US &amp; Canada)</option>
                        <option value={40002}>Arizona (GMT-07:00)</option>
                        <option value={50003}>Central Time (GMT-06:00 / US &amp; Canada)</option>
                        <option value={60000}>Eastern Time (GMT-05:00 / US &amp; Canada)</option>
                        <option value={60003}>Indiana (GMT-05:00 / East)</option>
                     </optgroup>
                     <optgroup label=" –––––– United Kingdom">
                        <option value={110003}>London (GMT)</option>
                     </optgroup>
                     <optgroup label=" –––––– Australia">
                        <option value={190002}>Perth (GMT+08:00)</option>
                        <option value={194500}>Eucla (GMT+08:45)</option>
                        <option value={203000}>Adelaide (GMT+09:30)</option>
                        <option value={203001}>Darwin (GMT+09:30)</option>
                        <option value={210000}>Brisbane (GMT+10:00)</option>
                        <option value={210001}>Hobart (GMT+10:00)</option>
                        <option value={210002}>Melbourne (GMT+10:00)</option>
                        <option value={210003}>Sydney (GMT+10:00)</option>
                        <option value={213000}>Lord Howe Island (GMT+10:30)</option>
                     </optgroup>
                     <optgroup label=" –––––– New Zealand">
                        <option value={230001}>Auckland, Wellington, Hamilton (GMT+12:00)</option>
                     </optgroup>
                     <optgroup label=" –––––– South Africa">
                        <option value={130004}>Johannesburg, Harare, Pretoria</option>
                     </optgroup>
                     <optgroup label=" ––––––  ">
                        <option value={1}>(GMT-11:00) Midway Island, Samoa</option>
                        <option value={10000}>(GMT-10:00) Hawaii-Aleutian</option>
                        <option value={10001}>(GMT-10:00) Hawaii</option>
                        <option value={17000}>(GMT-09:30) Marquesas Islands</option>
                        <option value={20000}>(GMT-09:00) Gambier Islands</option>
                        <option value={20001}>(GMT-09:00) Alaska</option>
                        <option value={30000}>(GMT-08:00) Tijuana, Baja California</option>
                        <option value={30001}>(GMT-08:00) Pitcairn Islands</option>
                        <option value={30002}>(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                        <option value={40000}>(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                        <option value={40001}>(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
                        <option value={40002}>(GMT-07:00) Arizona</option>
                        <option value={50000}>(GMT-06:00) Saskatchewan, Central America</option>
                        <option value={50001}>(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
                        <option value={50002}>(GMT-06:00) Easter Island</option>
                        <option value={50003}>(GMT-06:00) Central Time (US &amp; Canada)</option>
                        <option value={60000}>(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                        <option value={60001}>(GMT-05:00) Cuba</option>
                        <option value={60002}>(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
                        <option value={60003}>(GMT-05:00) Indiana (East)</option>
                        <option value={67000}>(GMT-04:30) Caracas</option>
                        <option value={70000}>(GMT-04:00) Santiago</option>
                        <option value={70001}>(GMT-04:00) La Paz</option>
                        <option value={70002}>(GMT-04:00) Faukland Islands</option>
                        <option value={70003}>(GMT-04:00) Brazil</option>
                        <option value={70004}>(GMT-04:00) Atlantic Time (Goose Bay)</option>
                        <option value={70005}>(GMT-04:00) Atlantic Time (Canada)</option>
                        <option value={77000}>(GMT-03:30) Newfoundland</option>
                        <option value={80000}>(GMT-03:00) UTC-3</option>
                        <option value={80001}>(GMT-03:00) Montevideo</option>
                        <option value={80002}>(GMT-03:00) Miquelon, St. Pierre</option>
                        <option value={80003}>(GMT-03:00) Greenland</option>
                        <option value={80004}>(GMT-03:00) Buenos Aires</option>
                        <option value={80005}>(GMT-03:00) Brasilia</option>
                        <option value={90000}>(GMT-02:00) Mid-Atlantic</option>
                        <option value={100000}>(GMT-01:00) Cape Verde Is.</option>
                        <option value={100001}>(GMT-01:00) Azores</option>
                        <option value={110000}>(GMT) Greenwich Mean Time : Belfast</option>
                        <option value={110001}>(GMT) Greenwich Mean Time : Dublin</option>
                        <option value={110002}>(GMT) Greenwich Mean Time : Lisbon</option>
                        <option value={110003}>(GMT) Greenwich Mean Time : London</option>
                        <option value={110004}>(GMT) Monrovia, Reykjavik</option>
                        <option value={120000}>(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                        <option value={120001}>(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                        <option value={120002}>(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                        <option value={120003}>(GMT+01:00) West Central Africa</option>
                        <option value={120004}>(GMT+01:00) Windhoek</option>
                        <option value={130000}>(GMT+02:00) Beirut</option>
                        <option value={130001}>(GMT+02:00) Cairo</option>
                        <option value={130002}>(GMT+02:00) Gaza</option>
                        <option value={130003}>(GMT+02:00) Harare, Pretoria</option>
                        <option value={130004}>(GMT+02:00) Johannesburg</option>
                        <option value={130005}>(GMT+02:00) Jerusalem</option>
                        <option value={130006}>(GMT+02:00) Minsk</option>
                        <option value={130007}>(GMT+02:00) Syria</option>
                        <option value={140000}>(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
                        <option value={140001}>(GMT+03:00) Nairobi</option>
                        <option value={143000}>(GMT+03:30) Tehran</option>
                        <option value={150000}>(GMT+04:00) Abu Dhabi, Muscat</option>
                        <option value={150001}>(GMT+04:00) Yerevan</option>
                        <option value={153000}>(GMT+04:30) Kabul</option>
                        <option value={160000}>(GMT+05:00) Ekaterinburg</option>
                        <option value={160001}>(GMT+05:00) Tashkent</option>
                        <option value={163000}>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                        <option value={164500}>(GMT+05:45) Kathmandu</option>
                        <option value={170000}>(GMT+06:00) Astana, Dhaka</option>
                        <option value={170001}>(GMT+06:00) Novosibirsk</option>
                        <option value={173000}>(GMT+06:30) Yangon (Rangoon)</option>
                        <option value={180000}>(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
                        <option value={180001}>(GMT+07:00) Krasnoyarsk</option>
                        <option value={190000}>(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                        <option value={190001}>(GMT+08:00) Irkutsk, Ulaan Bataar</option>
                        <option value={190002}>(GMT+08:00) Perth</option>
                        <option value={194500}>(GMT+08:45) Eucla</option>
                        <option value={200000}>(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                        <option value={200001}>(GMT+09:00) Seoul</option>
                        <option value={200002}>(GMT+09:00) Yakutsk</option>
                        <option value={203000}>(GMT+09:30) Adelaide</option>
                        <option value={203001}>(GMT+09:30) Darwin</option>
                        <option value={210000}>(GMT+10:00) Brisbane</option>
                        <option value={210001}>(GMT+10:00) Hobart</option>
                        <option value={210002}>(GMT+10:00) Melbourne</option>
                        <option value={210003}>(GMT+10:00) Sydney</option>
                        <option value={210004}>(GMT+10:00) Vladivostok</option>
                        <option value={213000}>(GMT+10:30) Lord Howe Island</option>
                        <option value={220000}>(GMT+11:00) Solomon Is., New Caledonia</option>
                        <option value={220001}>(GMT+11:00) Magadan</option>
                        <option value={223000}>(GMT+11:30) Norfolk Island</option>
                        <option value={230000}>(GMT+12:00) Anadyr, Kamchatka</option>
                        <option value={230001}>(GMT+12:00) Auckland, Wellington, Hamilton</option>
                        <option value={230002}>(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
                        <option value={234500}>(GMT+12:45) Chatham Islands</option>
                        <option value={240000}>(GMT+13:00) Nukuʻalofa</option>
                        <option value={250000}>(GMT+14:00) Kiritimati</option>
                     </optgroup>
                  </select>
               </div>

               {/* Currency and Tax */}
               <h4 className="mb-2">Currency &amp; Tax</h4>
               <div className="ml-3 mb-5">
                  <div className="mb-2">
                     <label htmlFor="account_currency_id">Currency</label>
                     <select className="form-control rounded-0 maxWidth-300" id="account_currency_id" name="account_currency_id"
                        value={currency}
                        onChange={ev => dispatch(updateQuoteDefaultSetting({ ...quoteDefaultSetting, currency: ev.target.value }))}
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
                     <label htmlFor="account_amounts_entered">Amounts Are:</label>
                     <select className="form-control rounded-0 maxWidth-300"
                        // defaultValue={`exclusive_excluding`}
                        id="account_amounts_entered"
                        name="account_amounts_entered"
                        value={taxMode}
                        onChange={ev => dispatch(updateQuoteDefaultSetting({ ...quoteDefaultSetting, taxMode: ev.target.value }))}
                     >
                        <option value="exclusive_including">Tax Exclusive (Inclusive Total)</option>
                        <option value="exclusive_excluding">Tax Exclusive</option>
                        <option value="inclusive">Tax Inclusive</option>
                        <option value="no_tax">No Tax</option>
                     </select>
                  </div>
                  <div className="mb-2">
                     <label>Describe Tax as:</label>
                     <select className="form-control rounded-0 maxWidth-180 mb-3" name="account[tax_word_id]" id="account_tax_word_id"
                        value={describeTaxAs}
                        onChange={(ev) => dispatch(updateAppearanceSetting({ ...appearanceSetting, describeTaxAs: ev.target.value }))}
                     >
                        <option value={1}>GST</option>
                        <option value={2}>HST</option>
                        <option value={7}>IVA</option>
                        <option value={4}>Tax</option>
                        <option value={5}>VAT</option>
                        <option value={6}>VAT/NHIL</option>
                     </select>
                  </div>
                  <div className="mb-2">
                     <label htmlFor="defaultTaxRate">Default Sales Tax</label>
                     <div className="input-group maxWidth-180">
                        <input type="text" className="form-control rounded-0" id="defaultTaxRate" name="defaultTaxRate"
                           disabled={props.match.path === "/settings/sales-category/:id"}
                           value={defaultSalexTax && defaultSalexTax.taxRate}
                           onChange={(ev) => {
                              const newSalesTaxes = salesSetting.salesTaxes.map(item => {
                                 if (item._id === salesSetting.defaultSalesTax) return { ...item, taxRate: ev.target.value };
                                 else return item;
                              });
                              dispatch({ type: GET_SALES_TAXES, payload: newSalesTaxes });
                           }}
                        />
                        <div className="input-group-append">
                           <span className="input-group-text rounded-0">%</span>
                        </div>
                     </div>
                     <div className="help-block">Also see Account Settings &gt; Sales Tax &amp; Categories for more options.</div>
                  </div>
               </div>

               {/* Add Your Logo */}
               <h4 className="mb-2">Add Your Logo</h4>
               <div className="ml-3 mb-5">
                  <input type="file"
                     ref={hiddenFileInput}
                     onChange={(ev) => dispatch(uploadLogo(ev))}
                     className="d-none"
                  />

                  {
                     logo ?
                        <div className="row justify-content-center" style={{ position: "relative" }}>
                           <img src={logo} className="mr-2 image-preview-size" alt="..." />
                           <button className="btn btn-sm btn-light" onClick={() => dispatch(removeLogo(logo))} style={{ position: "absolute", top: 5, right: 5 }}>
                              <i className="fa fa-times-circle"></i>
                           </button>
                        </div>
                        : <div className="p-2">
                           <button className="btn btn-square btn-outline-secondary"
                              onClick={handleClickFileOpen}
                              disabled={commonData.loading}>
                              {
                                 commonData.loading && commonData.type === LOGO_URL ?
                                    <div className="spinner-border spinner-border-sm text-secondary mr-1" role="status">
                                       <span className="sr-only">Loading...</span>
                                    </div>
                                    : <i className="si si-paper-clip fa-fw mr-1" />
                              }
                              Choose logo
                           </button>
                        </div>
                  }
               </div>

               {/* Your Company Information */}
               <h4 className="mb-2">Your Company Information</h4>
               <div className="ml-3 mb-5">
                  <div className="maxWidth-550 mb-2">
                     <label htmlFor="pLayout[_s][comp_name]">Company or Organization</label>
                     <input type="text" className="form-control rounded-0" id="pLayout[_s][comp_name]" name="pLayout[_s][comp_name]" placeholder="ACME Corp."
                        value={companyDisplayName}
                        onChange={(ev) => dispatch({ type: ACCOUNT_COMPANY_DATA, payload: { ...accountCompany, companyDisplayName: ev.target.value } })}
                     />
                  </div>
                  <div className="maxWidth-550 mb-2">
                     <label htmlFor="pLayout__s_comp_address">Address</label>
                     <TextareaAutosize type="text" className="form-control rounded-0" id="pLayout__s_comp_address" name="pLayout__s_comp_address" rows={3} placeholder="Postal and Physical address"
                        value={address}
                        onChange={(ev) => dispatch({ type: ACCOUNT_COMPANY_DATA, payload: { ...accountCompany, address: ev.target.value } })}
                     />
                  </div>
                  <div className="maxWidth-550 mb-2">
                     <label htmlFor="pLayout__s_comp_website">Website</label>
                     <input type="text" className="form-control rounded-0" id="pLayout__s_comp_website" name="pLayout__s_comp_website" placeholder="www.example.com"
                        value={website}
                        onChange={(ev) => dispatch({ type: ACCOUNT_COMPANY_DATA, payload: { ...accountCompany, website: ev.target.value } })}
                     />
                  </div>
                  <div className="maxWidth-550 mb-2">
                     <label htmlFor="pLayout__s_comp_phone">Phone</label>
                     <input type="text" className="form-control rounded-0" id="pLayout__s_comp_phone" name="pLayout__s_comp_phone" placeholder=""
                        value={phone}
                        onChange={(ev) => dispatch({ type: ACCOUNT_COMPANY_DATA, payload: { ...accountCompany, phone: ev.target.value } })}
                     />
                  </div>
               </div>

               <div className="mb-5">
                  <button className="btn btn-primary btn-lg" onClick={onClickSave}>Save</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default QuickStart;