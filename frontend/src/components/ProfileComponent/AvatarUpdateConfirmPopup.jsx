import React from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { updateAvatarApi } from '../../api/user.api';
import { updateAvatarSuccess } from '../../redux/user.slice';
import { offLoading } from '../../redux/loading.slice';

const AvatarUpdateConfirmPopup = ({ avatar, setShowPopup, toast }) => {

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
                dispatch(offLoading());
                setTimeout(() => toast.success("Avatar updated successfully!"), 100);
            })
            .then(() => {
                setTimeout(() => { setShowPopup(false) }, 500);
            })
            .catch(err => {
                toast.error("Update avatar failed!")
                console.log(err);
            });
    }

    return (
        <div className='confirm_popup'>
            <div className='avatar-update'>
                <div className="confirm-header">
                    <p>Confirm update your new profile picture</p>
                    <MdClose id='close-popup-btn'
                        onClick={() => setShowPopup(false)}
                    />
                </div>
                <div className="confirm-body">
                    <img src={avatar} alt="" />
                </div>
                <div className="confirm-footer">
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