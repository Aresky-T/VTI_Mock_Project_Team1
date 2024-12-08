import React from "react";
import ReviewType from "./ReviewType";
import StyledTextarea from "../styled/textarea";

const Reviews = ({
  recipe,
  toggleScroll,
  comment,
  comments,
  commentValid,
  currentUser,
  currentUserList,
  otherUserList,
  handleChangeComment,
  handleSubmitComment,
}) => {
  return (
    <div className="reviews">
      {currentUser ? (
        <>
          <form className="form-reviews" onSubmit={handleSubmitComment}>
            <p className="input-label">Leave a review</p>
            <StyledTextarea
              name="comment"
              id="comment-input"
              value={comment}
              placeholder="Let us know your thoughts..."
              onChange={handleChangeComment}
              rows={10}
            />
            <button
              className="submit-comment"
              type="submit"
              style={commentValid > 0 ? styles.active : styles.block}
            >
              SUBMIT
            </button>
          </form>
          <ReviewType
            list={currentUserList}
            label="Your"
            recipe={recipe}
            toggleScroll={toggleScroll}
          />
          <ReviewType list={otherUserList} label="Other" />
        </>
      ) : (
        <ReviewType list={comments} label="" />
      )}
    </div>
  );
};

const styles = {
  block: {
    pointerEvents: "none",
  },
  active: {
    pointerEvents: "auto",
    backgroundColor: "#333333",
    cursor: "pointer",
  },
};

export default Reviews;
