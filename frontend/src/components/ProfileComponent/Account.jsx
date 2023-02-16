import React, { useState } from 'react'

const Account = () => {

  const [changeUsername, setChangeUsername] = useState(false);

  return (
    <div className='profile-body account'>
      <div className="change-username">
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
      </div>
      <div className="change-password">
        <div className='change-password-top'>
          Change password
          <hr />
        </div>
        <div className='change-password-bottom'>
          <div className="password old-password">
            <label htmlFor="input-old-password">Old password</label>
            <input type="text" name="oldPassword" id="input-old-password" />
          </div>
          <div className="password new-password">
            <label htmlFor="input-new-password">New password</label>
            <input type="text" name="newPassword" id="input-new-password" />
          </div>
          <div className="password confirm-new-password">
            <label htmlFor="input-confirm-password">Confirm new password</label>
            <input type="text" name="oldPassword" id="input-confirm-password" />
          </div>
          {/* <p className='change-password-note'>Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p> */}
          <p className='change-password-note'>Make sure password must be 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!</p>
          
          <button className="update-password-btn">
            Update password
          </button>
        </div>
      </div>
    </div>
  )
}

export default Account