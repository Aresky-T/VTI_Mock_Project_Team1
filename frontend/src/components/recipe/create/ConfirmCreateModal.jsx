import React from "react";
import CustomConfirmPopup from "../../styled/popup/confirm";
import CustomConfirmPopupHeader from "../../styled/popup/confirm/header";
import CustomConfirmPopupBody from "../../styled/popup/confirm/body";
import { MdClose } from "react-icons/md";
import CustomConfirmPopupFooter from "../../styled/popup/confirm/footer";
import SubmitButton from "../../styled/button/submit";
import StyledWarningText from "../../styled/text/StyledWarningText";

const ConfirmCreateModal = ({
  active,
  activeSubmitButton,
  submitButtonText,
  handleClose,
  handleSubmit,
}) => {
  return (
    <CustomConfirmPopup className="confirm-create-modal" active={active}>
      <CustomConfirmPopupHeader>
        <h3>Confirm Creation</h3>
        <MdClose id="close-popup-btn" onClick={handleClose} />
      </CustomConfirmPopupHeader>
      <CustomConfirmPopupBody>
        <StyledWarningText>
          You are about to create a new recipe. Are you sure you want to
          proceed?
        </StyledWarningText>
      </CustomConfirmPopupBody>
      <CustomConfirmPopupFooter>
        <SubmitButton
          value={submitButtonText || "I'm sure, create"}
          active={activeSubmitButton}
          onSubmit={handleSubmit}
        />
      </CustomConfirmPopupFooter>
    </CustomConfirmPopup>
  );
};

export default ConfirmCreateModal;
