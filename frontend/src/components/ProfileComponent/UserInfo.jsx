import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../api/user.api";
import { MdEdit } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { REGEX_PHONE } from "../../constant/Regex";
import { toast } from "react-hot-toast";
import { userImage } from "../../constant/Image";
import AvatarUpdateConfirmPopup from "./AvatarUpdateConfirmPopup";
import {
  updateProfileSuccess,
  updateProfileError,
} from "../../redux/user.slice";
import AvatarDeleteConfirmPopup from "./AvatarDeleteConfirmPopup";
import { offLoading } from "../../redux/loading.slice";
import { useAuth, useProfile } from "../../redux/selector";

function UserInfo() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const profile = useProfile().data;
  const currentUser = auth.signIn.currentUser;

  const avatarUrl = useSelector((state) => state.user.user.avatarUrl);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  // const [avatar, setAvatar] = useState("");
  const [firstNameValidationErrors, setFirstNameValidationErrors] = useState();
  const [lastNameValidationErrors, setLastNameValidationErrors] = useState();
  const [genderValidationErrors, setGenderValidationErrors] = useState();
  const [phoneValidationErrors, setPhoneValidationErrors] = useState();
  const [birthDateValidationErrors, setBirthDateValidationErrors] = useState();
  const [validationError, setValidationError] = useState(false);
  const [editBirthDate, setEditBirthDate] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [showDeleteAvatarPopup, setShowDeleteAvatarPopup] = useState(false);
  const [avatarImageFile, setAvatarImageFile] = useState(null);
  const avatarRef = useRef();
  const uploadRef = useRef();

  /**
   * When the user changes the value of an input field, update the state of the component and validate
   * the input.
   */
  function handleInputChange(event) {
    switch (event.target.name) {
      case "firstName":
        setFirstName(event.target.value);
        validateInput("firstName", event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        validateInput("lastName", event.target.value);
        break;
      case "gender":
        setGender(event.target.value);
        validateInput("gender", event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        validateInput("phone", event.target.value);
        break;
      case "birthDate":
        setBirthDate(event.target.value);
        validateInput("birthDate", event.target.value);
        break;
      default:
        console.log("update profile");
    }
  }

  /**
   * When the user clicks on the avatar, the input file is clicked.
   */
  function handleFocusInputAvatar() {
    const image = document.getElementById("input-avatar");
    image.click();
  }

  /**
   * It uploads an image to cloudinary, then sets the avatar to the response data, then sets the
   * showPopup to true.
   */
  // function uploadImageCloudinary(formData, token) {
  //   uploadImageCloudinaryApi(formData, token, dispatch)
  //     .then((response) => {
  //       setAvatar(response.data);
  //       dispatch(offLoading());
  //     })
  //     .catch((err) => {
  //       dispatch(offLoading());
  //       toast.error("Failed upload image!");
  //     });
  // }

  /**
   * I'm trying to upload an image to Cloudinary using the Cloudinary API.
   */
  function handleChangeImage(event) {
    if(!event || !event.target.files.length) return;
    setAvatarImageFile(event.target.files[0]);

    // const formData = new FormData();
    // formData.append("avatar", event.target.files[0]);
    // const file = formData.get("avatar");
    // file.url = URL.createObjectURL(file);
    // uploadImageCloudinary(file, currentUser.token);
    // setUpdateAvatar(false);
    // setAvatarImageFile(event.target.files[0]);
  }

  /**
   * If the user inputs are valid, then update the user's profile, otherwise, display an error
   * message.
   */
  function handleUpdateProfile() {
    const data = { firstName, lastName, gender, phone, birthDate };
    validateInput("firstName", data.firstName);
    validateInput("lastName", data.lastName);
    validateInput("gender", data.gender);
    validateInput("phone", data.phone);
    validateInput("birthDate", data.birthDate);
    if (validationError) {
      toast.error("Update profile failed!");
    } else {
      updateProfile(data, currentUser.token, dispatch)
        .then((res) => {
          setTimeout(() => {
            dispatch(offLoading());
            dispatch(updateProfileSuccess(res.data));
          }, 1000);
          setTimeout(
            () => toast.success("Updated profile successfully!"),
            1100
          );
        })
        .catch((err) => {
          dispatch(offLoading());
          dispatch(updateProfileError("Update profile failed!"));
          toast.error("Update profile failed!");
        });
    }
  }

  /**
   * If the firstNameValid, lastNameValid, phoneValid, and genderValid are all true, then set the
   * validationError to false.
   */
  function validateInput(fieldName, value) {
    let firstNameValid = true;
    let lastNameValid = true;
    let phoneValid = true;
    let genderValid = true;
    let birthDateValid = true;
    switch (fieldName) {
      case "firstName":
        firstNameValid = value.trim().length > 0;
        setFirstNameValidationErrors(
          firstNameValid ? "" : "First name must be blank!"
        );
        setValidationError(firstNameValid ? false : true);
        break;
      case "lastName":
        lastNameValid = value.trim().length > 0;
        setLastNameValidationErrors(
          lastNameValid ? "" : "Last name must be blank!"
        );
        setValidationError(lastNameValid ? false : true);
        break;
      case "gender":
        genderValid = value === "MALE" || value === "FEMALE";
        setGenderValidationErrors(
          genderValid ? "" : "Please choice your gender before update info!"
        );
        setValidationError(genderValid ? false : true);
        break;
      case "phone":
        phoneValid = value.match(REGEX_PHONE);
        setPhoneValidationErrors(phoneValid ? "" : "Phone can not valid!");
        setValidationError(phoneValid ? false : true);
        break;
      case "birthDate":
        birthDateValid = value.trim().length > 0;
        setBirthDateValidationErrors(
          birthDateValid ? "" : "Birth date can not be empty!"
        );
        setValidationError(birthDateValid ? false : true);
        break;
      default:
    }
    if (
      firstNameValid === true &&
      lastNameValid === true &&
      phoneValid === true &&
      genderValid === true
    ) {
      setValidationError(false);
    }
  }

  // ------------------------------------Get User info----------------------------------------------
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setGender(profile.gender || "");
      setBirthDate(profile.birthDate || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  //------------------------------------Show or hidden upload avatar popup--------------------------
  useEffect(() => {
    const click = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setUpdateAvatar(false);
      }
    };
    document.addEventListener("mousedown", click);
    return () => {
      document.removeEventListener("mousedown", click);
    };
  });

  // ------------------------------------Focus input to upload image---------------------------------
  useEffect(() => {
    const handler = (e) => {
      if (uploadRef.current && uploadRef.current.contains(e.target)) {
        document.addEventListener("focus", handleFocusInputAvatar());
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="profile-body information">
      {profile && (
        <>
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
                  <div className="validate-err">
                    {firstNameValidationErrors}
                  </div>
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
                  <div className="validate-err">{lastNameValidationErrors}</div>
                </dd>
              </dl>
              <dl className="gender">
                <dt>
                  <label htmlFor="user_profile_gender">Gender</label>
                </dt>
                <dd>
                  <label htmlFor="male" className="gender-label male">
                    <input
                      type="radio"
                      name="gender"
                      value="MALE"
                      id="male"
                      onChange={(event) => handleInputChange(event)}
                      checked={gender === "MALE"}
                    />
                    Male
                  </label>
                  <label htmlFor="female" className="gender-label female">
                    <input
                      type="radio"
                      name="gender"
                      value="FEMALE"
                      id="female"
                      onChange={(event) => handleInputChange(event)}
                      checked={gender === "FEMALE"}
                    />
                    Female
                  </label>
                  <div className="validate-err">{genderValidationErrors}</div>
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
                  <div className="validate-err">{phoneValidationErrors}</div>
                </dd>
              </dl>
              <dl className="birth-date">
                <dt>
                  <label htmlFor="user_profile_birth_date">Date of birth</label>
                </dt>
                <dd>
                  <p className="birth-date-data">
                    Date of birth:
                    <span>
                      {profile.birthDate ? profile.birthDate : "dd-mm-yyyy"}
                    </span>
                  </p>
                  <button onClick={() => setEditBirthDate(!editBirthDate)}>
                    Edit
                  </button>
                  {editBirthDate && (
                    <input
                      type="date"
                      name="birthDate"
                      value={birthDate}
                      id="user_profile_birth_date"
                      onChange={(event) => handleInputChange(event)}
                    />
                  )}
                  <div className="validate-err">
                    {birthDateValidationErrors}
                  </div>
                </dd>
              </dl>
              <dl className="status">
                <dt>
                  <label>Status</label>
                </dt>
                <dd>
                  <p>
                    Status: <span>{profile.status}</span>{" "}
                    <GoDotFill color="#03fc24" />
                  </p>
                  <p>Your account has been activated!</p>
                </dd>
              </dl>
              <dl className="point">
                <dt>
                  <label>Point</label>
                </dt>
                <dd>
                  <p>
                    Your point: <span>{profile.point?.point}</span>
                  </p>
                </dd>
              </dl>
            </div>
            <div className="update-profile-button">
              <button onClick={() => handleUpdateProfile()}>Save</button>
            </div>
          </div>
          <div className="profile-right">
            <h4 className="profile-picture-title">Profile picture</h4>
            <div className="profile-current-pic">
              <img src={avatarUrl ? avatarUrl : userImage} alt="" />
            </div>
            <div className="edit-profile-picture" ref={avatarRef}>
              <div
                className="edit-picture-top"
                onClick={() => setUpdateAvatar(!updateAvatar)}
              >
                <MdEdit />
                <div>Edit</div>
              </div>
              {updateAvatar && (
                <div className="edit-picture-bottom">
                  <div
                    className="edit-picture-item upload"
                    onClick={() => handleFocusInputAvatar()}
                  >
                    Upload a photo...
                  </div>
                  <div className="edit-picture-item-input">
                    <input
                      type="file"
                      id="input-avatar"
                      name="input-avatar"
                      onChange={(e) => handleChangeImage(e)}
                    />
                  </div>
                  {avatarUrl && (
                    <div
                      className="edit-picture-item remove"
                      onClick={() => setShowDeleteAvatarPopup(true)}
                    >
                      Remove photo
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <AvatarUpdateConfirmPopup imageFile={avatarImageFile} onClose={() => setAvatarImageFile(null)} />

      <AvatarDeleteConfirmPopup
        active={showDeleteAvatarPopup}
        onClose={() => setShowDeleteAvatarPopup(false)}
      />
    </div>
  );
}
export default UserInfo;
