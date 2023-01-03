import React from 'react'
import { BsCheck } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
const ConfirmSignUpSuccess = ({ signUpSuccessMessage, setShowPopup, showPopup }) => {

    const navigate = useNavigate();

    const closePopup = () => {
        setTimeout(() => {
            setShowPopup(false);
            navigate('/auth/sign-in')
        }, 300)
    }

    return (
        <>
            {signUpSuccessMessage && (
                <div className='popup-container'>
                    <div className={showPopup ? 'popup active' : 'popup'}>
                        <div className='icon'>
                            <BsCheck id='bsCheck' size={50} />
                        </div>
                        <div className='title'>
                            Success!!
                        </div>
                        <div className='description'>
                            {signUpSuccessMessage}
                        </div>
                        <div className='accept-btn'>
                            <button type="button" onClick={closePopup}>Accept</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConfirmSignUpSuccess