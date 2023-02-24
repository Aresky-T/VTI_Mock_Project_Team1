import React, { useState } from 'react'
import PasswordUpdateConfirmPopup from './PasswordUpdateConfirmPopup';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { REGEX_PASSWORD } from '../../constant/Regex';

const Account = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [isShowPassword, setShowPassword] = useState(false);

  const passFormik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      password: yup.string().required("Password cannot be blank!"),
      newPassword: yup.string().required("New password cannot be blank!").matches(REGEX_PASSWORD, "Password must be 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!"),
      confirmPassword: yup.string().required("Confirm password cannot be blank!").oneOf([yup.ref("newPassword"), null], "Confirmed password must match new password")
    }),
    onSubmit: values => {
      setShowPopup(true);
    }
  });



  return (
    <div className='profile-body account'>
      {/* <div className="change-username">
        <div className='change-username-top'>
          Change Username
          <hr />
        </div>
        <div className='change-username-bottom'>
          <p className="change-username-warning">
            Changing your username can have unintended side effects.
          </p>
          <button className="change-username-btn">
            Change username
          </button>
        </div>
      </div> */}
      <div className="change-password">
        <div className='change-password-top'>
          <h3>Change password</h3>
        </div>
        <form className='change-password-bottom'
          onSubmit={passFormik.handleSubmit}
        >
          <div className="password old-password">
            <label htmlFor="input-old-password">Old password</label>
            <input type={isShowPassword ? "text" : "password"}
              name="password"
              id="input-old-password"
              value={passFormik.values.password}
              onChange={passFormik.handleChange}
            />
            <p className="error-message">{passFormik.errors.password}</p>
          </div>
          <div className="password new-password">
            <label htmlFor="input-new-password">New password</label>
            <input type={isShowPassword ? "text" : "password"}
              name="newPassword"
              id="input-new-password"
              value={passFormik.values.newPassword}
              onChange={passFormik.handleChange}
            />
            <p className="error-message">{passFormik.errors.newPassword}</p>
          </div>
          <div className="password confirm-new-password">
            <label htmlFor="input-confirm-password">Confirm new password</label>
            <input type={isShowPassword ? "text" : "password"}
              name="confirmPassword"
              id="input-confirm-password"
              value={passFormik.values.confirmPassword}
              onChange={passFormik.handleChange}
            />
            <p className="error-message">{passFormik.errors.confirmPassword}</p>
          </div>
          <div className="show-password">
            <input type="checkbox" name="showPassword" id="showPassword"
              value={isShowPassword}
              onChange={() => setShowPassword(!isShowPassword)}
            />
            <label htmlFor='showPassword'>
              Show password
            </label>
          </div>
          {/* <p className='change-password-note'>Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p> */}
          <p className='change-password-note'>Make sure password must be 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!</p>

          <button className="update-password-btn"
            type="submit"
          >
            Update password
          </button>
        </form>
      </div>
      {showPopup && <PasswordUpdateConfirmPopup setShowPopup={setShowPopup} password={passFormik.values.newPassword} />}
    </div>
  )
}

export default Account