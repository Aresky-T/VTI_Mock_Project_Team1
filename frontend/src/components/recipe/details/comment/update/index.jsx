import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import CustomConfirmPopup from "../../../../styled/popup/confirm";
import CustomConfirmPopupHeader from "../../../../styled/popup/confirm/header";
import CustomConfirmPopupBody from "../../../../styled/popup/confirm/body";
import StyledTextarea from "../../../../styled/textarea";
import CustomConfirmPopupFooter from "../../../../styled/popup/confirm/footer";
import SubmitButton from "../../../../styled/button/submit";

const UpdateCommentPopup = ({ isShow, currentMessage, onSubmit, onClose }) => {
  const [message, setMessage] = useState("");

  const [isValidMessage, setIsValidMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (isProcessing) {
      const updatingCommentTimeout = setTimeout(() => {
        onSubmit(message);
        setIsProcessing(false);
      }, 1000);

      return () => clearTimeout(updatingCommentTimeout);
    }
    //eslint-disable-next-line
  }, [isProcessing]);

  useEffect(() => {
    setIsValidMessage(message && message.trim() !== "");
  }, [message]);

  useEffect(() => {
    setMessage(!!currentMessage && isShow ? currentMessage : "");
  }, [currentMessage, isShow]);

  return (
    <CustomConfirmPopup className={"update-review-modal"} active={isShow}>
      <CustomConfirmPopupHeader>
        <h3>Update your comment</h3>
        <MdClose id="close-popup-btn" onClick={onClose} />
      </CustomConfirmPopupHeader>
      <CustomConfirmPopupBody>
        <StyledTextarea
          spellCheck={false}
          rows={10}
          name="message"
          value={message}
          onChange={handleChangeMessage}
          placeholder="Enter your review..."
        />
      </CustomConfirmPopupBody>
      <CustomConfirmPopupFooter>
        <SubmitButton
          active={isValidMessage && !isProcessing}
          value={
            isProcessing
              ? "Updating your comment..."
              : "Submit update your comment"
          }
          onSubmit={() => setIsProcessing(true)}
        />
      </CustomConfirmPopupFooter>
    </CustomConfirmPopup>
  );
};

export default UpdateCommentPopup;
