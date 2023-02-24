import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateCommentApi } from "../../api/comment.api";
import { toast } from "react-hot-toast";
import { updateTime } from '../../redux/realtime.slice';


const UpdateReviewPopup = ({ setShowPopup, comment, recipe }) => {

    const [newComment, setNewComment] = useState(comment);
    const currentUser = useSelector(state => state.auth.signIn.currentUser)
    const dispatch = useDispatch();
    
    let commentValid = newComment.trim().length

    const handleChangeNewComment = (e) => {
        setNewComment(e.target.value)
    }
    function confirmUpdateComment() {
        updateCommentApi({
            userId: currentUser.id,
            recipeId: recipe.id,
            comment: newComment
        }, currentUser.token)
            .then((res) => {
                toast.success(res.data);
                dispatch(updateTime());
                setTimeout(() => { setShowPopup(false) }, 200)
            })
            .catch(err => {
                toast.error("Update failed!")
            })
    }

    return (
        <div className='confirm_popup'>
            <div className='review-update'>
                <div className="update-confirm-header">
                    <p>Confirm update your review</p>
                    <MdClose id='close-popup-btn'
                        onClick={() => setShowPopup(false)}
                    />
                </div>
                <div className="update-confirm-body">
                    {/*<img src={avatar} alt="" />*/}
                    <textarea
                        value={newComment}
                        name="newComment"
                        id="input-review"
                        onChange={handleChangeNewComment}
                        placeholder="Enter your review..."
                    />
                </div>
                <div className="update-confirm-footer">
                    <button className="confirm-update"
                        onClick={() => confirmUpdateComment()}
                        style={commentValid < 1 ? { pointerEvents: "none", background: "#ccc" } : { pointerEvents: "auto" }}
                    >
                        Set new profile picture
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateReviewPopup;