import React from 'react'
import NavCrump from '../../../components/NavCrump'

export const Profile = (props) => {
   return (
      <React.Fragment>
         <NavCrump linkTo="/app/settings">
            Settings
         </NavCrump>
         <div className="content">
            <div className="maxWidth-800">
               <h1>Your Profile</h1>

               <div className="mb-5">
                  <div className="form-group">
                     <label htmlFor="example-text-input">For security reasons, first enter old password:</label>
                     <input type="text" className="form-control" id="example-text-input" name="example-text-input" placeholder="" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="example-text-input">Change Password</label>
                     <input type="text" className="form-control" id="example-text-input" name="example-text-input" placeholder="" />
                  </div>
                  <div className="form-group">
                     <label htmlFor="example-text-input">Confirm Password</label>
                     <input type="text" className="form-control" id="example-text-input" name="example-text-input" placeholder="" />
                  </div>
               </div>

               <div className="mb-5">
                  <div className="form-group">
                     <div className="row">
                        <div className="col-md-6 col-sm-12">
                           <label htmlFor="example-text-input">First Name</label>
                           <input type="text" className="form-control mr-3" placeholder="First Name" defaultValue />
                        </div>
                        <div className="col-md-6 col-sm-12">
                           <label htmlFor="example-text-input">Last Name</label>
                           <input type="text" className="form-control" placeholder="Last Name" defaultValue />
                        </div>
                     </div>
                  </div>
                  <div className="form-group">
                     <label>Time Zone</label>
                     <select className="custom-select" id="timeZone" name="timeZone">
                        <optgroup label=" –––––– US & Canada">
                           <option value={10001}>Hawaii (GMT-10:00)</option>
                           <option value={20001}>Alaska (GMT-09:00)</option>
                           <option value={30002}>Pacific Time (GMT-08:00 / US &amp; Canada)</option>
                           <option value={40000}>Mountain Time (GMT-07:00 / US &amp; Canada)</option>
                           <option value={40002}>Arizona (GMT-07:00)</option>
                           <option value={50003}>Central Time (GMT-06:00 / US &amp; Canada)</option>
                           <option value={60000} selected="selected">Eastern Time (GMT-05:00 / US &amp; Canada)</option>
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
               </div>
               <div className="mb-5">
                  <h3>Profile Photo</h3>
                  <div className="row no-gutters">
                     <img className="avatar-36 mr-2" src={`/assets/media/avatars/person1.png`} alt="..."/>
                     <button type="button" className="btn btn-alt-secondary mr-1">Change</button>
                     <button type="button" className="btn btn-alt-secondary">Remove</button>
                  </div>
               </div>

               <div className="mb-4">
                  <button className="btn btn-lg btn-rounded btn-hero-primary mr-1">Save</button>
                  <button className="btn btn-lg btn-rounded btn-hero-secondary">Cancel</button>
               </div>


            </div>
         </div>
      </React.Fragment>
   )
}

export default Profile