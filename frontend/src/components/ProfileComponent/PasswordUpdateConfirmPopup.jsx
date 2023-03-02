import React from 'react'
import { MdClose } from 'react-icons/md'

const PasswordUpdateConfirmPopup = ({ password, setShowPopup }) => {
    return (
        <div className="confirm_popup">
            <div className="confirm_wrapper">
                <div className="confirm_wrapper_top">
                    <p>
                        Confirm update your new password to <b className='new-password'><i>{password}</i></b> ?
                    </p>
                    <MdClose id='close-popup-btn'
                        onClick={() => setShowPopup(false)}
                    />
                </div>
                <div className="confirm_wrapper_bottom">
                    {/* <button className="confirm">Confirm</button>
                    <button className="cancel">Cancel</button> */}
                    <button className="confirm_wrapper_btn"
                    >
                        Set new password
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PasswordUpdateConfirmPopup