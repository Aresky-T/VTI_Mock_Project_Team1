import React, { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { userImage } from "../../constant/Image";
import UpdateReviewPopup from "./UpdateReviewPopup";

const renderCommentUserRole = (userRole) => {
  switch (userRole) {
    case "CREATOR":
      return "Recipe creator";
    case "OWNER":
      return "Recipe owner";
    default:
      return "";
  }
};

const ReviewType = ({ list, label, recipe, toggleScroll }) => {
  const [reviewForUpdate, setReviewForUpdate] = useState(null);
  const isYourReview = label === "Your";

  return (
    <>
      <div className={`reviews-list ${label}`}>
        <div className="reviews-list-head">
          <h2>
            {label} comments ({list.length})
          </h2>
          {isYourReview && (
            <p className="back-to-top" onClick={() => toggleScroll()}>
              Back to Top
              <IoMdArrowDropup />
            </p>
          )}
        </div>
        <div className="reviews-list-body">
          <ul>
            {[...list].map((item, index) => {
              return (
                <li className="review-item" key={index}>
                  <p className="review-content">{item.message}</p>
                  <ul className="review-item-info">
                    <li className="item-info avatar">
                      <img
                        src={
                          item.user.avatarUrl ? item.user.avatarUrl : userImage
                        }
                        loading="lazy"
                        alt=""
                      />
                    </li>
                    <li className="item-info username">
                      <p>{item.user.fullName}</p>
                    </li>
                    <li className="item-info user-role">
                      <p>{renderCommentUserRole(item.userRole)}</p>
                    </li>
                    <li className="item-info date">
                      <p>
                        {new Date(item.createDate).toLocaleString("en-EN", {
                          timeStyle: "short",
                          dateStyle: "short",
                        })}
                      </p>
                    </li>
                    <li className="item-info update-review">
                      {item.isMine && (
                        <>
                          <span>|</span>
                          <button onClick={() => setReviewForUpdate(item)}>
                            update
                          </button>
                        </>
                      )}
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <UpdateReviewPopup
        review={reviewForUpdate}
        recipe={recipe}
        onClose={() => setReviewForUpdate(null)}
      />
    </>
  );
};

export default ReviewType;
