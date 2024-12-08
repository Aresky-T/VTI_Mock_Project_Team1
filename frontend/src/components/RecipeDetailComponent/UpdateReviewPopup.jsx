import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateRecipeCommentApi } from "../../api/comment.api";
import { updateTime } from "../../redux/realtime.slice";
import CustomConfirmPopup from "../styled/popup/confirm";
import CustomConfirmPopupHeader from "../styled/popup/confirm/header";
import CustomConfirmPopupFooter from "../styled/popup/confirm/footer";
import CustomConfirmPopupBody from "../styled/popup/confirm/body";
import StyledTextarea from "../styled/textarea";
import SubmitButton from "../styled/button/submit";
import { toast } from "react-toastify";

const UpdateReviewPopup = ({ review, recipe, onClose }) => {
  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState("");

  const [isValidComment, setIsValidComment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentUser = useSelector((state) => state.auth.signIn.currentUser);
  const dispatch = useDispatch();

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  function handleUpdateReview() {
    updateRecipeCommentApi(
      {
        userId: currentUser.id,
        recipeId: recipe.id,
        comment: comment,
      },
      currentUser.token
    )
      .then((res) => {
        toast.success(res.data);
        dispatch(updateTime());
        setTimeout(() => {
          onClose();
        }, 200);
      })
      .catch((err) => {
        toast.error("Update failed!");
      });
  }

  useEffect(() => {
    if (isProcessing) {
      const timeout = setTimeout(() => {
        setIsProcessing(false);
        handleUpdateReview();
      }, 1000);

      return () => clearTimeout(timeout);
    }
    //eslint-disable-next-line
  }, [isProcessing]);

  useEffect(() => {
    setIsValidComment(comment.trim() !== "");
  }, [comment]);

  useEffect(() => {
    setIsShow(!!review);
    review && setComment(review.message);
  }, [review]);

  return (
    <CustomConfirmPopup className={"update-review-modal"} active={isShow}>
      <CustomConfirmPopupHeader>
        <h3>Update your review</h3>
        <MdClose id="close-popup-btn" onClick={onClose} />
      </CustomConfirmPopupHeader>
      <CustomConfirmPopupBody>
        <StyledTextarea
          spellCheck={false}
          rows={10}
          name="comment"
          value={comment}
          onChange={handleChangeComment}
          placeholder="Enter your review..."
        />
      </CustomConfirmPopupBody>
      <CustomConfirmPopupFooter>
        <SubmitButton
          active={isValidComment && !isProcessing}
          value={
            isProcessing
              ? "Updating your review..."
              : "Submit update your review"
          }
          onSubmit={() => setIsProcessing(true)}
        />
      </CustomConfirmPopupFooter>
    </CustomConfirmPopup>
  );
};

export default UpdateReviewPopup;
