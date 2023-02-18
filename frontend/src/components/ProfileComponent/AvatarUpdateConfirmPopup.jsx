import React from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { updateAvatarApi } from '../../api/user.api';
import { updateAvatarSuccess } from '../../redux/user.slice';

const AvatarUpdateConfirmPopup = ({ avatar, setShowPopup, toast}) => {

    const currentUser = useSelector(state => state.auth.signIn.currentUser);
    const dispatch = useDispatch();

    function confirmUpdateAvatar() {
        const data = {
            userId: Number(currentUser.id),
            avatar: String(avatar)
        }
        updateAvatarApi(data, currentUser.token, dispatch)
            .then((response) => {
                dispatch(updateAvatarSuccess(response.data));
            })
            .then(() => {
                toast.success("Avatar updated successfully!");
            })
            .then(() => {
                setTimeout(() => {setShowPopup(false)}, 500);
            })
            .catch(err => {
                toast.error("Update avatar failed!")
                console.log(err);
            });
    }

    return (
        <div className='avatar-update-confirm-popup'>
            <div className='avatar-update-confirm'>
                <div className="update-confirm-header">
                    <p>Confirm update your new profile picture</p>
                    <MdClose id='close-popup-btn'
                        onClick={() => setShowPopup(false)}
                    />
                </div>
                <div className="update-confirm-body">
                    <img src={avatar} alt="" />
                </div>
                <div className="update-confirm-footer">
                    <button className="confirm-update"
                        onClick={() => confirmUpdateAvatar()}
                    >
                        Set new profile picture
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AvatarUpdateConfirmPopup