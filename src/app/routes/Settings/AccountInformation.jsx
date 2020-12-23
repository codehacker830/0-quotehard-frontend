import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { updateAccountInfo } from '../../../actions/Auth';
import NavCrump from '../../../components/NavCrump';

export const AccountInformation = (props) => {
   const [accountCompany, setAccountCompany] = useState(props.accountCompany);
   const onHandleSave = () => {
      const {
         companyName,
         owner,
         location,
         timeZone,
         dateFormat
      } = accountCompany;
      const payload = {
         companyName,
         owner,
         location,
         timeZone,
         dateFormat
      };
      if (companyName === "") {
         toast.success(" Please enter an Account Name");
         return;
      }
      props.updateAccountInfo(payload);
   }
   useEffect(() => {
      const { accountCompany } = props;
      setAccountCompany(accountCompany);
   }, [props]);
   console.log("Account information ===>", props);
   return (
      <React.Fragment>
         <NavCrump linkTo={`/app/settings`}>
            Settings
         </NavCrump>
         <div className="content">
            <div className="maxWidth-800">
               <h1>Account Information</h1>

               <div className="mb-4">
                  <label htmlFor="quotientAccountName">Quotehard Account Name</label>
                  <input type="text" className="form-control rounded-0 font-size-h4 font-w700" id="quotientAccountName" name="quotientAccountName"
                     value={accountCompany.companyName}
                     onChange={(ev) => {
                        const dt = { ...accountCompany, companyName: ev.target.value }
                        setAccountCompany(dt);
                     }}
                  />
                  <div className="font-size-sm text-sendary mb-2">
                     To change your company name as displayed on your quotes, see:
                     <br />
                     <i>Settings &gt; Layout, Style and Company Information</i>.
                     </div>
               </div>

               <div className="mb-5">
                  <label htmlFor="accountOwner">Account Owner</label>
                  <select className="form-control rounded-0 maxWidth-550" id="accountOwner" name="accountOwner"
                     value={accountCompany.owner}
                     onChange={(ev) => {
                        const dt = { ...accountCompany, owner: ev.target.value }
                        setAccountCompany(dt);
                     }}
                  >
                     {
                        props.teamMembers.map((member, index) => {
                           return <option value={member._id} key={index}>A Devom</option>
                        })
                     }
                  </select>
                  <div className="font-size-sm text-sendary mb-2">
                     To qualify for the Multi-Account 20% Discount, accounts must have the same Account Owner.
                  </div>
               </div>

               <h3 className="mb-4">Account Defaults</h3>

               <div className="mb-4">
                  <label htmlFor="countryCode">Country</label>
                  <select className="form-control rounded-0 maxWidth-550" id="countryCode" name="countryCode"
                     value={accountCompany.location}
                     onChange={(ev) => {
                        const dt = { ...accountCompany, location: ev.target.value }
                        setAccountCompany(dt);
                     }}
                  >
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

               <div className="mb-4">
                  <label htmlFor="timeZone">Time Zone</label>
                  <select className="form-control rounded-0 maxWidth-550" id="timeZone" name="timeZone"
                     value={accountCompany.timeZone}
                     onChange={(ev) => {
                        const dt = { ...accountCompany, timeZone: ev.target.value }
                        setAccountCompany(dt);
                     }}
                  >
                     <optgroup label=" –––––– US & Canada">
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

               <div className="mb-5">
                  <label htmlFor="dateFormat">Date Format</label>
                  <select className="form-control rounded-0 maxWidth-550" id="dateFormat" name="dateFormat"
                     value={accountCompany.dateFormat}
                     onChange={(ev) => {
                        const dt = { ...accountCompany, dateFormat: ev.target.value }
                        setAccountCompany(dt);
                     }}
                  >
                     <option value={0}>5 January 2020</option>
                     <option value={1}>January 5, 2020</option>
                  </select>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1" onClick={onHandleSave}>Save</button>
                  <button className="btn btn-lg btn-rounded btn-hero-secondary">Cancel</button>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

const mapStateToProps = ({ auth, teamSetting }) => {
   const { accountCompany } = auth;
   const { teamMembers } = teamSetting;
   return { accountCompany, teamMembers };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return {
      updateAccountInfo: accountCompany => dispatch(updateAccountInfo(accountCompany, ownProps)),
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountInformation)