import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import CustomConfirmPopup from "../../../../styled/popup/confirm";
import CustomConfirmPopupHeader from "../../../../styled/popup/confirm/header";
import CustomConfirmPopupBody from "../../../../styled/popup/confirm/body";
import CustomConfirmPopupFooter from "../../../../styled/popup/confirm/footer";
import SubmitButton from "../../../../styled/button/submit";
import StyledWarningText from "../../../../styled/text/StyledWarningText";

const DeleteCommentPopup = ({ isShow, onSubmit, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isProcessing) {
      const updatingCommentTimeout = setTimeout(() => {
        onSubmit();
        setIsProcessing(false);
      }, 1000);

      return () => clearTimeout(updatingCommentTimeout);
    }
    //eslint-disable-next-line
  }, [isProcessing]);

  return (
    <CustomConfirmPopup className={"update-review-modal"} active={isShow}>
      <CustomConfirmPopupHeader>
        <h3>Warning! Confirm delete your comment</h3>
        <MdClose id="close-popup-btn" onClick={onClose} />
      </CustomConfirmPopupHeader>
      <CustomConfirmPopupBody>
        <StyledWarningText>
          <b>Are you sure you want to delete this comment?</b>
        </StyledWarningText>
        <br />
        <StyledWarningText>
          This action cannot be undone. Once deleted, the comment and any
          associated replies will be permanently removed! Please consider
          carefully before click submit!
        </StyledWarningText>
      </CustomConfirmPopupBody>
      <CustomConfirmPopupFooter>
        <SubmitButton
          active={!isProcessing}
          value={
            isProcessing
              ? "Deleting your comment..."
              : "Submit delete your comment"
          }
          onSubmit={() => setIsProcessing(true)}
        />
      </CustomConfirmPopupFooter>
    </CustomConfirmPopup>
  );
};

export default DeleteCommentPopup;
