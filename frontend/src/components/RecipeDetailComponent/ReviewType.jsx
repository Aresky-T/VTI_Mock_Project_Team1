import React, { useState } from 'react'
import { IoMdArrowDropup } from 'react-icons/io';
import { userImage } from '../../constant/Image';
import UpdateReviewPopup from "./UpdateReviewPopup";

const ReviewType = ({ list, label, recipe, toggleScroll }) => {

    const [isShowPopup, setShowPopup] = useState(false);

    return (
        <>
            <div className={`reviews-list ${label}`}>
                <div className="reviews-list-head">
                    <h2>{label} Reviews ({list.length})</h2>
                    {label === "Your" &&
                        <p className="back-to-top"
                            onClick={() => toggleScroll()}
                        >
                            Back to Top
                            <IoMdArrowDropup />
                        </p>
                    }
                </div>
                <div className="reviews-list-body">
                    <ul>
                        {[...list].map((comment, index) => {
                            return (
                                <li className='review-item' key={index}>
                                    <p className="review-content">
                                        {comment.comment}
                                    </p>
                                    <ul className='review-item-info'>
                                        <li className='item-info avatar'>
                                            <img src={comment.user.avatarUrl ? comment.user.avatarUrl : userImage} alt="" />
                                        </li>
                                        <li className='item-info username'>
                                            <p>{comment.user.fullName}</p>
                                        </li>
                                        <li className='item-info date'>
                                            <p>{new Date(comment.updateDate).toLocaleTimeString()} - {new Date(comment.updateDate).toLocaleDateString()}</p>
                                        </li>
                                        <li className='item-info update-review'>
                                            |
                                            {label === "Your" && <p onClick={() => setShowPopup(true)}>update your review</p>}
                                        </li>
                                    </ul>
                                    {isShowPopup && <UpdateReviewPopup setShowPopup={setShowPopup} comment={comment.comment} recipe={recipe} />}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ReviewType