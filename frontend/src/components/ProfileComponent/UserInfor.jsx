import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile } from "../../api/user.api";
import { MdEdit } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";

function UserInfor(props) {

   const currentUser = useSelector(state => state.auth.signIn.currentUser);
   const [profile, setProfile] = useState();
   const [firstName, setFirstName] = useState();
   const [lastName, setLastName] = useState();
   const [gender, setGender] = useState();
   const [phone, setPhone] = useState();
   const [birthDate, setBirthDate] = useState();

   function handleInputChange(event) {
      switch (event.target.name) {
         case "firstName":
            setFirstName(event.target.value);
            break;
         case "lastName":
            setLastName(event.target.value);
            break;
         case "gender":
            setGender(event.target.value);
            break;
         case "phone":
            setPhone(event.target.value);
            break;
         case "birthDate":
            setBirthDate(event.target.value);
            break;
         default:
            console.log("update profile");
      }
   }

   console.log({
      firstName, lastName, gender, phone, birthDate
   })

   useEffect(() => {
      getProfile(currentUser.token)
         .then((response) => {
            setProfile(response.data);
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setGender(response.data.gender)
            setBirthDate(response.data.birthDate)
            setPhone(response.data.phone)
         })
         .catch((err) => {
            console.log(err);
         })
   }, [currentUser])

   console.log(profile)

   return (
      <div className='profile-body information'>
         {profile && <>
            <div className="profile-left">
               <div className="profile-left-top">
                  <h3>Public profile</h3>
               </div>
               <div className="profile-left-bottom">
                  <dl className="first-name">
                     <dt>
                        <label htmlFor="user_profile_first_name">First name</label>
                     </dt>
                     <dd>
                        <input
                           type="text"
                           id="user_profile_first_name"
                           name="firstName"
                           value={firstName}
                           onChange={(event) => handleInputChange(event)}
                        />
                     </dd>
                  </dl>
                  <dl className="last-name">
                     <dt>
                        <label htmlFor="user_profile_last_name">Last name</label>
                     </dt>
                     <dd>
                        <input
                           type="text"
                           name="lastName"
                           id="user_profile_last_name"
                           value={lastName}
                           onChange={(event) => handleInputChange(event)}
                        />
                     </dd>
                  </dl>
                  <dl className="gender">
                     <dt>
                        <label htmlFor="user_profile_gender">Gender</label>
                     </dt>
                     <dd>
                        <label htmlFor="male" className="gender-label male">
                           <input type="radio"
                              name="gender"
                              value="MALE"
                              id="male"
                              onChange={(event) => handleInputChange(event)}
                           />
                           Male
                        </label>
                        <label htmlFor="female" className="gender-label female">
                           <input type="radio"
                              name="gender"
                              value="FEMALE"
                              id="female"
                              onChange={(event) => handleInputChange(event)}
                           />
                           Female
                        </label>
                     </dd>
                  </dl>
                  <dl className="phone">
                     <dt>
                        <label htmlFor="user_profile_phone">Phone</label>
                     </dt>
                     <dd>
                        <input
                           type="text"
                           name="phone"
                           id="user_profile_phone"
                           value={phone}
                           onChange={(event) => handleInputChange(event)}
                        />
                     </dd>
                  </dl>
                  <dl className="birth-date">
                     <dt>
                        <label htmlFor="user_profile_birth_date">Date of birth</label>
                     </dt>
                     <dd>
                        <p className="birth-date-data">Date of birth:
                           <span>{profile.birthDate ? profile.birthDate : "dd-mm-yyyy"}</span>
                        </p>
                        <button>Edit</button>
                        <input
                           type="date"
                           name="birthDate"
                           id="user_profile_birth_date"
                           onChange={(event) => handleInputChange(event)}
                        />
                     </dd>
                  </dl>
                  <dl className="status">
                     <dt>
                        <label>Status</label>
                     </dt>
                     <dd>
                        <p>Status: <span>{profile.status}</span> <GoPrimitiveDot color="#03fc24" /></p>
                        <p>Your account has been activated!</p>
                     </dd>
                  </dl>
               </div>
               <div className="update-profile-button">
                  <button>Save</button>
               </div>
            </div>
            <div className="profile-right">
               <h4 className="profile-picture-title">
                  Profile picture
               </h4>
               <div className="profile-current-pic">
                  <img src={profile.avatarUrl} alt="" />
               </div>
               <div className="edit-profile-picture">
                  <div className="edit-picture-top">
                     <MdEdit />
                     <div>
                        Edit
                     </div>
                  </div>
                  <div className="edit-picture-bottom">
                     <div className="edit-picture-item upload">
                        Upload a photo...
                     </div>
                     <div className="edit-picture-item remove">
                        Remove photo
                     </div>
                  </div>
               </div>
            </div>
         </>
         }
      </div>
   );
}
export default UserInfor;