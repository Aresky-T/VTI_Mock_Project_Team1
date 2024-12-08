import React, { useEffect, useState } from "react";
import CustomConfirmPopup from "../../../components/styled/popup/confirm";
import CustomConfirmPopupHeader from "../../../components/styled/popup/confirm/header";
import { MdClose } from "react-icons/md";
import CustomConfirmPopupBody from "../../../components/styled/popup/confirm/body";
import CustomConfirmPopupFooter from "../../../components/styled/popup/confirm/footer";
import StyledTextarea from "../../../components/styled/textarea";
import StyledWarningText from "../../../components/styled/text/StyledWarningText";
import SubmitButton from "../../../components/styled/button/submit";

const DisableOwnershipConfirmModal = ({
  recipe,
  handleCloseModal,
  handleSubmit,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSubmitButton, setActiveSubmitButton] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChangeMessage = (event) => {
    if (event && event.target) {
      setSubmitMessage(event.target.value);
    }
  };

  useEffect(() => {
    const isValidMessage =
      submitMessage && submitMessage.trim() === recipe?.name;
    setActiveSubmitButton(!isProcessing && isValidMessage);
  }, [recipe, isProcessing, submitMessage]);

  useEffect(() => {
    if (isProcessing) {
      const timeout = setTimeout(() => {
        setIsProcessing(false);
        handleSubmit();
      }, 1000);

      return () => clearTimeout(timeout);
    }
    //eslint-disable-next-line
  }, [isProcessing]);

  useEffect(() => {
    setIsActive(!!recipe);
  }, [recipe]);

  return (
    <div className="disable-ownership-container">
      <CustomConfirmPopup active={isActive}>
        <CustomConfirmPopupHeader>
          <p>Confirm Disable Recipe Ownership</p>
          <MdClose
            id="close-popup-btn"
            onClick={() => {
              setSubmitMessage("");
              handleCloseModal();
            }}
          />
        </CustomConfirmPopupHeader>
        <CustomConfirmPopupBody>
          <div className="confirm-delete-text"></div>
          <StyledWarningText>
            <span>
              Are you sure you want to disable your ownership of this recipe?
            </span>
            <br />
            <br />
            <span>
              Once disabled, you will no longer be able to view the recipe
              details, and the points you spent to acquire this recipe will not
              be refunded.To access it again, you will need to repurchase
              ownership.
            </span>
            <br />
            <br />
            <span>
              To continue, please enter recipe name "<b>{recipe?.name}</b>" in
              the input box below:
            </span>
          </StyledWarningText>
          <StyledTextarea
            type="text"
            rows={3}
            spellCheck={false}
            value={submitMessage}
            onChange={handleChangeMessage}
          />
        </CustomConfirmPopupBody>
        <CustomConfirmPopupFooter>
          <SubmitButton
            active={activeSubmitButton}
            value={
              isProcessing ? "Please wait a moment..." : "Disable Ownership"
            }
            onSubmit={() => setIsProcessing(true)}
          />
        </CustomConfirmPopupFooter>
      </CustomConfirmPopup>
    </div>
  );
};

export default DisableOwnershipConfirmModal;
