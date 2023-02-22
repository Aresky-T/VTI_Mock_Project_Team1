import React from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {deleteAvatarApi, updateAvatarApi} from '../../api/user.api';
import { updateAvatarSuccess } from '../../redux/user.slice';
import {toast} from "react-hot-toast";

const AvatarUpdateConfirmPopup = ({setShowDeleteAvatarPopup}) => {

    const currentUser = useSelector(state => state.auth.signIn.currentUser);

    function handleDeleteAvatar() {
        deleteAvatarApi(currentUser.id, currentUser.token)
            .then(res => {
                console.log(res.data);
                setTimeout(() => {setShowDeleteAvatarPopup(false)}, 200);
            })
            .then(() => {
                toast.success("Avatar delete successfully!")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='confirm_popup'>
            <div className='avatar-delete'>
                <div className="confirm-header">
                    <p>Confirm update your new profile picture</p>
                    <MdClose id='close-popup-btn'
                             onClick={() => setShowDeleteAvatarPopup(false)}
                    />
                </div>
                <div className="confirm-footer">
                    <button className="confirm-update"
                            onClick={() => handleDeleteAvatar()}
                    >
                        Delete profile picture
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AvatarUpdateConfirmPopup